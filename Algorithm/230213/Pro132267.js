function solution(a, b, n) {
  var answer = 0;
  while (n >= a) {
    const share = Math.floor(n / a);
    n %= a;
    answer += share * b;
    n += share * b;
  }
  return answer;
}
