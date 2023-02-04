function solution(arr) {
  var answer = [];

  for (const num of arr) {
    if (answer[answer.length - 1] !== num) {
      answer.push(num);
    }
  }

  return answer;
}
