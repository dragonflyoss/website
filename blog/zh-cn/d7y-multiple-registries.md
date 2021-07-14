---
hidden: false
title: Dragonfly 支持多镜像仓库(基于0.3.0)
keywords: docker, dragonfly, 多镜像仓库
description: 本文介绍如何为dragonfly 配置多个镜像仓库并使用。
author: starnop
date: 2019-06-12
---

# Dragonfly 支持多镜像仓库

注： 该方式只支持 **HTTP** 镜像仓库

本教程操作需要三个节点，节点 A 作为镜像仓库节点，节点 B 作为Dragonfly Supernode 节点，节点 C 作为客户端节点（本教程只模拟一个客户端节点）。

步骤如下：

1. 在节点A 上启动镜像仓库
2. 在节点B 上启动supernode
3. 在节点C 上编辑 dfdaemon 配置文件
4. 在节点C 上配置并启动 dfclient
5. 在节点C 上修改docker http proxy 执行 dfdaemon 地址

## 启动镜像仓库

使用docker registry 启动一个http registry, 如果你有自己的镜像仓库，请忽略该步骤。

主机地址：192.168.33.21

```shell
$ docker run -d -p 5000:5000 -v /var/lib/registry:/var/lib/registry \
  --restart=always --name registry-v2 registry:2
```

## 启动 Supernode

主机地址：192.168.1.2
注： `advertiseIp` 需要配置为peer 节点能够正常访问到的 Supernode 节点 IP 地址。

```shell
$ docker run -d --name supernode --restart=always -p 8001:8001 -p 8002:8002 \
    -v /root/supernode:/home/admin/supernode \
    dragonflyoss/supernode:0.3.0 -Dsupernode.advertiseIp=127.0.0.1
```

## 配置并启动 dfclient

主机地址：192.168.1.3
注：dfclient 包括 dfdaemon 与 dfget两个组件。

### dfdaemon 配置多仓库支持

注：`dfdaemon --registry`  指定的镜像仓库将作为规则 `(^localhost$)|(^127.0.0.1$)` 的host。另外，--registry 的默认值为 `https://index.docker.io` 。

```shell
$ cat /etc/dragonfly/dfdaemon.yml
registries:
    - regx: ^192.168.33.21$
      schema: http
      host: 192.168.33.21:5000
    - regx: ^registry.others.com$
      schema: http
      host: registry.others.com
    - regx: ""
```

### supernode 节点配置

注： 目前 master 分支已支持 `dfdaemon --node`  传入超级节点地址，可以自行编译 master 分支代码使用。

```shell
$ cat /etc/dragonfly/dfget.yml
nodes:
    - 192.168.1.2
```

### 启动dfclient

```shell
$ docker run -d --name dfclient -p 65001:65001 dragonflyoss/dfclient:v0.3.0 \
    --registry https://index.docker.io
```

### 验证多仓库配置成功

注：dfclient 的所有日志都在 `~/.small-dragonfly/logs` 文件夹下。

查看 dfclient `~/.small-dragonfly/logs/dfdaemon.log` 日志文件，如下图所示，可以看到 Dragonfly 默认添加项以及配置的多镜像仓库项。

![image.png](https://cdn.nlark.com/yuque/0/2019/png/130632/1557319200871-516f20e1-65ee-4ca9-a74f-4d722746ba1f.png#align=left&display=inline&height=284&name=image.png&originHeight=568&originWidth=2878&size=255035&status=done&width=1439)

## 配置Docker

### 配置 http proxy

注：配置http proxy [参考链接](https://docs.docker.com/config/daemon/systemd/#httphttps-proxy)

```shell
$ sudo mkdir -p /etc/systemd/system/docker.service.d

$ cat /etc/systemd/system/docker.service.d/http-proxy.conf
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:65001/"
```

### 配置 insecure-registries

注：需要将所有需要代理的镜像仓库配置为 `insecure-registries` ，配置insecure-registries [参考链接](https://docs.docker.com/registry/insecure/)

```shell
$ cat /etc/docker/daemon.json
{
  "insecure-registries" : ["registry.others.com","192.168.33.21"]
}
```

### Docker reload

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 验证 HTTP Proxy 配置成功

```shell
$ systemctl show --property=Environment docker
Environment=HTTP_PROXY=http://127.0.0.1:65001/
```

## 使用

以配置文件第二条匹配规则即 `^192.168.33.21$` 为例

```shell
$ docker pull 192.168.33.21/library/nginx:1.10.1
1.10.1: Pulling from library/nginx
8f8173dba604: Pull complete
567b8ff1dfb6: Pull complete
0bc0d3e85536: Pull complete
Digest: sha256:b53e7ca2f567bdb7f23dad7d183a3466532d32f7ddf82847783fad14f425e5d3
Status: Downloaded newer image for 192.168.33.21/library/nginx:1.10.1

$ docker images
192.168.33.21/library/nginx                                1.10.1              bf2b4c2d7bf5        2 years ago         181MB
```

通过日志文件验证配置文件匹配规则项是否生效，看到以下类似的日志，则代表成功匹配。

```shell
......
2019-05-08 12:52:47.266 DEBU sign:30789 : matched registry for &{Schema:http Host:192.168.33.21:5000 Certs:[] Regx:^192.168.33.21$ compiler:0xc4201b0460 tlsConfig:0xc4201da300}
......
2019-05-08 12:52:47.283 INFO sign:30789 : start download url:http://192.168.33.21:5000/v2/library/nginx/blobs/sha256:8f8173dba604202f7b2b78736221fb3e95b6a9581dfe622e5b30159197714659 to 25a6305b-9f0a-4afe-84d5-d6f6c1bc8dba in repo
......
```