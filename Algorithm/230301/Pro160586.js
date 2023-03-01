function solution(keymap, targets) {
  var answer = [];

  for (const target of targets) {
    let cntSum = 0;
    let flag = true;
    for (const alpha of [...target]) {
      let minCnt = Number.MAX_SAFE_INTEGER;
      for (const key of keymap) {
        const index = key.indexOf(alpha);
        if (index !== -1) {
          minCnt = Math.min(minCnt, index + 1);
        }
      }
      if (minCnt !== Number.MAX_SAFE_INTEGER) {
        cntSum += minCnt;
      } else {
        flag = false;
      }
    }
    if (flag) {
      answer.push(cntSum);
    } else {
      answer.push(-1);
    }
  }
  return answer;
}
