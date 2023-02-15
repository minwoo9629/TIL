function solution(n) {
  // 2의 보수연산을 생각하여 제일 오른쪽에 있는 1을 구한다.
  // -15 => -1111 => 2의 보수연산 => 0000 + 1 = 1
  const right = n & -n;
  const nextNum = n + right;
  const pattern = ((n ^ nextNum) / right) >> 2;
  return nextNum | pattern;
}
