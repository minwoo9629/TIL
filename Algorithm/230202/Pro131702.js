const direction = [
  [0, 0],
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let size = 0;
const permute = [];

let minCnt = Number.MAX_SAFE_INTEGER;
function solution(clockHands) {
  size = clockHands.length;
  permutation(clockHands);
  return minCnt;
}

const permutation = (clockHands) => {
  if (permute.length === size) {
    const copyClock = clockHands.map((item) => [...item]);
    playPuzzle(copyClock);
    return;
  }

  for (let i = 0; i < 4; i++) {
    permute.push(i);
    permutation(clockHands);
    permute.pop();
  }
};

const playPuzzle = (clock) => {
  let cnt = 0;
  for (let i = 0; i < size; i++) {
    const rotaionCnt = permute[i];
    roation(0, i, clock, rotaionCnt);
    cnt += rotaionCnt;
  }
  if (cnt > minCnt) {
    return;
  }

  for (let i = 1; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const rotaionCnt = (4 - clock[i - 1][j]) % 4;
      roation(i, j, clock, rotaionCnt);
      cnt += rotaionCnt;
      if (cnt > minCnt) {
        return;
      }
    }
  }

  if (check(clock)) {
    minCnt = Math.min(minCnt, cnt);
  }
};

const roation = (x, y, clockHands, cnt) => {
  for (const [dx, dy] of direction) {
    const nx = x + dx;
    const ny = y + dy;
    if (rangeCheck(nx, ny)) {
      clockHands[nx][ny] = (clockHands[nx][ny] + cnt) % 4;
    }
  }
};

const rangeCheck = (nx, ny) => {
  return 0 <= nx && nx < size && 0 <= ny && ny < size;
};
const check = (clockHands) => {
  const sum = clockHands
    .map((item) => {
      return item.reduce((acc, curValue) => {
        acc += curValue;
        return acc;
      });
    })
    .reduce((acc, curValue) => {
      return (acc += curValue);
    });
  return sum === 0;
};
