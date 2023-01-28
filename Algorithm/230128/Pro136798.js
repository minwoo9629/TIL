function solution(number, limit, power) {
  var answer = 0;
  const check = { 1: 1, 2: 2 };

  for (let i = 1; i <= number; i++) {
    const num = i;
    let divisorCnt = 0;
    if (check[num]) {
      divisorCnt = check[num];
    } else {
      divisorCnt = getDivisor(num);
    }

    check[i] = divisorCnt;

    divisorCnt > limit ? (answer += power) : (answer += divisorCnt);
  }

  return answer;
}

const getDivisor = (num) => {
  let divisorCnt = 0;
  for (let i = 1; i <= Math.floor(Math.sqrt(num)); i++) {
    if (num % i === 0) {
      divisorCnt++;
      if (Math.floor(num / i) !== i) divisorCnt++;
    }
  }
  return divisorCnt;
};
