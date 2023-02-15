function solution(play_time, adv_time, logs) {
  const playTimeSec = timeToSec(play_time);
  const advTimeSec = timeToSec(adv_time);

  const timeLine = Array(playTimeSec + 1).fill(0);
  for (let i = 0; i < logs.length; i++) {
    let [start, end] = logs[i].split("-");
    start = timeToSec(start);
    end = timeToSec(end);
    logs[i] = [start, end];
    timeLine[start] += 1;
    timeLine[end] -= 1;
  }

  for (let i = 1; i <= playTimeSec; i++) {
    timeLine[i] = timeLine[i] + timeLine[i - 1];
  }

  for (let i = 1; i <= playTimeSec; i++) {
    timeLine[i] = timeLine[i] + timeLine[i - 1];
  }

  let maxTime = timeLine[advTimeSec - 1];
  let startLocation = 0;
  for (let i = advTimeSec - 1; i < playTimeSec; i++) {
    if (maxTime < timeLine[i] - timeLine[i - advTimeSec]) {
      maxTime = timeLine[i] - timeLine[i - advTimeSec];
      startLocation = i - advTimeSec + 1;
    }
  }

  return secToTime(startLocation);
}

const timeToSec = (time) => {
  const [hour, min, sec] = time.split(":").map((item) => parseInt(item));
  return hour * 3600 + min * 60 + sec;
};

const secToTime = (startSec) => {
  const hour = Math.floor(startSec / 3600);
  const min = Math.floor((startSec % 3600) / 60);
  const sec = (startSec % 3600) % 60;
  return `${String(hour).padStart(2, 0)}:${String(min).padStart(2, 0)}:${String(
    sec
  ).padStart(2, 0)}`;
};
