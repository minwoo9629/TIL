function solution(data, col, row_begin, row_end) {
  var answer = 0;
  data.sort((arr1, arr2) => {
    if (arr1[col - 1] !== arr2[col - 1]) {
      return arr1[col - 1] - arr2[col - 1];
    } else {
      return arr2[0] - arr1[0];
    }
  });
  for (let i = row_begin - 1; i < row_end; i++) {
    let res = 0;
    for (const num of data[i]) {
      res += num % (i + 1);
    }
    answer = answer ^ res;
  }

  return answer;
}
