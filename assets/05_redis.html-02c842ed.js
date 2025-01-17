import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as s,b as l}from"./app-d515c0a9.js";const d={},r=l('<h2 id="常用的主要数据类型有五种" tabindex="-1"><a class="header-anchor" href="#常用的主要数据类型有五种" aria-hidden="true">#</a> 常用的主要数据类型有五种</h2><ol><li>字符串/REDIS_STRING：适用于 缓存、计数、共享Session、IP统计、分布式锁等。</li><li>列表/REDIS_LIST： 链表、消息队列、栈、有序的对象列表（如朋友圈的点赞顺序列表、评论顺序列表）。</li><li>哈希表/REDIS_HASH： 购物车信息、用户信息、Hash类型的(key, field, value)存储对象等。</li><li>集合/REDIS_SET：无序的唯一的键值结构： 好友、关注、粉丝、感兴趣的人集合等。</li><li>有序集合/REDIS_ZSET：访问排行榜、点赞排行、粉丝数排行等。</li></ol><h2 id="sds-简单动态字符串" tabindex="-1"><a class="header-anchor" href="#sds-简单动态字符串" aria-hidden="true">#</a> SDS 简单动态字符串</h2><p>Redis使用简单动态字符串（simple dynamic string，SDS）来表示字符串，Redis中字符串类型包含的数据结构有：整数（R_INT） 、 字符串（R_RAW）。<br> 我们以字符串为例子，常规的字符串，如 &quot;Brand&quot;，如果要获取他的长度，需要从头开始遍历，直至遇到 \\0 空字符代表结尾,如 C字符串。</p><blockquote><blockquote><p>redis 是用c 语言写的，为啥不用c语言的字符串呢？</p></blockquote></blockquote><h3 id="sds与c语言字符串的区别" tabindex="-1"><a class="header-anchor" href="#sds与c语言字符串的区别" aria-hidden="true">#</a> SDS与c语言字符串的区别：</h3><ol><li><p>获取字符串长度时间复杂度不同 。 C字符串不记录自身长度，获取C字符串长度时必须遍历整个字符串计数得到，复杂度是O(N)<br> SDS字符串自身记录维护len长度属性，获得SDS字符串长度的复杂度是O(1)</p></li><li><p>避免缓冲区溢出。 C字符串不记录长度，由于两个C字符串在内存存储上紧邻，在执行字符串拼接strcat时，如果不提前分配足够空间，很可能发生修改s1的数据溢出到s2所在的空间中（缓冲区溢出）。<br> SDS杜绝了缓冲区溢出问题，它记录了长度，当修改SDS字符串之前，API都会检查SDS的空间是否满足修改的要求，不满足API会自动进行空间扩展。</p></li><li><p>空间预分配，减少修改时的内存重分配次数 SDS 被修改后，程序不仅会为 SDS 分配所需要的空间，还会分配额外的未使用空间。这样，Redis可以减少连续执行字符串增长操作所需的内存重分配次数。</p><p>redis的SDS中内置一个sdscat函数，也是用于字符串的拼接。</p><p><strong>具体的分配策略有两种</strong>:</p><ul><li>如修改后长度len小于1MB，就分配和len属性相同大小的未使用空间：free=len。比如：修改后字符串长度为 10bit.那么程序也会分配10bit的未使用空间，SDS的buf数组的总长度 = 10(字符串) + 10(未使用空间)+1（空字符串）= 21 bit</li><li>如修改后长度len大于等于1MB，就分配1M的未使用空间：free=1MB。比如：修改后字符串长度为 10M.那么程序也会分配1M的未使用空间,SDS的buf数组的总长度 = 10 M (字符串) + 1(未使用空间)= 11 M</li></ul><p><strong>第一次执行sdscat函数</strong></p><ol><li>sdscat(s,&quot;jidfkqeqwe&quot;)</li><li>假如分配了 15 + 15 + 1 = 31 bit</li></ol><p><strong>第二次执行sdscat函数</strong></p><ol><li>sdscat(s,&quot;jdfwe&quot;)</li><li>发现未使用的15bit， 大于“jdfwe”的长度，好了，不用再执行内存分配了。</li></ol><p>上述机制，避免了redis字符串增长情况下频繁申请空间的情况。每次字符串增长之前，sds会先检查空间是否足够，如果足够则直接使用预分配的空间，否则按照上述机制申请使用空间。该机制，使得字符串增长n次，需要申请空间的次数，从必定为n次的情况，降为最多n次的情况。</p></li><li><p>惰性空间释放 懒惰空间释放用于优化sds字符串缩短的操作，实现方式为：当需要缩短sds的长度时，并不立即释放空间，而是使用free来保存剩余可用长度，并等待将来使用。当有剩余空间，而有有增长字符串操作时，则又会调用空间预分配机制。</p><p>当redis内存空间不足时，会自动释放sds中未使用的空间，因此也不需要担心内存泄漏问题。</p></li><li><p>二进制安全</p><p>C语言的字符必须符合某种编码，例如ascii，且字符串除了末尾之外，不能有空格，否则会被当作是另一个字符串。这些限制使得c语言的字符串只能保存不含空格的文本，不能保存图片、视频等二进制数据，也不能保存包含空格的文本。<br> 而保存图片、大段文本等内容，也是redis的常用场景。因此，redis也对此进行优化。因此，sds是二进制安全的，写入的是什么内容，返回的也是什么内容，并没有限制。<br> 在 C 中遇到 &#39;\\0&#39; 则表示字符串的结束，但SDS不是，它是以len长度标识结尾。</p></li></ol><h2 id="redis缓冲区溢出及解决方案" tabindex="-1"><a class="header-anchor" href="#redis缓冲区溢出及解决方案" aria-hidden="true">#</a> Redis缓冲区溢出及解决方案</h2>',8),t=[r];function a(o,n){return i(),s("div",null,t)}const p=e(d,[["render",a],["__file","05_redis.html.vue"]]);export{p as default};