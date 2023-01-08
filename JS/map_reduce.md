### 1. map

> `map` 메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출한다.
> 콜백 함수의 반환값들로 구성된 **새로운 배열을 반환**한다.
> **이때 원본 배열은 변경되지 않는다.**

```
const numbers = [1, 2, 3, 4, 5];

const res = numbers.map((item) => item * 2);

// [ 1, 2, 3, 4, 5 ]
console.log(numbers);
// [ 2, 4, 6, 8, 10 ]
console.log(res);
```

> `map` 메서드가 생성하여 반환하는 새로운 배열의 `length` 프로퍼티 값은 `map` 메서드를 호출한 배열의 `length` 프로퍼티 값과 반드시 일치한다.

---

### 2. reduce

> `reduce` 메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를
> 반복 호출한다.
> 그리고 콜백 함수의 반환값을 다음 순회 시에 콜백 함수의 첫 번째 인수로 전달하면서 콜백 함수를 호출하여
> **하나의 결과값을 만들어 반환**한다.
> **이때 원본 배열은 변경되지 않는다.**

`reduce` 메서드는 초기값과 배열의 첫 번째 요소값을 콜백 함수에게 인수로 전달하면서 호출하고 다음 순회 시에는 콜백 함수의 반환값과 두 번째 요소값을 콜백 함수의 인수로 전달하면서 호출한다.

배열의 합 구하기

```
const sum = [1, 2, 3, 4, 5].reduce(
  (accumulator, currentValue, index, array) => accumulator + currentValue,
  0
);
// 15 sum
console.log(sum, "sum");
```

배열의 평균 구하기

```jsx
const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const average = numArr.reduce(
  (accumulator, currentValue, index, { length }) => {
    return index === length - 1
      ? (accumulator + currentValue) / length
      : accumulator + currentValue;
  },
  0
);

// 5.5 평균
console.log(average, "평균");
```

배열의 최대값 구하기

```jsx
const maxNum = numArr.reduce(
  (accumulator, currentValue) =>
    accumulator > currentValue ? accumulator : currentValue,
  0
);

// 10 최대값
console.log(maxNum, "최대값");
```

배열 내의 원소 중복 갯수 계산하기

```jsx
const cats = ["무지", "무지", "막지", "무지", "막지", "코비"];

const count = cats.reduce((accumulator, currentValue) => {
  accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
  return accumulator;
}, {});

// { '무지': 3, '막지': 2, '코비': 1 }
console.log(count);
```
