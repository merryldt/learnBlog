import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as e,b as n}from"./app-bebe8669.js";const l={},r=n(`<h2 id="修改日志级别" tabindex="-1"><a class="header-anchor" href="#修改日志级别" aria-hidden="true">#</a> 修改日志级别</h2><ul><li>修改指定类的日志级别</li><li>修改全局日志级别</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查找到具体的类信息</span>
sc <span class="token parameter variable">-d</span> *VipUserController

<span class="token comment"># 使用ognl表达式查看日志属性的信息,判断日志级别</span>
ognl <span class="token parameter variable">-c</span> classLoaderHash <span class="token string">&quot;@com.learning.demo.arthas.controller.BaseUserController@logger&quot;</span>

<span class="token comment"># 使用ognl表达式修改日志级别</span>
ognl <span class="token parameter variable">-c</span> classLoaderHash <span class="token string">&quot;@com.learning.demo.arthas.controller.BaseUserController@logger.setLevel(@ch.qos.logback.classic.Level@DEBUG)&quot;</span>

<span class="token comment"># 再次查看日志级别，判断是否修改成功</span>
ognl <span class="token string">&quot;@com.learning.demo.arthas.controller.BaseUserController@logger&quot;</span>

<span class="token comment"># 修改全局日志级别</span>
ognl <span class="token parameter variable">-c</span> classLoaderHash <span class="token string">&#39;@org.slf4j.LoggerFactory@getLogger(&quot;root&quot;).setLevel(@ch.qos.logback.classic.Level@DEBUG)&#39;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="更新代码、热加载" tabindex="-1"><a class="header-anchor" href="#更新代码、热加载" aria-hidden="true">#</a> 更新代码、热加载</h2><ul><li>线上代码出现问题,想不重启,修改几行后，实现热加载。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 反编译源码，并保存到文件中</span>
jad --source-only com.learning.demo.arthas.controller.BaseUserController <span class="token operator">&gt;</span> /data/BaseUserController.java

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编辑源码,修改后：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 根据源码，编译出class文件,并保存到执行目录</span>
<span class="token function">mc</span> <span class="token parameter variable">-c</span> 18b4aac2 /data/BaseUserController.java <span class="token parameter variable">-d</span> /data/

<span class="token comment"># 重新加载编译好的class文件</span>
redefine <span class="token parameter variable">-c</span> 18b4aac2 /com/learning/demo/arthas/controller/BaseUserController.class

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试,访问接口，查看结果</p><h2 id="排查函数调用异常" tabindex="-1"><a class="header-anchor" href="#排查函数调用异常" aria-hidden="true">#</a> 排查函数调用异常</h2><ul><li>观测方法执行异常具体信息，入参、出参等</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 观测方法执行异常时，详细的异常栈信息</span>
<span class="token function">watch</span> *BaseUserController helloUser <span class="token string">&#39;{throwExp}&#39;</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">-x</span> <span class="token number">2</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="arthas-后台异步执行诊断任务" tabindex="-1"><a class="header-anchor" href="#arthas-后台异步执行诊断任务" aria-hidden="true">#</a> arthas 后台异步执行诊断任务</h2><ul><li>执行dashboard、watch、trace等命令时，可将命令执行挂起，将结果输出到文件中，供后续分析，不影响其他命令执行。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 后台执行dashboard，并输出结果到文件中</span>
dashboard <span class="token operator">&gt;&gt;</span> /data/dash.log <span class="token operator">&amp;</span>

<span class="token comment"># 查看当前执行中的后台任务</span>
<span class="token function">jobs</span>

<span class="token comment"># 终止后台任务</span>
<span class="token function">kill</span> jobid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="排查方法执行效率问题" tabindex="-1"><a class="header-anchor" href="#排查方法执行效率问题" aria-hidden="true">#</a> 排查方法执行效率问题</h2><ul><li>线上某个接口执行慢，无法确定是哪一段代码的问题。可根据各方法执行耗时，缩小排查范围。</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 观测某几个方法，执行耗时大于100ms的调用栈</span>
trace <span class="token parameter variable">-E</span> com.test.ClassA<span class="token operator">|</span>org.test.ClassB method1<span class="token operator">|</span>method2<span class="token operator">|</span>method3 <span class="token string">&#39;#cost&gt;100&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,18),i=[r];function o(d,c){return s(),e("div",null,i)}const m=a(l,[["render",o],["__file","08002_ArthasTwo.html.vue"]]);export{m as default};
