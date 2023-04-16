// 高阶函数
// 1. 将函数作为参数传递
// 1.1 回调函数
// 1.1.1 异步请求中的回调函数 —— 常用，不举例了
// 1.1.2 普通请求中的回调函数
// 比如想在页面中创建100个div节点，然后把这些div节点都设置为隐藏，但为了提高函数的复用性
// 并非每个人创建了节点都想要被隐藏，那么这段代码可以封装到函数中，用回调函数的形式传入
var appendDiv = function (callback) {
  for (var i = 0; i < 100; i++) {
    var div = document.createElement("div");
    div.innerHTML = i;
    document.body.appendChild(div);
    if (typeof callback === "function") {
      callback(div);
    }
  }
};
appendDiv(function (node) {
  node.style.display = "none";
});

// 2. 函数作为返回值输出

// 3. 高阶函数实现 AOP
// 以下代码解释：把负责打印1和3的两个函数通过AOP的方式动态植入func函数
Function.prototype.before = function (beforefn) {
  var __self = this; // 保存原函数的引用
  return function () {
    // 返回包含了原函数和新函数的"代理"函数
    beforefn.apply(this, arguments); // 执行新函数，修正 this
    return __self.apply(this, arguments); // 执行原函数
  };
};

Function.prototype.after = function (afterfn) {
  var __self = this;
  return function () {
    var ret = __self.apply(this, arguments); // 执行原函数
    afterfn.apply(this, arguments); // 执行新函数
    return ret;
  };
};

var func = function () {
  console.log(2);
};
func = func
  .before(function () {
    console.log(1);
  })
  .after(function () {
    console.log(3);
  });
func(); // 分别输出 1、2、3
 