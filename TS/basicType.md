### 타입스크립트로 변수나 함수와 같은 자바스크립트 코드에 타입을 정의할 수 있다.

### 문자열

```tsx
// JS 문자열
let str = "hello";

// TS 문자열
let message: string = "hello";
```

### 숫자

```tsx
// TS 숫자
let num: number = 10;
```

### 객체

```tsx
// TS 객체
let obj: object = {
  title: "게시글 제목",
  content: "게시글 내용",
};

let phone: { name: string; version: number } = {
  name: "아이폰",
  version: 8,
};
```

### 배열

```tsx
// TS Array
let numbers: number[] = [1, 2, 3];
let numbers2: Array<number> = [1, 2, 3, 4];
let cats: Array<string> = ["무지", "막지", "코비", "베리"];
```

### 튜플

> 튜플이란 배열의 길이가 고정되고 각 요소의 타입이 지정되어 있는 배열 형식을 의미한다.

```tsx
let address: [string, number] = ["대전", 1];
address[1] = "서구"; // Type 'string' is not assignable to type 'number'
```

### 진위 값

```tsx
// TS 진위 값
let isActive: boolean = true;
```
