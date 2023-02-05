function solution(dartResult) {
  var answer = 0;
  const scores = [];
  let num = 0;

  for (let i = 0; i < dartResult.length; i++) {
    if (dartResult[i] >= 0 && dartResult[i] <= 9) {
      if (dartResult[i] == 1 && dartResult[i + 1] == 0) {
        num = 10;
        i++;
      } else {
        num = dartResult[i];
      }
    } else if (dartResult[i] === "S") {
      scores.push(num ** 1);
    } else if (dartResult[i] === "D") {
      scores.push(num ** 2);
    } else if (dartResult[i] === "T") {
      scores.push(num ** 3);
    } else if (dartResult[i] === "#") {
      scores[scores.length - 1] *= -1;
    } else if (dartResult[i] === "*") {
      scores[scores.length - 1] *= 2;
      scores[scores.length - 2] *= 2;
    }
  }
  answer = scores.reduce((acc, curValue) => {
    acc += curValue;
    return acc;
  }, 0);
  return answer;
}
