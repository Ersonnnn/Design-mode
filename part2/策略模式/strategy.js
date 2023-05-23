// 策略模式
// 1. 使用策略模式计算奖金
// 1.1 最初的代码实现
// 缺点：函数较庞大，包含很多 if-else 语句，复用性差，缺乏弹性（不好扩展），违反开放-封闭原则
var calculateBonus = function (performanceLevel, salary) {
  if (performanceLevel === "S") {
    return salary * 4;
  }
  if (performanceLevel === "A") {
    return salary * 3;
  }
  if (performanceLevel === "B") {
    return salary * 2;
  }
};
calculateBonus("B", 20000); // 40000
calculateBonus("S", 6000); // 24000

// 1.2 使用组合函数重构代码
// 个人理解相比第一种的优点：如果要改系数时，只用改相应函数中的即可，不用深入到函数中，查看每个分支去修改
// 缺点：相比 1.1 并没有改善太多，只是将每个 if-else 里面的内容封装起来了，当函数越来越庞大时，仍然缺乏弹性（不好扩展）
/** MCopilot口述的优点：这种做法使得每个函数只需要关注自己的计算逻辑，代码的可读性、可维护性以及复用性都得到了提升。
 * 而且，如果要修改计算奖金系数的话，只需要修改相应的函数，而不会对其他部分造成影响，具有一定的弹性和扩展性，实现了开放-封闭原则。*/
var performanceS = function (salary) {
  return salary * 4;
};
var performanceA = function (salary) {
  return salary * 3;
};
var performanceB = function (salary) {
  return salary * 2;
};
var calculateBonus = function (performanceLevel, salary) {
  if (performanceLevel === "S") {
    return performanceS(salary);
  }
  if (performanceLevel === "A") {
    return performanceA(salary);
  }
  if (performanceLevel === "B") {
    return performanceB(salary);
  }
};

// 1.3 使用策略模式重构代码 之 传统的面向对象语言的实现
// step1: 定义一组策略类
var performanceS = function () {};
performanceS.prototype.calculate = function (salary) {
  return salary * 4;
};
var performanceA = function () {};
performanceA.prototype.calculate = function (salary) {
  return salary * 3;
};
var performanceB = function () {};
performanceB.prototype.calculate = function (salary) {
  return salary * 2;
};
// step2：定义环境类Context —— 奖金类 Bonus:
var Bonus = function () {
  this.salary = null; // 原始工资
  this.strategy = null; // 绩效等级对应的策略对象
};
Bonus.prototype.setSalary = function (salary) {
  this.salary = salary; // 设置员工的原始工资
};
Bonus.prototype.setStrategy = function (strategy) {
  this.strategy = strategy; // 设置员工绩效等级对应的策略对象
};
Bonus.prototype.getBonus = function () {
  // 取得奖金数额
  return this.strategy.calculate(this.salary); // 把计算奖金的操作委托给对应的策略对象
};
// 使用
// 创建一个bonus对象，并给bonus对象设置一些原始数据，接下来把某个计算奖金的策略对象传入bonus对象。
var bonus = new Bonus();
bonus.setSalary(10000);
bonus.setStrategy(new performanceS());
console.log(bonus.getBonus()); // 输出 40000

// 1.4 JavaScript版本的策略模式 —— 函数也是对象

// 定义策略类
const bonusStrategy = {
  S: salary => salary * 4,
  A: salary => salary * 3,
  B: salary => salary * 2,
};
//定义环境类Context —— 直接使用函数
var calculateBonus = function(level, salary) {
  return bonusStrategy[level](salary)
}
//使用
console.log(calculateBonus('S', 2000)); // 8000

// 1.5 平时更常用的JavaScript实现——直接将函数作为参数传递（高阶函数）
// 根本看不出是策略类
var S = salary => salary * 4
var A = salary => salary * 3
var B = salary => salary * 2
var calculateBonus = function(func, salary) {
  return func(salary)
}
calculateBonus(S, 1000) // 4000

