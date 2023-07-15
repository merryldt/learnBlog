import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as s,c as d,d as e,e as t,a,w as l,b as c}from"./app-24966b61.js";const _="/assets/image-c48c6fae.png",h={},u=e("h1",{id:"背景",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#背景","aria-hidden":"true"},"#"),t(" 背景")],-1),m=e("h1",{id:"基础知识介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#基础知识介绍","aria-hidden":"true"},"#"),t(" 基础知识介绍")],-1),f=e("li",null,[t("Mutator"),e("br"),t(" 应用程序,即垃圾生产者；")],-1),b=e("li",null,[t("TLAB"),e("br"),t(" Thread Local Allocation Buffer 的缩写，基于CAS 的独享线程(Mutator Threads) 可以优先将对象分配在Eden 中的一块内存，因为是Java 线程独享的内存区没有锁竞争，所以分配速度更快，每个TLAB 都是一个线程独享的。")],-1),v=e("br",null,null,-1),p={href:"https://stackoverflow.com/questions/19154607/how-actually-card-table-and-writer-barrier-works",target:"_blank",rel:"noopener noreferrer"},x=e("br",null,null,-1),C=e("br",null,null,-1),k=c('<h1 id="路径" tabindex="-1"><a class="header-anchor" href="#路径" aria-hidden="true">#</a> 路径</h1><figure><img src="'+_+'" alt="Alt text" tabindex="0" loading="lazy"><figcaption>Alt text</figcaption></figure><h2 id="_1-建立知识体系" tabindex="-1"><a class="header-anchor" href="#_1-建立知识体系" aria-hidden="true">#</a> 1. 建立知识体系</h2><blockquote><p>学习GC 的基础知识,包括:</p></blockquote>',4),y=e("h2",{id:"_2-确定评价指标",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_2-确定评价指标","aria-hidden":"true"},"#"),t(" 2. 确定评价指标")],-1),g=e("li",null,"摸清如何设定独立系统的指标;",-1),w=e("li",null,"在业务场景中判断 GC 是否存在问题的手段;",-1),A=e("h2",{id:"_3-场景调优实践",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_3-场景调优实践","aria-hidden":"true"},"#"),t(" 3. 场景调优实践")],-1),L=e("h2",{id:"_4-总结优化经验",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_4-总结优化经验","aria-hidden":"true"},"#"),t(" 4. 总结优化经验")],-1);function j(G,S){const n=r("ExternalLinkIcon"),o=r("RouterLink");return s(),d("div",null,[u,m,e("ol",null,[f,b,e("li",null,[t("Card Table"),v,t(" 卡表,主要是用来标记卡页的状态，每个卡表项对应一个卡页。当卡页中一个对象引用有写操作时，写屏障将会标记对象所在的卡表状态改为dirty,卡表的本质是用来解决跨代引用的问题。 "),e("a",p,[t("https://stackoverflow.com/questions/19154607/how-actually-card-table-and-writer-barrier-works"),a(n)])]),e("li",null,[t("SLA（服务等级协议):"),x,t(" Service-Level Agreement的缩写；指的是系统服务提供者（Provider）对客户（Customer）的⼀个服务承诺。这是衡量⼀个⼤型分布式系统是否“健康”的常见⽅法。"),C,t(" 可⽤性、准确性、系统容量和延迟"),a(o,{to:"/moyu/jvm/09999_SLA.html"},{default:l(()=>[t("代完善09999")]),_:1})])]),k,e("ol",null,[e("li",null,[a(o,{to:"/moyu/jvm/02_jvm_MemoryStructure.html"},{default:l(()=>[t("jvm的内存结构和对象分配")]),_:1})]),e("li",null,[a(o,{to:"/moyu/jvm/03_GarbageCollectionMethod.html"},{default:l(()=>[t("垃圾收集方法")]),_:1})]),e("li",null,[a(o,{to:"/moyu/jvm/04_GarbageCollector.html"},{default:l(()=>[t("垃圾收集器")]),_:1})]),e("li",null,[a(o,{to:"/moyu/jvm/05_GCAnalysisTools.html"},{default:l(()=>[t("掌握一些常用的GC问题分析工具")]),_:1})])]),y,e("ol",null,[e("li",null,[a(o,{to:"/moyu/jvm/06_GCEvaluationCriteria.html"},{default:l(()=>[t("了解基本 GC 的评价方法")]),_:1})]),g,w]),A,e("ol",null,[e("li",null,[a(o,{to:"/moyu/jvm/09_9CMS.html"},{default:l(()=>[t("分析与解决九种 CMS 中常见 GC 问题场景")]),_:1})])]),L])}const M=i(h,[["render",j],["__file","01_total.html.vue"]]);export{M as default};