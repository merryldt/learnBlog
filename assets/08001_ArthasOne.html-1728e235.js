import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,b as e}from"./app-dc6a447a.js";const t={},p=e(`<h2 id="arthas" tabindex="-1"><a class="header-anchor" href="#arthas" aria-hidden="true">#</a> Arthas</h2><p>全局视角实时查看应用 load、内存、gc、线程的状态信息，并能在不修改应用代码的情况下，对业务问题进行诊断，包括查看方法调用的出入参、异常，监测方法执行耗时，类加载信息等，大大提升线上问题排查效率。</p><p>【<strong>开发人员可以在线解决生产问题。无需 JVM 重启，无需代码更改。 Arthas 作为观察者永远不会暂停正在运行的线程。</strong>】</p><h2 id="快速使用-arthas" tabindex="-1"><a class="header-anchor" href="#快速使用-arthas" aria-hidden="true">#</a> 快速使用 arthas</h2><p><strong>执行arahas程序的用户需要和目标进程(即java应用)具有相同的权限</strong> 最好采用同一个用户执行： sudu su root</p><h3 id="例子" tabindex="-1"><a class="header-anchor" href="#例子" aria-hidden="true">#</a> 例子</h3><ol><li>java 应用程序： math-game.jar</li><li>arthas 应用 arthas-boot.jar</li></ol><h3 id="切换用户-sudo-su-root" tabindex="-1"><a class="header-anchor" href="#切换用户-sudo-su-root" aria-hidden="true">#</a> 切换用户： sudo su root</h3><h3 id="下载和启动java-应用程序" tabindex="-1"><a class="header-anchor" href="#下载和启动java-应用程序" aria-hidden="true">#</a> 下载和启动java 应用程序</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-O</span> https://arthas.aliyun.com/math-game.jar
<span class="token function">java</span> <span class="token parameter variable">-jar</span> math-game.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="下载和启动arthas" tabindex="-1"><a class="header-anchor" href="#下载和启动arthas" aria-hidden="true">#</a> 下载和启动arthas</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-O</span> https://arthas.aliyun.com/arthas-boot.jar
<span class="token function">java</span> <span class="token parameter variable">-jar</span> arthas-boot.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="选择java进程" tabindex="-1"><a class="header-anchor" href="#选择java进程" aria-hidden="true">#</a> 选择java进程：</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ $ <span class="token function">java</span> <span class="token parameter variable">-jar</span> arthas-boot.jar
* <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: <span class="token number">17231</span>
  <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>: <span class="token number">82560</span> math-game.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>math-game进程是第 2 个，则输入 2，再输入回车/enter。Arthas 会 attach 到目标进程上，并输出日志</p><h4 id="显示如下表示成功" tabindex="-1"><a class="header-anchor" href="#显示如下表示成功" aria-hidden="true">#</a> 显示如下表示成功：</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Try to attach process <span class="token number">82560</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Attach process <span class="token number">82560</span> success.
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> arthas-client connect <span class="token number">127.0</span>.0.1 <span class="token number">3658</span>
  ,---.  ,------. ,--------.,--.  ,--.  ,---.   ,---.
 /  O  <span class="token punctuation">\\</span> <span class="token operator">|</span>  .--. <span class="token string">&#39;&#39;</span>--.  .--<span class="token string">&#39;|  &#39;</span>--<span class="token string">&#39;  | /  O  \\ &#39;</span>   .-<span class="token string">&#39;
|  .-.  ||  &#39;</span>--<span class="token string">&#39;.&#39;</span>   <span class="token operator">|</span>  <span class="token operator">|</span>   <span class="token operator">|</span>  .--.  <span class="token operator">||</span>  .-.  <span class="token operator">|</span><span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">.</span>  <span class="token variable">\`</span></span>-.
<span class="token operator">|</span>  <span class="token operator">|</span> <span class="token operator">|</span>  <span class="token operator">||</span>  <span class="token operator">|</span><span class="token punctuation">\\</span>  <span class="token punctuation">\\</span>    <span class="token operator">|</span>  <span class="token operator">|</span>   <span class="token operator">|</span>  <span class="token operator">|</span>  <span class="token operator">|</span>  <span class="token operator">||</span>  <span class="token operator">|</span> <span class="token operator">|</span>  <span class="token operator">|</span>.-<span class="token string">&#39;    |
\`--&#39;</span> <span class="token variable"><span class="token variable">\`</span>--&#39;<span class="token variable">\`</span></span>--<span class="token string">&#39; &#39;</span>--<span class="token string">&#39;   \`--&#39;</span>   <span class="token variable"><span class="token variable">\`</span>--&#39;  <span class="token variable">\`</span></span>--<span class="token string">&#39;\`--&#39;</span> <span class="token variable"><span class="token variable">\`</span>--&#39;<span class="token variable">\`</span></span>-----&#39;


wiki: https://arthas.aliyun.com/doc
version: <span class="token number">3.0</span>.5.20230928201536
pid: <span class="token number">82560</span>
time: <span class="token number">2023</span>-09-28 <span class="token number">22</span>:15:24
$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="命令-dashboard" tabindex="-1"><a class="header-anchor" href="#命令-dashboard" aria-hidden="true">#</a> 命令： dashboard</h2><ul><li>功能 展示当前java进程的实时数据（线程、gc、jvm内存占用等）信息</li></ul><p>命令指导：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 展示当前java进程 线程cpu占用、gc信息、jvm信息等，5s刷新一次</span>
dashboard

<span class="token comment"># 刷新10次后终止，默认5s刷新一次</span>
dashboard <span class="token parameter variable">-n</span> <span class="token number">10</span>

<span class="token comment"># 2s刷新一次</span>
dashboard <span class="token parameter variable">-i</span> <span class="token number">2000</span>

<span class="token comment"># 2s刷新一次，共刷新10次</span>
dashboard <span class="token parameter variable">-i</span> <span class="token number">2000</span> <span class="token parameter variable">-n</span> <span class="token number">10</span>

<span class="token comment"># 2s刷新一次，共刷新10次，并保存到文件中，用于后续分析</span>
dashboard <span class="token parameter variable">-i</span> <span class="token number">2000</span> <span class="token parameter variable">-n</span> <span class="token number">10</span> <span class="token operator">|</span> <span class="token function">tee</span> /data/dashback_2023_08_21.txt

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输入dashboard，按回车/enter，会展示当前进程的信息，按ctrl+c可以中断执行。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ dashboard
ID     NAME                   GROUP          PRIORI STATE  %CPU    TIME   INTERRU DAEMON
<span class="token number">17</span>     pool-2-thread-1        system         <span class="token number">5</span>      WAITIN <span class="token number">67</span>      <span class="token number">0</span>:0    <span class="token boolean">false</span>   <span class="token boolean">false</span>
<span class="token number">27</span>     Timer-for-arthas-dashb system         <span class="token number">10</span>     RUNNAB <span class="token number">32</span>      <span class="token number">0</span>:0    <span class="token boolean">false</span>   <span class="token boolean">true</span>
<span class="token number">11</span>     AsyncAppender-Worker-a system         <span class="token number">9</span>      WAITIN <span class="token number">0</span>       <span class="token number">0</span>:0    <span class="token boolean">false</span>   <span class="token boolean">true</span>
<span class="token number">9</span>      Attach Listener        system         <span class="token number">9</span>      RUNNAB <span class="token number">0</span>       <span class="token number">0</span>:0    <span class="token boolean">false</span>   <span class="token boolean">true</span>
<span class="token number">3</span>      Finalizer              system         <span class="token number">8</span>      WAITIN <span class="token number">0</span>       <span class="token number">0</span>:0    <span class="token boolean">false</span>   <span class="token boolean">true</span>
<span class="token number">2</span>      Reference Handler      system         <span class="token number">10</span>     WAITIN <span class="token number">0</span>       <span class="token number">0</span>:0    <span class="token boolean">false</span>   <span class="token boolean">true</span>
<span class="token number">4</span>      Signal Dispatcher      system         <span class="token number">9</span>      RUNNAB <span class="token number">0</span>       <span class="token number">0</span>:0    <span class="token boolean">false</span>   <span class="token boolean">true</span>
<span class="token number">26</span>     as-command-execute-dae system         <span class="token number">10</span>     TIMED_ <span class="token number">0</span>       <span class="token number">0</span>:0    <span class="token boolean">false</span>   <span class="token boolean">true</span>
<span class="token number">13</span>     job-timeout            system         <span class="token number">9</span>      TIMED_ <span class="token number">0</span>       <span class="token number">0</span>:0    <span class="token boolean">false</span>   <span class="token boolean">true</span>
<span class="token number">1</span>      main                   main           <span class="token number">5</span>      TIMED_ <span class="token number">0</span>       <span class="token number">0</span>:0    <span class="token boolean">false</span>   <span class="token boolean">false</span>
<span class="token number">14</span>     nioEventLoopGroup-2-1  system         <span class="token number">10</span>     RUNNAB <span class="token number">0</span>       <span class="token number">0</span>:0    <span class="token boolean">false</span>   <span class="token boolean">false</span>
<span class="token number">18</span>     nioEventLoopGroup-2-2  system         <span class="token number">10</span>     RUNNAB <span class="token number">0</span>       <span class="token number">0</span>:0    <span class="token boolean">false</span>   <span class="token boolean">false</span>
<span class="token number">23</span>     nioEventLoopGroup-2-3  system         <span class="token number">10</span>     RUNNAB <span class="token number">0</span>       <span class="token number">0</span>:0    <span class="token boolean">false</span>   <span class="token boolean">false</span>
<span class="token number">15</span>     nioEventLoopGroup-3-1  system         <span class="token number">10</span>     RUNNAB <span class="token number">0</span>       <span class="token number">0</span>:0    <span class="token boolean">false</span>   <span class="token boolean">false</span>
Memory             used   total max    usage GC
heap               32M    155M  1820M  <span class="token number">1.77</span>% gc.ps_scavenge.count  <span class="token number">4</span>
ps_eden_space      14M    65M   672M   <span class="token number">2.21</span>% gc.ps_scavenge.time<span class="token punctuation">(</span>m <span class="token number">166</span>
ps_survivor_space  4M     5M    5M           s<span class="token punctuation">)</span>
ps_old_gen         12M    85M   1365M  <span class="token number">0.91</span>% gc.ps_marksweep.count <span class="token number">0</span>
nonheap            20M    23M   <span class="token parameter variable">-1</span>           gc.ps_marksweep.time<span class="token punctuation">(</span> <span class="token number">0</span>
code_cache         3M     5M    240M   <span class="token number">1.32</span>% ms<span class="token punctuation">)</span>
Runtime
os.name                Mac OS X
os.version             <span class="token number">10.13</span>.4
java.version           <span class="token number">1.8</span>.0_162
java.home              /Library/Java/JavaVir
                       tualMachines/jdk1.8.0
                       _162.jdk/Contents/Hom
                       e/jre

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="命令-thread" tabindex="-1"><a class="header-anchor" href="#命令-thread" aria-hidden="true">#</a> 命令： thread</h2><ul><li>展示当前java进程详细的线程信息 目前java 部分程序使用的都是springboot,此类程序ID =1，通常是main函数</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ thread <span class="token number">1</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;main(&#39;</span>
    at demo.MathGame.main<span class="token punctuation">(</span>MathGame.java:17<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>命令使用示例</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 展示所有的线程列表</span>
thread
thread-all

<span class="token comment"># cpu使用率采样修改为2s，默认为200ms</span>
thread <span class="token parameter variable">-i</span> <span class="token number">2000</span>

<span class="token comment"># 打印出cpu使用率前5的线程详情，即比较繁忙的线程，cpu使用率采样统计方式请参考官方文档说明</span>
thread <span class="token parameter variable">-n</span> <span class="token number">5</span>

<span class="token comment"># 打印id为5的线程详情</span>
thread <span class="token number">5</span>

<span class="token comment"># 根据状态过滤线程数据（NEW, RUNNABLE, TIMED_WAITING, WAITING, BLOCKED, TERMINATED）</span>
thread <span class="token parameter variable">--state</span> RUNNABLE
thread <span class="token operator">|</span><span class="token function">grep</span> RUNNABLE

<span class="token comment"># 列出持有某个锁，阻塞其他线程最多的线程，排查死锁</span>
thread <span class="token parameter variable">-b</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="命令-jad" tabindex="-1"><a class="header-anchor" href="#命令-jad" aria-hidden="true">#</a> 命令： jad</h2><p>反编译类： demo.Mathgame</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ jad demo.MathGame

ClassLoader:
+-sun.misc.Launcher<span class="token variable">$AppClassLoader</span>@3d4eac69
  +-sun.misc.Launcher<span class="token variable">$ExtClassLoader</span>@66350f69

Location:
/tmp/math-game.jar

/*
 * Decompiled with CFR 0_132.
 */
package demo<span class="token punctuation">;</span>

<span class="token function">import</span> java.io.PrintStream<span class="token punctuation">;</span>
<span class="token function">import</span> java.util.ArrayList<span class="token punctuation">;</span>
<span class="token function">import</span> java.util.Iterator<span class="token punctuation">;</span>
<span class="token function">import</span> java.util.List<span class="token punctuation">;</span>
<span class="token function">import</span> java.util.Random<span class="token punctuation">;</span>
<span class="token function">import</span> java.util.concurrent.TimeUnit<span class="token punctuation">;</span>

public class MathGame <span class="token punctuation">{</span>
    private static Random random <span class="token operator">=</span> new Random<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    private int illegalArgumentCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    public static void main<span class="token punctuation">(</span>String<span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> throws InterruptedException <span class="token punctuation">{</span>
        MathGame game <span class="token operator">=</span> new MathGame<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">do</span> <span class="token punctuation">{</span>
            game.run<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            TimeUnit.<span class="token environment constant">SECONDS</span>.sleep<span class="token punctuation">(</span>1L<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>true<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    public void run<span class="token punctuation">(</span><span class="token punctuation">)</span> throws InterruptedException <span class="token punctuation">{</span>
        try <span class="token punctuation">{</span>
            int number <span class="token operator">=</span> random.nextInt<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            List<span class="token operator">&lt;</span>Integer<span class="token operator">&gt;</span> primeFactors <span class="token operator">=</span> this.primeFactors<span class="token punctuation">(</span>number<span class="token punctuation">)</span><span class="token punctuation">;</span>
            MathGame.print<span class="token punctuation">(</span>number, primeFactors<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        catch <span class="token punctuation">(</span>Exception e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            System.out.println<span class="token punctuation">(</span>String.format<span class="token punctuation">(</span><span class="token string">&quot;illegalArgumentCount:%3d, &quot;</span>, this.illegalArgumentCount<span class="token punctuation">)</span> + e.getMessage<span class="token punctuation">(</span><span class="token punctuation">))</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    public static void print<span class="token punctuation">(</span>int number, List<span class="token operator">&lt;</span>Integer<span class="token operator">&gt;</span> primeFactors<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        StringBuffer sb <span class="token operator">=</span> new StringBuffer<span class="token punctuation">(</span><span class="token string">&quot;&quot;</span> + number + <span class="token string">&quot;=&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Iterator<span class="token operator">&lt;</span>Integer<span class="token operator">&gt;</span> iterator <span class="token operator">=</span> primeFactors.iterator<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>iterator.hasNext<span class="token punctuation">(</span><span class="token punctuation">))</span> <span class="token punctuation">{</span>
            int factor <span class="token operator">=</span> iterator.next<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            sb.append<span class="token punctuation">(</span>factor<span class="token punctuation">)</span>.append<span class="token punctuation">(</span><span class="token string">&#39;*&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>sb.charAt<span class="token punctuation">(</span>sb.length<span class="token punctuation">(</span><span class="token punctuation">)</span> - <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">&#39;*&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            sb.deleteCharAt<span class="token punctuation">(</span>sb.length<span class="token punctuation">(</span><span class="token punctuation">)</span> - <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        System.out.println<span class="token punctuation">(</span>sb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    public List<span class="token operator">&lt;</span>Integer<span class="token operator">&gt;</span> primeFactors<span class="token punctuation">(</span>int number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>number <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            ++this.illegalArgumentCount<span class="token punctuation">;</span>
            throw new IllegalArgumentException<span class="token punctuation">(</span><span class="token string">&quot;number is: &quot;</span> + number + <span class="token string">&quot;, need &gt;= 2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        ArrayList<span class="token operator">&lt;</span>Integer<span class="token operator">&gt;</span> result <span class="token operator">=</span> new ArrayList<span class="token operator">&lt;</span>Integer<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        int i <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> number<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>number % i <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result.add<span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                number /<span class="token operator">=</span> i<span class="token punctuation">;</span>
                i <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
                <span class="token builtin class-name">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            ++i<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token builtin class-name">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
Affect<span class="token punctuation">(</span>row-cnt:1<span class="token punctuation">)</span> cost <span class="token keyword">in</span> <span class="token number">970</span> ms.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="watch" tabindex="-1"><a class="header-anchor" href="#watch" aria-hidden="true">#</a> watch</h2><ul><li>观测某方法执行的详情 通过watch命令来查看demo.MathGame#primeFactors函数的返回值：</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">watch</span> demo.MathGame primeFactors returnObj
Press Ctrl+C to abort.
Affect<span class="token punctuation">(</span>class-cnt:1 , method-cnt:1<span class="token punctuation">)</span> cost <span class="token keyword">in</span> <span class="token number">107</span> ms.
<span class="token assign-left variable">ts</span><span class="token operator">=</span><span class="token number">2023</span>-09-28 <span class="token number">22</span>:15:24<span class="token punctuation">;</span> <span class="token punctuation">[</span>cost<span class="token operator">=</span><span class="token number">1</span>.715367ms<span class="token punctuation">]</span> <span class="token assign-left variable">result</span><span class="token operator">=</span>null
<span class="token assign-left variable">ts</span><span class="token operator">=</span><span class="token number">2023</span>-09-28 <span class="token number">22</span>:15:24<span class="token punctuation">;</span> <span class="token punctuation">[</span>cost<span class="token operator">=</span><span class="token number">19</span>.012416ms<span class="token punctuation">]</span> <span class="token assign-left variable">result</span><span class="token operator">=</span>@ArrayList<span class="token punctuation">[</span>
    @Integer<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span>,
    @Integer<span class="token punctuation">[</span><span class="token number">47</span><span class="token punctuation">]</span>,
    @Integer<span class="token punctuation">[</span><span class="token number">2675531</span><span class="token punctuation">]</span>,
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 观测某方法的执行详情，支持ognl表达式输出观测结果</span>
<span class="token function">watch</span> *VipUserController helloUser <span class="token string">&#39;{clazz,method,isReturn,isThrow,params,target,returnObj,throwExp}&#39;</span>
:<span class="token operator">&lt;&lt;</span><span class="token operator">!</span>
常用表达式
target <span class="token builtin class-name">:</span> the object
clazz <span class="token builtin class-name">:</span> the object<span class="token string">&#39;s class
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
watch *VipUserController helloUser &#39;</span><span class="token punctuation">{</span>throwExp<span class="token punctuation">}</span><span class="token string">&#39; -e -x 2

# 观测方法执行时间大于200ms的信息
watch *VipUserController helloUser &#39;</span><span class="token comment">#cost&gt;100&#39;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="monitor" tabindex="-1"><a class="header-anchor" href="#monitor" aria-hidden="true">#</a> monitor</h2><ul><li><p>统计方法一段周期内的执行情况</p></li><li><p>命令</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 统计某个类某个方法的执行信息，默认60s为统计周期</span>
monitor top.learningwang.arthasdemo.controller.VipUserController helloUser

<span class="token comment"># 统计某个类下某个方法的执行信息，10s为统计周期，统计3次</span>
monitor top.learningwang.arthasdemo.controller.VipUserController helloUser <span class="token parameter variable">-c</span> <span class="token number">10</span> <span class="token parameter variable">-n</span> <span class="token number">3</span>

<span class="token comment"># 统计某个类下某个方法的执行信息，限定参数值，5s为统计周期</span>
monitor top.learningwang.arthasdemo.controller.VipUserController helloUser <span class="token string">&quot;params[0].length&lt;5&quot;</span> <span class="token parameter variable">-c</span> <span class="token number">5</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="退出-arthas" tabindex="-1"><a class="header-anchor" href="#退出-arthas" aria-hidden="true">#</a> 退出 arthas</h2><ul><li><p>quit 退出当前 Arthas 客户端，其他 Arthas 客户端不受影响</p></li><li><p>exit 等同于quit</p></li><li><p>stop 关闭 Arthas 服务端，所有 Arthas 客户端全部退出</p></li></ul><p>如果只是退出当前的连接，可以用quit或者exit命令。Attach 到目标进程上的 arthas 还会继续运行，端口会保持开放，下次连接时可以直接连接上。</p><p>如果想完全退出 arthas，可以执行stop命令。</p>`,43),l=[p];function i(o,c){return s(),a("div",null,l)}const d=n(t,[["render",i],["__file","08001_ArthasOne.html.vue"]]);export{d as default};
