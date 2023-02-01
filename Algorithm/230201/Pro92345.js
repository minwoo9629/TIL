const direction = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function solution(board, aloc, bloc) {
  const [winner, answer] = dfs(...aloc, ...bloc, board, 0);

  return answer;
}

const dfs = (ax, ay, bx, by, board, turn) => {
  const x = turn % 2 === 0 ? ax : bx;
  const y = turn % 2 === 0 ? ay : by;

  const nextLocation = move(x, y, board);

  // nextLocation의 길이가 0인 경우는 이동할 수 없음을 나타낸다.
  if (nextLocation.length === 0) {
    // turn % 2 === 0이 true면 A false면 B
    const curTurn = turn % 2 === 0;
    // 이동할 수 없는 경우면 자신이 아닌 상대방이 승리한 것
    return [!curTurn, turn];
  }

  if (ax === bx && ay === by) {
    return [turn % 2 === 0, turn + 1];
  }

  // 현재 진행하고 있는 사람이 이기는 경우
  const curTurnWin = [];
  // 현재 진행하고 있는 사람이 패배하는 경우
  const curTurnLose = [];
  // A가 이동
  if (turn % 2 === 0) {
    board[ax][ay] = 0;
    for (const [nx, ny] of nextLocation) {
      const [winner, cnt] = dfs(nx, ny, bx, by, board, turn + 1);
      if (winner) {
        curTurnWin.push(cnt);
      } else {
        curTurnLose.push(cnt);
      }
    }

    board[ax][ay] = 1;
  }
  // B 가 이동
  else {
    board[bx][by] = 0;
    for (const [nx, ny] of nextLocation) {
      const [winner, cnt] = dfs(ax, ay, nx, ny, board, turn + 1);
      if (!winner) {
        curTurnWin.push(cnt);
      } else {
        curTurnLose.push(cnt);
      }
    }
    board[bx][by] = 1;
  }

  // turn % 2 === 0이 true면 A false면 B
  const curTurn = turn % 2 === 0;
  if (curTurnWin.length > 0) {
    return [
      curTurn,
      curTurnWin.reduce((acc, curValue) => {
        return Math.min(acc, curValue);
      }, 100000),
    ];
  } else {
    return [
      !curTurn,
      curTurnLose.reduce((acc, curValue) => {
        return Math.max(acc, curValue);
      }, -1),
    ];
  }
};

const move = (x, y, board) => {
  const nextLocation = [];
  for (const [dx, dy] of direction) {
    const nx = x + dx;
    const ny = y + dy;
    if (check(nx, ny, board) && board[nx][ny] !== 0) {
      nextLocation.push([nx, ny]);
    }
  }
  return nextLocation;
};

const check = (nx, ny, board) => {
  return 0 <= nx && nx < board.length && 0 <= ny && ny < board[0].length;
};
