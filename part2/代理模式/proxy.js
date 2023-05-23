// 代理模式
// 1. 使用虚拟代理实现图片预加载
// 1.1 创建本体对象，该对象负责往页面中创建img标签，并提供一个对外的setSrc接口
var myImage = (function() {
    var imgNode = document.createElement('img')
    document.body.appendChild(imgNode)
    return {
        setSrc: function(src) {
            imgNode.src = src
        }
    }
})()

// 不使用代理对象：直接设置src
// 效果：在图片加载好之前，页面会出现很长时间的空白
myImage.setSrc('xxxx')

// 引入代理对象：proxyImage
// 效果：在图片被真正加载好之前，页面中将出现一张占位图来提示用户图片正在加载
var proxyImage = (function() {
    var img = new Image;
    img.onload = function() {
        myImage.setSrc(this.src);
    }
    return {
        setSrc: function(src) {
            myImage.setSrc('file:// /C:/Users/svenzeng/Desktop/loading.gif')
            img.src = src
        }
    }
})()

proxyImage.setSrc('xxxx')

// 2. 用高阶函数动态创建缓存代理
// 2.1 计算方法
// 2.2.1 计算乘积
let mult = function() {
    var a = 1;
    for(let i = 0; i < arguments.length; i ++) {
        a = a * arguments[i];
    }
    return a;
}
// 2.2.1 计算加和
let plus = function() {
    var a = 0;
    for(let i = 0; i < arguments.length; i ++) {
        a = a + arguments[i];
    }
    return a;
}
// 2.2 创建缓存代理的工厂（工厂模式 + 代理模式）
let createProxyFactory = function(fn) {
    let cache = {}
    return function() {
        let args = Array.prototype.join.call(arguments, ',')
        if(args in cache) {
            return cache[args]
        }
        return cache[args] = fn.apply(this, arguments)
    }
}

var proxyMult = createProxyFactory(mult)
var proxyPlus = createProxyFactory(plus)

console.log(proxyMult(1,2,3,4)); // 计算得出
console.log(proxyMult(1,2,3,4)); // 缓存得出
console.log(proxyPlus(1,2,3,4)); // 计算得出
console.log(proxyPlus(1,2,3,4)); // 缓存得出