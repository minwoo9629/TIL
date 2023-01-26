function solution(weights) {
  var answer = 0;

  const ratios = [
    [1, 1],
    [3, 2],
    [4, 2],
    [4, 3],
  ];
  weights.sort((num1, num2) => {
    return num1 - num2;
  });
  for (const ratio of ratios) {
    for (let i = 0; i < weights.length; i++) {
      const weight = weights[i];
      if ((weight * ratio[0]) % ratio[1] !== 0) {
        continue;
      }
      const target = Math.floor((weight * ratio[0]) / ratio[1]);
      const upperBound = getUpperBound(i + 1, target, weights);
      const lowerBound = getLowerBound(i + 1, target, weights, upperBound);
      answer += upperBound - lowerBound;
    }
  }

  return answer;
}

const getLowerBound = (idx, target, weights, upperBound) => {
  let start = idx;
  let end = upperBound;
  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    target <= weights[mid] ? (end = mid) : (start = mid + 1);
  }
  return start;
};

const getUpperBound = (idx, target, weights) => {
  let start = idx;
  let end = weights.length;
  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    target < weights[mid] ? (end = mid) : (start = mid + 1);
  }
  return start;
};
