
# Kubernetes API
Kubernetes 控制面的核心是 API 服务器。 API 服务器负责提供 HTTP API，以供用户、集群中的不同部分和集群外部组件相互通信。

Kubernetes API 使你可以在 Kubernetes 中查询和操纵 API 对象 （例如 Pod、Namespace、ConfigMap 和 Event）的状态。

## 操作工具
- kubectl 命令行接口
- kubeadm

## 持久化
Kubernetes 通过将序列化状态的对象写入到 etcd 中完成存储操作。

