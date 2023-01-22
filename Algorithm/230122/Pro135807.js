const calcCandidate = (minNum, candidate) => {
  for (let i = 2; i <= minNum; i++) {
    if (minNum % i === 0) {
      candidate.add(i);
    }
  }
};

const divide = (num, array) => {
  for (const element of array) {
    if (element % num !== 0) {
      return false;
    }
  }
  return true;
};

const nonDivie = (num, array) => {
  for (const element of array) {
    if (element % num === 0) {
      return false;
    }
  }
  return true;
};

function solution(arrayA, arrayB) {
  let answer = 0;
  arrayA.sort((a, b) => a - b);
  arrayB.sort((a, b) => a - b);

  const minA = arrayA[0];
  const minB = arrayB[0];
  const candidate = new Set();

  calcCandidate(minA, candidate);
  calcCandidate(minB, candidate);

  for (const num of candidate) {
    if (divide(num, arrayA) && nonDivie(num, arrayB)) {
      answer = Math.max(answer, num);
    }

    if (divide(num, arrayB) && nonDivie(num, arrayA)) {
      answer = Math.max(answer, num);
    }
  }
  return answer;
}
