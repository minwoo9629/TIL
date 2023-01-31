function solution(n, lighthouse) {
  var answer = 0;
  let onLightHouse = Array(n + 1).fill(false);
  while (lighthouse.length !== 0) {
    const connection = getConnection(lighthouse);
    for (const key in connection) {
      if (onLightHouse[key]) {
        continue;
      }
      if (connection[key].length === 1) {
        if (!onLightHouse[connection[key][0]]) {
          answer++;
        }
        onLightHouse[connection[key][0]] = true;
      }
    }

    lighthouse = lighthouse.filter((item) => {
      const [l1, l2] = item;
      return !onLightHouse[l1] && !onLightHouse[l2];
    });
  }

  return answer;
}

const getConnection = (lighthouse) => {
  const connection = {};
  for (const [l1, l2] of lighthouse) {
    connection[l1] ? connection[l1].push(l2) : (connection[l1] = [l2]);
    connection[l2] ? connection[l2].push(l1) : (connection[l2] = [l1]);
  }
  return connection;
};

let n = 14;
let lighthouse = [
  [1, 2],
  [2, 5],
  [1, 4],
  [4, 6],
  [1, 3],
  [3, 7],
  [7, 8],
  [4, 9],
  [6, 10],
  [10, 11],
  [11, 12],
  [12, 13],
  [13, 14],
];

n = 18;
lighthouse = [
  [1, 2],
  [2, 18],
  [18, 4],
  [18, 5],
  [18, 6],
  [4, 7],
  [4, 8],
  [5, 9],
  [5, 10],
  [6, 11],
  [6, 12],
  [7, 13],
  [8, 14],
  [9, 15],
  [10, 16],
  [11, 17],
  [12, 3],
];

n = 4;

lighthouse = [
  [1, 2],
  [1, 3],
  [1, 4],
];

n = 2;
lighthouse = [[1, 2]];
console.log(solution(n, lighthouse));
