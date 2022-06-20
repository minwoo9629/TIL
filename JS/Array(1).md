## 배열이란?

> 여러 개의 값을 순차적으로 나열한 자료구조.
배열이 가지고 있는 값을 요소 `Element` 라 부른다.
>

```jsx
const cats = ["무지", "막지", "코비", "베리", "양꾸륵"];
```

### 배열의 길이를 나타내는 `length` 프로퍼티

```jsx
// 배열의 길이 5
console.log(`배열의 길이 ${cats.length}`);
```

### 배열의 순회

```jsx
const cats = ["무지", "막지", "코비", "베리", "양꾸륵"];

for (let i = 0; i < cats.length; i++) {
  console.log(`${i}번째 요소 ${cats[i]}`);
}

0번째 요소 무지
1번째 요소 막지
2번째 요소 코비
3번째 요소 베리
4번째 요소 양꾸륵
```

## 배열은 객체 타입이다.

```jsx
// object
console.log(typeof cats);
```

> 배열은 인덱스를 나타내는 문자열을 프로퍼티 키로 갖는 객체다.
따라서 존재하지 않는 프로퍼티 키로 객체의 프로퍼티에 접근했을 때 `undefined`를 반환하는 것 처럼
배열도 존재하지 않는 요소를 참조하면 `undefined`를 반환한다.
>

```jsx
const arr11 = [1, 2];
// undefined
console.log(arr11[2]);
```

### 일반 객체와 배열의 차이점을 알아보자

| 구분 | 배열 | 객체 |
| --- | --- | --- |
| 구조 | 인덱스와 요소 | 프로퍼티 키와 프로퍼티 값 |
| 값의 참조 | 인덱스 | 프로퍼티 키 |
| 값의 순서 | O | X |
| length 프로퍼티 | O | X |

<aside>
💡 일반 객체와 배열을 구분하는 가장 명확한 차이는 값의 순서와 `length` 프로퍼티이다.
자바스크립트의 배열은 일반적인 배열의 동작을 흉내 낸 특수한 객체

</aside>

## 배열생성

### 배열 리터럴을 이용한 배열생성

```jsx
const arr1 = [1, 2, 3];
// 3
console.log(arr1.length);

const arr2 = [1, , 3];
// 3
console.log(arr2.length);
// [ 1, <1 empty item>, 3 ]
console.log(arr2);
```

### Array 생성자 함수

- 전달된 인수가 1개이고 숫자인 경우 `length` 프로퍼티 값이 인수인 배열을 생성한다.

    ```jsx
    const arr3 = new Array(5);
    // [ <5 empty items> ]
    console.log(arr3);
    // 5
    console.log(arr3.length);
    ```

- 전달된 인수가 2개 이상 이거나 숫자가 아닌 경우 인수를 요소로 갖는 배열을 생성한다.

    ```jsx
    const arr4 = new Array(1, 2, 3, 4, 5);
    // [ 1, 2, 3, 4, 5 ]
    console.log(arr4);
    ```

- `Array` 생성자 함수는 `new` 연산자와 함께 호출하지 않더라도, 즉 일반 함수로서 호출해도 배열을 생성하는 생성자 함수로 동작한다 .

    ```jsx
    const arr5 = Array(1, 2, 3);
    // [ 1, 2, 3 ]
    console.log(arr5);
    ```


### Array.of

> `ES6`에서 도입된 `Array.of` 메서드는 전달된 인수를 요소로 갖는 배열을 생성한다.
`Array.of`는 `Array` 생성자 함수와 다르게 전달도니 인수가 1개이고 숫자더라도 인수를 요소로 갖는 배열을 생성한다.
>

```jsx
const arr6 = Array.of(1);
// [ 1 ]
console.log(arr6);
const arr7 = Array.of(1, 2, 3);
// [ 1, 2, 3 ]
console.log(arr7);
const arr8 = Array.of("무지");
// [ '무지' ]
console.log(arr8);
```

### Array.from

> `ES6`에서 도입된 `Array.from` 메서드는 유사 배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로
변환하여 반환한다.
>

```jsx
const arr9 = Array.from({ length: 2, 0: "무지", 1: "막지" });
// [ '무지', '막지' ]
console.log(arr9);
const arr10 = Array.from("무지막지");
// [ '무', '지', '막', '지' ]
console.log(arr10);
```

### 유사 배열 객체

> 유사 배열 객체는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 `length` 프로퍼티를 갖는 객체를 말한다.
>

```jsx
const catName = {
  0: "무지",
  1: "막지",
  2: "양꾸륵",
  length: 3,
};

// 배열처럼 순회가 가능하다.
for (let i = 0; i < catName.length; i++) {
  console.log(catName[i]);
}
// 무지
// 막지
// 양꾸륵
```

### 배열 요소 삭제

- 배열은 사실 객체이기 때문에 배열의 특정 요소를 삭제하기 위해 `delete`연산자를 사용할 수 있다.

    ```jsx
    const arr13 = [1, 2, 3];
    delete arr13[2];
    // [ 1, 2, <1 empty item> ]
    console.log(arr13);
    // length 프로퍼티에 영향을 주지 않는다.
    // 3
    console.log(arr13.length);
    ```

- 희소 배열을 만들지 않으면서 배열의 특정 요소를 완전히 삭제하려면 `splice` 메서드를 사용한다.

    ```jsx
    const arr14 = [1, 2, 3, 4];
    // arr[2] 부터 1개의 요소를 제거
    arr14.splice(2, 1);
    // [ 1, 2, 4 ]
    console.log(arr14);
    // length 프로퍼티가 갱신된다.
    // 3
    console.log(arr14);
    ```