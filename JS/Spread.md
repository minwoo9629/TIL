## Spread 문법(전개문법)

💡 `...` 은 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서(전개) 개별적인 값들의 목록으로 만든다.

스프레드 문법을 사용할 수 있는 대상은 `Array` `String` `Map` `Set` `DOM 컬렉션(NodeList, HTML Collection)` `arguments` 와 같이 `for ... of` 문으로 순회할 수 있는 이터러블에 한정된다.

```jsx
let arr = [1, 2, 3];
// 1 2 3
console.log(...arr);

let msg = "Hello";
// H e l l o
console.log(...msg);

let catMap = new Map();
catMap.set("이름", "무지");
catMap.set("나이", "4살");
// [ '이름', '무지' ] [ '나이', '4살' ]
console.log(...catMap);

// 무지 막지 먼지
console.log(...new Set(["무지", "막지", "먼지"]));

// TypeError: Found non-callable @@iterator
// 일반 객체는 스프레드 문법의 대상이 될 수 없다.
console.log(...{ 이름: "무지", 나이: "4살" });
```

### 스프레드 문법의 결과는 값 들의 목록이다. 즉, 스프레드 문법의 결과는 값이 아니다.

### 따라서 스프레드 문법의 결과는 변수에 할당 할 수 없다.

---

## Spread 문법의 활용

### 1. 함수 호출문의 인수 목록에서 사용

```jsx
// 3
console.log(Math.max(...arr));

function add(a, b) {
  // 무지막지
  console.log(a + b);
}
// ['무지', '막지'] -> 무지, 막지
add(...["무지", "막지"]);

// Rest 파라미터
function hello(...rest) {
  // [ 'H', 'e', 'l', 'l', 'o' ]
  console.log(rest);
}
hello(..."Hello");
```

> Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받기 위해 매개변수 앞에
> `...` 을 붙이는 것이다.
> 즉 Rest 파라미터와 스프레드 문법은 서로 반대의 개념이다.

### 2. 객체 리터럴 내부에서 사용

```jsx
let catObj = { 이름: "무지", 나이: 4 };
let copyObj = { ...catObj };
// { '이름': '무지', '나이': 4 }
console.log(copyObj);
// false
console.log(catObj === copyObj);
```

> 스프레드 문법의 대상은 이터러블이어야 하지만 스프레드 프로퍼티 제안은 일반 객체를 대상으로도 스프레드 문법의 사용을 허용한다.
