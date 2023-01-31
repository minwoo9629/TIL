function solution(X, Y) {
  var answer = "";
  X = Array.from(X);
  Y = Array.from(Y);
  const xCnts = X.reduce((accumulator, curValue) => {
    accumulator[curValue] = (accumulator[curValue] || 0) + 1;
    return accumulator;
  }, {});
  const yCnts = Y.reduce((accumulator, curValue) => {
    accumulator[curValue] = (accumulator[curValue] || 0) + 1;
    return accumulator;
  }, {});

  const numbers = [];
  for (let i = 0; i < 10; i++) {
    const xCnt = xCnts[i];
    const yCnt = yCnts[i];
    if (xCnt && yCnt) {
      for (let j = 0; j < Math.min(xCnt, yCnt); j++) {
        numbers.push(String(i));
      }
    }
  }
  numbers.sort((a, b) => b - a);
  if (numbers.length === 0) {
    answer = "-1";
  } else if (numbers[0] !== "0") {
    answer = numbers.join("");
  } else {
    answer = "0";
  }
  return answer;
}

let x = "12321";
let y = "42531";

console.log(solution(x, y));
