# 前端模块化的雏形（闭包函数为单位）

指利用函数，闭包

```js
//a.js
var moudleA = (function(){//全局变量接收
    var obj ={}
    var nameA = A;
	funtion sum () {}
    obj={//把要输出的东西打包在这个对象中
    nameA:nameA,
    sum:sum
    }
	return obj//将对象返回赋值给全局变量 主要是这一步
})()
```

# module（以文件为单位的module）

1. **CommonJS**：基本上用在node的模块
2. AMD（不在常用）不适合前端
3. CMD（不在常用）
4. **ES6的模块化** esmodule ：基本上用在浏览器的模块

```js
//导出
var nameA = A;
    funtion sum () {}
	//模块化，这个module相当于一个全局api
    module.exports = { //记住导出的是一个对象
    nameA,
    sum
}

//导入
let   {nameA,sum} = require("js文件a的路径");//require是一个文件的路径，导入的是一个对象，moduleA就是刚刚module.exports导出的对象。
```



