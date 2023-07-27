const e=JSON.parse('{"key":"v-87f6f4a2","path":"/moyu/redis/02_redis.html","title":"讲讲 Redis 缓存更新一致性","lang":"zh-CN","frontmatter":{"title":"讲讲 Redis 缓存更新一致性","subtitle":"讲讲 Redis 缓存更新一致性","category":["redis"],"tag":["摸鱼"],"order":2,"description":"自己使用的场景 通常我们是先从缓存中读取，如果有，返回；如果没有，则从数据库中读取，返回写入缓存，并返回。 代码如下： public String getUserName(Integer userId){ // 因为key 通常会加一些前缀，作为指定作用的key; 这里id实际是userId. String userIdkey = \\"redis:userId:\\"+userId; String userName = redis.get(userIdkey); if(StringUtils.isNotEmppty()){ return userName; } userName = userMapper.getOne(1); redis.set(userIdkey,userName); return userName; }","head":[["meta",{"property":"og:url","content":"https://merryldt.github.io/moyu/redis/02_redis.html"}],["meta",{"property":"og:site_name","content":"魔力社区"}],["meta",{"property":"og:title","content":"讲讲 Redis 缓存更新一致性"}],["meta",{"property":"og:description","content":"自己使用的场景 通常我们是先从缓存中读取，如果有，返回；如果没有，则从数据库中读取，返回写入缓存，并返回。 代码如下： public String getUserName(Integer userId){ // 因为key 通常会加一些前缀，作为指定作用的key; 这里id实际是userId. String userIdkey = \\"redis:userId:\\"+userId; String userName = redis.get(userIdkey); if(StringUtils.isNotEmppty()){ return userName; } userName = userMapper.getOne(1); redis.set(userIdkey,userName); return userName; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-27T17:43:37.000Z"}],["meta",{"property":"article:author","content":"坎布里奇"}],["meta",{"property":"article:tag","content":"摸鱼"}],["meta",{"property":"article:modified_time","content":"2023-07-27T17:43:37.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"讲讲 Redis 缓存更新一致性\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-07-27T17:43:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"坎布里奇\\",\\"url\\":\\"https://merryldt.github.io/\\"}]}"]]},"headers":[{"level":2,"title":"自己使用的场景","slug":"自己使用的场景","link":"#自己使用的场景","children":[]},{"level":2,"title":"在使用redis作为缓存时,写操作","slug":"在使用redis作为缓存时-写操作","link":"#在使用redis作为缓存时-写操作","children":[]},{"level":2,"title":"旧key 是删除还是更新？缓存和数据库的更新顺序？","slug":"旧key-是删除还是更新-缓存和数据库的更新顺序","link":"#旧key-是删除还是更新-缓存和数据库的更新顺序","children":[]},{"level":2,"title":"四大策略","slug":"四大策略","link":"#四大策略","children":[{"level":3,"title":"1. 先删除缓存，再更新数据库","slug":"_1-先删除缓存-再更新数据库","link":"#_1-先删除缓存-再更新数据库","children":[]},{"level":3,"title":"2. 先更新数据库，再删除缓存","slug":"_2-先更新数据库-再删除缓存","link":"#_2-先更新数据库-再删除缓存","children":[]},{"level":3,"title":"3. 先更新缓存，再更新数据库","slug":"_3-先更新缓存-再更新数据库","link":"#_3-先更新缓存-再更新数据库","children":[]},{"level":3,"title":"4. 先更新数据库，再更新缓存","slug":"_4-先更新数据库-再更新缓存","link":"#_4-先更新数据库-再更新缓存","children":[]}]},{"level":2,"title":"对于旧key,目前已知的两种策略","slug":"对于旧key-目前已知的两种策略","link":"#对于旧key-目前已知的两种策略","children":[]},{"level":2,"title":"更新缓存和数据库的前后顺序，也有两种","slug":"更新缓存和数据库的前后顺序-也有两种","link":"#更新缓存和数据库的前后顺序-也有两种","children":[]},{"level":2,"title":"总结,设计需要考虑的问题","slug":"总结-设计需要考虑的问题","link":"#总结-设计需要考虑的问题","children":[{"level":3,"title":"对系统吞吐量的影响：","slug":"对系统吞吐量的影响","link":"#对系统吞吐量的影响","children":[]},{"level":3,"title":"并发安全性：","slug":"并发安全性","link":"#并发安全性","children":[]},{"level":3,"title":"更新失败的影响：","slug":"更新失败的影响","link":"#更新失败的影响","children":[]},{"level":3,"title":"检测和修复故障的难度:","slug":"检测和修复故障的难度","link":"#检测和修复故障的难度","children":[]}]},{"level":2,"title":"如何解决以上并发导致的问题？","slug":"如何解决以上并发导致的问题","link":"#如何解决以上并发导致的问题","children":[{"level":3,"title":"1. 使用 CAS","slug":"_1-使用-cas","link":"#_1-使用-cas","children":[]},{"level":3,"title":"2. 使用分布式锁","slug":"_2-使用分布式锁","link":"#_2-使用分布式锁","children":[]},{"level":3,"title":"3. 延时双删","slug":"_3-延时双删","link":"#_3-延时双删","children":[]},{"level":3,"title":"4. 异步更新","slug":"_4-异步更新","link":"#_4-异步更新","children":[]}]},{"level":2,"title":"实际场景中，你采用的是何种方式？","slug":"实际场景中-你采用的是何种方式","link":"#实际场景中-你采用的是何种方式","children":[]},{"level":2,"title":"这里可以延伸的问题？","slug":"这里可以延伸的问题","link":"#这里可以延伸的问题","children":[]}],"git":{"createdTime":1690468818000,"updatedTime":1690479817000,"contributors":[{"name":"kansuper","email":"17835059864@163.com","commits":3}]},"readingTime":{"minutes":6.09,"words":1827},"filePathRelative":"moyu/redis/02_redis.md","localizedDate":"2023年7月27日","excerpt":"<h2> 自己使用的场景</h2>\\n<p>通常我们是先从缓存中读取，如果有，返回；如果没有，则从数据库中读取，返回写入缓存，并返回。<br>\\n代码如下：</p>\\n<div class=\\"language-text line-numbers-mode\\" data-ext=\\"text\\"><pre class=\\"language-text\\"><code>public String getUserName(Integer userId){\\n   // 因为key 通常会加一些前缀，作为指定作用的key; 这里id实际是userId.\\n   String  userIdkey = \\"redis:userId:\\"+userId;\\n   String  userName = redis.get(userIdkey);\\n   if(StringUtils.isNotEmppty()){\\n      return userName;\\n   }\\n   userName = userMapper.getOne(1);\\n   redis.set(userIdkey,userName);\\n   return userName;\\n}  \\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
