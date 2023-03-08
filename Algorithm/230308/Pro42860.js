function solution(name) {
  let answer = Number.MAX_SAFE_INTEGER;
  const alphaCnt = [...name].map((alpha) =>
    Math.min(
      alpha.charCodeAt(alpha) - "A".charCodeAt(),
      "Z".charCodeAt() - alpha.charCodeAt() + 1
    )
  );
  let upDownCnt = alphaCnt.reduce((acc, v) => (acc += v), 0);
  const dfs = (idx, moveCnt) => {
    const temp = alphaCnt[idx];
    alphaCnt[idx] = 0;
    // 기저조건
    const sum = alphaCnt.reduce((acc, v) => (acc += v), 0);
    if (sum === 0) {
      alphaCnt[idx] = temp;
      answer = Math.min(answer, upDownCnt + moveCnt);
      return;
    }
    let right = 1;
    while (alphaCnt[(idx + right) % alphaCnt.length] === 0) {
      right++;
    }
    let left = 1;
    while (true) {
      const next = idx < left ? name.length - left + idx : idx - left;
      if (alphaCnt[next] === 0) {
        left++;
      } else {
        break;
      }
    }
    dfs((idx + right) % alphaCnt.length, moveCnt + right);
    dfs(idx < left ? name.length - left + idx : idx - left, moveCnt + left);
    alphaCnt[idx] = temp;
  };

  dfs(0, 0);
  return answer;
}
