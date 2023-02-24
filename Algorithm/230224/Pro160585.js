function solution(board) {
  const direction = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  let oCount = 0;
  let xCount = 0;
  const oLocations = [];
  const xLocations = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "O") {
        oLocations.push([i, j]);
        oCount++;
      }
      if (board[i][j] === "X") {
        xLocations.push([i, j]);
        xCount++;
      }
    }
  }
  if (oCount < xCount || oCount - xCount >= 2) {
    return 0;
  }
  for (const [x, y] of oLocations) {
    for (const [dx, dy] of direction) {
      const nx = x + dx;
      const ny = y + dy;
      const nx2 = x + dx * 2;
      const ny2 = y + dy * 2;
      if (check(nx, ny) && check(nx2, ny2)) {
        if (board[x][y] === board[nx][ny] && board[x][y] === board[nx2][ny2]) {
          if (oCount - xCount === 1) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    }
  }

  for (const [x, y] of xLocations) {
    for (const [dx, dy] of direction) {
      const nx = x + dx;
      const ny = y + dy;
      const nx2 = x + dx * 2;
      const ny2 = y + dy * 2;
      if (check(nx, ny) && check(nx2, ny2)) {
        if (board[x][y] === board[nx][ny] && board[x][y] === board[nx2][ny2]) {
          if (oCount === xCount) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    }
  }
  return 1;
}

const check = (x, y) => {
  return 0 <= x && x < 3 && 0 <= y && y < 3;
};
