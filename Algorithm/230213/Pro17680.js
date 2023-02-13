function solution(cacheSize, cities) {
  if (cacheSize === 0) {
    return 5 * cities.length;
  }

  const cache = {};
  let size = 0;
  var answer = 0;
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i].toLowerCase();
    if (!cache[city]) {
      if (size < cacheSize) {
        size++;
        cache[city] = i + 1;
        answer += 5;
        continue;
      }
      let cityName = "";
      let time = 1000000;
      for (const key in cache) {
        if (cache[key] < time) {
          cityName = key;
          time = cache[key];
        }
      }
      delete cache[cityName];
      cache[city] = i + 1;
      answer += 5;
    } else {
      cache[city] = i + 1;
      answer += 1;
    }
  }
  return answer;
}
