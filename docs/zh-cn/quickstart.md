# Dragonfly 快速入门

快速入门文档旨在帮助您快速上手 Dragonfly，完成Dragonfly最精简的体验。如需在生产环境使用 Dragonfly 完成生产级别的镜像与文件分发，请参考 supernode 和 dfget 的详细生产级别配置参数。

## 前提条件

我们假设快速入门需要用户准备3台机器，一台扮演 supernode 的角色，另外两台扮演 dfclient 的角色，拓扑结构图如下：

![quick start cluster topology](./img/quick-start-topo.png)

因此，您需要准备以下内容：

1. 准备三台在统一局域网的三台宿主机；
2. 以上每台机器上都装有docker容器引擎。

## 步骤 1：部署 SuperNode（服务端）

在以上三台机器中，找出一台机器用于部署Supernode（服务端）。

1. 拉取我们提供的 Docker 镜像

```bash
docker pull dragonflyoss/supernode:0.3.0
```

2. 启动 SuperNode

```bash
docker run -d -p 8001:8001 -p 8002:8002 dragonflyoss/supernode:0.3.0 -Dsupernode.advertiseIp=127.0.0.1
```

> **注意**：`supernode.advertiseIp`必须是客户端能够连通的ip，例子中的`127.0.0.1`是为了方便测试。

## 步骤 2：修改 Docker Daemon 配置。

三台宿主机中一台宿主机已经完成supernode的部署，紧接着我们需要将 Dragonfly 客户端（dfclient）部署在剩余两台机器上。
在Dragonfly客户端部署在剩余两台机器之前，我们需要修改这两台机器上 Docker Daemon的配置文件，添加 `registry-mirrors`参数。

1. 修改配置文件 `/etc/docker/daemon.json`。

```sh
vi /etc/docker/daemon.json
```

**提示：** 如需进一步了解 `/etc/docker/daemon.json`，请参考 [Docker 文档](https://docs.docker.com/registry/recipes/mirror/#configure-the-cache)。

2. 在配置文件中添加或更新配置项 `registry-mirrors`。

```sh
"registry-mirrors": ["http://127.0.0.1:65001"]
```

3. 重启 Docker Daemon。

```bash
systemctl restart docker
```

## 步骤 3：部署 Dragonfly 客户端

完成Dragonfly客户端两台宿主机的Docker Daemon参数配置之后，我们可以将 Dragonfly 客户端（dfclient）部署在这两台机器上。

1. 在两台机器上分别拉取我们提供的 Docker 镜像

```bash
docker pull dragonflyoss/dfclient:v0.3.0
```

2. 在第一台Dragonfly客户端机器上，执行以下命令启动 Dragonfly 客户端

```bash
docker run -d --name dfclient01 -p 65001:65001 dragonflyoss/dfclient:v0.3.0 --registry https://index.docker.io
```

3. 在第二台Dragonfly客户端机器上，执行以下命令启动 Dragonfly 客户端

```bash
docker run -d --name dfclient02 -p 65001:65001 dragonflyoss/dfclient:v0.3.0 --registry https://index.docker.io
```

## 步骤 4：验证镜像P2P分发

部署完一个Supernode节点与两个dfclient节点之后，我们可以初步验证P2P镜像分发的功能是否生效。

您只需在两台Dragonfly客户端节点上分别执行命令即可。

```bash
docker pull nginx:latest
```

在两台机器都成功下载完镜像之后，您可以选择一个Dragonfly客户端节点，执行以下命令，检验nginx镜像是否通过Dragonfly来传输完成。

```bash
docker exec dfclient01 grep 'downloading piece' /root/.small-dragonfly/logs/dfclient.log
```

如果以上命令有诸如

```
2019-03-29 15:49:53.913 INFO sign:96027-1553845785.119 : downloading piece:{"taskID":"00a0503ea12457638ebbef5d0bfae51f9e8e0a0a349312c211f26f53beb93cdc","superNode":"127.0.0.1","dstCid":"127.0.0.1-95953-1553845720.488","range":"67108864-71303167","result":503,"status":701,"pieceSize":4194304,"pieceNum":16}
```

则说明镜像下载通过Dragonfly来完成了。

如果需要查看镜像是否通过其他peer节点来完成传输，可以执行以下命令：

```bash
docker exec dfclient01 grep 'downloading piece' /root/.small-dragonfly/logs/dfclient.log | grep -v cdnnode
```

如果以上命令没有输出结果，则说明镜像没有通过其他peer节点完成传输，否则说明通过其他peer节点完成传输。

## 相关文档

- [安装服务端](userguide/install_server.md)
- [安装客户端](userguide/install_client.md)
- [下载文件](userguide/download_files.md)
- [SuperNode 配置](userguide/supernode_configuration.md)
- [Dfget](cli_ref/dfget.md)
- [Dfdameon](cli_ref/dfdaemon.md)
