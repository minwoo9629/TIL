function solution(land) {
  var answer = 0;
  for (let i = 0; i < land.length - 1; i++) {
    for (let j = 0; j < 4; j++) {
      const temp = land[i + 1][j];
      for (let k = 0; k < 4; k++) {
        if (j !== k) {
          land[i + 1][j] = Math.max(land[i + 1][j], temp + land[i][k]);
          answer = Math.max(answer, land[i + 1][j]);
        }
      }
    }
  }
  return answer;
}
