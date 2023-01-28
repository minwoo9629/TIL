function solution(scores) {
  var answer = 1;
  const [targetS1, targetS2] = scores.shift();

  // 인센티브를 받지 못하는 경우
  for (let i = 0; i < scores.length; i++) {
    const [otherS1, otherS2] = scores[i];
    if (otherS1 > targetS1 && otherS2 > targetS2) {
      return -1;
    }
  }
  scores.sort((s1, s2) => (s1[0] === s2[0] ? s1[1] - s2[1] : s2[0] - s1[0]));

  let maxScore = 0;

  for (const [s1, s2] of scores) {
    if (s2 >= maxScore) {
      maxScore = Math.max(s2, maxScore);
      if (s1 + s2 > targetS1 + targetS2) {
        answer++;
      }
    }
  }
  return answer;
}
