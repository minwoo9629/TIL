## var 키워드로 선언한 변수의 문제점

```jsx
var x = 100;
var y = 200;
var x = 200;
var y;

// 200
console.log(x);
// 200
console.log(y);

var z;
// undefined
console.log(z);
```

- `var` 키워드로 선언한 변수를 중복 선언하면 초기화문 유무에 따라 다르게 동작한다.
- 3번째 줄 코드 처럼 초기화문이 있는 변수 선언문은 자바스크립트 엔진에 의해 `var` 키워드가 없는 것처럼 동작한다.
- 4번째 줄 코드 처럼 초기화문이 없는 변수 선언문은 무시된다.

## 함수 레벨 스코프

> `var` 키워드로 선언한 변수는 함수의 코드 블록만을 지역 스코프로 인정한다.
>

```jsx
var x = 1;
if (true) {
  // 1
  console.log(x);
  var x = 5;
}
// 5
console.log(x);

var i = 10;

for (var i = 0; i < 8; i++) {
// 반복문 0
// 반복문 1
// 반복문 2
// 반복문 3
// 반복문 4
// 반복문 5
// 반복문 6
// 반복문 7
  console.log(`반복문 ${i}`);
}

// 반복문 종료 후 8
console.log(`반복문 종료 후 ${i}`);
```

## 변수 호이스팅

> `var` 키워드로 변수를 선언하면 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작한다.
`var` 키워드로 선언한 변수는 변수 선언문 이전에 참조할 수 있다. 단, 할당문 이전에 변수를 참조하면 `undefined` 를 반환한다.
>

```jsx
// undefined
console.log(phone);

var phone;

phone = "아이폰";

// 아이폰
console.log(phone);

// undefined
console.log(laptop);

var laptop = "macbook";

// macbook
console.log(laptop);
```

## let

> `var` 키워드의 단점을 보완하기 위해 `ES6` 에서는 새로운 변수 선언 키워드인 `let` 과 `const` 를 도입했다.
>

## 변수 중복 선언 금지

> `var` 키워드로 이름이 동일한 변수를 중복 선언하면 아무런 에러가 발생하지 않는다.
`let` 키워드로 이름이 같은 변수를 중복 선언하면 문법 에러가 발생한다.
>

```jsx
let catName = "무지";
let catName = "막지";
Identifier 'catName' has already been declared
```

## 블록 레벨 스코프

> `let` 키워드로 선언한 변수는 모든 코드 블록(함수, `if`, `for` 문, `while` 문, `try/catch` 문 등)을
지역 스코프로 인정하는 블록 레벨 스코프를 따른다.
>

```jsx
let catName = "막지";

{
  let catName = "무지";
  let catAge = 5;
}

// 막지
console.log(catName);
// ReferenceError: catAge is not defined
console.log(catAge);

let j = 10;

function func() {
  let j = 100;
  for (let j = 1; j <= 5; j++) {
		// 1
		// 2
		// 3
		// 4
		// 5
    console.log(j);
  }
	// 100
  console.log(j);
}

func();
// 10
console.log(j);
```

## 변수 호이스팅

> `var` 키워드로 선언한 변수와 달리 `let` 키워드로 선언한 변수는 변수 **호이스팅이 발생하지 않는 것처럼**
동작한다.
>

<aside>
💡 let 키워드로 선언한 변수는 선언 단계와 초기화 단계가 분리되어 진행된다.

</aside>

```jsx
// ReferenceError: Cannot access 'cat' before initialization
console.log(cat);
let cat;
// undefined
console.log(cat);
cat = "무지";
// 무지
console.log(cat);
```

- 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 선언 단계가 먼저 실행된다.
- 초기화 단계는 변수 선언문에 도달했을 때 실행된다.
- 초기화 단계가 실행되기 이전에 변수에 접근하면 `ReferenceError` 가 발생한다.

```jsx
let teck = "JS";
{
  // ReferenceError: Cannot access 'teck' before initialization
  console.log(teck);
  let teck = "react";
}
```

> 호이스팅이 발생하지 않는다면 전역 변수 `teck` 의 값인 `JS` 를 출력해야 한다.
하지만 `let` 키워드로 선언한 변수도 호이스팅이 발생하기 때문에 참조 에러가 발생한다.
>

## const

> `const` 키워드는 상수를 선언하기 위해 사용한다. **하지만 반드시 상수만을 위해 사용하지는 않는다.**
>

## 선언과 초기화

<aside>
💡 const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화를 해야한다.

</aside>

```jsx
SyntaxError: Missing initializer in const declaration
const kakao;
```

> `const` 키워드로 선언한 변수는 `let` 키워드로 선언한 변수와 마찬가지로 블록 레벨 스코프를 가지며, 변수 호이스팅이 발생하지 않는 것처럼 동작한다.
>

```jsx
{
	// ReferenceError: Cannot access 'teck' before initialization 
  console.log(kakao);
  const kakao = "어피치";
	// 어피치
  console.log(kakao);
}
// ReferenceError: kakao is not defined
console.log(kakao);
```

## 재할당 금지

> `var` 이나 `let` 키워드로 선언한 변수는 재할당이 자유로우나 `const` 키워드로 선언한 변수는 재할당이 금지된다.
>

```jsx
const kakao = "어피치";
// TypeError: Assignment to constant variable.
kakao = "라이언";
```

## 상수

<aside>
💡 상수는 재할당이 금지된 변수를 말한다.

</aside>

> `const` 키워드로 선언된 변수에 원시 값을 할당할 경우 원시 값은 변경할 수 없는 값이고 `const` 키워드에 의해 재할당이 금지되므로 할당된 값을 변경할 수 있는 방법은 없다.
일반즉으로 상수의 이름은 대문자로 선언해 상수임을 명확히 나타낸다.
>

## const 키워드와 객체

<aside>
💡 const 키워드로 선언된 변수에 객체를 할당한 경우 값을 변경할 수 있다.

</aside>

```jsx
const myCat = {
  name: "무지",
};

// 무지
console.log(myCat.name);

myCat.name = "막지";
// 막지
console.log(myCat.name);

myCat.age = 5;
// { name: '막지', age: 5 }
console.log(myCat);
```

> `const` 키워드는 재할당을 금지할 뿐 **불변**을 의미하지 않는다.
새로운 값을 재할당하는 것은 불가능하지만 프로퍼티 동적 생성, 삭제, 프로퍼티 값의 변경을 통해 객체를 변경하는 것은 가능하다.
>