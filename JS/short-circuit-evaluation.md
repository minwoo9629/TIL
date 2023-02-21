### 논리곱(&&)

논리곱(`&&`) 연산자는 두 개의 피연산자가 모두 `true` 로 평가될 때 `true` 를 반환한다.

다음결과를 예상해보자.

```jsx
const beverage = "아메리카노" && "블루베리스무디";

console.log(beverage);
```

첫 번째 피연산자 `아메리카노` 는 `Truthy` 값이므로 `true` 로 평가된다.

하지만 두 번째 피연산자에 따라 논리곱에 대한 결과가 달라진다.

두 번째 피연산자의 값에 따라 논리곱 연산자 표현식의 값이 결정되므로 결과는 `블루베리스무디` 가 된다.

### 논리합(||)

논리합(`||`) 연산자는 두 개의 피연산자 중 하나만 `true` 로 평가되면 `true` 를 반환한다.

```jsx
const coffee = "카페라떼" || "아메리카노";

console.log(coffee);
```

첫 번째 피연산자 `카페라떼` 는 `Truthy` 값이므로 `true` 로 평가된다.

이 때, 두 번째 피연산자가 무엇이든 평가하지 않아도 표현식에 대한 값을 알 수 있다.

따라서 `카페라떼` 가 된다.

```jsx
const num = 0 || 1;

console.log(num);
```

첫 번째 피연산자 `0` 은 `Falsy` 값이므로 `false` 로 평가된다.

하지만 두 번째 피연산자가 `Truthy` 값이므로 `true` 로 평가된다. 따라서 `1` 이 된다.

<aside>
💡 이처럼 논리 연산의 결과를 결정하는 피연산자를 타입을 변환하지 않고 그대로 반환하는 것을
단축평가 (short-circuit evaluation)이라 한다.

</aside>

### 논리곱 연산자를 이용하여 if문 대체하기

```jsx
let flag = true;
let message = "";
if (flag) {
  message = "블루베리스무디 한잔 주세요.";
}
// 블루베리스무디 한잔 주세요.
console.log(message);

message = flag && "딸기요거트스무디로 바꾸주세요.";
// 딸기요거트스무디로 바꾸주세요.
console.log(message);
```

### 논리합 연산자를 이용하여 숫자 카운트 객체 만들기

```jsx
const arr = [1, 1, 1, 2, 2, 3, 4, 4, 4, 4, 5, 6, 10, 10, 10];

const obj = {};

const cntNumber = arr.reduce((acc, curValue) => {
  acc[curValue] = (acc[curValue] | 0) + 1;
  return acc;
}, obj);
// { '1': 3, '2': 2, '3': 1, '4': 4, '5': 1, '6': 1, '10': 3 }
console.log(cntNumber);
```
