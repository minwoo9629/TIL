function solution(k, ranges) {
  var answer = [];
  let graph = [];
  graph = lotharCollatz(0, k, graph);
  const widths = [0];
  for (let i = 0; i < graph.length - 1; i++) {
    const width = widths[i] + (graph[i][1] + graph[i + 1][1]) / 2;
    widths.push(width);
  }

  for (const [start, end] of ranges) {
    if (start > widths.length + end - 1) {
      answer.push(-1);
    } else {
      answer.push(widths[widths.length + end - 1] - widths[start]);
    }
  }
  return answer;
}

const lotharCollatz = (idx, num, graph) => {
  if (num === 1) {
    graph.push([idx, num]);
    return graph;
  }
  graph.push([idx, num]);

  graph =
    num % 2 === 0
      ? lotharCollatz(idx + 1, Math.floor(num / 2), graph)
      : lotharCollatz(idx + 1, num * 3 + 1, graph);

  return graph;
};
