const direction = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

let locations, startX, startY, minDistance;

function solution(board, r, c) {
  locations = {};
  startX = r;
  startY = c;
  minDistance = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const cardNum = board[i][j];
      if (cardNum) {
        locations[cardNum]
          ? locations[cardNum].push([i, j])
          : (locations[cardNum] = [[i, j]]);
      }
    }
  }

  const size = Object.keys(locations).length;

  const discovered = Array(size + 1).fill(false);
  const permute = [];
  permutation(permute, size, discovered, board);
  return minDistance;
}

const permutation = (permute, size, discovered, board) => {
  if (permute.length === size) {
    const copyBoard = board.map((item) => [...item]);
    simulation(permute, copyBoard);
    return;
  }
  for (let i = 1; i <= size; i++) {
    if (!discovered[i]) {
      discovered[i] = true;
      permute.push(i);
      permutation(permute, size, discovered, board);
      discovered[i] = false;
      permute.pop();
    }
  }
};

const simulation = (permute, copyBoard) => {
  let queue = [[startX, startY, permute.length * 2]];

  let idx = 0;
  while (queue.length !== 0) {
    const queueSize = queue.length;
    const nextQueue = [];
    const [x1, y1] = locations[permute[idx]][0];
    const [x2, y2] = locations[permute[idx]][1];
    for (let i = 0; i < queueSize; i++) {
      const [curX, curY, distance] = queue.pop();

      const d1 =
        getDistance(curX, curY, x1, y1, copyBoard) +
        getDistance(x1, y1, x2, y2, copyBoard);
      const d2 =
        getDistance(curX, curY, x2, y2, copyBoard) +
        getDistance(x2, y2, x1, y1, copyBoard);
      if (idx === permute.length - 1) {
        minDistance = Math.min(
          minDistance,
          Math.min(distance + d1, distance + d2)
        );
        continue;
      }
      nextQueue.push([x2, y2, distance + d1]);
      nextQueue.push([x1, y1, distance + d2]);
    }
    copyBoard[x1][y1] = 0;
    copyBoard[x2][y2] = 0;
    queue = nextQueue;
    idx++;
  }
};

const getDistance = (startX, startY, targetX, targetY, copyBoard) => {
  if (startX === targetX && startY === targetY) {
    return 0;
  }
  const discovered = Array.from(Array(4), () => Array(4).fill(false));
  discovered[startX][startY] = true;
  let queue = [[startX, startY, 0]];

  while (queue.length !== 0) {
    const queueSize = queue.length;
    const nextQueue = [];
    for (let i = 0; i < queueSize; i++) {
      const [x, y, cnt] = queue.pop();
      for (let d = 0; d < 4; d++) {
        const dx = direction[d][0];
        const dy = direction[d][1];
        let nx = x + dx;
        let ny = y + dy;
        if (nx === targetX && ny === targetY) {
          return cnt + 1;
        }
        if (check(nx, ny) && !discovered[nx][ny]) {
          discovered[nx][ny] = true;
          nextQueue.push([nx, ny, cnt + 1]);
        }
        while (true) {
          if (!check(nx, ny)) {
            nx -= dx;
            ny -= dy;
            break;
          }
          if (copyBoard[nx][ny]) {
            break;
          }
          nx += dx;
          ny += dy;
        }
        if (nx === targetX && ny === targetY) {
          return cnt + 1;
        }
        if (check(nx, ny) && !discovered[nx][ny]) {
          discovered[nx][ny] = true;
          nextQueue.push([nx, ny, cnt + 1]);
        }
      }
    }
    queue = nextQueue;
  }
};

const check = (x, y) => {
  return 0 <= x && x < 4 && 0 <= y && y < 4;
};
