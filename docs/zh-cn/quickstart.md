# Dragonfly 快速入门

快速入门文档旨在帮助您快速上手 Dragonfly，即使在完全不了解 Dragonfly 的情况下也能完成最精简的体验。

如需在生产环境使用 Dragonfly 完成生产级别的镜像与文件分发，请参考 supernode 和 dfget 的详细生产级别配置参数。

## 前提条件

本文档所有操作步骤均使用 docker 容器在同一台机器上完成，所以请确保您的机器上已经安装并启动 docker 容器引擎。您也可以参考文档：[多机部署](userguide/multi_machines_deployment.md) 来体验 Dragonfly。

## 步骤 1：部署 Dragonfly 服务端（Supernode）

```bash
docker run -d --name supernode --restart=always -p 8001:8001 -p 8002:8002 \
    dragonflyoss/supernode:0.3.0 -Dsupernode.advertiseIp=127.0.0.1
```

> **注意**：`supernode.advertiseIp`必须是客户端能够连通的ip，`127.0.0.1`仅在服务端和客户端同机情况下才可使用。

## 步骤 2：部署 Dragonfly 客户端

```bash
docker run -d --name dfclient -p 65001:65001 dragonflyoss/dfclient:v0.3.0 --registry https://index.docker.io
```

> **提示**：`--registry`参数指定镜像仓库地址，`https://index.docker.io`为官方镜像仓库，您也可以设置为其他仓库地址。

## 步骤 3：修改 Docker Daemon 配置

我们需要修改 Docker Daemon 配置，通过 mirror 方式来使用 Dragonfly 进行镜像的拉取。

在配置文件 `/etc/docker/daemon.json` 中添加或更新如下配置项：

```json
{
  "registry-mirrors": ["http://127.0.0.1:65001"]
}
```

重启 Docker Daemon。

```bash
systemctl restart docker
```

> **提示**：如需进一步了解 `/etc/docker/daemon.json`，请参考 [Docker 文档](https://docs.docker.com/registry/recipes/mirror/#configure-the-cache)。

## 步骤 4：拉取镜像

通过以上步骤我们即完成了 Dragonfly 服务端与客户端的部署，并且设置了 Docker Daemon 通过 Dragonfly 来拉取官方镜像。

您可以如平时一样来拉取镜像，例如：

```bash
docker pull nginx:latest
```

## 步骤 5：验证

您可以通过执行以下命令，检验 nginx 镜像是否通过 Dragonfly 来传输完成。

```bash
docker exec dfclient grep 'downloading piece' /root/.small-dragonfly/logs/dfclient.log
```

如果以上命令有诸如

```
2019-03-29 15:49:53.913 INFO sign:96027-1553845785.119 : downloading piece:{"taskID":"00a0503ea12457638ebbef5d0bfae51f9e8e0a0a349312c211f26f53beb93cdc","superNode":"127.0.0.1","dstCid":"127.0.0.1-95953-1553845720.488","range":"67108864-71303167","result":503,"status":701,"pieceSize":4194304,"pieceNum":16}
```

则说明镜像下载通过 Dragonfly 来完成了。

## 相关文档

- [多机部署](userguide/multi_machines_deployment.md)
- [安装服务端](userguide/install_server.md)
- [安装客户端](userguide/install_client.md)
- [下载文件](userguide/download_files.md)
- [SuperNode 配置](userguide/supernode_configuration.md)
- [Dfget](cli_ref/dfget.md)
- [Dfdameon](cli_ref/dfdaemon.md)
