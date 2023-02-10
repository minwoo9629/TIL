function solution(distance, rocks, n) {
  var answer = 0;
  rocks.sort((a, b) => a - b);
  let left = 0;
  let right = distance;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let cur = 0;
    let removeCnt = 0;
    for (const rock of rocks) {
      rock - cur >= mid ? (cur = rock) : removeCnt++;
    }
    if (cur === rocks[rocks.length - 1]) {
      if (distance - cur < mid) {
        removeCnt++;
      }
    }

    if (removeCnt > n) {
      right = mid - 1;
    } else {
      left = mid + 1;
      answer = mid;
    }
  }
  return answer;
}
