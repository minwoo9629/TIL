let parent;
function solution(n, costs) {
  var answer = 0;
  parent = Array(n)
    .fill()
    .map((_, idx) => idx);
  costs.sort((a, b) => a[2] - b[2]);
  for (const [num1, num2, cost] of costs) {
    if (union(num1, num2)) {
      answer += cost;
    }
  }
  return answer;
}

const union = (num1, num2) => {
  const p1 = find(num1);
  const p2 = find(num2);
  if (p1 === p2) {
    return false;
  }
  if (p1 < p2) {
    parent[p2] = p1;
  } else {
    parent[p1] = p2;
  }
  return true;
};

const find = (num) => {
  if (num === parent[num]) {
    return num;
  }
  return (parent[num] = find(parent[num]));
};
