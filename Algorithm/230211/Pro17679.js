const direction = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];
function solution(m, n, board) {
  var answer = 0;

  let map = board.map((item) => [...item]);

  let flag = true;
  while (flag) {
    const candidate = [];
    const discovered = Array.from(Array(m), () => Array(n).fill(false));
    flag = false;
    for (let x = 0; x < m; x++) {
      for (let y = 0; y < n; y++) {
        if (map[x][y] !== "") {
          const next = direction.map((item) => [x + item[0], y + item[1]]);
          let cnt = 0;
          for (const [nx, ny] of next) {
            if (check(nx, ny, m, n) && map[nx][ny] === map[x][y]) {
              cnt++;
            }
          }

          if (cnt === 4) {
            flag = true;
            for (const [nx, ny] of next) {
              if (!discovered[nx][ny]) {
                discovered[nx][ny] = true;
                candidate.push([nx, ny]);
              }
            }
          }
        }
      }
    }
    for (const [cx, cy] of candidate) {
      map[cx][cy] = "";
      answer++;
    }
    map = down(map);
  }
  return answer;
}

const down = (map) => {
  for (let j = 0; j < map[0].length; j++) {
    for (let i = map.length - 1; i > 0; i--) {
      if (map[i][j] === "") {
        let targetX = i - 1;
        while (targetX >= 0) {
          if (map[targetX][j] !== "") {
            map[i][j] = map[targetX][j];
            map[targetX][j] = "";
            break;
          }
          targetX--;
        }
      }
    }
  }
  return map;
};
const check = (nx, ny, m, n) => {
  return 0 <= nx && nx < m && 0 <= ny && ny < n;
};
