function solution(s, skip, index) {
  var answer = "";
  const check = Array(26).fill(false);
  for (const alpha of skip) {
    const alphaToNum = alpha.charCodeAt();
    check[alphaToNum - 97] = true;
  }

  for (let alpha of s) {
    let cnt = 0;
    let alphaToNum = alpha.charCodeAt();
    while (true) {
      alphaToNum = alphaToNum + 1 === 123 ? 97 : alphaToNum + 1;
      if (!check[alphaToNum - 97]) {
        if (++cnt === index) {
          break;
        }
      }
    }
    answer += String.fromCharCode(alphaToNum);
  }
  return answer;
}
