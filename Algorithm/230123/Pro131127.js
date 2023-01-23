function solution(want, number, discount) {
  var answer = 0;

  const completeWant = {};
  for (let i = 0; i < want.length; i++) {
    completeWant[want[i]] = number[i];
  }
  completeWant.length = 10;
  let obj = init(want);

  for (const idx in discount) {
    const product = discount[idx];
    if (obj[product] === undefined) {
      obj = init(want);
      continue;
    }

    if (obj.length !== 10) {
      obj[product] += 1;
      obj.length += 1;
    } else {
      const prev = discount[idx - 10];
      obj[prev] -= 1;
      obj[product] += 1;
    }
    if (obj.length === 10 && check(obj, completeWant)) {
      answer++;
    }
  }
  return answer;
}

const check = (obj, completeWant) => {
  for (const key in obj) {
    if (obj[key] !== completeWant[key]) {
      return false;
    }
  }
  return true;
};

const init = (want) => {
  const obj = {};
  for (const wantProduct of want) {
    obj[wantProduct] = 0;
  }
  obj.length = 0;
  return obj;
};
