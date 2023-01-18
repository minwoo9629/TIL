### setTimeout

`setTimeout` 함수는 두 번째 인수로 전달받은 시간(ms)으로 단 한 번 동작하는 타이머를 생성한다.
타이머가 만료되면 첫 번째 인수로 전달받은 콜백 함수가 호출된다.

```jsx
const timerId = setTimeout(function | code [, delay, param1, param2, ...]);
```

`function` : 타이머가 만료된 뒤 호출될 콜백함수이다.

`delay` : 타이머 만료 시간(ms)이다.

`setTimeout` 함수는 `delay` 시간으로 단 한 번 동작하는 타이머를 생성한다.

인수 전달을 생략하는 경우 기본값 0이 지정된다.

- `delay` 시간이 설정된 타이머가 만료되면 콜백 함수가 즉시 호출되는 것이 보장되지 않는다.
  `delay` 시간은 `Task Queue`에 콜백 함수를 등록하는 시간을 지연할 뿐이다.
- `delay` 가 4ms 이하인 경우 최소 지연 시간 `4ms` 가 지정된다.

```jsx
let count = 0;
const timerId = setInterval(() => {
  console.log("ms출력하기 : ", Date.now());
  if (count++ === 10) {
    clearInterval(timerId);
  }
}, 1);

ms출력하기: 1674026909396;
ms출력하기: 1674026909401;
ms출력하기: 1674026909402;
ms출력하기: 1674026909403;
ms출력하기: 1674026909404;
ms출력하기: 1674026909405;
ms출력하기: 1674026909406;
ms출력하기: 1674026909407;
ms출력하기: 1674026909408;
ms출력하기: 1674026909409;
ms출력하기: 1674026909410;
```

```jsx
setTimeout(() => {
  console.log("2초뒤 출력하기");
}, 2000);

setTimeout(
  (catName) => {
    console.log(`2초뒤 ${catName}호출하기`);
  },
  2000,
  "무지"
);

2초뒤 출력하기
2초뒤 무지호출하기
```

### setInterval

`setInterval` 함수는 두 번째 인수로 전달받은 시간(ms)으로 반복 동작하는 타이머를 생성한다.

이후 타이머가 만료될 때마다 첫 번째 인수로 전달받은 콜백 함수가 반복 호출된다.

`setInterval` 함수에 전달할 인수는 `setTimeout` 함수와 동일하다.

```jsx
let count = 0;

const countingId = setInterval(() => {
  console.log(count);
  if (count++ === 5) {
    clearInterval(countingId);
  }
}, 3000);

0;
1;
2;
3;
4;
5;
```
