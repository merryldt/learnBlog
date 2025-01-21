import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,b as t}from"./app-dc6a447a.js";const e="/assets/image-3-eb03dfc8.png",p="/assets/image-4-efe1a84d.png",o="/assets/image-5-87c69e58.png",c="/assets/image-6-f7b4dd0a.png",i="/assets/image-7-5d4e644e.png",l="/assets/image-8-7c56c640.png",u={},r=t(`<h2 id="问题-随着时间的增长-接口越来越慢-从1s的响应延长到10s-以上" tabindex="-1"><a class="header-anchor" href="#问题-随着时间的增长-接口越来越慢-从1s的响应延长到10s-以上" aria-hidden="true">#</a> 问题: 随着时间的增长，接口越来越慢,从1s的响应延长到10s 以上</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span>path<span class="token operator">=</span><span class="token string">&quot;/saveAnswer&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">saveAnswer</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">AnswerInputo</span> answerInputo<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;start save&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    answerService<span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span>answerInputo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    answerService<span class="token punctuation">.</span><span class="token function">saveRecord</span><span class="token punctuation">(</span>answerInputo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    answerService<span class="token punctuation">.</span><span class="token function">createOrder</span><span class="token punctuation">(</span>answerInputo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    answerService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>answerInputo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;end save&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string">&quot;SUCCESS&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="最初的想法是-添加日志-重新发版本" tabindex="-1"><a class="header-anchor" href="#最初的想法是-添加日志-重新发版本" aria-hidden="true">#</a> 最初的想法是：添加日志,重新发版本</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span>path<span class="token operator">=</span><span class="token string">&quot;/saveAnswer&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">saveAnswer</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">AnswerInputo</span> answerInputo<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;start save&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    answerService<span class="token punctuation">.</span><span class="token function">check</span><span class="token punctuation">(</span>answerInputo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;start-01:&quot;</span><span class="token punctuation">,</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    answerService<span class="token punctuation">.</span><span class="token function">saveRecord</span><span class="token punctuation">(</span>answerInputo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;start-02:&quot;</span><span class="token punctuation">,</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    answerService<span class="token punctuation">.</span><span class="token function">createOrder</span><span class="token punctuation">(</span>answerInputo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;start-03:&quot;</span><span class="token punctuation">,</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    answerService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>answerInputo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;start-01:&quot;</span><span class="token punctuation">,</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;end save&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token string">&quot;SUCCESS&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="这样的问题" tabindex="-1"><a class="header-anchor" href="#这样的问题" aria-hidden="true">#</a> 这样的问题：</h3><ol><li>添加的无用日志太多；</li><li>容易漏,导致关键的位置没有分析到；</li><li>因为此类问题大部分都是生产发现,线上如果调试,就需要不断发布,影响用户使用；</li></ol><h2 id="使用-arthas" tabindex="-1"><a class="header-anchor" href="#使用-arthas" aria-hidden="true">#</a> 使用 Arthas</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>java <span class="token operator">-</span>jar arthas<span class="token operator">-</span>boot<span class="token punctuation">.</span>jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>根据提示，选择对应的java应用。 <img src="`+e+`" alt="Alt text" loading="lazy"></p><h3 id="trace-命令指定追踪的类和方法" tabindex="-1"><a class="header-anchor" href="#trace-命令指定追踪的类和方法" aria-hidden="true">#</a> trace 命令指定追踪的类和方法</h3><p>输入要追踪的类和方法。输入格式为：trace {全限定类名} {方法名}：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>trace com<span class="token punctuation">.</span>*<span class="token operator">*</span><span class="token punctuation">.</span>*<span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">.</span>controller<span class="token punctuation">.</span>StuQuestionAnswerController save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="定位耗时部分" tabindex="-1"><a class="header-anchor" href="#定位耗时部分" aria-hidden="true">#</a> 定位耗时部分</h4><ol><li>访问下controller中的callServices这个方法。这个时候arthas控制台有如下输出：</li></ol><p><img src="`+p+`" alt="Alt text" loading="lazy"> 定位到service;</p><ol start="2"><li>trace 命令service的方法。</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>trace com<span class="token punctuation">.</span>*<span class="token operator">*</span><span class="token punctuation">.</span>*<span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">.</span>service<span class="token punctuation">.</span>IStuQuestionAnswerService save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+o+'" alt="Alt text" loading="lazy"><img src="'+c+`" alt="Alt text" loading="lazy"></p><p>一目了然，可以看到是getTeamNumByTeamId() 方法耗时占比37%以上。</p><h3 id="trace-结合ognl表达式-命令指定追踪的类和方法" tabindex="-1"><a class="header-anchor" href="#trace-结合ognl表达式-命令指定追踪的类和方法" aria-hidden="true">#</a> trace 结合OGNL表达式 命令指定追踪的类和方法</h3><p>OGNL表达式，支持各种复杂的嵌套结构及比较逻辑.</p><h4 id="根据参数筛选-入参第一个参数等于-dd" tabindex="-1"><a class="header-anchor" href="#根据参数筛选-入参第一个参数等于-dd" aria-hidden="true">#</a> 根据参数筛选： 入参第一个参数等于 dd</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>trace com<span class="token punctuation">.</span>*<span class="token operator">*</span><span class="token punctuation">.</span>*<span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">.</span>controller<span class="token punctuation">.</span>StuQuestionAnswerController save <span class="token string">&quot;params[0].equals(\\&quot;dd\\&quot;)&quot;</span> &quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="根据运行时间筛选-耗时大于800ms" tabindex="-1"><a class="header-anchor" href="#根据运行时间筛选-耗时大于800ms" aria-hidden="true">#</a> 根据运行时间筛选：耗时大于800ms</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>trace com<span class="token punctuation">.</span>*<span class="token operator">*</span><span class="token punctuation">.</span>*<span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">.</span>controller<span class="token punctuation">.</span>StuQuestionAnswerController save <span class="token string">&quot;#cost &gt; 800&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="arthas-采集火焰图" tabindex="-1"><a class="header-anchor" href="#arthas-采集火焰图" aria-hidden="true">#</a> arthas 采集火焰图</h2><h3 id="开始采集" tabindex="-1"><a class="header-anchor" href="#开始采集" aria-hidden="true">#</a> 开始采集</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> profiler start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看采集的样本数量" tabindex="-1"><a class="header-anchor" href="#查看采集的样本数量" aria-hidden="true">#</a> 查看采集的样本数量</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> profiler getSamples
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="停止采样" tabindex="-1"><a class="header-anchor" href="#停止采样" aria-hidden="true">#</a> 停止采样</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> profiler stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="`+i+'" alt="Alt text" tabindex="0" loading="lazy"><figcaption>Alt text</figcaption></figure><h3 id="结果" tabindex="-1"><a class="header-anchor" href="#结果" aria-hidden="true">#</a> 结果</h3><figure><img src="'+l+'" alt="Alt text" tabindex="0" loading="lazy"><figcaption>Alt text</figcaption></figure><p>【<strong>纵轴(Y轴)</strong>】表示的是方法调用的调用栈信息，即从最外层方法到最内层方法的调用信息。</p><p>【<strong>横轴(X轴)</strong>】表示的是方法调用的持续时间，即方法在执行过程中所占用的时间长度。</p><p>在一个火焰图中，越靠近下面的函数在x轴上越长是正常的，而越往上的函数就应该越短。所以，火焰图也像是一个个山峰。那么，如果火焰图出现较宽的峰顶，那就往往是性能瓶颈。</p>',38),d=[r];function k(v,m){return a(),s("div",null,d)}const b=n(u,[["render",k],["__file","011_PracticeTow.html.vue"]]);export{b as default};