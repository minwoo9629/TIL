function solution(plans) {
  var answer = [];
  const orderedPlans = [];
  for (const [subject, time, cost] of plans) {
    const min = timeToMin(time);
    orderedPlans.push([subject, min, +cost]);
  }
  orderedPlans.sort((a, b) => {
    return b[1] - a[1];
  });

  const stack = [];
  let currentTime = 0;
  while (orderedPlans.length !== 0) {
    if (stack.length === 0) {
      const cur = orderedPlans.pop();
      currentTime = cur[1];
      stack.push(cur);
    } else {
      const next = orderedPlans.pop();
      const prev = stack.pop();
      if (currentTime + prev[2] <= next[1]) {
        answer.push(prev[0]);
        currentTime += prev[2];
        orderedPlans.push(next);
      } else {
        const remain = currentTime + prev[2] - next[1];
        currentTime = next[1];
        stack.push([prev[0], currentTime, remain]);
        stack.push(next);
      }
    }
  }
  while (stack.length !== 0) {
    answer.push(stack.pop()[0]);
  }
  return answer;
}

const timeToMin = (time) => {
  const [hour, min] = time.split(":").map(Number);
  return hour * 60 + min;
};
