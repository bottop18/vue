在使用 vue-cli 脚手架构建项目时，会遇到一个构建选项 Vue build，有两个选择，Runtime + Compiler 和 Runtime-only ，如图所示


Runtime + Compiler: recommended for most users

运行程序+编译器：推荐给大多数用户

Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere

仅运行程序: 比上面那种模式轻大约 6KB，但是 template (或任何特定于vue的html)只允许在.vue文件中使用——其他地方用需要 render 函数

2. 两种模式的区别
runtime-only 比 runtime-compiler 轻 6kb，代码量更少
runtime-only 运行更快，性能更好
runtime-only 其实只能识别render函数，不能识别template，.vue 文件中的template也是被 vue-template-compiler 翻译成了render函数，所以只能在.vue里写 template
有关vue中的render函数可以看这篇博客：vue中的render函数

3. 解释
两种模式生成的 脚手架 即（代码模板）主要区别在 main.js 中，其它基本上是一样的：

我们再看一张图：


runtime + compiler 中 Vue 的运行过程
对于 runtime-compiler 来说，它的代码运行过程是：template -> ast -> render -> virtual dom -> UI

首先将vue中的template模板进行解析解析成abstract syntax tree （ast）抽象语法树
将抽象语法树在编译成render函数
将render函数再翻译成virtual dom（虚拟dom）
将虚拟dom显示在浏览器上
runtime-only 中 Vue 的运行过程
对于 runtime-only来说，它是从 render -> virtual dom -> UI

可以看出它省略了从template -> ast -> render的过程
所以runtime-only比runtime-compiler更快，代码量更少
runtime-only 模式中不是没有写 template ，只是把 template 放在了.vue 的文件中了，并有一个叫 vue-template-compiler 的开发依赖时将.vue文件中的 template 解析成 render 函数。 因为是开发依赖，不在最后生产中，所以最后生产出来的运行的代码没有template
4. 总结
如果在之后的开发中，你依然使用template，就需要选择 Runtime + Compiler

如果你之后的开发中，使用的是.vue文件夹开发，那么可以选择 Runtime-only

