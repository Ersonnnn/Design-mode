// 单例模式

// 1. 最简单的单例模式实现
var Singleton = function (name) {
  this.name = name;
  this.instance = null;
};
Singleton.prototype.getName = function () {
  console.log(this.name);
};
Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};
var a = Singleton.getInstance("sven1");
var b = Singleton.getInstance("sven2");
console.log(a === b); // true

// 2. 透明单例模式的实现
// CreateDiv 单例类，用来在页面中创建唯一的 div 节点
// 2.1 立即调用函数的作用是：将全局的 instance 变量变成局部变量，避免暴露出来，此处利用了闭包的特性，延续局部变量的寿命（隐式地定义了一个全局变量）
var CreateDiv = (function () {
  let instance;
  let CreateDiv = function (html) {
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();
    return (instance = this);
  };
  CreateDiv.prototype.init = function () {
    let div = document.createElement("div");
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };
  return CreateDiv;
})();
// var a = new CreateDiv("sven1");
// var b = new CreateDiv("sven2");
// console.log(a === b); // true

// 2.2 以下两段代码不使用 立即调用 函数实现
// 与上面的区别是不声明单独的 instance 变量，而是直接定义在 CreateDiv 类上
// instance 定义在哪里都无所谓，要么定义在某个全局对象上（比如下面的CreateDiv2甚至是原型对象也可），要么用闭包的方式（2.1实现）
class CreateDiv2 {
  constructor(html) {
    if (!CreateDiv.instance) {
      this.html = html;
      this.init();
      CreateDiv.instance = this;
    }
    return CreateDiv.instance;
  }
  init() {
    let div = document.createElement("div");
    div.innerHTML = this.html;
    document.body.appendChild(div);
  }
}

function CreateDiv3(html) {
  if (!CreateDiv3.instance) {
    this.html = html;
    this.init();
    CreateDiv3.instance = this;
  }
  return CreateDiv3.instance;
}

CreateDiv3.prototype.init = function () {
  let div = document.createElement("div");
  div.innerHTML = this.html;
  document.body.appendChild(div);
};
// var a = new CreateDiv3("sven1");
// var b = new CreateDiv3("sven2");
// console.log(a === b); // true

// 3. 用代理实现单例模式
// 3.1 先定义一个普通的类（非单例模式）
let createDiv4 = function (html) {
  this.html = html;
  this.init();
};
CreateDiv.prototype.init = function () {
  var div = document.createElement("div");
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

// 3.2 引入代理类 proxySingletonCreateDiv
let proxySingletonCreateDiv = (function () {
  var instance;
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  };
})();
let a1 = new proxySingletonCreateDiv("seven1");
let b1 = new proxySingletonCreateDiv("seven2");
console.log(a1 === b1); // true

// 4. 惰性单例
// 4.1 抽出管理单例的逻辑，参数 fn 是具体要实现的逻辑
// 返回的是一个函数，其中，result保存了fn的计算结果，如果result已经被赋值，以后都将返回这个值
var getSingle = function (fn) {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};

// 4.2 创建登录浮窗函数
var createLoginLayer = function () {
  var div = document.createElement("div");
  div.innerHTML = "我是登录浮窗";
  div.style.display = "none"; // 先将浮窗设置为 none
  document.body.appendChild(div);
  return div;
};
var createSingleLoginLayer = getSingle(createLoginLayer);

// 4.2.1 在点击时创建浮窗，而非在一开始就创建，并没有使用基于类的单例，而是通过函数直接返回的对象
document.getElementById("loginBtn").onclick = function () {
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = "block";
};
