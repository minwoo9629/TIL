function solution(n, paths, gates, summits) {
  var answer = [-1, Number.MAX_SAFE_INTEGER];

  const costs = {};
  for (const [p1, p2, cost] of paths) {
    costs[p1] ? costs[p1].push([p2, cost]) : (costs[p1] = [[p2, cost]]);
    costs[p2] ? costs[p2].push([p1, cost]) : (costs[p2] = [[p1, cost]]);
  }

  const gate = {};
  let queue = [];
  for (const g of gates) {
    gate[g] = true;
    queue.push([g, 0]);
  }

  const summit = {};
  for (const s of summits) {
    summit[s] = true;
  }

  const discovered = Array(n + 1).fill(-1);

  while (queue.length !== 0) {
    const size = queue.length;
    const nextQueue = [];
    for (let i = 0; i < size; i++) {
      const [location, intensity] = queue.pop();
      for (const [next, cnt] of costs[location]) {
        if (gate[next]) {
          continue;
        }
        const newIntensity = Math.max(intensity, cnt);
        if (newIntensity > answer[1]) {
          continue;
        }
        if (summit[next]) {
          if (answer[1] > newIntensity) {
            answer = [next, newIntensity];
          }
          if (answer[1] === newIntensity && answer[0] > next) {
            answer = [next, newIntensity];
          }
          continue;
        }
        if (discovered[next] !== -1 && discovered[next] <= newIntensity) {
          continue;
        }
        discovered[next] = newIntensity;
        nextQueue.push([next, newIntensity]);
      }
    }
    queue = nextQueue;
  }
  return answer;
}
