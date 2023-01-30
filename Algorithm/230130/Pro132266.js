function solution(n, roads, sources, destination) {
  var answer = [];

  const map = {};

  for (const [r1, r2] of roads) {
    map[r1] ? map[r1].push(r2) : (map[r1] = [r2]);
    map[r2] ? map[r2].push(r1) : (map[r2] = [r1]);
  }

  const distance = {};
  distance[destination] = 0;

  const discovered = Array(n + 1).fill(false);
  discovered[destination] = true;
  let queue = [[destination, 0]];

  while (queue.length !== 0) {
    const nextQueue = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [location, d] = queue.pop();
      for (const nextLocation of map[location]) {
        if (!discovered[nextLocation]) {
          discovered[nextLocation] = true;
          distance[nextLocation] = d + 1;
          nextQueue.push([nextLocation, d + 1]);
        } else if (distance[nextLocation] > d + 1) {
          distance[nextLocation] = d + 1;
          nextQueue.push([nextLocation, d + 1]);
        }
      }
    }
    queue = nextQueue;
  }

  for (const s of sources) {
    if (distance[s] === undefined) {
      answer.push(-1);
    } else {
      answer.push(distance[s]);
    }
  }

  return answer;
}
