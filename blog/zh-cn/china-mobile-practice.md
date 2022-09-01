---
hidden: false
title: 浙江移动容器云基于 Dragonfly 的统一文件分发平台生产实践
keywords: dragonfly,china mobile
description: 浙江移动容器云（DCOS）平台以 Dragonfly 为改革“利器”，成功解决了运营商大规模集群场景下分发效率低、成功率低以及网络带宽控制难等问题；并反哺社区，在 Dragonfly 界面功能、生产高可用部署层面对 Dragonfly 进行了升级。
author: 陈远峥, 王淼鑫
date: 2018-12-18
---

# 浙江移动容器云基于 Dragonfly 的统一文件分发平台生产实践



![611.jpg | center | 827x347](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545132829549-ae31dad8-27ac-4ecd-9834-72ed0d064a21.jpeg "")



2018 年 11 月， 源于阿里巴巴的云原生镜像分发系统—— Dragonfly 在 KubeCon 上海现场亮相，成为 CNCF 沙箱级别项目（Sandbox Level Project）。


<span data-type="color" style="color:rgb(0, 0, 0)">Dragonfly 主要解决以 Kubernetes 为核心的分布式应用编排系统的镜像分发难题。2017 年开源即成为阿里巴巴最为核心的基础设施技术之一。开源一年以来，Dragonfly 已在诸多行业落地。</span>


<span data-type="color" style="color:rgb(0, 0, 0)">DCOS 是浙江移动容器云平台，目前在平台式运行的应用系统已有 185 套，包括手机营业厅、CRM 应用等核心系统。</span>本文将主要介绍浙江移动容器云（DCOS）平台以 Dragonfly 为改革“利器”，成功解决了运营商大规模集群场景下分发效率低、成功率低以及网络带宽控制难等问题；并反哺社区，在 Dragonfly 界面功能、生产高可用部署层面对 Dragonfly 进行了升级。

# __DCOS 容器云在生产环境中遇到的挑战__

<span data-type="color" style="color:rgb(0, 0, 0)">随着浙江移动容器云（DCOS）平台的持续完善，承载应用不断增加，在运行容器数量接近 10000 个。采用传统 C/S（Client-Server）结构的分发服务体系已经越来越无法适应大规模分布式应用在代码包发布、文件传输时的场景：</span>

* <span data-type="color" style="color:rgb(0, 0, 0)">计算结点因网络异常等原因，导致代码包下载失败，对应用代码包的完整性和一致性构成影响。</span>
* <span data-type="color" style="color:rgb(0, 0, 0)">在多用户高并发情况下，可能会出现 TB 级的文件传输，单点性能瓶颈增加了应用发布时长。</span>


# __Dragonfly 简介__

P2P（Peer-To-Peer）是一种点对点网络技术，通过各结点互联，将网络中的资源和服务分散在各个结点上。信息的传输和服务实现直接在结点之间进行，避免了传统 C/S 结构可能的单点瓶颈。



![612.jpg | center | 612x264](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545132840061-54a8e3a8-3ee3-4d6c-9133-f9e800cb9833.jpeg "")



CNCF 开源文件分发服务解决方案 Dragonfly，是一种基于 P2P 与 CDN 技术，构建了适用于容器镜像和文件的分发系统，有效解决了企业大规模集群场景下文件和镜像分发效率、成功率低以及网络带宽控制的问题。

Dragonfly 的核心组件：

* SuperNode：超级结点，以被动 CDN 方式从文件源下载文件并生产种子数据块，在 P2P 网络中，充当网络控制器，调度结点之间的分块数据传输；
* dfget proxy：部署在计算结点的代理，负责 P2P 结点的数据块下载和结点间的数据共享。

Dragonfly 分发工作原理（以镜像分发为例）：
容器镜像不同于普通文件，由多层存储构成，下载也是分层下载，非单一文件。每层的镜像文件都会被分割为 block 数据块并作为种子。下载结束后，通过每层镜像唯一的 ID 和 sha256 算法，重新组合成完整的镜像。确保下载过程的一致性。


![613.jpg | center | 643x229](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545132849354-01a2b0c7-ce7c-4fa1-9b82-a28e4bf15513.jpeg "")


<span data-type="color" style="color:inherit">Dragonfly 镜像下载模式的过程如下图所示：</span>


![614.jpg | center | 622x379](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545132858016-ab4b43c1-8ec8-40b1-8f9b-b8ebe20cc9c9.jpeg "")


1. dfget-proxy 拦截客户端 docker 发起的镜像下载请求（docker pull）并转换为向 SuperNode 的dfget 下载请求；
2. SuperNode 从镜像源仓库下载镜像并将镜像分割成多个 block 种子数据块；
3. dfget 下载数据块并对外共享已下载的数据块，SuperNode 记录数据块下载情况，并指引后续下载请求在结点之间以 P2P 方式进行数据块下载；
4. Dokcer daemon 的镜像 pull 机制将最终将镜像文件组成完整的镜像。

根据 Dragonfly 的上述特性，浙江移动容器云平台结合生产实际决定引入 Dragonfly 技术对现行代码包发布模式进行改造，通过 P2P 网络分摊发布时产生的单一文件服务器传输带宽瓶颈，并利用 Docker 本身的镜像 pull 机制来保证整个发布过程镜像文件的一致性。

# __解决方案：统一分发平台__

## __架构设计与实现__

### <span data-type="color" style="color:rgb(0, 0, 0)">功能架构设计</span>

在 Dragonfly 技术的基础上，结合浙江移动容器云生产实践，统一分发平台的总体设计目标如下：


* 利用 Dragonfly 技术和文件下载校验功能，解决目前生产发布过程中应用代码包发布不一致、发布时间过长的问题；
* 支持客户端界面化，屏蔽后台命令行细节，简化操作流程，效率更高；
* 支持 Mesos、K8s、Host、VM 等多种云环境下的分发，并实现集群的自主发现，支持用户通过统一分发平台对目标集群进行统一化管理；
* 增加用户权限控制和任务带宽限制，支持多租户多任务的分发；
* 优化 P2P Agent 部署方式，支持更快速的计算结点 P2P 组网。

基于上述目标，统一分发平台的总体架构设计如下：


![615.jpg | center | 677x418](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545132867788-ff84b34b-01f5-456a-b31d-0ae21112af0f.jpeg "")



* P2P 网络层是支持不同异构集群接入（主机集群、K8s 集群、Mesos 集群）的由多个计算结点构成的分发网络；
* 分发服务层由功能模块和存储模块构成，是整个通用分发系统的核心架构。其中，用户接入鉴权模块提供系统登录审核功能；分发控制模块基于 Dragonfly，实现 P2P 方式的任务分发；流量控制模块提供租户对不同任务的带宽设置功能；配置信息数据库负责记录网络层目标集群、任务状态等基本信息；用户通过状态查询模块可实现对分发任务执行进度的透明掌控；
* 用户操作层由任意数量的界面化用户客户端构成。


### 技术架构实现

根据上述平台设计目标与总体架构分析，容器云团队在开源组件的基础上进行了平台功能的二次开发，具体包括：


* 开发界面化用户客户端 Client；
* 引入 Harbor 开源镜像仓库进行镜像存储，Minio 对象存储服务进行文件存储；
* 使用 MySQL、Redis 作为 CMDB，由 MySQL 负责管理集群状态、用户信息等，为面向集群的“一键式”任务创建提供支撑。通过 Redis 保存分发任务状态信息，提供高并发、低延迟的状态查询服务；
* 平台核心服务层（Docktrans）和 API 服务网关层（Edgetrans）都是是无状态、面向集群的、可动态横向扩展的核心组：
    * API 网关封装了系统内部架构，主要负责接收并转发 Client 发起的任务请求以及实现用户对各功能模块的接入鉴权，并对外可提供定制化的 API 调用服务；
    * 核心服务层是平台各功能模块业务逻辑处理的引擎。在分发过程中，核心服务层将通过统一的远程调用向 P2P 代理结点同时发起下载请求，完成客户端——任务集群“一对多”的分发过程。
* df-master 与 df-client 均为 Dragonfly 组件，df-master 即 Dragonfly 中的超级节点SuperNode，df-client 即 P2P 网络中的对等节点代理 dfget proxy。


![616.jpg | center | 629x527](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545132878478-3055785b-b075-48d6-a604-5949f80acd67.jpeg "")



### __技术特色__

* df-client 实现容器镜像化。通过轻量级的容器部署，加快了组网效率。新接入网络层的集群 host 结点可通过镜像下载、启动的方式，秒级完成 P2P Agent 结点启动；
* 核心接口层（Docktrans）屏蔽了dfget 底层命令行细节，提供了界面化的功能，简化了用户操作。通过统一远程调用方式下发至多个 P2P 任务结点，解决了用户需要逐台进行 dfget 等下载操作的问题，简化了“一对多”的任务发起模式。

# __核心功能模块|分发控制接口交互流程__

__如下图所示，统一分发平台的核心模块在进行任务分发时的工作流程具体如下：__

1. 用户通过 Client 建立镜像或文件分发任务；
2. 分发模块首先通过平台 API 服务网关（Edgetrans）的鉴权功能判断用户是否具有分发功能的权限；
3. 用户通过鉴权后，设置分发任务参数,提供集群ID，平台从 MySQL 数据库读取集群配置信息实现集群结点的自主发现。用户也可以指定多个结点 IP 作为自定义集群参数；
4. 根据分发类型，核心服务层（Docktrans）分发功能模块将不同的前端分发请求转换为 dfget（文件）或者 Docker pull（镜像）命令，通过统一远程调用 Docker Service 服务将命令下发至多个结点 df-client 进行相应的处理；
5. 在任务进行过程中，任务进度与任务事件日志分别写入 Redis 与 MySQL 数据库提供用户对任务状态的查询能力。


![617.jpg | center | 650x750](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545132888905-8a87fbcc-6c5b-40ba-83a3-c964f2e3f381.jpeg "")


# __生产环境改造成果__


截至目前，生产共运行 200 余个业务系统 1700 多个应用模块，已全部优化为镜像发布模式。发布耗时和发布成功率得到明显改善：

采用 P2P 镜像发布后，业务多应用一次上线的月均发布成功率稳定在 98%。


![618.png | center | 750x452](https://cdn.nlark.com/lark/0/2018/png/168324/1545132901015-771f1ede-28c4-4c2e-8e84-aedbbf258e20.png "")


4 月后容器云平台开始用 P2P 镜像发布方式代替传统分发系统的代码包发布方式，多应用一次集中上线发布耗时相较与改造之前大幅降低，平均下降 67%。


![619.jpg | center | 806x437](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545132916233-ca4a49bd-1b9b-4b16-a8f2-d57adf78f7df.jpeg "")

同时，容器云平台选取了多个应用集群进行单应用的 P2P 镜像发布改造效果测试。可以看出，单个应用发布耗时相较于改造前大幅降低，平均下降 81.5%。



![620.jpg | center | 756x418](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545132928452-7e6d867c-b69c-4e08-81e3-f47bf3029eb7.jpeg "")


# __后续推广__

<span data-type="color" style="color:inherit">统一文件分发平台已有效解决了浙江移动容器云应用在代码发布过程中的效率和一致性问题，成为平台的重要组成部分之一。同时，也支持更多大规模集群中进行高效文件分发的场景。可陆续推广至：集群批量安装介质分发以及集群批量配置文件更新。</span>

# __社区共建|界面功能展示__

## __直接引入 Dragonfly 后诞生的社区诉求__

* 缺少图形化界面，用户使用成本高，操作效率低；
* 缺少用户权限管理和分发审计功能，无分发管控能力；
* 不支持用户“一对多”的集群操作模式。云环境下，用户通常需要向自己所管理的集群同时进行分发，但现有模式仅支持用户在单结点进行分发操作；
* 传统 Agent 应用软件包部署方式效率低，不利于大规模集群的快速伸缩扩展。作为系统软件，增加了对宿主系统的入侵性。

目前，客户端界面化开发工作基本完成，已进入生产测试和部署中。分发平台总体规划 4 大核心功能：任务管理，目标管理，权限管理和系统分析，现已开放前三项功能。

### __权限管理界面__

权限管理，即用户管理，为不同用户提供个性化的权限管理功能，具体如下：


* 支持不同角色（超级管理员、任务集群管理员、任务管理员）用户创建、删除、修改；
* 支持不同权限集合的定制化组合（角色创建），用户权限赋权；
* 支持外部系统用户接入与权限授权（暂未开放）。


![621.jpg | center | 775x356](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545132942560-b9ea33e0-4dab-4272-a455-00aa61f7c870.jpeg "")



![622.jpg | center | 777x291](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545132954952-04f9d9d7-0cdd-407c-ac08-51ed59c2ff85.jpeg "")


### __目标管理界面__

目标管理，即用户进行任务分发的目标集群结点管理，为用户提供管理集群的 P2P 组网和集群结点状态信息健康功能，具体如下：


* 支持不同用户集群的创建和删除；
* 支持在用户所管理集群下，容器自动化 Agent 部署快速新增、删除 P2P 网络结点，并对结点状态进行监控；
* 支持不同类型，如 host（虚拟机、物理机）集群、K8s 集群、Mesos 集群的接入，同时，支持直接读取 K8s、Mesos 集群结点信息，批量接入 P2P 网络层。


![623.jpg | center | 768x352](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545132966618-62fc04e4-cc80-4929-b6cc-817c4c383cc9.jpeg "")



![624.jpg | center | 770x375](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545132975328-d0fd14c4-379b-4a24-aeb3-da367244a243.jpeg "")


### __任务管理__

任务管理提供文件或镜像分发任务的创建、删除、停止、信息查看等功能，具体如下：


* 支持镜像预热模式（可设置计划分发任务，提前发布镜像或文件分发至各结点）；
* 支持容器镜像等多格式文件的分发；
* 支持指定任务集群多结点“一键式”任务创建、执行、删除、终止和已执行任务的“一键复制”；
* 支持对发布文件版本的创建和删除管理；
* 支持对分发任务状态与任务日志的查看。


![625.jpg | center | 768x356](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545132991301-c1540304-4ded-44cc-bd0d-e3bbcefdd217.jpeg "")



![626.jpg | center | 777x358](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545133000432-303aa000-400c-483b-a07f-da7ea7c5e680.jpeg "")


### __系统分析（计划开放）__

预计后续将开放系统分析功能，为平台管理员、用户提供任务分发耗时、成功率等数据和任务执行效率统计图表，通过数据统计与预测，有效支撑平台向智能化方向演进。


# __社区共建|生产高可用部署__

镜像库主备容灾部署，主备之间通过镜像同步保持数据一致性。


* P2P 发布由 df-master 和 df-client 构成（蓝色部分），df-master 从镜像库拉取镜像形成 P2P 种子，每个机房配置两个 df-master 形成高可用；
* P2P 分发只在本机房分发，避免跨机房流量；
* 每个机房配置两个 mirror（备用镜像库），当 P2P 分发方式异常无法工作时计算结点会自动到 mirror 上下载镜像， mirror 通过负载均衡实现高可用。




![626.jpg | center | 777x358](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545133023281-d5414983-98d3-4010-8a2a-0c33dd409898.jpeg "")


目前，我们计划把界面功能展示贡献给 CNCF Dragonfly 社区，进一步丰富 CNCF Dragonfly 社区周边生态。未来，我们希望更多人参与进来，一起为社区繁荣贡献力量。


<span data-type="color" style="color:rgb(0, 0, 0)">本文作者：</span>

<span data-type="color" style="color:rgb(0, 0, 0)"><span data-type="background" style="background-color:rgb(255, 255, 255)">陈远峥 </span></span><span data-type="background" style="background-color:rgb(255, 255, 255)">浙江移动云计算架构师</span>

<span data-type="color" style="color:rgb(0, 0, 0)"><span data-type="background" style="background-color:rgb(255, 255, 255)">王淼鑫 </span></span>浙江移动云计算架构师


# __Dragonfly 社区分享__

__<span data-type="color" style="color:rgb(0, 0, 0)">Dragonfly 社区贡献者太云在 Dragonfly Meetup 分享到：</span>__

<span data-type="color" style="color:rgb(0, 0, 0)">“目前，Dragonfly 已经成为 CNCF Sandbox 项目，Star 数 2800+，有很多企业用户正在使用 Dragonfly 来解决他们在镜像或者文件分发方面遇到的各种问题。未来，我们将不断完善和改进 Dragonfly，为云原生应用提供更加丰富强大且简便的分发工具。</span><span data-type="color" style="color:rgb(0, 0, 0)"><strong>期待与大家共同努力，让 Dragonfly 早日成为 CNCF 毕业项目。”</strong></span>


## __项目地址__

<span data-type="color" style="color:rgb(0, 128, 255)">https://github.com/dragonflyoss/Dragonfly</span>

## __Dragonfly Roadmap__



![628.jpg | center | 827x951](https://cdn.nlark.com/lark/0/2018/jpeg/168324/1545133033600-cd0520ea-844a-48d9-b2ef-debf1a4f881b.jpeg "")

