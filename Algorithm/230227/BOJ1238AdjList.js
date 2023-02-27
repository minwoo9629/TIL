const solution = () => {
  let fs = require("fs");
  let input = fs.readFileSync("/dev/stdin").toString().split("\n");
  const [N, M, X] = input[0].split(" ").map(Number);
  const adjList = {};
  for (let i = 1; i <= M; i++) {
    const [from, to, cost] = input[i].split(" ").map(Number);
    adjList[from]
      ? adjList[from].push([to, cost])
      : (adjList[from] = [[to, cost]]);
  }

  let answer = 0;
  const allDistance = {};
  for (let start = 1; start <= N; start++) {
    if (start !== X) {
      const distance = dijkstra(start, adjList, X, N);
      allDistance[start] = distance;
    }
  }

  for (let destination = 1; destination <= N; destination++) {
    if (destination !== X) {
      const distance = dijkstra(X, adjList, destination, N);
      allDistance[destination] += distance;
      answer = Math.max(answer, allDistance[destination]);
    }
  }
  return answer;
};

const dijkstra = (start, adjList, destination, N) => {
  const discovered = Array(N + 1).fill(Number.MAX_SAFE_INTEGER);
  discovered[start] = 0;
  const heap = new Heap();
  heap.add([start, 0]);

  while (heap.len !== 0) {
    const [cityNum, distance] = heap.poll();
    if (cityNum === destination) {
      return distance;
    }
    for (const [next, cost] of adjList[cityNum]) {
      const nextDistance = distance + cost;
      if (discovered[next] > nextDistance) {
        discovered[next] = nextDistance;
        heap.add([next, nextDistance]);
      }
    }
  }
};

const Heap = function () {
  this.heap = [null];
  this.len = 0;
  this.compare = function (idx1, idx2) {
    return this.heap[idx1][1] > this.heap[idx2][1];
  };
  this.add = function (value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parentIdx = Math.floor(curIdx / 2);
    while (curIdx > 1 && this.compare(parentIdx, curIdx)) {
      this.swap(parentIdx, curIdx);
      curIdx = parentIdx;
      parentIdx = Math.floor(curIdx / 2);
    }
    this.len++;
  };
  this.swap = function (idx1, idx2) {
    const temp = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    this.heap[idx2] = temp;
  };

  this.poll = function () {
    const value = this.heap[1];
    if (this.heap.length <= 2) {
      this.heap = [null];
      this.len = 0;
    } else {
      this.heap[1] = this.heap.pop();
      this.len--;
    }

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;
    if (!this.heap[leftIdx]) {
      return value;
    }
    if (!this.heap[rightIdx]) {
      if (this.compare(curIdx, leftIdx)) {
        this.swap(leftIdx, curIdx);
      }
      return value;
    }

    while (this.compare(curIdx, leftIdx) || this.compare(curIdx, rightIdx)) {
      const minIdx = this.compare(leftIdx, rightIdx) ? rightIdx : leftIdx;
      this.swap(minIdx, curIdx);
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
      if (leftIdx > this.len || rightIdx > this.len) {
        break;
      }
    }

    return value;
  };
};
console.log(solution());
