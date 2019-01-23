# Dragonfly 术语

本文列出了 Dragonfly 的常用术语。

## SuperNode

SuperNode 是一个常驻进程，主要有两个作用：

- 它是 P2P 网络中的追踪者和调度者，负责为每个对等节点（Peer）选择适当的下载网络路径。
- 它也是 CDN 服务端，会缓存从源下载的数据，以避免反复下载相同的文件。

## dfget

dfget 是 Dragonfly 用于下载文件的客户端。它与 wget 类似。

同时，它也扮演对等节点（Peer）的角色，可在 P2P 网络中与其他对等节点互相传输数据。

## dfdaemon

dfdaemon 仅用于拉取镜像。它会在 dockerd/pouchd 和 Registry 之间建立代理。

dfdaemon 会从 dockerd/pouchd 拉取镜像时发送的全部请求中筛选出获取分层的请求，然后使用 dfget 下载这些分层。
