

# Kubernetes 对象


## 概述

在 Kubernetes 系统中，Kubernetes 对象是持久化的实体。 Kubernetes 使用这些实体去表示整个集群的状态。

具体而言，它们描述了如下信息：
- 哪些容器化应用正在运行（以及在哪些节点上运行）
- 可以被应用使用的资源
- 关于应用运行时行为的策略，比如重启策略、升级策略以及容错策略

Kubernetes 对象是一种“意向表达（Record of Intent）”。一旦创建该对象， Kubernetes 系统将不断工作以确保该对象存在。通过创建对象，你本质上是在告知 Kubernetes 系统，你想要的集群工作负载状态看起来应是什么样子的， 这就是 Kubernetes 集群所谓的期望状态（Desired State）。

操作 Kubernetes 对象 —— 无论是创建、修改或者删除 —— 需要使用 Kubernetes API。 比如，当使用 kubectl 命令行接口（CLI）时，CLI 会调用必要的 Kubernetes API； 也可以在程序中使用客户端库， 来直接调用 Kubernetes API。

##  status 和 spec

spec： 通俗的讲，就是创建Kubernetes 对象时设置的内容。比如：名字、有几个实例等。这些内容就是你对k8s 的期望状态 。 
status:  当前状态。由 k8s  系统和组件设置并更新的。在任何时刻，k8s 控制平面 都一直在积极地管理着对象的实际状态，以使之达成期望状态。

例如，Kubernetes 中的 Deployment 对象能够表示运行在集群中的应用。 当创建 Deployment 时，你可能会设置 Deployment 的 spec，指定该应用要有 3 个副本运行。 Kubernetes 系统读取 Deployment 的 spec， 并启动我们所期望的应用的 3 个实例 —— 更新状态以与规约相匹配。 如果这些实例中有的失败了（一种状态变更），Kubernetes 系统会通过执行修正操作来响应 spec 和 status 间的不一致 —— 意味着它会启动一个新的实例来替换。



``` yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2 # 告知 Deployment 运行 2 个与该模板匹配的 Pod
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80

```
必需字段

在想要创建的 Kubernetes 对象所对应的 .yaml 文件中，需要配置的字段如下：

- apiVersion - 创建该对象所使用的 Kubernetes API 的版本
- kind - 想要创建的对象的类别
- metadata - 帮助唯一标识对象的一些数据，包括一个 name 字符串、UID 和可选的 namespace
- spec - 你所期望的该对象的状态

## Pod 对象

最重要的 Kubernetes 基本对象 Pod。

Pod 是可以在 Kubernetes 中创建和管理的、最小的可部署的计算单元。
Pod 是一组（一个或多个） 容器； 这些容器共享存储、网络、以及怎样运行这些容器的声明。
Pod的内容始终是同地同步的，在共享上下文中运行。Pod建模为一个应用特定的“逻辑主机”:它包含一个或多个相对紧密耦合的应用容器。在非云上下文中，在同一台物理机或虚拟机上运行的应用程序类似于在同一台逻辑主机上运行的云应用程序。

## 什么是pod?

Pod 的共享上下文包括一组 Linux 名字空间、控制组（cgroup）和可能一些其他的隔离方面， 即用来隔离容器的技术。 在 Pod 的上下文中，每个独立的应用可能会进一步实施隔离。

Pod 类似于共享名字空间并共享文件系统卷的一组容器。


## Pod 示例 

``` yml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80

```

## 使用pod
Pod 通常不是直接创建的，而是使用工作负载资源创建的。

Kubernetes 集群中的 Pod 主要有两种用法：

- 运行单个容器的 Pod。"每个 Pod 一个容器" 模型是最常见的 Kubernetes 用例； 在这种情况下，可以将 Pod 看作单个容器的包装器，并且 Kubernetes 直接管理 Pod，而不是容器。

- 运行多个协同工作的容器的 Pod。 Pod 可能封装由多个紧密耦合且需要共享资源的共处容器组成的应用程序。 这些位于同一位置的容器可能形成单个内聚的服务单元 —— 一个容器将文件从共享卷提供给公众， 而另一个单独的 “边车”（sidecar）容器则刷新或更新这些文件。 Pod 将这些容器和存储资源打包为一个可管理的实体。(相对高级，比较少使用)

## Pod 怎样管理多个容器

Pod 被设计成支持形成内聚服务单元的多个协作过程（形式为容器）。 Pod 中的容器被自动安排到集群中的同一物理机或虚拟机上，并可以一起进行调度。 容器之间可以共享资源和依赖、彼此通信、协调何时以及何种方式终止自身。

## 管理一个或者多个 Pod 的工作负载资源
### Deployment
### StatefulSet
### DaemonSet
