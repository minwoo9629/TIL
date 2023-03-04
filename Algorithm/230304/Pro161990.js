function solution(wallpaper) {
  let topX = 100;
  let bottomX = 0;
  let leftY = 100;
  let rightY = 0;

  for (let i = 0; i < wallpaper.length; i++) {
    for (let j = 0; j < wallpaper[0].length; j++) {
      if (wallpaper[i][j] === "#") {
        topX = Math.min(topX, i);
        bottomX = Math.max(bottomX, i + 1);
        leftY = Math.min(leftY, j);
        rightY = Math.max(rightY, j + 1);
      }
    }
  }
  var answer = [topX, leftY, bottomX, rightY];
  return answer;
}
