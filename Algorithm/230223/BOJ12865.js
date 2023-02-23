const solution = () => {
  let fs = require("fs");
  let input = fs.readFileSync("/dev/stdin").toString().split("\n");
  const [N, K] = input[0].split(" ").map(Number);
  const products = [];

  for (let i = 1; i <= N; i++) {
    const [W, V] = input[i].split(" ").map(Number);
    products.push([W, V]);
  }

  const dp = Array.from(Array(N + 1), () => Array(K + 1).fill(0));

  for (let i = 1; i <= products.length; i++) {
    for (let j = 1; j < K + 1; j++) {
      if (products[i - 1][0] <= j) {
        dp[i][j] = Math.max(
          dp[i - 1][j],
          products[i - 1][1] + dp[i - 1][j - products[i - 1][0]]
        );
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[N][K];
};

console.log(solution());
