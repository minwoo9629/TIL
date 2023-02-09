function solution(A, B) {
  A.sort((a, b) => a - b);
  B.sort((a, b) => b - a);
  return A.reduce((acc, curValue, idx) => acc + curValue * B[idx], 0);
}
