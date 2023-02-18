let permutes;

function solution(n, weak, dist) {
  const weakLength = weak.length;

  const linearWeak = Array(weakLength * 2 - 1).fill(0);

  for (let i = 0; i < weakLength * 2 - 1; i++) {
    linearWeak[i] = i < weakLength ? weak[i] : weak[i - weakLength] + n;
  }
  dist.sort((a, b) => b - a);

  const discovered = Array(dist.length - 1).fill(false);
  for (let i = 1; i <= dist.length; i++) {
    permutes = [];
    permutation(dist, i, discovered, []);

    for (const permute of permutes) {
      for (let j = 0; j < weakLength; j++) {
        let candidate = linearWeak.slice(j, j + weakLength);
        for (const p of permute) {
          const endPoint = candidate[0] + p;

          candidate = candidate.filter((item) => item > endPoint);
          if (!candidate.length) {
            return i;
          }
        }
      }
    }
  }
  return -1;
}

const permutation = (dist, cnt, discovered, permute) => {
  if (permute.length === cnt) {
    permutes.push([...permute]);
    return;
  }

  for (let i = 0; i < dist.length; i++) {
    if (!discovered[i]) {
      discovered[i] = true;
      permute.push(dist[i]);
      permutation(dist, cnt, discovered, permute);
      permute.pop();
      discovered[i] = false;
    }
  }
};

let n = 12;
let weak = [1, 5, 6, 10];
let dist = [1, 2, 3, 4];
console.log(solution(n, weak, dist));
