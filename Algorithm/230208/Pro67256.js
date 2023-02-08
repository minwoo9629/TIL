function solution(numbers, hand) {
  var answer = "";
  const phone = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
    0: [3, 1],
  };

  let left = [3, 0];
  let right = [3, 2];
  for (const target of numbers) {
    if (target % 3 === 1) {
      answer += "L";
      left = phone[target];
    } else if (target !== 0 && target % 3 === 0) {
      answer += "R";
      right = phone[target];
    } else {
      const targetLocation = phone[target];
      const ldistance =
        Math.abs(left[0] - targetLocation[0]) +
        Math.abs(left[1] - targetLocation[1]);
      const rdistance =
        Math.abs(right[0] - targetLocation[0]) +
        Math.abs(right[1] - targetLocation[1]);
      if (ldistance < rdistance) {
        answer += "L";
        left = targetLocation;
      } else if (ldistance > rdistance) {
        answer += "R";
        right = targetLocation;
      } else {
        if (hand === "right") {
          answer += "R";
          right = targetLocation;
        } else {
          answer += "L";
          left = targetLocation;
        }
      }
    }
  }
  return answer;
}
