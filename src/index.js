function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  const openBrackets = expr.match(/[(]/g);
  const closeBrackets = expr.match(/[)]/g);

  if ((!openBrackets && closeBrackets) || (openBrackets && !closeBrackets))
    throw "ExpressionError: Brackets must be paired";
  if (openBrackets && closeBrackets) {
    if (openBrackets.length !== closeBrackets.length) {
      throw "ExpressionError: Brackets must be paired";
    }
  }
  let ints = [];
  let chars = [];
  const priority = {
    "-": 1,
    "+": 1,
    "*": 2,
    "/": 2
  };
  let stronka = expr.split("");
  const makeOp = () => {
    const op2 = ints.pop();
    const op1 = ints.pop();
    switch (chars.pop()) {
      case "+":
        ints.push(op1 + op2);
        break;
      case "-":
        ints.push(op1 - op2);
        break;
      case "*":
        ints.push(op1 * op2);
        break;
      case "/": {
        if (op2 === 0) throw new TypeError("TypeError: Division by zero.");
        ints.push(op1 / op2);
        break;
      }
    }
  };

  const checkPrioru = op => (priority[op] ? priority[op] : 0);
  for (let i = 0; i < stronka.length; i++) {
    if (stronka[i] === " ") {
      continue;
    } else if (!isNaN(stronka[i])) {
      let number = stronka[i];
      while (!isNaN(stronka[i + 1]) && stronka[i + 1] !== " ") {
        number += stronka[i + 1];
        i++;
      }
      ints.push(Number(number));
    } else if (checkPrioru(stronka[i]) !== 0) {
      if (
        checkPrioru(stronka[i]) < checkPrioru(chars[chars.length - 1]) &&
        chars[chars.length - 1] !== "(" &&
        chars[chars.length - 1] !== ")"
      ) {
        makeOp();
        while (
          checkPrioru(stronka[i]) < checkPrioru(chars[chars.length - 1]) &&
          chars[chars.length - 1] !== "(" &&
          chars[chars.length - 1] !== ")"
        )
          makeOp();
      }
      if (checkPrioru(stronka[i]) === checkPrioru(chars[chars.length - 1])) {
        makeOp();
        while (
          checkPrioru(stronka[i]) === checkPrioru(chars[chars.length - 1]) &&
          chars.length !== 0 &&
          chars[chars.length - 1] !== "(" &&
          chars[chars.length - 1] !== ")"
        ) {
          makeOp();
        }
      }
      chars.push(stronka[i]);
    } else if (stronka[i] === "(") {
      chars.push(stronka[i]);
    } else if (stronka[i] === ")") {
      while (chars[chars.length - 1] !== "(") {
        makeOp();
      }
      chars.pop();
    }
  }
  while (chars.length !== 0) makeOp();
  return ints.pop();
}

module.exports = {
  expressionCalculator
};
