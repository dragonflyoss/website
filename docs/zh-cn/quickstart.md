# Dragonfly 快速入门

在本快速入门文档中，为了让您快速上手 Dragonfly，您首先要在 Docker 容器中启动一个 [SuperNode](overview/terminology.md)（服务端），并安装 Dragonfly 客户端，然后下载一个容器镜像或普通文件，这些下载工作可能是实际场景中经常要做的。

## 前提条件

Docker 容器已启动。

## 步骤 1：在 Docker 容器中启动 SuperNode（服务端）

1. 拉取我们提供的 Docker 镜像。

    ```bash
    # 将 ${imageName} 替换为真实镜像名称
    docker pull ${imageName}
    ```

    **注意：** 请根据您所处的地理位置选择我们提供的一个镜像，并用其替换 `${imageName}`：

    - 中国：`registry.cn-hangzhou.aliyuncs.com/dragonflyoss/supernode:0.2.1`
    - 美国：`registry.us-west-1.aliyuncs.com/dragonflyoss/supernode:0.2.1`

2. 启动 SuperNode。

    ```bash
    # 将 ${imageName} 替换为真实镜像名称
    docker run -d -p 8001:8001 -p 8002:8002 ${imageName}
    ```

例如，如果您在中国，则运行以下命令：

```bash
docker pull registry.cn-hangzhou.aliyuncs.com/dragonflyoss/supernode:0.2.1

docker run -d -p 8001:8001 -p 8002:8002 registry.cn-hangzhou.aliyuncs.com/dragonflyoss/supernode:0.2.1
```

## 步骤 2：安装 Dragonfly 客户端

有两种方法可以安装 Dragonfly 客户端：从源码安装，或者通过拉取镜像来安装。

### 方法 1：从源码安装

1. 下载客户端的包。

    ```bash
    cd $HOME
    # 将 ${package} 替换为适合您的操作系统和位置的包
    wget ${package}
    ```

    **注意：** 请根据您所处的地理位置选择我们提供的一个包，并用其替换 `${package}`：

    - 如果您在中国：

        - [Linux 64-bit](http://dragonflyoss.oss-cn-hangzhou.aliyuncs.com/df-client_0.2.1_linux_amd64.tar.gz): `http://dragonflyoss.oss-cn-hangzhou.aliyuncs.com/df-client_0.2.1_linux_amd64.tar.gz`

        - [MacOS 64-bit](http://dragonflyoss.oss-cn-hangzhou.aliyuncs.com/df-client_0.2.1_darwin_amd64.tar.gz): `http://dragonflyoss.oss-cn-hangzhou.aliyuncs.com/df-client_0.2.1_darwin_amd64.tar.gz`

    - 如果您不在中国：

        - [Linux 64-bit](https://github.com/dragonflyoss/Dragonfly/releases/download/v0.2.1/df-client_0.2.1_linux_amd64.tar.gz): `https://github.com/dragonflyoss/Dragonfly/releases/download/v0.2.1/df-client_0.2.1_linux_amd64.tar.gz`

        - [MacOS 64-bit](https://github.com/dragonflyoss/Dragonfly/releases/download/v0.2.1/df-client_0.2.1_darwin_amd64.tar.gz): `https://github.com/dragonflyoss/Dragonfly/releases/download/v0.2.1/df-client_0.2.1_darwin_amd64.tar.gz`

2. 将包解压。

    ```bash
    # 将 ${package} 替换为适合您的操作系统和位置的包
    tar -zxf ${package}
    ```

3. 将 `df-client` 目录添加到 `PATH` 环境变量，以便直接使用 `dfget` 和 `dfdaemon` 命令。

    ```bash
    # 执行或将这一行添加到 ~/.bashrc
    export PATH=$PATH:$HOME/df-client/
    ```

例如，如果您在中国且使用 Linux，则运行以下命令：

```bash
cd $HOME
wget http://dragonflyoss.oss-cn-hangzhou.aliyuncs.com/df-client_0.2.1_linux_amd64.tar.gz
tar -zxf df-client_0.2.1_linux_amd64.tar.gz
# 执行或将这一行添加到 ~/.bashrc
export PATH=$PATH:$HOME/df-client/
```

### 方法 2：通过拉取镜像来安装

1. 拉取我们提供的 Docker 镜像。

    ```bash
    docker pull dragonflyoss/dfclient:v0.3.0_dev
    ```

2. 启动 dfdaemon。

    ```bash
    docker run -d -p 65001:65001 dragonflyoss/dfclient:v0.3.0_dev --registry https://xxx.xx.x
    ```

3. 配置 Daemon 镜像。

    a.修改配置文件 `/etc/docker/daemon.json`。

    ```sh
    vi /etc/docker/daemon.json
    ```

    **提示：** 如需进一步了解 `/etc/docker/daemon.json`，请参考 [Docker 文档](https://docs.docker.com/registry/recipes/mirror/#configure-the-cache)。

    b.在配置文件中添加或更新配置项 `registry-mirrors`。

    ```sh
    "registry-mirrors": ["http://127.0.0.1:65001"]
    ```

    c.重启 Docker Daemon。

    ```bash
    systemctl restart docker
    ```

## 步骤 3：下载镜像或文件

现在已经启动 SuperNode 并安装 Dragonfly 客户端，所以可以开始下载镜像或普通文件了。Dragonfly 支持下载这两类文件，但下载方法略有不同。

### 场景 1：用 Dragonfly 下载普通文件

安装 Dragonfly 客户端后，即可使用 `dfget` 命令下载文件。

```bash
dfget -u 'https://github.com/dragonflyoss/Dragonfly/blob/master/docs/images/logo.png' -o /tmp/logo.png
```

**提示：**如需进一步了解 dfget 命令，请参考 [dfget](cli_ref/dfget.md)。

### 场景 2：用 Dragonfly 拉取镜像

1. 以指定的 Registry 启动 `dfdaemon`，例如 `https://index.docker.io`。

    ```bash
    nohup dfdaemon --registry https://index.docker.io > /dev/null 2>&1 &
    ```

2. 将以下这一行添加到 Dockerd 配置文件 [/etc/docker/daemon.json](https://docs.docker.com/registry/recipes/mirror/#configure-the-docker-daemon)。

    ```json
    "registry-mirrors": ["http://127.0.0.1:65001"]
    ```

3. 重启 Dockerd。

    ```bash
    systemctl restart docker
    ```

4. 用 Dragonfly 拉取镜像。

    ```bash
    docker pull nginx:latest
    ```

## 相关文档

- [安装服务端](userguide/install_server.md)
- [安装客户端](userguide/install_client.md)
- [下载文件](userguide/download_files.md)
- [SuperNode 配置](userguide/supernode_configuration.md)
- [Dfget](cli_ref/dfget.md)
