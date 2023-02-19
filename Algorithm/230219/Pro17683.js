function solution(m, musicinfos) {
  var answer = "";
  m = getMelody(m);
  let maxGap = 0;
  for (const musicInfo of musicinfos) {
    const infoArr = musicInfo.split(",");
    const startTime = timeToMin(infoArr[0]);
    const endTime = timeToMin(infoArr[1]);
    const gap = endTime - startTime;
    const musicTitle = infoArr[2];
    const musicMelody = getMelody(infoArr[3]);
    let str = [];
    for (let i = 0; i < gap; i++) {
      if (i >= musicMelody.length) {
        str.push(musicMelody[i % musicMelody.length]);
      } else {
        str.push(musicMelody[i]);
      }
    }
    if (str.length < m.length) {
      continue;
    }
    if (find(m, str)) {
      if (maxGap < gap) {
        answer = musicTitle;
        maxGap = gap;
      }
    }
  }
  return answer !== "" ? answer : "(None)";
}

const find = (target, str) => {
  const targetMelody = target.join("");
  for (let i = 0; i <= str.length - target.length; i++) {
    const candidate = str.slice(i, i + target.length).join("");
    if (targetMelody === candidate) {
      return true;
    }
  }
  return false;
};

const getMelody = (m) => {
  m = [...m];
  const melody = [];
  for (let i = 0; i < m.length; i++) {
    let info = m[i];
    if (i !== m - 1 && m[i + 1] === "#") {
      melody.push(info + m[i + 1]);
      i = i + 1;
    } else {
      melody.push(info);
    }
  }
  return melody;
};
const timeToMin = (str) => {
  const [hour, min] = str.split(":");
  return Number(hour) * 60 + Number(min);
};
