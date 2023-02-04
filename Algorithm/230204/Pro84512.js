const alphas = ["A", "E", "I", "O", "U"];
let cnt = 0;
function solution(word) {
  var answer = 0;
  answer = dfs([], word, 0);
  return answer;
}

const dfs = (alphaArr, word, answer) => {
  if (answer !== 0) {
    return answer;
  }
  if (alphaArr.join("") === word) {
    answer = cnt;
    return answer;
  }
  if (alphaArr.length === 5) {
    return answer;
  }

  for (const alpha of alphas) {
    alphaArr.push(alpha);
    cnt++;
    answer = dfs(alphaArr, word, answer);
    alphaArr.pop();
  }
  return answer;
};
