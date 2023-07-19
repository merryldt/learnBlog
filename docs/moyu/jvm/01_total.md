---
title: GC 体系总结
subtitle: GC 体系总结
category:
  - JVM
tag:
  - 摸鱼
order: 1
---
# 背景

# 基础知识介绍
1. Mutator  
应用程序,即垃圾生产者；
2. Tlab   
Thread Local Allocation Buffer 的缩写，基于CAS 的独享线程(Mutator Threads) 可以优先将对象分配在Eden 中的一块内存，因为是Java 线程独享的内存区没有锁竞争，所以分配速度更快，每个TLAB 都是一个线程独享的。 
3. Card Table  
卡表,主要是用来标记卡页的状态，每个卡表项对应一个卡页。当卡页中一个对象引用有写操作时，写屏障将会标记对象所在的卡表状态改为dirty,卡表的本质是用来解决跨代引用的问题。   
[解决的原理](https://stackoverflow.com/questions/19154607/how-actually-card-table-and-writer-barrier-works)

4. Sla  
Service-Level Agreement(服务等级协议)的缩写；指的是系统服务提供者（Provider）对客户(Customer)的⼀个服务承诺。这是衡量⼀个⼤型分布式系统是否“健康”的常见⽅法。  
可⽤性、准确性、系统容量和延迟   
[sla详解](09999_SLA.md)
# 路径
![Alt text](./image/image.png)
## 1. 建立知识体系
> 学习GC 的基础知识,包括:
1. [Jvm的内存结构和对象分配](02_jvm_Memory0Structure.md)
2. [垃圾收集方法](03_GarbageCollectionMethod.md)
3. [垃圾收集器](04_GarbageCollector.md)
4. [掌握一些常用的GC问题分析工具](05_GCAnalysisTools.md)
## 2. 确定评价指标
1. [了解基本 GC 的评价方法](06_GCEvaluationCriteria.md)
2. 摸清如何设定独立系统的指标;
3. 在业务场景中判断 GC 是否存在问题的手段;
## 3. 场景调优实践
1. [分析与解决九种 CMS 中常见 GC 问题场景](09_9CMS.md)
2. [纯Java自带工具排查JVM](010_PracticeOne.md)
## 4. 总结优化经验
