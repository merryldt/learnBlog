---
title: Arthas 入门
subtitle: Arthas 入门
category:
  - JVM
tag:
  - 摸鱼
order: 8001
---


## Arthas

全局视角实时查看应用 load、内存、gc、线程的状态信息，并能在不修改应用代码的情况下，对业务问题进行诊断，包括查看方法调用的出入参、异常，监测方法执行耗时，类加载信息等，大大提升线上问题排查效率。

【**开发人员可以在线解决生产问题。无需 JVM 重启，无需代码更改。 Arthas 作为观察者永远不会暂停正在运行的线程。**】


## 快速使用 arthas

**执行arahas程序的用户需要和目标进程(即java应用)具有相同的权限** 
最好采用同一个用户执行： sudu su root

### 例子

1. java 应用程序： math-game.jar
2. arthas 应用 arthas-boot.jar

### 切换用户： sudo su root 

### 下载和启动java 应用程序
```shell
curl -O https://arthas.aliyun.com/math-game.jar
java -jar math-game.jar
```

### 下载和启动arthas
```shell
curl -O https://arthas.aliyun.com/arthas-boot.jar
java -jar arthas-boot.jar
```
#### 选择java进程：
```shell
$ $ java -jar arthas-boot.jar
* [1]: 17231
  [2]: 82560 math-game.jar
```
math-game进程是第 2 个，则输入 2，再输入回车/enter。Arthas 会 attach 到目标进程上，并输出日志

#### 显示如下表示成功：

```shell
[INFO] Try to attach process 82560
[INFO] Attach process 82560 success.
[INFO] arthas-client connect 127.0.0.1 3658
  ,---.  ,------. ,--------.,--.  ,--.  ,---.   ,---.
 /  O  \ |  .--. ''--.  .--'|  '--'  | /  O  \ '   .-'
|  .-.  ||  '--'.'   |  |   |  .--.  ||  .-.  |`.  `-.
|  | |  ||  |\  \    |  |   |  |  |  ||  | |  |.-'    |
`--' `--'`--' '--'   `--'   `--'  `--'`--' `--'`-----'


wiki: https://arthas.aliyun.com/doc
version: 3.0.5.20230928201536
pid: 82560
time: 2023-09-28 22:15:24
$
```
## 命令： dashboard

- 功能 展示当前java进程的实时数据（线程、gc、jvm内存占用等）信息

命令指导：
```shell
# 展示当前java进程 线程cpu占用、gc信息、jvm信息等，5s刷新一次
dashboard

# 刷新10次后终止，默认5s刷新一次
dashboard -n 10

# 2s刷新一次
dashboard -i 2000

# 2s刷新一次，共刷新10次
dashboard -i 2000 -n 10

# 2s刷新一次，共刷新10次，并保存到文件中，用于后续分析
dashboard -i 2000 -n 10 | tee /data/dashback_2023_08_21.txt

```
输入dashboard，按回车/enter，会展示当前进程的信息，按ctrl+c可以中断执行。

```shell
$ dashboard
ID     NAME                   GROUP          PRIORI STATE  %CPU    TIME   INTERRU DAEMON
17     pool-2-thread-1        system         5      WAITIN 67      0:0    false   false
27     Timer-for-arthas-dashb system         10     RUNNAB 32      0:0    false   true
11     AsyncAppender-Worker-a system         9      WAITIN 0       0:0    false   true
9      Attach Listener        system         9      RUNNAB 0       0:0    false   true
3      Finalizer              system         8      WAITIN 0       0:0    false   true
2      Reference Handler      system         10     WAITIN 0       0:0    false   true
4      Signal Dispatcher      system         9      RUNNAB 0       0:0    false   true
26     as-command-execute-dae system         10     TIMED_ 0       0:0    false   true
13     job-timeout            system         9      TIMED_ 0       0:0    false   true
1      main                   main           5      TIMED_ 0       0:0    false   false
14     nioEventLoopGroup-2-1  system         10     RUNNAB 0       0:0    false   false
18     nioEventLoopGroup-2-2  system         10     RUNNAB 0       0:0    false   false
23     nioEventLoopGroup-2-3  system         10     RUNNAB 0       0:0    false   false
15     nioEventLoopGroup-3-1  system         10     RUNNAB 0       0:0    false   false
Memory             used   total max    usage GC
heap               32M    155M  1820M  1.77% gc.ps_scavenge.count  4
ps_eden_space      14M    65M   672M   2.21% gc.ps_scavenge.time(m 166
ps_survivor_space  4M     5M    5M           s)
ps_old_gen         12M    85M   1365M  0.91% gc.ps_marksweep.count 0
nonheap            20M    23M   -1           gc.ps_marksweep.time( 0
code_cache         3M     5M    240M   1.32% ms)
Runtime
os.name                Mac OS X
os.version             10.13.4
java.version           1.8.0_162
java.home              /Library/Java/JavaVir
                       tualMachines/jdk1.8.0
                       _162.jdk/Contents/Hom
                       e/jre

```

## 命令： thread

- 展示当前java进程详细的线程信息
目前java 部分程序使用的都是springboot,此类程序ID =1，通常是main函数

```shell
$ thread 1 | grep 'main('
    at demo.MathGame.main(MathGame.java:17)
```
- 命令使用示例
```shell
# 展示所有的线程列表
thread
thread-all

# cpu使用率采样修改为2s，默认为200ms
thread -i 2000

# 打印出cpu使用率前5的线程详情，即比较繁忙的线程，cpu使用率采样统计方式请参考官方文档说明
thread -n 5

# 打印id为5的线程详情
thread 5

# 根据状态过滤线程数据（NEW, RUNNABLE, TIMED_WAITING, WAITING, BLOCKED, TERMINATED）
thread --state RUNNABLE
thread |grep RUNNABLE

# 列出持有某个锁，阻塞其他线程最多的线程，排查死锁
thread -b
```
## 命令： jad

反编译类： demo.Mathgame

```shell
$ jad demo.MathGame

ClassLoader:
+-sun.misc.Launcher$AppClassLoader@3d4eac69
  +-sun.misc.Launcher$ExtClassLoader@66350f69

Location:
/tmp/math-game.jar

/*
 * Decompiled with CFR 0_132.
 */
package demo;

import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

public class MathGame {
    private static Random random = new Random();
    private int illegalArgumentCount = 0;

    public static void main(String[] args) throws InterruptedException {
        MathGame game = new MathGame();
        do {
            game.run();
            TimeUnit.SECONDS.sleep(1L);
        } while (true);
    }

    public void run() throws InterruptedException {
        try {
            int number = random.nextInt();
            List<Integer> primeFactors = this.primeFactors(number);
            MathGame.print(number, primeFactors);
        }
        catch (Exception e) {
            System.out.println(String.format("illegalArgumentCount:%3d, ", this.illegalArgumentCount) + e.getMessage());
        }
    }

    public static void print(int number, List<Integer> primeFactors) {
        StringBuffer sb = new StringBuffer("" + number + "=");
        Iterator<Integer> iterator = primeFactors.iterator();
        while (iterator.hasNext()) {
            int factor = iterator.next();
            sb.append(factor).append('*');
        }
        if (sb.charAt(sb.length() - 1) == '*') {
            sb.deleteCharAt(sb.length() - 1);
        }
        System.out.println(sb);
    }

    public List<Integer> primeFactors(int number) {
        if (number < 2) {
            ++this.illegalArgumentCount;
            throw new IllegalArgumentException("number is: " + number + ", need >= 2");
        }
        ArrayList<Integer> result = new ArrayList<Integer>();
        int i = 2;
        while (i <= number) {
            if (number % i == 0) {
                result.add(i);
                number /= i;
                i = 2;
                continue;
            }
            ++i;
        }
        return result;
    }
}
Affect(row-cnt:1) cost in 970 ms.
```

## watch
- 观测某方法执行的详情
通过watch命令来查看demo.MathGame#primeFactors函数的返回值：

```shell
$ watch demo.MathGame primeFactors returnObj
Press Ctrl+C to abort.
Affect(class-cnt:1 , method-cnt:1) cost in 107 ms.
ts=2023-09-28 22:15:24; [cost=1.715367ms] result=null
ts=2023-09-28 22:15:24; [cost=19.012416ms] result=@ArrayList[
    @Integer[5],
    @Integer[47],
    @Integer[2675531],
]
```

命令：
```shell
# 观测某方法的执行详情，支持ognl表达式输出观测结果
watch *VipUserController helloUser '{clazz,method,isReturn,isThrow,params,target,returnObj,throwExp}'
:<<!
常用表达式
target : the object
clazz : the object's class
method : the constructor or method
params : the parameters array of method
params[0..n] : the element of parameters array
returnObj : the returned object of method
throwExp : the throw exception of method
isReturn : the method ended by return
isThrow : the method ended by throwing exception
#cost : the execution time in ms of method invocation
!

# 限制观测执行次数
watch *VipUserController helloUser -n 2

# 设置观测结果遍历深度
wathch *VipUserController helloUser -x 2

# 只观测执行成功
watch *VipUserController helloUser -s

# 只观测执行失败
watch *VipUserController helloUser -e

# 同时观测方法执行前、方法执行后结果
watch *VipUserController helloUser -b -f

# 观测方法执行异常时，详细的异常栈信息
watch *VipUserController helloUser '{throwExp}' -e -x 2

# 观测方法执行时间大于200ms的信息
watch *VipUserController helloUser '#cost>100'

```
## monitor

- 统计方法一段周期内的执行情况

- 命令
```shell
# 统计某个类某个方法的执行信息，默认60s为统计周期
monitor top.learningwang.arthasdemo.controller.VipUserController helloUser

# 统计某个类下某个方法的执行信息，10s为统计周期，统计3次
monitor top.learningwang.arthasdemo.controller.VipUserController helloUser -c 10 -n 3

# 统计某个类下某个方法的执行信息，限定参数值，5s为统计周期
monitor top.learningwang.arthasdemo.controller.VipUserController helloUser "params[0].length<5" -c 5

```

## 退出 arthas

- quit 退出当前 Arthas 客户端，其他 Arthas 客户端不受影响

- exit 等同于quit

- stop 关闭 Arthas 服务端，所有 Arthas 客户端全部退出

如果只是退出当前的连接，可以用quit或者exit命令。Attach 到目标进程上的 arthas 还会继续运行，端口会保持开放，下次连接时可以直接连接上。

如果想完全退出 arthas，可以执行stop命令。