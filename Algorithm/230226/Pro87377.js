function solution(line) {
  const intersectionPoint = [];
  let [maxX, minX, maxY, minY] = [
    -Number.MAX_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
    -Number.MAX_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
  ];
  for (let i = 0; i < line.length - 1; i++) {
    const [A, B, E] = line[i];
    for (let j = i + 1; j < line.length; j++) {
      const [C, D, F] = line[j];
      const denominator = A * D - B * C;
      const xNumerator = B * F - E * D;
      const yNumerator = E * C - A * F;

      if (denominator === 0 || check(xNumerator, yNumerator, denominator)) {
        continue;
      }
      const [x, y] = [xNumerator / denominator, yNumerator / denominator];
      intersectionPoint.push([x, y]);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
    }
  }

  const arr = makeArr(maxX, minX, maxY, minY);
  writeStar(arr, intersectionPoint, minX, maxY);
  return arr.map((item) => item.join(""));
}

const writeStar = (arr, intersectionPoint, minX, maxY) => {
  for (const [x, y] of intersectionPoint) {
    arr[maxY - y][x - minX] = "*";
  }
};

const makeArr = (maxX, minX, maxY, minY) => {
  const arr = Array.from(Array(maxY - minY + 1), () =>
    Array(maxX - minX + 1).fill(".")
  );
  return arr;
};
const check = (xNumerator, yNumerator, denominator) => {
  return xNumerator % denominator || yNumerator % denominator;
};
