function solution(n, left, right) {
  const answer = Array(right - left + 1)
    .fill(0)
    .reduce((acc, _, idx) => {
      const x = Math.floor((idx + left) / n);
      const y = (idx + left) % n;
      acc.push(Math.max(x + 1, y + 1));
      return acc;
    }, []);
  return answer;
}

let n = 4;
let left = 7;
let right = 14;

console.log(solution(n, left, right));
