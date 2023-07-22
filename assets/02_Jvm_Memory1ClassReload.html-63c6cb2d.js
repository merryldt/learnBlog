import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as l,b as e}from"./app-59ef73e2.js";const r="/assets/02-1-1-363419bc.png",s="/assets/02-1-2-a428fe11.png",t="/assets/02-1-3-88bdf6cd.png",d="/assets/02-1-4-774ed2d3.png",n="/assets/02-1-5-b71da13c.png",o="/assets/02-1-6-acfad7d0.png",h="/assets/02-1-7-0e5074d2.png",c={},p=e('<figure><img src="'+r+'" alt="类的生命周期" tabindex="0" loading="lazy"><figcaption>类的生命周期</figcaption></figure><h1 id="一、过程" tabindex="-1"><a class="header-anchor" href="#一、过程" aria-hidden="true">#</a> 一、过程</h1><h2 id="加载-load" tabindex="-1"><a class="header-anchor" href="#加载-load" aria-hidden="true">#</a> 加载（load）</h2><ol><li>通过一个类的全限定名来获取定义此类的二进制字节流;</li><li>将这个字节流所代表的静态存储结构转化为方法区的运行时数据结构;</li></ol><h2 id="链接-linking" tabindex="-1"><a class="header-anchor" href="#链接-linking" aria-hidden="true">#</a> 链接(Linking)</h2><h3 id="校验" tabindex="-1"><a class="header-anchor" href="#校验" aria-hidden="true">#</a> 校验</h3><p>目的是在于确保class文件的字节流中包含信息符合当前虚拟机要求，保证被加载类的正确性，不会危害虚拟机自身安全。<br> 主要包括四种验证：文件格式验证、元数据验证、字节码验证、符号引用验证。</p><h3 id="准备" tabindex="-1"><a class="header-anchor" href="#准备" aria-hidden="true">#</a> 准备</h3><ul><li>为类变量分配内存并且设置该类变量的默认初始值，即零值。</li><li>这里不包含用final 修饰的static，因为final 在编译的时候就会分配了,准备阶段会显示初始化；</li><li>这里不会为实例变量分配初始化，类变量会分配在方法去中，而实例变量是会随着对象一起分配到JAVA堆中.</li></ul><h3 id="解析" tabindex="-1"><a class="header-anchor" href="#解析" aria-hidden="true">#</a> 解析</h3><ul><li>虚拟机将常量池内的符号引用替换为直接引用的过程。</li><li>事实上，解析操作往往会伴随着JVM 在执行完初始化之后再执行; 符号引用以一组符号来描述所引用的目标，符号可以是任何形式的字面量，只要使用时能无歧义地定位到目标即可。</li><li>各虚拟机能接受的符号引用必须是一致的，因为符号引用的字面量形式明确定义在Java虚拟机规范的Class文件格式中。</li><li>直接引用可以是直接指向目标的指针、相对偏移量或是一个能间接定位到目标的句柄。</li><li>解析动作主要针对类或接口、字段、类方法、接口方法、方法类型等。对应常量池中的CONSTANT_Class_info、CONSTANT_Fieldref_info、CONSTANT_Methodref_inf等。</li><li>对同一个符号引用进行多次解析是可能的，所以虚拟机会被第一次解析的结果进行缓存，避免解析动作重复进行。</li></ul><h2 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h2><ol><li>真正开始执行类中定义的Java程序代码(或者说是字节码)；</li><li>根据程序员通过程序制定的主观计划去初始化类变量和其他资源。换个角度来说，初始化阶段是执行类构造器clinit方法的过程。clinit方法不需要定义，是Javac编译器自动收集类中的所有类变量的赋值动作和静态代码块中的语句合并而来。构造器方法中指令按语句在源文件中出现的顺序执行。clinit方法不同于类的构造器。(关联: 构造器是虚拟机视角下的init方法)</li><li>若该类具有父类，JVM会保证子类的clinit方法执行钱，父类的clinit方法已经执行完毕。</li><li>虚拟机必须保证一个类的clinit方法在多线程下被同步加锁。</li></ol><h3 id="初始化时机" tabindex="-1"><a class="header-anchor" href="#初始化时机" aria-hidden="true">#</a> 初始化时机：</h3><p>虚拟机规范规定了有且只有5中情况下，必须立即对类进行初始化，称为对一个类进行主动引用；</p><ol><li>遇到new、getstatic、putstatic 或invokestatic 这四条字节码指令时，如果类没有进行过初始化，则需要先触发其初始化。 场景： 使用new关键字实例化对象的时候、读取或设置一个类的静态字段(被final修饰，已在编译器把结果放入常量池的静态字段除外)的时候，以及调用一个类的静态方法的时候，</li><li>使用java.lang.reflect 包的方法对类进行反射调用的时候，如果类没有进行过初始化，则需要先触发其初始化</li><li>当虚拟机启动时，用户需要指定一个要执行的主类(包含main()方法的那个类),虚拟机会先初始化这个主类；</li><li>当初始化一个类时，如果发现其父类还没有进行过初始化，则需要先触发其父类的初始化； 如果初始化的是一个接口，并不要求其父接口全部都完成了初始化，只有在真正使用到父接口的时候，才会初始化。比如(引用接口中定义的常量)</li><li>当使用JDK 1.7 的动态语言支持时，如果一个java.lang.invoke.MethodHandle实例最后的解析结果REF_getStatic、REF_putStatic、REF_invokeStatic的方法句柄，并且这个方法句柄所对应的类没有进行过初始化，则需要先触发其初始化。 除了在加载阶段用户应用程序可以通过自定义类加载器参与之外，其余动作完全由虚拟机主导和控制，到了初始化，才开始执行Java程序代码。</li></ol><h2 id="例子" tabindex="-1"><a class="header-anchor" href="#例子" aria-hidden="true">#</a> 例子：</h2><figure><img src="'+s+'" alt="类的加载过程" tabindex="0" loading="lazy"><figcaption>类的加载过程</figcaption></figure><h1 id="二、类加载器" tabindex="-1"><a class="header-anchor" href="#二、类加载器" aria-hidden="true">#</a> 二、类加载器</h1><p>实现“通过一个类的全限定名来获取描述此类的二进制字节流”的动作的代码模块；</p><h2 id="类加载器从两个角度区分" tabindex="-1"><a class="header-anchor" href="#类加载器从两个角度区分" aria-hidden="true">#</a> 类加载器从两个角度区分:</h2><p>一、从虚拟机角度：</p><ol><li>启动类加载器(BootStrap ClassLoader),由C++语言实现，虚拟机自身的一部分；</li><li>所有其他的类加载器，由Java语言实现，独立于虚拟机外部，并且全部继承自抽象类Java.lang.ClassLoader。</li></ol><p>二、从Java开发角度：</p><ol><li>启动类加载器；</li><li>扩展类加载器；</li><li>应用程序类加载器。</li></ol><h2 id="类加载器的作用" tabindex="-1"><a class="header-anchor" href="#类加载器的作用" aria-hidden="true">#</a> 类加载器的作用</h2><figure><img src="'+t+'" alt="类加载器的作用" tabindex="0" loading="lazy"><figcaption>类加载器的作用</figcaption></figure><p>类加载器负责从本地文件系统或者网络中获取class文件，class 文件在文件开头有特殊的标识; ClassLoader 只负责class文件系统的加载，至于它是否运行，则由ExcutionEngin 决定; 加载的类信息存储于一块称为方法区的内存空间。除了类的信息，方法区中还会存放运行时常量池信息，可能还会有字符串字面量和数字常量(这部分常量信息是class中常量池部分的内存映射).</p><figure><img src="'+d+'" alt="类加载器的ClassLoader角色" tabindex="0" loading="lazy"><figcaption>类加载器的ClassLoader角色</figcaption></figure><ol><li>class file 存在于文件系统中，可以理解为设计师画在纸上的模板，而最终这个模板执行的时候是要加载进入JVM根据这个文件实例化出N个一模一样的实例。</li><li>class file 被加载进入JVM中，被称为 DNA 元数据模板，放在方法区；</li><li>在.class -&gt; JVM -&gt; 元数据模板，这就需要一个工具(类加载器 ClassLoader 扮演的角色)</li></ol><h2 id="介绍三种类加载器" tabindex="-1"><a class="header-anchor" href="#介绍三种类加载器" aria-hidden="true">#</a> 介绍三种类加载器</h2><h3 id="启动类加载器-bootstrap-classloader" tabindex="-1"><a class="header-anchor" href="#启动类加载器-bootstrap-classloader" aria-hidden="true">#</a> 启动类加载器(Bootstrap ClassLoader)</h3><p>工作：</p><ul><li>将存放在&lt;JAVA_HOME&gt;\\lib 目录中的rt.jar，或者被-Xbootclasspath参数所指定的路径中的，并且是虚拟机识别的类库加载到虚拟机内存中。仅按照文件名识别，如rt.jar，名字不符合的类库即使放在lib目录中也不会被加载）</li><li>启动类加载器无法被Java程序直接引用，用户在编写自定义类加载器时，如果需要把加载请求委派给引导类加载器，那直接使用null代替即可。</li><li>加载扩展类和应用程序类加载器，并制定为他们的父类加载器。</li><li>不继续自Java.lang.ClassLoader,没有父加载器。</li></ul><h3 id="扩展类加载器-extension-classloader" tabindex="-1"><a class="header-anchor" href="#扩展类加载器-extension-classloader" aria-hidden="true">#</a> 扩展类加载器(Extension ClassLoader)</h3><ul><li><p><strong>实现类</strong>: sum.misc.Launcher$ExtClassLoader</p></li><li><p><strong>工作</strong>: 加载&lt;JAVA_HOME&gt;\\lib\\ext 目录中的或被Java.ext.dirs系统变量所指定的路径中的所有类库;开发者可以直接使用扩展类加载器。</p></li><li><p>如果用户创建的JAR放在次目录下,也会自动由扩展类加载器加载。</p></li></ul><h3 id="应用程序类加载器-application-classloader" tabindex="-1"><a class="header-anchor" href="#应用程序类加载器-application-classloader" aria-hidden="true">#</a> 应用程序类加载器(Application ClassLoader)</h3><ul><li><p><strong>实现类</strong>: sum.misc.Launcher $AppClassLoader</p></li><li><p><strong>工作</strong>: 加载用户类路径上所指定的类库 开发者可以直接使用这个类加载器，如果应用程序中没有自定义过自己的类加载器，一般情况下这个就是程序中默认的类加载器。</p></li><li><p><strong>由来</strong>: 是ClassLoader中的getSystemClassLoader()方法的返回值，所以也可以称之为系统类加载器。</p></li><li><p><strong>总结</strong>: 应用程序都是由这3中类加载器相互配合进行加载的，如果必要，可以加入自定义的类加载器。</p></li></ul><h2 id="自定义类加载器" tabindex="-1"><a class="header-anchor" href="#自定义类加载器" aria-hidden="true">#</a> 自定义类加载器</h2><h3 id="为什么要自定义类加载器" tabindex="-1"><a class="header-anchor" href="#为什么要自定义类加载器" aria-hidden="true">#</a> 为什么要自定义类加载器</h3><ul><li>隔离加载类</li><li>修改类加载的方式</li><li>扩展加载源</li><li>防止源码泄露</li></ul><h2 id="类加载器之间的关系" tabindex="-1"><a class="header-anchor" href="#类加载器之间的关系" aria-hidden="true">#</a> 类加载器之间的关系</h2><h3 id="双亲委派模型" tabindex="-1"><a class="header-anchor" href="#双亲委派模型" aria-hidden="true">#</a> 双亲委派模型</h3><p>定义：</p><ul><li>类加载器之间的这种层次关系，称为类加载器的双亲委派模型。一种类加载器的实现方式。</li></ul><p>特点：</p><ul><li>双亲委派模型要求除了顶层的启动类加载器外，其余的类加载器都应当有自己的父类加载器。</li></ul><p>类加载器之间的关系：</p><ul><li>一般不会以继承的关系来实现，而都是使用组合关系来复用父加载器的代码。</li></ul><p>工作过程:</p><blockquote><blockquote><p>如果一个类加载器收到了类加载的请求，它首先不会自己去尝试加载这个类，而是把这个请求委派给父类加载器去完成，每一个层次的类加载器都是如此，<br> 因此所有的加载请求最终都应该传送到顶层的启动类加载器中，只有当父类加载器反馈自己无法完成这个加载请求时(它的搜索范围中没有找到所需的类)，子加载器才会尝试自己去加载。</p></blockquote></blockquote><p>工作原理图： <img src="'+n+'" alt="双亲委派机制" loading="lazy"> 好处：</p><p>Java类随着它的类加载器一起具备了一种带有优先级的层次关系。</p><p>避免类的重复加载;</p><p>保护程序安全，防止核心API 被随意篡改；</p><blockquote><blockquote><p>比如： 类Object，它在rt.jar中，无论哪一个类加载器要加载这个类，最终都是要委派给处于模型最顶端的启动类加载器进行加载，因此Object类在程序的各种类加载器环境中都是同一个类。</p></blockquote></blockquote><ul><li>实现简单：</li></ul><blockquote><blockquote><p>Java.lang.ClassLoader的loadClass()方法中；</p></blockquote></blockquote><ul><li>实现逻辑:</li></ul><blockquote><blockquote><p>首先检查是否已经被加载过，若没有加载则调用父加载器的loadClass()方法，若父加载器为空则默认使用启动类加载器作为父加载器。<br> 如果父类失败，抛出ClassNotFoundException异常后，再调用自己的findClass()方法进行加载。</p></blockquote></blockquote><p>结果：</p><ul><li>解决了各个类加载的基础类的统一问题；</li></ul><h2 id="局限性" tabindex="-1"><a class="header-anchor" href="#局限性" aria-hidden="true">#</a> 局限性</h2><h3 id="破坏双亲委派模型" tabindex="-1"><a class="header-anchor" href="#破坏双亲委派模型" aria-hidden="true">#</a> 破坏双亲委派模型</h3><p>因为双亲委派模型的局限性，出现了三次，两个不同的加载器。</p><h3 id="一、无法解决基础类回调用户的代" tabindex="-1"><a class="header-anchor" href="#一、无法解决基础类回调用户的代" aria-hidden="true">#</a> 一、无法解决基础类回调用户的代；</h3><p>例子：</p><ul><li>比如JNDI服务，JNDI服务由启动类加载器去加载，但JNDI的目的就是对资源进行集中管理和查找，它需要调用由独立厂商实现并部署在应用程序的ClassPath下的JNDI接口提供者的代码。</li></ul><p>问题：</p><ul><li>启动类加载器不认识JNDI接口提供者的代码；</li><li>JNDI服务使用线程上下文类加载器去加载所需要的的SPI代码，也就是父类加载器请求子类加载器去完成类加载的动作，这种行为打破了双亲委派模型的层次接口来逆向使用类加载器。</li></ul><p>解决：</p><ul><li>线程上下文类加载器。</li><li>线程上下文类加载器可以通过Java.lang.Thread类的setContextClassLoader()方法进行设置，如果创建线程时还未设置，它将从父线程中继承一个，如果在应用程序的全局范围内都没有设置过的话，那这个类加载器默认就是应用程序类加载器。</li></ul><p>Java中所有涉及SPI的加载动作基本上都采用这种方式，如JDNI、JDBC、JCE、JAXB和JBI等。</p><h3 id="二、用户对程序动态性的追求。" tabindex="-1"><a class="header-anchor" href="#二、用户对程序动态性的追求。" aria-hidden="true">#</a> 二、用户对程序动态性的追求。</h3><p>说明：</p><ul><li>动态性指： 代码热替换、模块热部署等。</li><li></li></ul><p>解决：</p><ul><li>OSGI</li></ul><blockquote><blockquote><p>程序模块在OSGI中称为Bundle。 OSGI 实现模块化热部署的关键则是它自定义的类加载器机制的实现。<br> 每一个程序模块都有一个自己的类加载器，当需要更换一个程序模块时，就把程序模块连同类加载器一起换掉以实现代码的热替换。<br> OSGI环境下，类加载器为复杂的网状结构。</p></blockquote></blockquote><ul><li><p>OSGI的请求过程：当收到类加载请求时：</p><ol><li>将以java.*开头的类委派给父类加载器加载；</li><li>否则，将委派列表名单内的类委派给父类加载器加载；</li><li>否则，将Import列表中的类委派给Export这个类的Bundle的类加载器加载；</li><li>否则，查找当前Bundle的ClassPath,使用自己的类加载器加载;</li><li>否则，查找类是否在自己的Fragmentg Bundle中，如果在，则委派给Fragment Bundle的类加载器加载；</li><li>否则，查找Dynamic Import 列表的Bundle，委派给对应Bundle的类加载器加载;</li><li>否则，类查找失败。</li></ol></li></ul><h3 id="三、自定义类加载器的原则" tabindex="-1"><a class="header-anchor" href="#三、自定义类加载器的原则" aria-hidden="true">#</a> 三、自定义类加载器的原则：</h3><p>用户可以把自己的类加载逻辑写到findClass()方法中，在loadClass()方法的逻辑里如果父类加载失败，则会调用自己的findClass()方法来完成加载，这样就可以保证新写出来的类加载器是符合双亲委派规则的。</p><h2 id="知识补充" tabindex="-1"><a class="header-anchor" href="#知识补充" aria-hidden="true">#</a> 知识补充</h2><h3 id="沙箱安全机制" tabindex="-1"><a class="header-anchor" href="#沙箱安全机制" aria-hidden="true">#</a> 沙箱安全机制</h3><figure><img src="'+o+'" alt="双亲委派机制" tabindex="0" loading="lazy"><figcaption>双亲委派机制</figcaption></figure><h3 id="比较两个class-对象是否为同一个类" tabindex="-1"><a class="header-anchor" href="#比较两个class-对象是否为同一个类" aria-hidden="true">#</a> 比较两个Class 对象是否为同一个类:</h3><p>在JVM 中表示两个class对象是否为同一个类存在两个必要条件：</p><ul><li>类的完整类名必须一致，包括包名。</li><li>加载这个类的ClassLoader(指ClassLoader 实例对象)必须相同。</li></ul><p>换句话说，在JVM 中，即使这两个类对象(class对象)来源同一个class文件，被同一个虚拟机所加载，但只要加载他们的classLoader 实例对象不同， 那么这两个类对象也是不相等的。</p><p>JVM 必须知道一个类型是由启动加载器加载的还是由用户类加载器加载的。如果一个类型是由用户类加载器加载的，那么JVM 会将这个类加载器的一个引用作为 类型信息的一部分保存在方法区中。当解析一个类型到另一个类型的引用的时候，JVM 需要保证这两类型的类加载器是相同的。</p><h3 id="类的主动使用和被动使用" tabindex="-1"><a class="header-anchor" href="#类的主动使用和被动使用" aria-hidden="true">#</a> 类的主动使用和被动使用</h3><figure><img src="'+h+'" alt="双亲委派机制" tabindex="0" loading="lazy"><figcaption>双亲委派机制</figcaption></figure>',92),u=[p];function f(g,b){return i(),l("div",null,u)}const J=a(c,[["render",f],["__file","02_Jvm_Memory1ClassReload.html.vue"]]);export{J as default};
