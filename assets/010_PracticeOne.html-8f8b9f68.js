import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,b as a}from"./app-1ec496f5.js";const l="/assets/image-1-3ce91a81.png",s="/assets/image-fc86a443.png",d="/assets/image-2-0a1a1af0.png",r={},v=a('<h1 id="_1-获取java-进程的pid" tabindex="-1"><a class="header-anchor" href="#_1-获取java-进程的pid" aria-hidden="true">#</a> 1. 获取java 进程的pid</h1><ol><li>ps -ef | grep java <img src="'+l+'" alt="Alt text" loading="lazy"></li><li>jps <img src="'+s+`" alt="Alt text" loading="lazy"></li></ol><h1 id="_2-使用jmap" tabindex="-1"><a class="header-anchor" href="#_2-使用jmap" aria-hidden="true">#</a> 2. 使用jmap</h1><h2 id="jmap-heap-pid" tabindex="-1"><a class="header-anchor" href="#jmap-heap-pid" aria-hidden="true">#</a> jmap -heap pid</h2><p>获取整个堆空间的详细信息。包括GC的使用、堆的配置信息，以及内存的使用信息等。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@iZuf64eg43tiam73abxiweZ:~# /usr/local/btjdk/jdk8/bin/jmap -heap 1028098
 Attaching to process ID 1028098, please wait...
 Debugger attached successfully.
 Server compiler detected.
 JVM version is 25.71-b00
 #1.
 using parallel threads in the new generation.
 using thread-local object allocation.
 Concurrent Mark-Sweep GC
 # 2. 
 Heap Configuration:
   MinHeapFreeRatio         = 40
   MaxHeapFreeRatio         = 70
   MaxHeapSize              = 4294967296 (4096.0MB)
   NewSize                  = 348913664 (332.75MB)
   MaxNewSize               = 348913664 (332.75MB)
   OldSize                  = 3946053632 (3763.25MB)
   NewRatio                 = 2
   SurvivorRatio            = 8
   MetaspaceSize            = 21807104 (20.796875MB)
   CompressedClassSpaceSize = 1073741824 (1024.0MB)
   MaxMetaspaceSize         = 17592186044415 MB
   G1HeapRegionSize         = 0 (0.0MB)
 #3. 
 Heap Usage:
 New Generation (Eden + 1 Survivor Space):
   capacity = 314048512 (299.5MB)
   used     = 166875944 (159.14530181884766MB)
   free     = 147172568 (140.35469818115234MB)
   53.136995598947465% used
 Eden Space:
   capacity = 279183360 (266.25MB)
   used     = 132010792 (125.89530181884766MB)
   free     = 147172568 (140.35469818115234MB)
   47.28462040144513% used
 From Space:
   capacity = 34865152 (33.25MB)
   used     = 34865152 (33.25MB)
   free     = 0 (0.0MB)
   100.0% used
 To Space:
   capacity = 34865152 (33.25MB)
   used     = 0 (0.0MB)
   free     = 34865152 (33.25MB)
   0.0% used
 concurrent mark-sweep generation:
   capacity = 3946053632 (3763.25MB)
   used     = 1832479232 (1747.58837890625MB)
   free     = 2113574400 (2015.66162109375MB)
   46.43827486630572% used

 38355 interned Strings occupying 4029456 bytes.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>第一部分：</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> using parallel threads in the new generation.
 using thread-local object allocation.
 Concurrent Mark-Sweep GC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用的是serial收集器（也叫串行收集器）即 Mark Sweep Compact GC。</li></ul><ol start="2"><li>第二部分：</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> Heap Configuration:
   MinHeapFreeRatio         = 40
   MaxHeapFreeRatio         = 70
   MaxHeapSize              = 4294967296 (4096.0MB)
   NewSize                  = 348913664 (332.75MB)
   MaxNewSize               = 348913664 (332.75MB)
   OldSize                  = 3946053632 (3763.25MB)
   NewRatio                 = 2
   SurvivorRatio            = 8
   MetaspaceSize            = 21807104 (20.796875MB)
   CompressedClassSpaceSize = 1073741824 (1024.0MB)
   MaxMetaspaceSize         = 17592186044415 MB
   G1HeapRegionSize         = 0 (0.0MB)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>MinHeapFreeRatio和MaxHeapFreeRatio: 设置堆的最小最大空闲比例。</li><li>MaxHeapSize: 堆的最大大小。</li><li>NewSize: 新生代的默认值。</li><li>MaxNewSize: 新生代的最大值</li><li>OldSize: 老年代的默认值。</li><li>NewRatio: 新生代和老年代的大小比例，即老年代:新生代=2:1,默认为2.</li><li>SurvivorRatio: 新生代中的eden区与survivor的比例=8:1.</li><li>MetaspaceSize: 1.8 开始叫元空间大小,使用本地内存的</li><li>CompressedClassSpaceSize: 类指针压缩空间大小, 默认为1G</li><li>MaxMetaspaceSize: 元空间的最大值。一般设置和MetaspaceSize一样大小。</li><li>G1HeapRegionSize: G1区块的大小, 取值为1M至32M. 其取值是要根据最小Heap大小划分出2048个区块</li></ul><ol start="3"><li>第三部分:</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> New Generation (Eden + 1 Survivor Space):
   capacity = 314048512 (299.5MB)
   used     = 166875944 (159.14530181884766MB)
   free     = 147172568 (140.35469818115234MB)
   53.136995598947465% used
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>新生代: 指eden加上一个survivor空间。容量有300M这样，使用了159M，还有140M空闲. 接近53%的使用率。（根据分代的思想，新生代都是一个eden 加上2个survivor）</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> Eden Space:
   capacity = 279183360 (266.25MB)
   used     = 132010792 (125.89530181884766MB)
   free     = 147172568 (140.35469818115234MB)
   47.28462040144513% used
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>单独的eden区: 大小为266M,使用125M,空闲140, 使用率47%</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> From Space:
   capacity = 34865152 (33.25MB)
   used     = 34865152 (33.25MB)
   free     = 0 (0.0MB)
   100.0% used
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>一个surivor区，是在使用着的</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>To Space:
   capacity = 34865152 (33.25MB)
   used     = 0 (0.0MB)
   free     = 34865152 (33.25MB)
   0.0% used
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>另一个survivor的使用情况。此时没有被使用。和From Space 大小一致；</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> concurrent mark-sweep generation:
   capacity = 3946053632 (3763.25MB)
   used     = 1832479232 (1747.58837890625MB)
   free     = 2113574400 (2015.66162109375MB)
   46.43827486630572% used
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>老年代： 总的大小是3763M，使用1747M,空闲2015M,使用率是46%。</li></ul><ol start="4"><li>总结： 为java 进程分配了 4096M 的内存； Eden Space + From Space + To Space + concurrent mark-sweep generation = 4096</li></ol><h1 id="_3-使用jstat" tabindex="-1"><a class="header-anchor" href="#_3-使用jstat" aria-hidden="true">#</a> 3. 使用jstat</h1><p>jstat -gc -t 1028098 60000 20</p><p><img src="`+d+'" alt="Alt text" loading="lazy"> 从图中红框标记的的两条数据分析：</p><ul><li>一分钟采集1次gc 的数据，第一条和最后一条就是 19分钟。</li></ul><ol><li>GCT 总的gc 时间是 891.076秒</li><li>GCT 总的gc 时间是 895.115 秒 系统的吞吐量 = 1- （895.115-891.076）/ 19 *60 = 1- 0.0035 = 0.9965 = 99.65%</li></ol>',29),c=[v];function t(u,m){return i(),n("div",null,c)}const p=e(r,[["render",t],["__file","010_PracticeOne.html.vue"]]);export{p as default};
