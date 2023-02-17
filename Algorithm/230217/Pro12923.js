function solution(begin, end) {
  var answer = [];
  for (let i = begin; i <= end; i++) {
    if (i === 1) {
      answer.push(0);
      continue;
    }
    if (i <= 3) {
      answer.push(1);
      continue;
    }
    let maxDivide = 1;
    for (let divide = 2; divide <= Math.floor(Math.sqrt(i)); divide++) {
      if (i % divide === 0) {
        const share = i / divide;
        if (share <= 10000000) {
          maxDivide = Math.max(maxDivide, i / divide);
          break;
        } else {
          maxDivide = Math.max(maxDivide, divide);
        }
      }
    }
    answer.push(maxDivide);
  }
  return answer;
}
