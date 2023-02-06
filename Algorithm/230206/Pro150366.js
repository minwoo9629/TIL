let arr, parent;
const size = 51;
function solution(commands) {
  var answer = [];

  arr = Array.from(Array(size), () => Array(size).fill(null));
  init();
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i].split(" ");
    if (command[0] === "UPDATE") {
      update(command);
    } else if (command[0] === "MERGE") {
      merge(command[1], command[2], command[3], command[4]);
    } else if (command[0] === "UNMERGE") {
      unmerge(command[1], command[2]);
    } else {
      printArr(...command, answer);
    }
  }
  return answer;
}

const update = (command) => {
  if (command.length === 4) {
    const r = command[1];
    const c = command[2];
    const value = command[3];
    const [px, py] = find(r, c);
    arr[px][py] = value;
  } else {
    const value1 = command[1];
    const value2 = command[2];
    for (let x = 1; x < size; x++) {
      for (let y = 1; y < size; y++) {
        if (arr[x][y] === value1) {
          arr[x][y] = value2;
        }
      }
    }
  }
};

const merge = (r1, c1, r2, c2) => {
  if (r1 === r2 && c1 === c2) {
    return;
  }

  const [p1x, p1y] = find(r1, c1);
  const value1 = arr[p1x][p1y];
  const [p2x, p2y] = find(r2, c2);
  const value2 = arr[p2x][p2y];
  if (value1 !== null) {
    parent[p2x][p2y] = [p1x, p1y];
  } else if (value2 !== null) {
    parent[p1x][p1y] = [p2x, p2y];
  } else {
    parent[p2x][p2y] = [p1x, p1y];
  }
};

const unmerge = (r, c) => {
  const [px, py] = find(r, c);
  const value = arr[px][py];

  const targets = [];
  for (let i = 1; i < size; i++) {
    for (let j = 1; j < size; j++) {
      const [px2, py2] = find(i, j);
      if (px === px2 && py === py2) {
        targets.push([i, j]);
      }
    }
  }
  for (const [x, y] of targets) {
    arr[x][y] = null;
    parent[x][y] = [x, y];
  }
  arr[r][c] = value;
};

const init = () => {
  parent = Array.from(Array(size), () => Array(size).fill(null));
  for (let i = 1; i < size; i++) {
    for (let j = 1; j < size; j++) {
      parent[i][j] = [i, j];
    }
  }
};

const find = (r, c) => {
  const [pr, pc] = parent[r][c];
  if (pr === Number.parseInt(r) && pc === Number.parseInt(c)) {
    return [pr, pc];
  } else {
    return (parent[r][c] = find(...parent[r][c]));
  }
};

const printArr = (commandStr, r, c, answer) => {
  const [px, py] = find(r, c);
  const value = arr[px][py] !== null ? arr[px][py] : "EMPTY";
  answer.push(value);
};
