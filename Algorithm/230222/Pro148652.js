function solution(n, l, r) {
  const ONE = "11011";
  const dfs = (location) => {
    if (location <= 5) {
      return [...ONE]
        .slice(0, location)
        .reduce((acc, curValue) => acc + +curValue, 0);
    }
    let n = 2;
    while (5 ** n < location) {
      n += 1;
    }
    const sectionCnt = 5 ** (n - 1);
    const sectionNum = Math.floor(location / sectionCnt);
    const remain = location % sectionCnt;

    // secionNum 만큼 앞에가 완성되어있음
    let oneBitCnt = 4 ** (n - 1) * sectionNum;
    // 0만 있는 section 이후라면 0번 섹션에 대해서도 카운팅 되므로 그 값을 빼준다.
    if (sectionNum >= 3) {
      oneBitCnt -= 4 ** (n - 1);
    }
    // section이 세번째인 부분은 전부 0인 부분이다.
    if (sectionNum === 2) {
      return oneBitCnt;
    } else {
      return (oneBitCnt += dfs(remain));
    }
  };

  return dfs(r) - dfs(l - 1);
}
