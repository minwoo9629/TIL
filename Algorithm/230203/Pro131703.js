let row, col, minCnt;

function solution(beginning, target) {
  var answer = 0;
  row = beginning.length;
  col = beginning[0].length;
  minCnt = Number.MAX_SAFE_INTEGER;
  permutation([], beginning, target);
  answer = minCnt !== Number.MAX_SAFE_INTEGER ? minCnt : -1;
  return answer;
}

const permutation = (permute, beginning, target) => {
  if (permute.length === col + row) {
    const cnt = permute.reduce((acc, curValue) => {
      if (curValue) {
        acc += 1;
      }
      return acc;
    }, 0);
    if (cnt > minCnt) {
      return;
    }
    const copyBegining = beginning.map((item) => [...item]);
    simulation(permute, copyBegining, target, cnt);
    return;
  }

  for (const flag of [true, false]) {
    permute.push(flag);
    permutation(permute, beginning, target);
    permute.pop();
  }
};

const simulation = (permute, map, target, cnt) => {
  for (let i = 0; i < permute.length; i++) {
    if (permute[i]) {
      if (i < row) {
        rowReverse(map, i);
      } else {
        colReverse(map, i - row);
      }
    }
  }
  if (isEqual(map, target)) {
    minCnt = Math.min(minCnt, cnt);
  }
  return;
};

const isEqual = (map, target) => {
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      if (map[x][y] !== target[x][y]) {
        return false;
      }
    }
  }
  return true;
};

const rowReverse = (map, x) => {
  for (let i = 0; i < col; i++) {
    map[x][i] = map[x][i] === 0 ? 1 : 0;
  }
};

const colReverse = (map, y) => {
  for (let i = 0; i < row; i++) {
    map[i][y] = map[i][y] === 0 ? 1 : 0;
  }
};
