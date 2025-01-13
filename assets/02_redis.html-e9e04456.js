import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as a,b as n}from"./app-bd24307c.js";const s="/assets/image-6890cad8.png",l={},i=n(`<h2 id="想想自己使用的场景" tabindex="-1"><a class="header-anchor" href="#想想自己使用的场景" aria-hidden="true">#</a> 想想自己使用的场景</h2><p>通常我们是先从缓存中读取,如果有,返回;如果没有,则从数据库中读取，写入缓存,设置缓存时间,并返回。<br> 代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getUserName</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> userId<span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token comment">// 因为key 通常会加一些前缀，作为指定作用的key; 这里id实际是userId.</span>
   <span class="token class-name">String</span>  userIdkey <span class="token operator">=</span> <span class="token string">&quot;redis:userId:&quot;</span><span class="token operator">+</span>userId<span class="token punctuation">;</span>
   <span class="token class-name">String</span>  userName <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>userIdkey<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">int</span> cacheTimeSin  <span class="token operator">=</span> <span class="token number">60</span><span class="token punctuation">;</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isNotEmppty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> userName<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   userName <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">getOne</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   redis<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>userIdkey<span class="token punctuation">,</span>userName<span class="token punctuation">,</span>cacheTimeSin<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">return</span> userName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写到这里是不是发现还会有一个问题？就是如果 userName 在其他地方还会更新呢？ 所以一定还有一段：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">updateUserName</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> userId<span class="token punctuation">,</span><span class="token class-name">String</span> userName<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// </span>
  <span class="token class-name">String</span>  userIdkey <span class="token operator">=</span> <span class="token string">&quot;redis:userId:&quot;</span><span class="token operator">+</span>userId<span class="token punctuation">;</span>
  <span class="token comment">// 删除缓存</span>
  redis<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>userIdkey<span class="token punctuation">)</span><span class="token punctuation">;</span>
  userMapper<span class="token punctuation">.</span><span class="token function">updateUserNameById</span><span class="token punctuation">(</span>userId<span class="token punctuation">,</span>userName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>想一想，如果这两个操作是两个线程操作？并且交叉操作呢？会发生什么问题？</p><h2 id="想想如何保证缓存和数据库一致性的" tabindex="-1"><a class="header-anchor" href="#想想如何保证缓存和数据库一致性的" aria-hidden="true">#</a> 想想如何保证缓存和数据库一致性的？</h2><ol><li>对于旧key的处理</li><li>更新缓存和数据库的前后顺序</li><li>想想，自己目前使用的方式是什么？</li><li>想想，还有什么方式？以及对比自己使用的，优劣对比？</li></ol><h2 id="目前已知的四大组合策略" tabindex="-1"><a class="header-anchor" href="#目前已知的四大组合策略" aria-hidden="true">#</a> 目前已知的四大组合策略</h2><h3 id="_1-先删除缓存-再更新数据库" tabindex="-1"><a class="header-anchor" href="#_1-先删除缓存-再更新数据库" aria-hidden="true">#</a> 1. 先删除缓存，再更新数据库</h3><ol><li>并发问题:</li></ol><blockquote><blockquote><p>写： 线程张三<br> 读： 线程李四</p></blockquote></blockquote><table><thead><tr><th style="text-align:left;">顺序</th><th style="text-align:center;">线程:张三</th><th style="text-align:right;">线程:李四</th><th style="text-align:right;">数据库</th><th style="text-align:right;">缓存</th></tr></thead><tbody><tr><td style="text-align:left;">1</td><td style="text-align:center;">删除缓存</td><td style="text-align:right;"></td><td style="text-align:right;">v1</td><td style="text-align:right;"></td></tr><tr><td style="text-align:left;">2</td><td style="text-align:center;"></td><td style="text-align:right;">缓存失效</td><td style="text-align:right;">v1</td><td style="text-align:right;"></td></tr><tr><td style="text-align:left;">3</td><td style="text-align:center;"></td><td style="text-align:right;">从数据库读取数据为v1</td><td style="text-align:right;">v1</td><td style="text-align:right;"></td></tr><tr><td style="text-align:left;">4</td><td style="text-align:center;">更新数据库为v2</td><td style="text-align:right;"></td><td style="text-align:right;">v2</td><td style="text-align:right;"></td></tr><tr><td style="text-align:left;">5</td><td style="text-align:center;"></td><td style="text-align:right;">将v1写入缓存</td><td style="text-align:right;">v2</td><td style="text-align:right;">v1</td></tr></tbody></table><h3 id="_2-先更新数据库-再删除缓存" tabindex="-1"><a class="header-anchor" href="#_2-先更新数据库-再删除缓存" aria-hidden="true">#</a> 2. 先更新数据库，再删除缓存</h3><ol><li>若数据库更新成功，删除缓存操作失败，则此后读到的都是缓存中过期的数据，造成不一致问题。</li><li>并发问题:</li></ol><blockquote><blockquote><p>读： 线程张三<br> 写： 线程李四</p></blockquote></blockquote><table><thead><tr><th style="text-align:left;">顺序</th><th style="text-align:center;">线程:张三</th><th style="text-align:right;">线程:李四</th><th style="text-align:right;">数据库</th><th style="text-align:right;">缓存</th></tr></thead><tbody><tr><td style="text-align:left;">1</td><td style="text-align:center;">缓存失效</td><td style="text-align:right;"></td><td style="text-align:right;">v1</td><td style="text-align:right;"></td></tr><tr><td style="text-align:left;">2</td><td style="text-align:center;">从数据库读取数据为v1</td><td style="text-align:right;"></td><td style="text-align:right;">v1</td><td style="text-align:right;"></td></tr><tr><td style="text-align:left;">3</td><td style="text-align:center;"></td><td style="text-align:right;">更新数据库</td><td style="text-align:right;">v2</td><td style="text-align:right;"></td></tr><tr><td style="text-align:left;">4</td><td style="text-align:center;"></td><td style="text-align:right;">删除缓存</td><td style="text-align:right;">v2</td><td style="text-align:right;"></td></tr><tr><td style="text-align:left;">5</td><td style="text-align:center;">写入缓存</td><td style="text-align:right;"></td><td style="text-align:right;">v2</td><td style="text-align:right;">v1</td></tr></tbody></table><h3 id="_3-先更新缓存-再更新数据库" tabindex="-1"><a class="header-anchor" href="#_3-先更新缓存-再更新数据库" aria-hidden="true">#</a> 3. 先更新缓存，再更新数据库</h3><ol><li>缓存更新成功，数据库有更新失败的风险；导致最新的数据未持久化，风险很高。</li><li>并发问题。</li></ol><blockquote><blockquote><p>写： 线程张三<br> 写： 线程李四</p></blockquote></blockquote><table><thead><tr><th style="text-align:left;">顺序</th><th style="text-align:center;">线程:张三</th><th style="text-align:right;">线程:李四</th><th style="text-align:right;">数据库</th><th style="text-align:right;">缓存</th></tr></thead><tbody><tr><td style="text-align:left;">1</td><td style="text-align:center;"></td><td style="text-align:right;"></td><td style="text-align:right;">v0</td><td style="text-align:right;">v0</td></tr><tr><td style="text-align:left;">2</td><td style="text-align:center;">更新缓存为v1</td><td style="text-align:right;"></td><td style="text-align:right;">v0</td><td style="text-align:right;">v1</td></tr><tr><td style="text-align:left;">3</td><td style="text-align:center;"></td><td style="text-align:right;">更新缓存为v2</td><td style="text-align:right;">v0</td><td style="text-align:right;">v2</td></tr><tr><td style="text-align:left;">4</td><td style="text-align:center;"></td><td style="text-align:right;">更新数据库为v2</td><td style="text-align:right;">v2</td><td style="text-align:right;">v2</td></tr><tr><td style="text-align:left;">5</td><td style="text-align:center;">更新数据库为v1</td><td style="text-align:right;"></td><td style="text-align:right;">v1</td><td style="text-align:right;">v2</td></tr></tbody></table><h3 id="_4-先更新数据库-再更新缓存" tabindex="-1"><a class="header-anchor" href="#_4-先更新数据库-再更新缓存" aria-hidden="true">#</a> 4. 先更新数据库，再更新缓存</h3><ol><li>同删除缓存策略一样，若数据库更新成功缓存更新失败则会造成数据不一致问题。</li><li>并发问题。</li></ol><blockquote><blockquote><p>写： 线程张三<br> 写： 线程李四</p></blockquote></blockquote><table><thead><tr><th style="text-align:left;">顺序</th><th style="text-align:center;">线程:张三</th><th style="text-align:right;">线程:李四</th><th style="text-align:right;">数据库</th><th style="text-align:right;">缓存</th></tr></thead><tbody><tr><td style="text-align:left;">1</td><td style="text-align:center;"></td><td style="text-align:right;"></td><td style="text-align:right;">v0</td><td style="text-align:right;">v0</td></tr><tr><td style="text-align:left;">2</td><td style="text-align:center;">更新缓存为v1</td><td style="text-align:right;"></td><td style="text-align:right;">v1</td><td style="text-align:right;">v0</td></tr><tr><td style="text-align:left;">3</td><td style="text-align:center;"></td><td style="text-align:right;">更新缓存为v2</td><td style="text-align:right;">v2</td><td style="text-align:right;">v0</td></tr><tr><td style="text-align:left;">4</td><td style="text-align:center;"></td><td style="text-align:right;">更新数据库为v2</td><td style="text-align:right;">v2</td><td style="text-align:right;">v2</td></tr><tr><td style="text-align:left;">5</td><td style="text-align:center;">更新数据库为v1</td><td style="text-align:right;"></td><td style="text-align:right;">v2</td><td style="text-align:right;">v1</td></tr></tbody></table><h3 id="分析四大策略" tabindex="-1"><a class="header-anchor" href="#分析四大策略" aria-hidden="true">#</a> 分析四大策略</h3><ul><li>只有第一种只有一个问题，就是并发问题。显然是最优的选择</li></ul><h4 id="_1-对于旧key-目前已知的两种策略" tabindex="-1"><a class="header-anchor" href="#_1-对于旧key-目前已知的两种策略" aria-hidden="true">#</a> 1. 对于旧key,目前已知的两种策略</h4><ol><li>删除失效缓存: 读取时会因为未命中缓存而从数据库中读取新的数据并更新到缓存中</li><li>更新缓存: 直接将新的数据写入缓存覆盖过期数据</li></ol><h4 id="_2-更新缓存和数据库的前后顺序-也有两种" tabindex="-1"><a class="header-anchor" href="#_2-更新缓存和数据库的前后顺序-也有两种" aria-hidden="true">#</a> 2. 更新缓存和数据库的前后顺序，也有两种</h4><ol><li>先数据库后缓存</li><li>先缓存后数据库</li></ol><h2 id="总结-设计需要考虑的问题" tabindex="-1"><a class="header-anchor" href="#总结-设计需要考虑的问题" aria-hidden="true">#</a> 总结,设计需要考虑的问题</h2><p>根据实际场景选择一款就行，折中；</p><h3 id="对系统吞吐量的影响" tabindex="-1"><a class="header-anchor" href="#对系统吞吐量的影响" aria-hidden="true">#</a> 对系统吞吐量的影响：</h3><p>比如更新缓存策略产生的数据库负载小于删除缓存策略的负载</p><h3 id="并发安全性" tabindex="-1"><a class="header-anchor" href="#并发安全性" aria-hidden="true">#</a> 并发安全性：</h3><p>并发读写时某些异常操作顺序可能造成数据不一致，如缓存中长期保存过时数据</p><h3 id="更新失败的影响" tabindex="-1"><a class="header-anchor" href="#更新失败的影响" aria-hidden="true">#</a> 更新失败的影响：</h3><p>若某个操作失败，如何对业务影响降到最小</p><h3 id="检测和修复故障的难度" tabindex="-1"><a class="header-anchor" href="#检测和修复故障的难度" aria-hidden="true">#</a> 检测和修复故障的难度:</h3><p>操作失败导致的错误会在日志留下详细的记录容易检测和修复。并发问题导致的数据错误没有明显的痕迹难以发现，且在流量高峰期更容易产生并发错误产生的业务风险较大。</p><h2 id="如何解决以上并发导致的问题" tabindex="-1"><a class="header-anchor" href="#如何解决以上并发导致的问题" aria-hidden="true">#</a> 如何解决以上并发导致的问题？</h2><h3 id="_1-使用-cas" tabindex="-1"><a class="header-anchor" href="#_1-使用-cas" aria-hidden="true">#</a> 1. 使用 CAS</h3><p>CAS (Check-And-Set 或 Compare-And-Swap)是一种常见的保证并发安全的手段。CAS 当且仅当客户端最后一次取值后该 key 没有被其他客户端修改的情况下，才允许当前客户端将新值写入。</p><ul><li>CAS 是一种乐观锁</li></ul><p>假如缓存初始值是v0,更新缓存的时候，必须要校验值等于v0，才去更新，否则放弃。</p><ul><li>目前已知的redis 提供CAS命令的中间件和redis官方支持的。</li></ul><blockquote><blockquote><ol><li>比如阿里的 Tair 以及腾讯的 Tendis。</li><li>Redis 官方提供了 Watch + 事务的方法来支持 CAS, 或者使用 redis 中 lua 脚本原子性执行的特点来实现 CAS。(比较复杂)</li></ol></blockquote></blockquote><h3 id="_2-使用分布式锁" tabindex="-1"><a class="header-anchor" href="#_2-使用分布式锁" aria-hidden="true">#</a> 2. 使用分布式锁</h3><ul><li>分布式锁是一种悲观锁</li></ul><blockquote><blockquote><ol><li>线程张三 拿到锁</li><li>线程张三操作</li><li>线程张三 释放锁</li><li>线程李四 拿到锁</li><li>线程李四操作</li><li>线程李四 释放锁</li></ol></blockquote></blockquote><p>可以解决并发问题，只是成本可能略高。</p><h3 id="_3-延时双删" tabindex="-1"><a class="header-anchor" href="#_3-延时双删" aria-hidden="true">#</a> 3. 延时双删</h3><ul><li>问题是: 读线程的写入缓存操作，发生于写线程的数据库数据更新之后。会发生缓存和数据库数据不一致的问题。</li><li>解决： 因为是读线程最后写入缓存，此时再清除缓存是不是就可以解决这个问题？<br> 延时双删就是写线程等待一段时间“确保”读线程都结束后再次删除缓存，以此清除可能的错误缓存数据。</li><li>需要注意的是: 因为无法确保读线程何时结束,所以仍有存在数据不一致的可能。</li></ul><p>但是延时双删实现成本很低而且极大的减少了并发问题出现的概率，不失为一种简单实用的手段。</p><p>结果如下：</p><table><thead><tr><th style="text-align:left;">顺序</th><th style="text-align:center;">线程:张三</th><th style="text-align:right;">线程:李四</th><th style="text-align:right;">数据库</th><th style="text-align:right;">缓存</th></tr></thead><tbody><tr><td style="text-align:left;">1</td><td style="text-align:center;">删除缓存</td><td style="text-align:right;"></td><td style="text-align:right;">v1</td><td style="text-align:right;"></td></tr><tr><td style="text-align:left;">2</td><td style="text-align:center;"></td><td style="text-align:right;">缓存失效</td><td style="text-align:right;">v1</td><td style="text-align:right;"></td></tr><tr><td style="text-align:left;">3</td><td style="text-align:center;"></td><td style="text-align:right;">从数据库读取数据为v1</td><td style="text-align:right;">v1</td><td style="text-align:right;"></td></tr><tr><td style="text-align:left;">4</td><td style="text-align:center;">更新数据库为v2</td><td style="text-align:right;"></td><td style="text-align:right;">v2</td><td style="text-align:right;"></td></tr><tr><td style="text-align:left;">5</td><td style="text-align:center;"></td><td style="text-align:right;">将v1写入缓存</td><td style="text-align:right;">v2</td><td style="text-align:right;">v1</td></tr><tr><td style="text-align:left;">6</td><td style="text-align:center;">延时一段时间,删除缓存</td><td style="text-align:right;"></td><td style="text-align:right;">v2</td><td style="text-align:right;"></td></tr></tbody></table><h3 id="_4-异步更新" tabindex="-1"><a class="header-anchor" href="#_4-异步更新" aria-hidden="true">#</a> 4. 异步更新</h3><p>阿里开源了 MySQL 数据库binlog的增量订阅和消费组件 - canal。canal 模拟从库获得主库的 binlog 更新，然后将更新数据写入 MQ 或直接进行消费。<br> 我们可以让API服务器只负责写入数据库，另一个线程订阅数据库 binlog 增量进行缓存更新。<br> 因为 binlog 是有序的，因此可以避免两个写线程竞争。但我们仍然需要解决读写线程竞争的问题:</p><figure><img src="`+s+'" alt="Alt text" tabindex="0" loading="lazy"><figcaption>Alt text</figcaption></figure><h2 id="实际场景中-你采用的是何种方式" tabindex="-1"><a class="header-anchor" href="#实际场景中-你采用的是何种方式" aria-hidden="true">#</a> 实际场景中，你采用的是何种方式？</h2><h2 id="这里可以延伸的问题" tabindex="-1"><a class="header-anchor" href="#这里可以延伸的问题" aria-hidden="true">#</a> 这里可以延伸的问题？</h2><ol><li>如果使用的分布式锁，用的哪种？了解其原理不？</li><li>如果采用先删除缓存/缓存失效？导致大量请求到数据库？</li></ol>',63),d=[i];function r(c,o){return e(),a("div",null,d)}const g=t(l,[["render",r],["__file","02_redis.html.vue"]]);export{g as default};