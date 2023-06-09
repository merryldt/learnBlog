const n=JSON.parse(`{"key":"v-50642958","path":"/moyu/mysql/01_order_by.html","title":"Mysql 优化","lang":"zh-CN","frontmatter":{"description":"title: mysql order by 优化 | 分析 subtitle: order by 的分析之路 category: mysql tag: 摸鱼 order: 0.1 Mysql 优化 order by 语句怎么优化？ 例子 表结构： CREATE TABLE \`sys_user\` ( \`user_id\` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID', \`dept_id\` bigint DEFAULT NULL COMMENT '部门ID', \`user_name\` varchar(30) COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户账号', \`nick_name\` varchar(30) COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户昵称', \`email\` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '用户邮箱', \`phonenumber\` varchar(11) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '手机号码', \`create_by\` varchar(64) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '创建者', \`create_time\` datetime DEFAULT NULL COMMENT '创建时间', \`update_by\` varchar(64) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '更新者', \`update_time\` datetime DEFAULT NULL COMMENT '更新时间', \`remark\` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注', PRIMARY KEY (\`user_id\`), KEY \`idx_emial\` (\`email\`) USING BTREE ) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户信息表';","head":[["meta",{"property":"og:url","content":"https://newzone.top/moyu/mysql/01_order_by.html"}],["meta",{"property":"og:site_name","content":"魔力社区"}],["meta",{"property":"og:title","content":"Mysql 优化"}],["meta",{"property":"og:description","content":"title: mysql order by 优化 | 分析 subtitle: order by 的分析之路 category: mysql tag: 摸鱼 order: 0.1 Mysql 优化 order by 语句怎么优化？ 例子 表结构： CREATE TABLE \`sys_user\` ( \`user_id\` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID', \`dept_id\` bigint DEFAULT NULL COMMENT '部门ID', \`user_name\` varchar(30) COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户账号', \`nick_name\` varchar(30) COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户昵称', \`email\` varchar(50) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '用户邮箱', \`phonenumber\` varchar(11) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '手机号码', \`create_by\` varchar(64) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '创建者', \`create_time\` datetime DEFAULT NULL COMMENT '创建时间', \`update_by\` varchar(64) COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '更新者', \`update_time\` datetime DEFAULT NULL COMMENT '更新时间', \`remark\` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注', PRIMARY KEY (\`user_id\`), KEY \`idx_emial\` (\`email\`) USING BTREE ) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户信息表';"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://newzone.top/"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-08T13:26:42.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"Mysql 优化"}],["meta",{"property":"article:author","content":"清顺"}],["meta",{"property":"article:modified_time","content":"2023-06-08T13:26:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mysql 优化\\",\\"image\\":[\\"https://newzone.top/\\"],\\"dateModified\\":\\"2023-06-08T13:26:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"清顺\\",\\"url\\":\\"https://newzone.top\\"}]}"]]},"headers":[{"level":3,"title":"例子","slug":"例子","link":"#例子","children":[]},{"level":3,"title":"表结构：","slug":"表结构","link":"#表结构","children":[]},{"level":3,"title":"执行sql:","slug":"执行sql","link":"#执行sql","children":[]},{"level":3,"title":"explain的结果如下:","slug":"explain的结果如下","link":"#explain的结果如下","children":[]},{"level":2,"title":"优化1:排序的字段增加索引","slug":"优化1-排序的字段增加索引","link":"#优化1-排序的字段增加索引","children":[{"level":3,"title":"1. 增加email,user_name  作为一个联合索引。","slug":"_1-增加email-user-name-作为一个联合索引。","link":"#_1-增加email-user-name-作为一个联合索引。","children":[]},{"level":3,"title":"2. 增加email,user_name,nick_name 索引字段：","slug":"_2-增加email-user-name-nick-name-索引字段","link":"#_2-增加email-user-name-nick-name-索引字段","children":[]},{"level":3,"title":"查看mysql版本：","slug":"查看mysql版本","link":"#查看mysql版本","children":[]},{"level":3,"title":"max_length_for_sort_data","slug":"max-length-for-sort-data","link":"#max-length-for-sort-data","children":[]}]},{"level":2,"title":"全字段排序","slug":"全字段排序","link":"#全字段排序","children":[{"level":3,"title":"1. 执行sql:","slug":"_1-执行sql","link":"#_1-执行sql","children":[]},{"level":3,"title":"2. 执行trace,记得执行的sql 不要带Explain:","slug":"_2-执行trace-记得执行的sql-不要带explain","link":"#_2-执行trace-记得执行的sql-不要带explain","children":[]},{"level":3,"title":"3. 结果：","slug":"_3-结果","link":"#_3-结果","children":[]}]},{"level":2,"title":"rowid字段排序","slug":"rowid字段排序","link":"#rowid字段排序","children":[{"level":3,"title":"1. 执行sql:","slug":"_1-执行sql-1","link":"#_1-执行sql-1","children":[]},{"level":3,"title":"2. 执行trace,记得执行的sql 不要带Explain:","slug":"_2-执行trace-记得执行的sql-不要带explain-1","link":"#_2-执行trace-记得执行的sql-不要带explain-1","children":[]},{"level":3,"title":"3. 结果：","slug":"_3-结果-1","link":"#_3-结果-1","children":[]}]},{"level":2,"title":"系统属性：","slug":"系统属性","link":"#系统属性","children":[{"level":3,"title":"sort_buffer_size","slug":"sort-buffer-size","link":"#sort-buffer-size","children":[]},{"level":3,"title":"max_length_for_sort_data","slug":"max-length-for-sort-data-1","link":"#max-length-for-sort-data-1","children":[]},{"level":3,"title":"tmp_table_size","slug":"tmp-table-size","link":"#tmp-table-size","children":[]}]},{"level":2,"title":"全字段排序 VS rowid排序：","slug":"全字段排序-vs-rowid排序","link":"#全字段排序-vs-rowid排序","children":[{"level":3,"title":"排序算法：","slug":"排序算法","link":"#排序算法","children":[]},{"level":3,"title":"内存临时表：","slug":"内存临时表","link":"#内存临时表","children":[]},{"level":3,"title":"磁盘临时表：","slug":"磁盘临时表","link":"#磁盘临时表","children":[]}]},{"level":2,"title":"控制参数，查看日志：","slug":"控制参数-查看日志","link":"#控制参数-查看日志","children":[{"level":3,"title":"计算扫描行数：","slug":"计算扫描行数","link":"#计算扫描行数","children":[]}]},{"level":2,"title":"版本：mysql 8.0.25","slug":"版本-mysql-8-0-25","link":"#版本-mysql-8-0-25","children":[]},{"level":2,"title":"介绍OPTIMIZER_TRACE","slug":"介绍optimizer-trace","link":"#介绍optimizer-trace","children":[]},{"level":2,"title":"命令：","slug":"命令","link":"#命令","children":[{"level":3,"title":"查看 optimizer_trace","slug":"查看-optimizer-trace","link":"#查看-optimizer-trace","children":[]},{"level":3,"title":"如何使用？","slug":"如何使用","link":"#如何使用","children":[]}]},{"level":2,"title":"join_optimization(优化阶段)","slug":"join-optimization-优化阶段","link":"#join-optimization-优化阶段","children":[{"level":3,"title":"ref_optimizer_key_uses","slug":"ref-optimizer-key-uses","link":"#ref-optimizer-key-uses","children":[]},{"level":3,"title":"rows_estimation","slug":"rows-estimation","link":"#rows-estimation","children":[]},{"level":3,"title":"considered_execution_plans","slug":"considered-execution-plans","link":"#considered-execution-plans","children":[]}]},{"level":2,"title":"这里只重点分析：join_execution(执行阶段)","slug":"这里只重点分析-join-execution-执行阶段","link":"#这里只重点分析-join-execution-执行阶段","children":[]},{"level":2,"title":"1. 不要用 * 作为查询列表，只返回需要的列","slug":"_1-不要用-作为查询列表-只返回需要的列","link":"#_1-不要用-作为查询列表-只返回需要的列","children":[]},{"level":2,"title":"2. 尽量让排序的字段可以使用索引，避免filesort发生；","slug":"_2-尽量让排序的字段可以使用索引-避免filesort发生","link":"#_2-尽量让排序的字段可以使用索引-避免filesort发生","children":[]},{"level":2,"title":"3. 如果出现filesort，对其优化","slug":"_3-如果出现filesort-对其优化","link":"#_3-如果出现filesort-对其优化","children":[]},{"level":2,"title":"4. 从业务角度考虑，拆解sql","slug":"_4-从业务角度考虑-拆解sql","link":"#_4-从业务角度考虑-拆解sql","children":[]}],"git":{"createdTime":1686230802000,"updatedTime":1686230802000,"contributors":[{"name":"kansuper","email":"17835059864@163.com","commits":1}]},"readingTime":{"minutes":13.52,"words":4055},"filePathRelative":"moyu/mysql/01_order_by.md","localizedDate":"2023年6月8日","excerpt":"<hr>\\n<p>title: mysql order by 优化 | 分析\\nsubtitle: order by 的分析之路\\ncategory:</p>\\n<ul>\\n<li>mysql\\ntag:</li>\\n<li>摸鱼\\norder: 0.1</li>\\n</ul>\\n<hr>\\n<h1> Mysql 优化</h1>\\n<h1> <strong><strong>order by 语句怎么优化？</strong></strong></h1>\\n<h3> 例子</h3>\\n<h3> 表结构：</h3>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token constant\\">CREATE</span> <span class=\\"token constant\\">TABLE</span> \`sys_user\` <span class=\\"token punctuation\\">(</span>\\n  \`user_id\` bigint <span class=\\"token constant\\">NOT</span> <span class=\\"token constant\\">NULL</span> <span class=\\"token constant\\">AUTO_INCREMENT</span> <span class=\\"token constant\\">COMMENT</span> <span class=\\"token char\\">'用户ID'</span><span class=\\"token punctuation\\">,</span>\\n  \`dept_id\` bigint <span class=\\"token constant\\">DEFAULT</span> <span class=\\"token constant\\">NULL</span> <span class=\\"token constant\\">COMMENT</span> <span class=\\"token char\\">'部门ID'</span><span class=\\"token punctuation\\">,</span>\\n  \`user_name\` <span class=\\"token function\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">30</span><span class=\\"token punctuation\\">)</span> <span class=\\"token constant\\">COLLATE</span> utf8mb4_general_ci <span class=\\"token constant\\">NOT</span> <span class=\\"token constant\\">NULL</span> <span class=\\"token constant\\">COMMENT</span> <span class=\\"token char\\">'用户账号'</span><span class=\\"token punctuation\\">,</span>\\n  \`nick_name\` <span class=\\"token function\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">30</span><span class=\\"token punctuation\\">)</span> <span class=\\"token constant\\">COLLATE</span> utf8mb4_general_ci <span class=\\"token constant\\">NOT</span> <span class=\\"token constant\\">NULL</span> <span class=\\"token constant\\">COMMENT</span> <span class=\\"token char\\">'用户昵称'</span><span class=\\"token punctuation\\">,</span>\\n  \`email\` <span class=\\"token function\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">50</span><span class=\\"token punctuation\\">)</span> <span class=\\"token constant\\">COLLATE</span> utf8mb4_general_ci <span class=\\"token constant\\">DEFAULT</span> '' <span class=\\"token constant\\">COMMENT</span> <span class=\\"token char\\">'用户邮箱'</span><span class=\\"token punctuation\\">,</span>\\n  \`phonenumber\` <span class=\\"token function\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">11</span><span class=\\"token punctuation\\">)</span> <span class=\\"token constant\\">COLLATE</span> utf8mb4_general_ci <span class=\\"token constant\\">DEFAULT</span> '' <span class=\\"token constant\\">COMMENT</span> <span class=\\"token char\\">'手机号码'</span><span class=\\"token punctuation\\">,</span>\\n  \`create_by\` <span class=\\"token function\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">64</span><span class=\\"token punctuation\\">)</span> <span class=\\"token constant\\">COLLATE</span> utf8mb4_general_ci <span class=\\"token constant\\">DEFAULT</span> '' <span class=\\"token constant\\">COMMENT</span> <span class=\\"token char\\">'创建者'</span><span class=\\"token punctuation\\">,</span>\\n  \`create_time\` datetime <span class=\\"token constant\\">DEFAULT</span> <span class=\\"token constant\\">NULL</span> <span class=\\"token constant\\">COMMENT</span> <span class=\\"token char\\">'创建时间'</span><span class=\\"token punctuation\\">,</span>\\n  \`update_by\` <span class=\\"token function\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">64</span><span class=\\"token punctuation\\">)</span> <span class=\\"token constant\\">COLLATE</span> utf8mb4_general_ci <span class=\\"token constant\\">DEFAULT</span> '' <span class=\\"token constant\\">COMMENT</span> <span class=\\"token char\\">'更新者'</span><span class=\\"token punctuation\\">,</span>\\n  \`update_time\` datetime <span class=\\"token constant\\">DEFAULT</span> <span class=\\"token constant\\">NULL</span> <span class=\\"token constant\\">COMMENT</span> <span class=\\"token char\\">'更新时间'</span><span class=\\"token punctuation\\">,</span>\\n  \`remark\` <span class=\\"token function\\">varchar</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">500</span><span class=\\"token punctuation\\">)</span> <span class=\\"token constant\\">COLLATE</span> utf8mb4_general_ci <span class=\\"token constant\\">DEFAULT</span> <span class=\\"token constant\\">NULL</span> <span class=\\"token constant\\">COMMENT</span> <span class=\\"token char\\">'备注'</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token class-name\\">PRIMARY</span> <span class=\\"token constant\\">KEY</span> <span class=\\"token punctuation\\">(</span>\`user_id\`<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token constant\\">KEY</span> \`idx_emial\` <span class=\\"token punctuation\\">(</span>\`email\`<span class=\\"token punctuation\\">)</span> <span class=\\"token class-name\\">USING</span> <span class=\\"token constant\\">BTREE</span>\\n<span class=\\"token punctuation\\">)</span> <span class=\\"token constant\\">ENGINE</span><span class=\\"token operator\\">=</span><span class=\\"token class-name\\">InnoDB</span> <span class=\\"token constant\\">AUTO_INCREMENT</span><span class=\\"token operator\\">=</span><span class=\\"token number\\">101</span> <span class=\\"token class-name\\">DEFAULT</span> <span class=\\"token constant\\">CHARSET</span><span class=\\"token operator\\">=</span>utf8mb4 <span class=\\"token constant\\">COLLATE</span><span class=\\"token operator\\">=</span>utf8mb4_general_ci <span class=\\"token constant\\">COMMENT</span><span class=\\"token operator\\">=</span><span class=\\"token char\\">'用户信息表'</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{n as data};