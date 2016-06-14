function sum(...args) {
  let result = 0;
  for (let i = 0; i < args.length; i++) {
    result += args[i];
  }
  return result;
}

// console.log(sum(1, 2, 3, 4)); // 10
// console.log(sum(1, 2, 3, 4, 5)); // 15

// simple myBind with no args
Function.prototype.myBind = function (ctx) {
  return () => this.apply(ctx);
};

// myBind with arguments
Function.prototype.myBind = function (ctx, ...bindArgs) {
  return (...callArgs) => {
    return this.apply(ctx, bindArgs.concat(callArgs));
  };
};

// const Cat = function (name) {
//   this.name = name;
// };
//
// Cat.prototype.meow = function () {
//   console.log(this.name + " says meow!");
// };
//
// const curie = new Cat("Curie");
// setTimeout(curie.meow.myBind(curie), 1000);

function curriedSum(numArgs) {
  let numbers = [];
  let sum = 0;
  return function _curriedSum(num) {
    if (numbers.length === numArgs - 1) {
      numbers.push(num);
      for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
      }
      return sum;
    }
    else {
      numbers.push(num);
      return _curriedSum;
    }
  }
}
// let sumCurry = curriedSum(4);
// console.log(sumCurry = sumCurry(5));
// console.log(sumCurry = sumCurry(30));
// console.log(sumCurry = sumCurry(20));
// console.log(sumCurry = sumCurry(1));

Function.prototype.curry = function (numArgs) {
  let numbers = [];
  let that = this;
  return function _curriedFn(num) {
    if (numbers.length === numArgs - 1) {
      numbers.push(num);
      return that.apply(this, [numbers]);
    }
    else {
      numbers.push(num);
      return _curriedFn;
    }
  }
};

fun = function functionName(args) {
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum += args[i];
  }
  return sum;
}
// console.log(fun.curry(3)(1)(3)(10));
