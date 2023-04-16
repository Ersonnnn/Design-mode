// 1. 作为对象的方法调用
var obj = {
  a: 1,
  getA: function () {
    console.log(this.a); // 1
    console.log(this === obj); // true
  },
};

obj.getA();

// 2. 作为普通函数调用，注意：node环境下全局对象是 global，浏览器中是window。此处是在node环境下运行，因此我设置的 global
global.name = "globalName";
var getName = function () {
  return this.name;
};
console.log(getName());

global.name = "globalName";
var myObject = {
  name: "sven",
  getName: function () {
    return this.name;
  },
};
// 输出:globalName
var getName = myObject.getName;
console.log(getName()); // globalName

// 3. 构造器调用
var MyClass = function () {
  this.name = "sven";
};
var obj2 = new MyClass();
console.log(obj2.name); // 输出:sven

// 3.1 构造器返回对象
var MyClass = function () {
  this.name = "sven";
  return {
    name: "anne",
  };
};
var obj3 = new MyClass();
console.log(obj3.name); // 输出:anne

// 3.2 构造器返回非对象类型
var MyClass = function () {
  this.name = "sven";
  return "anne";
};
var obj = new MyClass();
console.log(obj.name); // 输出:sven

// 4. call 和 apply
var obj = {
    name: 'sven',
    getName: function() {
        return this.name
    }
}

var obj2 = {
    name: 'anne'
}

console.log(obj.getName()); // sven
console.log(obj.getName.call(obj2)); // anne
