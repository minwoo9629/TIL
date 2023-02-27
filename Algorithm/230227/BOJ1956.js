const solution = () => {
  let fs = require("fs");
  const input = fs.readFileSync("/dev/stdin").toString().split("\n");
  const [V, E] = input[0].split(" ").map(Number);
  const adjArr = Array.from(Array(V + 1), () => Array(V + 1).fill(0));
  for (let i = 1; i <= E; i++) {
    const [from, to, cost] = input[i].split(" ").map(Number);
    adjArr[from][to] = cost;
  }

  let answer = Number.MAX_SAFE_INTEGER;

  const dfs = (start, cur, cost) => {
    if (cost > answer) {
      return;
    }
    if (adjArr[cur][start] !== 0) {
      answer = Math.min(answer, cost + adjArr[cur][start]);
    }
    for (let next = 1; next <= V; next++) {
      if (!discovered[next] && adjArr[cur][next] !== 0) {
        discovered[next] = true;
        dfs(start, next, cost + adjArr[cur][next]);
        discovered[next] = false;
      }
    }
  };
  const discovered = Array(V + 1).fill(false);
  for (let i = 1; i <= V; i++) {
    discovered[i] = true;
    dfs(i, i, 0);
    discovered[i] = false;
  }
  return answer === Number.MAX_SAFE_INTEGER ? -1 : answer;
};

console.log(solution());
