function solution(babbling) {
  const arr = ["aya", "ye", "woo", "ma"];
  let count = 0;

  for (let i = 0; i < babbling.length; i++) {
    let babble = babbling[i];

    for (let j = 0; j < arr.length; j++) {
      if (babble.includes(arr[j].repeat(2))) {
        break;
      }

      babble = babble.split(arr[j]).join(" ");
    }

    if (babble.split(" ").join("").length === 0) {
      count += 1;
    }
  }

  return count;
}
