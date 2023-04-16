// 闭包

// 闭包的作用
// 1. 封装变量
// 示例：计算参数乘积，由于相同的参数进行计算会浪费资源，因此加入缓存机制来提高函数性能
var mult = (function () {
  var cache = {}; // 将这个变量封装到 mult 内部，避免暴露在全局作用域下
  return function () {
    var args = Array.prototype.join.call(arguments, ",");
    if (args in cache) {
      return cache[args];
    }
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
      a = a * arguments[i];
    }
    return (cache[args] = a);
  };
})();
// 对代码进行重构：提炼函数，如果一个大函数中有一些代码能够独立出来，可以将代码块封装到独立的小函数中
// 好处：1. 独立出的小函数有利于代码复用 2. 良好的命名起到了注释的作用
var mult = (function () {
  var cache = {}; // 将这个变量封装到 mult 内部，避免暴露在全局作用域下
  var calculate = function () {
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
      a = a * arguments[i];
    }
    return a;
  };
  return function () {
    var args = Array.prototype.join.call(arguments, ",");
    if (args in cache) {
      return cache[args];
    }
    // 也可以这样：cache[args] = calculate(...arguments);
    return cache[args] = calculate.apply(null, arguments);
  };
})();


// 闭包和面向对象的设计
// 1. 用闭包来实现面向对象系统
// 闭包实现
var extent = function() {
  var value = 0;
  return {
    call: function() {
      value++;
      console.log(value);
    }
  }
}
var extent = extent();

extent.call(); // 输出 1
extent.call(); // 输出 2

// 面向对象的写法
var Extent = function() {
  this.value = 0;
}
Extent.prototype.call = function() {
  this.value ++;
  console.log(this.value);
}
var extent = new Extent()

extent.call() // 输出 1
extent.call() // 输出 2