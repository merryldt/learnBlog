---
title: Arthas 实战使用
subtitle: Arthas 实战使用
category:
  - JVM
tag:
  - 摸鱼
order: 8002
---


## 修改日志级别

- 修改指定类的日志级别
- 修改全局日志级别

```shell
# 查找到具体的类信息
sc -d *VipUserController

# 使用ognl表达式查看日志属性的信息,判断日志级别
ognl -c classLoaderHash "@com.learning.demo.arthas.controller.BaseUserController@logger"

# 使用ognl表达式修改日志级别
ognl -c classLoaderHash "@com.learning.demo.arthas.controller.BaseUserController@logger.setLevel(@ch.qos.logback.classic.Level@DEBUG)"

# 再次查看日志级别，判断是否修改成功
ognl "@com.learning.demo.arthas.controller.BaseUserController@logger"

# 修改全局日志级别
ognl -c classLoaderHash '@org.slf4j.LoggerFactory@getLogger("root").setLevel(@ch.qos.logback.classic.Level@DEBUG)'

```

## 更新代码、热加载

- 线上代码出现问题,想不重启,修改几行后，实现热加载。

```shell
# 反编译源码，并保存到文件中
jad --source-only com.learning.demo.arthas.controller.BaseUserController > /data/BaseUserController.java

```

编辑源码,修改后：

```shell
# 根据源码，编译出class文件,并保存到执行目录
mc -c 18b4aac2 /data/BaseUserController.java -d /data/

# 重新加载编译好的class文件
redefine -c 18b4aac2 /com/learning/demo/arthas/controller/BaseUserController.class

```

测试,访问接口，查看结果

## 排查函数调用异常

- 观测方法执行异常具体信息，入参、出参等

```shell
# 观测方法执行异常时，详细的异常栈信息
watch *BaseUserController helloUser '{throwExp}' -e -x 2

```

## arthas 后台异步执行诊断任务

- 执行dashboard、watch、trace等命令时，可将命令执行挂起，将结果输出到文件中，供后续分析，不影响其他命令执行。


```shell
# 后台执行dashboard，并输出结果到文件中
dashboard >> /data/dash.log &

# 查看当前执行中的后台任务
jobs

# 终止后台任务
kill jobid
```

## 排查方法执行效率问题

- 线上某个接口执行慢，无法确定是哪一段代码的问题。可根据各方法执行耗时，缩小排查范围。

```shell
# 观测某几个方法，执行耗时大于100ms的调用栈
trace -E com.test.ClassA|org.test.ClassB method1|method2|method3 '#cost>100'
```
