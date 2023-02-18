function solution(msg) {
  const alphas = {};

  for (let i = 1; i <= 26; i++) {
    const alpha = String.fromCharCode(i + 64);
    alphas[alpha] = i;
  }

  var answer = [];
  msg = [...msg];
  let i = 0;
  let num = 27;
  while (i < msg.length) {
    let alpha = msg[i];
    for (let j = i + 1; j < msg.length; j++) {
      alpha += msg[j];
      if (!alphas[alpha]) {
        answer.push(alphas[alpha.substr(0, alpha.length - 1)]);
        alphas[alpha] = num++;
        i += alpha.length - 1;
        alpha = "";
        break;
      }
    }
    if (alpha.length === 1) {
      answer.push(alphas[alpha]);
      i++;
    }
    if (alpha.length > 1) {
      answer.push(alphas[alpha]);
      i += alpha.length;
    }
  }
  return answer;
}

const msgs = ["KAKAO", "TOBEORNOTTOBEORTOBEORNOT", "ABABABABABABABAB"];
for (const msg of msgs) {
  console.log(solution(msg));
}

// console.log(solution("ABABABABABABABAB"));
