function solution(n, m, section) {
  let left = section[0];
  let right = left + m - 1;
  var answer = 1;
  let cnt = 0;
  let idx = 0;
  while (cnt !== section.length) {
    if (left <= section[idx] && section[idx] <= right) {
      cnt++;
      idx++;
    } else {
      left = section[idx];
      right = section[idx] + m - 1;
      answer++;
    }
  }
  return answer;
}
