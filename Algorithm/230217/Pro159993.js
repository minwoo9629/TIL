const direction = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

let row, col;
function solution(maps) {
  let startX, startY, endX, endY, leverX, leverY;
  row = maps.length;
  col = maps[0].length;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (maps[i][j] === "S") {
        startX = i;
        startY = j;
      }
      if (maps[i][j] === "E") {
        endX = i;
        endY = j;
      }
      if (maps[i][j] === "L") {
        leverX = i;
        leverY = j;
      }
    }
  }
  const d1 = bfs(startX, startY, leverX, leverY, maps);
  if (d1 === -1) {
    return -1;
  }

  const d2 = bfs(leverX, leverY, endX, endY, maps);

  if (d2 === -1) {
    return -1;
  }
  return d1 + d2;
}

const bfs = (sx, sy, ex, ey, maps) => {
  const discovered = Array.from(Array(maps.length), () =>
    Array(maps[0].length).fill(false)
  );

  discovered[sx][sy] = true;
  let queue = [[sx, sy, 0]];

  while (queue.length !== 0) {
    const size = queue.length;
    const nextQueue = [];
    for (let i = 0; i < size; i++) {
      const [x, y, cnt] = queue.pop();

      for (const [dx, dy] of direction) {
        const nx = x + dx;
        const ny = y + dy;
        if (check(nx, ny) && !discovered[nx][ny] && maps[nx][ny] !== "X") {
          if (nx === ex && ny === ey) {
            return cnt + 1;
          }
          discovered[nx][ny] = true;
          nextQueue.push([nx, ny, cnt + 1]);
        }
      }
    }
    queue = nextQueue;
  }

  return -1;
};

const check = (x, y) => {
  return 0 <= x && x < row && 0 <= y && y < col;
};
