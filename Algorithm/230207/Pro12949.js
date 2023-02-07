function solution(arr1, arr2) {
  const row = arr1.length;
  const col = arr2[0].length;
  const answer = Array.from(Array(row), () => Array(col).fill(0));

  let i = 0;
  let j = 0;
  while (i < row) {
    let value = 0;
    for (let k = 0; k < arr2.length; k++) {
      value += arr1[i][k] * arr2[k][j];
    }
    answer[i][j] = value;

    if (++j === col) {
      j = 0;
      i++;
    }
  }
  return answer;
}
