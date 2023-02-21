function solution(info, edges) {
  var answer = 0;
  const tree = {};
  for (const [node1, node2] of edges) {
    tree[node1] ? tree[node1].push(node2) : (tree[node1] = [node2]);
    tree[node2] ? tree[node2].push(node1) : (tree[node2] = [node1]);
  }

  const discovered = Array.from(Array(info.length), () =>
    Array(info.length + 1).fill(false)
  );

  discovered[0][1] = true;
  const dfs = (nodeNum, sheep, wolf, check) => {
    answer = Math.max(answer, sheep);
    for (const next of tree[nodeNum]) {
      let newSheep = sheep;
      let newWolf = wolf;
      let newCheck = { ...check };
      if (!check[next]) {
        newCheck[next] = true;
        info[next] === 0 ? newSheep++ : newWolf++;
      }
      if (newSheep === newWolf) {
        continue;
      }
      if (!discovered[next][newSheep]) {
        discovered[next][newSheep] = true;
        dfs(next, newSheep, newWolf, newCheck);
        discovered[next][newSheep] = false;
      }
    }
  };

  dfs(0, 1, 0, { 0: true });
  return answer;
}
