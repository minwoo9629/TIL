function solution(n, t, m, p) {
  // n 진법 숫자의 개수 t 참가하는 인원 m 튜브의 순서 p
  var answer = "";
  let word = "";
  for (let i = 0; i < t * m; i++) {
    if (answer.length > t * m) {
      break;
    }
    word += i.toString(n).toUpperCase();
  }
  let idx = p - 1;
  let cnt = t;
  while (cnt-- > 0) {
    answer += word.charAt(idx);
    idx += m;
  }
  return answer;
}
