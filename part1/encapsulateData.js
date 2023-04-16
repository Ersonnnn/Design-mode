// 数据封装
// 使用立即调用函数实现对私有数据（外部无法访问）的封装
// 对标的是：当直接定义对象时，无法在对象中定义私有变量
var myObject = (function () {
  var __name = "sven"; // 私有(private)变量
  return {
    getName: function () {
      return __name;
    },
  };
})();
console.log(myObject.getName()); // 输出：sven
console.log(myObject.__name); // 输出 undefined