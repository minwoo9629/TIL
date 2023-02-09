const solution = (routes) => {
  const START = -30001;
  routes.sort((obj1, obj2) => {
    return obj1[1] !== obj2[1] ? obj1[1] - obj2[1] : obj1[0] - obj2[0];
  });

  let answer = 0;
  let prev = START;
  for (let i = 0; i < routes.length; i++) {
    if (prev === START) {
      answer++;
      prev = routes[i][1];
    } else {
      if (routes[i][0] <= prev && prev <= routes[i][1]) {
        continue;
      }
      if (prev < routes[i][0]) {
        answer++;
        prev = routes[i][1];
      }
    }
  }
  return answer;
};
