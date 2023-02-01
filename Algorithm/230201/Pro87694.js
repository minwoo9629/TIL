const direction = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function solution(rectangle, characterX, characterY, itemX, itemY) {
  var answer = 0;

  const map = Array.from(Array(8), () => Array(8).fill(false));
  makeMap(map, rectangle);

  let queue = [[characterX, characterY, 0]];

  map[characterX][characterY] = false;
  while (queue.length !== 0) {
    const size = queue.length;
    const nextQueue = [];
    for (let i = 0; i < size; i++) {
      const [x, y, cnt] = queue.pop();

      for (const [dx, dy] of direction) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          map[nx][ny] &&
          check(nx, ny, rectangle) &&
          canGo((x + nx) / 2, (y + ny) / 2, rectangle) &&
          check((x + nx) / 2, (y + ny) / 2, rectangle)
        ) {
          if (nx === itemX && ny === itemY) {
            return cnt + 1;
          }
          map[nx][ny] = false;
          nextQueue.push([nx, ny, cnt + 1]);
        }
      }
    }
    queue = nextQueue;
  }
  return answer;
}

const makeMap = (map, rectangle) => {
  for (const [leftX, leftY, rightX, rightY] of rectangle) {
    for (let i = leftX; i <= rightX; i++) {
      for (let j = leftY; j <= rightY; j++) {
        map[i][j] = true;
      }
    }
  }
};

// 테두리에 위치한 점인지 확인
const check = (nx, ny, rectangle) => {
  for (const [leftX, leftY, rightX, rightY] of rectangle) {
    if (leftX < nx && nx < rightX && leftY < ny && ny < rightY) {
      return false;
    }
  }
  return true;
};

// 좌표평면으로 표현하면 두 좌표 사이의 길이 포함되어야 한다.
const canGo = (x, y, rectangle) => {
  for (const [leftX, leftY, rightX, rightY] of rectangle) {
    if (leftX <= x && x <= rightX && leftY <= y && y <= rightY) {
      return true;
    }
  }
  return false;
};
