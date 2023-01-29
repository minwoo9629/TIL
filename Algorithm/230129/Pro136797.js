const memoizationWeight = [
  [1, 7, 6, 7, 5, 4, 5, 3, 2, 3],
  [7, 1, 2, 4, 2, 3, 5, 4, 5, 6],
  [6, 2, 1, 2, 3, 2, 3, 5, 4, 5],
  [7, 4, 2, 1, 5, 3, 2, 6, 5, 4],
  [5, 2, 3, 5, 1, 2, 4, 2, 3, 5],
  [4, 3, 2, 3, 2, 1, 2, 3, 2, 3],
  [5, 5, 3, 2, 4, 2, 1, 5, 3, 2],
  [3, 4, 5, 6, 2, 3, 5, 1, 2, 4],
  [2, 5, 4, 5, 3, 2, 3, 2, 1, 2],
  [3, 6, 5, 4, 5, 3, 2, 4, 2, 1],
];

function solution(numbers) {
  var answer = Number.MAX_SAFE_INTEGER;
  let positionCnt = {};
  positionCnt[[4, 6]] = 0;
  for (let num of numbers) {
    num = Number.parseInt(num);
    const nextPositionCnt = {};
    for (const key in positionCnt) {
      const [left, _, right] = key;
      if (left === right) {
        continue;
      }
      const weight = positionCnt[[left, right]];
      if (right === num) {
        if (
          nextPositionCnt[[left, num]] === undefined ||
          weight + 1 < nextPositionCnt[[left, num]]
        ) {
          nextPositionCnt[[left, num]] = weight + 1;
        }
      } else if (left === num) {
        if (
          nextPositionCnt[[num, right]] === undefined ||
          weight + 1 < nextPositionCnt[[num, right]]
        ) {
          nextPositionCnt[[num, right]] = weight + 1;
        }
      } else {
        if (
          nextPositionCnt[[left, num]] === undefined ||
          weight + memoizationWeight[right][num] < nextPositionCnt[[left, num]]
        ) {
          nextPositionCnt[[left, num]] = weight + memoizationWeight[right][num];
        }
        if (
          nextPositionCnt[[num, right]] === undefined ||
          weight + memoizationWeight[left][num] < nextPositionCnt[[num, right]]
        ) {
          nextPositionCnt[[num, right]] = weight + memoizationWeight[left][num];
        }
      }
    }
    positionCnt = nextPositionCnt;
  }
  for (const key in positionCnt) {
    answer = Math.min(positionCnt[key], answer);
  }
  return answer;
}
