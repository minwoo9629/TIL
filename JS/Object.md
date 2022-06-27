## 객체란?

> 객체는 0개 이상의 프로퍼티로 구성된 집합, 프로퍼티는 `key`와 `value`로 구성된다.
>

```jsx
let cat = {
  name: "무지",
  age: 4,
};

// { name: '무지', age: 4 }
console.log(cat);
// 무지
console.log(cat.name);
// 4
console.log(cat.age);
```

## 객체 리터럴에 의한 객체 생성

💡 리터럴(**`Literal`)** : 사람이 이해할 수 있는 문자 또는 약속된 기호를 사용하여 값을 생성하는 표기법

```jsx
let phone = {
  name: "아이폰",
  ring: function () {
    console.log(`${this.name}벨이 울린다.`);
  },
};

// 아이폰
console.log(phone.name);
// 아이폰벨이 울린다.
console.log(phone.ring());
```

## 프로퍼티 - property

- 객체는 프로퍼티의 집합이며, 프로퍼티는 `key`와 `value`로 구성된다.
- 프로퍼티 키 : 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
- 프로퍼티 값 : `Javascript`에서 사용할 수 있는 모든 값
- 프로퍼티 키는 프로퍼티 값에 접근할 수 있는 이름으로서 식별자 역할을 한다.

```jsx
let book = {
  // 식별자 네이밍 규칙을 준수한 경우
  bookName: "Javascript Deep Dive",
  // 식별자 네이밍 규칙을 준수하지 않은 경우 따옴표를 사용해야 한다.
  // book-price를 - 연산자가 있는 표현식으로 해석하기 때문에 따옴표 사용
  "book-price": 45000,
};
```

- 문자 또는 문자열로 평가할 수 있는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수 있다.
  프로퍼티로 사용할 표현식을 `[]`로 묶어야 한다.

```jsx
let tech = {};
let key = "techName";

tech[key] = "React";
// React
console.log(tech.techName);
```

- 프로퍼티 키에 문자열이나 심벌 값 외의 값을 사용하면 암묵적 타입 변환을 통해 문자열이 된다.

```jsx
let obj1 = {
  0: 0,
  1: 1,
};
// 1
console.log(obj1[1]);
// 0
console.log(obj1["0"]);
```

- 프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 메서드라 부른다.

```jsx
let circle = {
  radius: 5,
  getArea: function () {
    return this.radius * this.radius * Math.PI;
  },
};

// 5
console.log(circle.radius);
// 78.53981633974483
console.log(circle.getArea());
```

- 대괄호 프로퍼티 접근 연산자 내부에 지정하는 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 한다.
- 객체에 존재하지 않는 프로퍼티에 접근하면 `undefined`를 반환 `ReferenceError` 발생하지 않음

```jsx
let obj2 = {
  0: 0,
  1: 1,
};
console.log(obj1["0"]);
// 프로퍼티 키가 숫자로 이루어진 문자열인 경우 따옴표를 생략할 수 있다.
console.log(obj1[1]);
// undefined
console.log(obj1[2]);
```

### 프로퍼티 동적 생성과 삭제

```jsx
let person = {
  naem: "Lee",
};

person.age = 19;
// 19
console.log(person.age);

delete person.age;
// 존재하지 않는 프로퍼티를 삭제하는 경우 에러가 발생하지 않음
delete person.company;
console.log(person);
```

## propery shorthand

> `ES6`에서 추가된 객체 리터럴 확장 기능
프로퍼티 값으로 변수를 사용하는 경우 변수 이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키를 생략할 수 있다.
>

```jsx
let catName = "무지";
let catAge = 4;

let catObj = {
  catName,
  catAge,
};
// { catName: '무지', catAge: 4 }
console.log(catObj);
```

## computed property name

> 계산된 프로퍼티 이름 : 문자열 또는 문자열로 타입 변환할 수 있는 값으로 평가되는 표현식을 사용해 프로퍼티를 동적으로 생성할 수도 있다.
단, 프로퍼티 키로 사용할 표현식을 대괄호로 묶어야한다.
>

```jsx
let nameProperty = "name";
let ageProperty = "age";

let catObj2 = {
  [nameProperty]: "무지",
  [ageProperty]: 4,
};

console.log(catObj2);
```

`React` 에서 주어진 `input` 태그의 `name`에 일치하는 `state`를 업데이트하기 위해 다음과 같이 사용한다.

```jsx
const handleChangeState = (e) => {
    setState({
      // 기존의 값은 바뀌지 않게 하기 위해 state를 spread 문법을 이용해 해결한다.
      ...state,
      [e.target.name]: e.target.value,
    });
  };
```

## 메서드 축약표현

```jsx
let cat2 = {
  catName: "막지",
  callCat: function () {
    console.log(`${this.catName}야`);
  },
};

const cat3 = {
  catName: "막지",
  callCat() {
    console.log(`${this.catName}야`);
  },
};

// 막지야
console.log(cat2.callCat());
// 막지야
console.log(cat3.callCat());
```