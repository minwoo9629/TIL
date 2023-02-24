function solution(target) {
  const dp = Array.from(Array(100001), () => Array(2).fill(0, 0));

  for (let i = 1; i <= 20; i++) {
    dp[i] = [1, 1];
    dp[i * 2] = [1, 0];
    dp[i * 3] = [1, 0];
  }
  dp[50] = [1, 1];

  for (let score = 23; score <= target; score++) {
    if (score === target) {
      console.log("");
    }
    if (score <= 60) {
      if (dp[score][0] === 0) {
        getTargetValue(score, score - 1, dp);
      }
    } else {
      getTargetValue(score, 60, dp);
    }
  }

  return dp[target];
}

const getTargetValue = (target, range, dp) => {
  let minDartCnt = target;
  let maxSingleBullCnt = 0;

  for (let dart = 1; dart <= range; dart++) {
    let remainScore = target - dart;
    let [dartCnt1, singleBullCnt1] = dp[remainScore];
    let [dartCnt2, singleBullCnt2] = dp[dart];
    const dartCntSum = dartCnt1 + dartCnt2;
    const singleBullCntSum = singleBullCnt1 + singleBullCnt2;
    if (dartCntSum < minDartCnt) {
      minDartCnt = dartCntSum;
      maxSingleBullCnt = singleBullCntSum;
    } else if (dartCntSum === minDartCnt) {
      if (maxSingleBullCnt < singleBullCntSum) {
        maxSingleBullCnt = singleBullCntSum;
      }
    }
  }

  dp[target] = [minDartCnt, maxSingleBullCnt];
};
