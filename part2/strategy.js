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
// 缺点：相比 1.1 并没有改善太多，只是将每个 if-else 里面的内容封装起来了，当函数越来越庞大时，仍然缺乏弹性（不好扩展）
