## 함수란

<aside>
💡 일련의 과정을 문으로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것

</aside>

## 함수를 사용하는 이유

- 동일한 작업을 반복적으로 수행하야 한다면 같은 코드를 중복해서 작성하는 것이 아니라 미리 정의된 함수를
  재사용하는 것이 효율적이다. 즉, **코드의 재사용** 측면에서 유용하다.
- 코드 중복 억제, 재사용성을 높이는 함수는 **유지보수의 편의성**을 높이고 실수를 줄여 **코드의 신뢰성**을 높인다.

## 함수 리터럴

- 함수 리터럴은 `function` 키워드, 함수 이름, 매개변수 목록, 함수 몸체로 구성된다.

```jsx
let func = function add(num1, num2) {
  return num1 + num2;
};
```

## 함수는 객체

리터럴은 사람의 이해할 수 있는 문자나 약속된 기호를 사용해 값을 생성하는 표기법이다.

리터럴은 값을 생성하기 위한 표기법이므로, 함수 리터럴도 평가되어 값을 생성한다.

이 때의 값은 객체이다. 즉, **함수는 객체다.**

일반 객체는 호출할 수 없지만 **함수는 호출할 수 있다.**

```jsx
// 변수에 함수 리터럴 할당
let addFunc = function add(a,b){
    return a+b;
}
// 4
console.log(addFunc(1,3));

let multiFunc = function (a,b){
    return a * b; 
}
// 20
console.log(multiFunc(10,2));
```

## 함수 선언문

```jsx
function add(a, b){
    return a + b;
}
let result = add(10, 5);
// 15
console.log(result);
```

### 단, **함수 리터럴은 함수 이름을 생략할 수 있으나 함수 선언문은 함수 이름을 생략할 수 없다.**

**함수 선언문은 표현식이 아닌 문이다.** 따라서 표현식이 아닌 문은 변수에 할당할 수 없다.

```jsx
let subFunc = function sub(a,b){
    return a-b;
}
// 5
console.log(subFunc(10,5));
```

다음 코드를 살펴보면 함수 선언문이 변수에 할당되는 것처럼 보인다.

자바스크립트 엔진이 코드의 문맥에 따라 동일한 함수 리터럴은 표현식이 아닌 문 즉, 함수 선언문으로 해석하는
경우와 표현식인 문 즉, 함수 리터럴 표현식으로 해석하는 경우가 있기 때문이다.

함수 이름이 있는 기명 함수 리터럴은 함수 선언문 또는 함수 리터럴 표현식으로 해석될 가능성이 있다.

간단하게 정리하면

> 자바스크립트 엔진은 함수 이름이 있는 함수 리터럴을 단독으로 사용 즉, 함수 리터럴을 피연산자로 사용하지 않는 경우는 함수 선언문으로 해석하고, 함수 리터럴이 값으로 평가되어야하는 문맥, 즉 변수에 할당하거나 피연산자로 사용하면 함수 리터럴 식으로 해석한다.
>

## 함수 표현식

**자바스크립트의 함수는 일급 객체이다.**

함수는 일급 객체이므로 함수 리터럴로 생성한 함수 객체를 변수에 할당 할 수 있다.

함수 표현식의 함수 리터럴은 함수 이름을 생략하는 것이 일반적이다.

함수를 호출할 때는 함수 이름이 아니라 함수 객체를 가리키는 식별자를 사용한다.

```jsx
let strJoin = function (catName, catName2){
    return catName + catName2;
}
// 무지막지
console.log(strJoin('무지','막지'));

let divideFunc = function devide(a, b){
    return a / b;
}
// 5
console.log(divideFunc(10, 2));
// divide is not defined
// 함수 이름은 함수 몸체 내부에서만 유효한 식별자이다.
console.log(divide(10, 2));
```

## 함수 생성 시점과 호이스팅

- **함수 선언문으로 정의한 함수와 함수 표현식으로 정의한 함수의 생성 시점은 다르다.**

```jsx
// [Function: sumNumber]
console.dir(sumNumber);
// undefined
console.dir(subNumber);

// 5
console.log(sumNumber(1, 4));
// subNumber is not a function
console.log(subNumber(5, 1));

function sumNumber(num1, num2) {
  return num1 + num2;
}

var subNumber = function (num1, num2) {
  return num1 - num2;
};
```

- 함수 선언문으로 함수를 정의하면 런타임 이전에 함수 객체가 먼저 생성된다. 그리고 자바스크립트 엔진은 함수 이름과 동일한 이름의 식별자를 암묵적으로 생성하고 생성된 함수 객체를 할당한다.

<aside>
💡 함수 호이스팅 - 함수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징

</aside>

### var 키워드를 사용한 변수 선언문과 함수 선언문의 차이

- 공통점 - 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행되어 식별자를 생성한다.
- 차이점 - `var` 키워드로 선언한 변수는 `undefined` 로 초기화, 함수 선언문을 통해 암묵적으로 생성된 식별되는 함수 객체로 초기화 된다.

## 화살표 함수

`ES6` 에서 도입된 화살표 함수는 `function` 키워드 대신 화살표 `=>` 를 사용해 좀 더 간략한 방법으로 함수를 선언할 수 있다. 화살표 함수는 항상 익명 함수로 정의한다.

```jsx
const addFunc = (num1, num2) => num1 + num2;
// 15
console.log(addFunc(5, 10));
```

## 매개변수와 인수

- 함수는 매개변수의 개수와 인수의 개수가 일치하는지 체크하지 않는다.
- 인수가 부족해서 인수가 할당되지 않은 매개변수의 값은 `undefined` 다.

```jsx
function add(num1, num2) {
  return num1 + num2;
}

// NaN
console.log(add(1));
```

- 매개변수보다 인수가 더 많은 경우 초과된 인수가 그냥 버려지는 것이 아니다.
- 모든 인수는 암묵적으로 `arguments` 객체의 프로퍼티로 보관된다.

```jsx
function add(num1, num2) {
	// [Arguments] { '0': 1, '1': 5, '2': 10 }
	console.log(arguments);
  return num1 + num2;
}

// 6
console.log(add(1, 5, 10));
```

## 즉시 실행 함수

<aside>
💡 함수 정의와 동시에 즉시 호출되는 함수를 즉시 실행 함수라 한다. 즉시 실행 함수는 단 한번만 호출되며
다시 호출할 수 없다.

</aside>

```jsx
// 익명 즉시 실행 함수
(function mulFunc() {
  let a = 1;
  let b = 2;
  return a * b;
})();
// 기명 즉시 실행 함수
const result = (function () {
  let num1 = 5;
  let num2 = 7;
  return num1 + num2;
})();
```

> 즉시 실행 함수도 일반 함수처럼 값을 반환할 수 있고 인수를 전달할 수도 있다.
>

```jsx
const result = (function () {
  let num1 = 5;
  let num2 = 7;
  return num1 + num2;
})();

// 12
console.log(result);

const result2 = (function (num1, num2) {
  return num1 * num2;
})(4, 9);
// 36
console.log(result2);
```

## 중첩 함수

<aside>
💡 함수 내부에 정의된 함수를 중첩 함수 또는 내부 함수라 한다.
중첩 함수는 외부 함수 내부에서만 호출할 수 있다.
일반적으로 중첩 함수는 자신을 포함하는 외부 함수를 돕는 헬퍼 함수의 역할을 한다.

</aside>

```jsx
function outer() {
  let num1 = 10;

  function innner() {
    let num2 = 20;
    console.log(num1 + num2);
  }

  innner();
}

outer();
```

## 콜백 함수

<aside>
💡 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수를 콜백 함수라 하며,
매개변수를 통해 함수의 외부에서 콜백함수를 전달받은 함수를 고차 함수라 한다.

</aside>

```jsx
function repeat(n, callbackFunc) {
  for (let i = 1; i <= n; i++) {
    callbackFunc(i);
  }
}

let square = (i) => {
  console.log(i * i);
};

let half = (i) => {
  console.log(i / 2);
};

repeat(5, square);
repeat(5, half);
```

- 콜백 함수가 고차 함수 내부에만 호출된다면 콜백 함수를 익명 함수 리터럴로 정의하면서 곧바로 고차 함수에 전달하는 것이 일반적이다.
- 이때 콜백함수로 전달된 함수 리터럴은 고차 함수가 호출될 때마다 평가되어 함수 객체를 생성하므로 콜백 함수를 전달받는 함수가 자주 호출된다면 함수 외부에서 콜백 함수를 정의한 후 고차 함수에 전달하는 편이 효율적이다.

## 순수 함수

<aside>
💡 순수 함수는 동일한 인수가 전달되면 언제나 동일한 값을 반환하는 함수
오직 매개변수를 통해 함수 내부로 전달된 인수에게만 의존해 반환값을 만든다.

</aside>

```jsx
function pureFunc(n) {
  return n + 1;
}

let count = 0;
count = pureFunc(count);
// 1
console.log(count);
count = pureFunc(count);
// 2
console.log(count);
```

## 비순수 함수

<aside>
💡 비순수 함수는 외부 상태에 따라 반환값이 달라지는 함수
외부 상태에 의존한다. 함수 내부에서 외부 상태를 직접 참조하지 않더라도 객체를 매개변수를 통해 객체를 전달받으면 비순수 함수가 된다.

</aside>

```jsx
let count = 0;
function impureFunc() {
  return count++;
}

// 0
console.log(count);
// 비순수 함수는 외부 상태(count)를 변경한다.
impureFunc();
// 1
console.log(count);
impureFunc();
// 2
console.log(count);
impureFunc();
```