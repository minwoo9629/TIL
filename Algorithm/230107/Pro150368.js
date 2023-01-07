const sales = [10, 20, 30, 40];

function solution(users, emoticons) {
  var answer = [-1, -1];

  const calcPrice = (permute) => {
    let [emoticonPlusCnt, totalPrice] = [0, 0];
    for (const [standardSale, standardPrice] of users) {
      let buyPrice = 0;
      for (let i = 0; i < emoticons.length; i++) {
        if (standardSale <= permute[i]) {
          buyPrice += ((100 - permute[i]) / 100) * emoticons[i];
        }
      }
      if (buyPrice >= standardPrice) {
        emoticonPlusCnt++;
      } else {
        totalPrice += buyPrice;
      }
    }
    if (answer[0] < emoticonPlusCnt) {
      answer = [emoticonPlusCnt, totalPrice];
    }
    if (answer[0] === emoticonPlusCnt && answer[1] < totalPrice) {
      answer = [emoticonPlusCnt, totalPrice];
    }
    return;
  };
  const getPermutation = (permute) => {
    if (permute.length === emoticons.length) {
      calcPrice(permute);
      return;
    }

    for (let i = 0; i < sales.length; i++) {
      permute.push(sales[i]);
      getPermutation(permute);
      permute.pop();
    }
  };

  getPermutation([]);
  return answer;
}
