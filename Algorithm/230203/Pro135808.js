function solution(k, m, score) {
  var answer = 0;
  score.sort((a, b) => a - b);
  let minScore = Number.MAX_SAFE_INTEGER;
  let box = [];
  while (score.length !== 0) {
    const s = score.pop();
    minScore = Math.min(s, minScore);
    box.push(s);
    if (box.length === m) {
      answer += m * minScore;
      box = [];
      minScore = Number.MAX_SAFE_INTEGER;
    }
  }
  return answer;
}
