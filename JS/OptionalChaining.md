### 옵셔널 체이닝

> 옵셔널 체이닝(optional chaining) `?.`을 사용하면 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있다.
> 좌항의 피연산자가 `null` 또는 `undefined` 인 경우 `undefined` 를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.

### 옵셔널 체이닝이 필요한 이유

사용자가 여러 명 있는데 그중 몇 명은 주거 도시 정보를 가지고 있지 않다고 가정해보자.
이럴 때 사용자의 `user.address.city`를 사용해 주거 도시 정보에 접근하면 에러가 발생할 수 있다

```
const users = [
  {
    name: "박무지",
    addrees: {
      city: "서울",
    },
  },
  {
    name: "박막지",
    addrees: {
      city: "서울",
    },
  },
  { name: "박무민" },

  {
    name: "박무낭",
    addrees: {
      city: "서울",
    },
  },
];

/*서울
서울
TypeError: Cannot read property 'city' of undefined
*/
for (const user of users) {
  console.log(user.addrees.city);
}

/*
서울
서울
undefined
서울
*/

for (const user of users) {
  console.log(user?.addrees?.city);
}
```

### 옵셔널 체이닝이 추가되기 전

> `?.`이 추가되기 전엔 이런 문제들을 해결하기 위해 `&&`연산자를 사용하곤 했다.

```jsx
let cat = {};

// TypeError: Cannot read property 'lastName' of undefined
console.log(cat.name.lastName);

// undefined
console.log(cat && cat.name && cat.name.lastName);

// undefined
console.log(cat?.name?.lastName);
```

### '앞’의 평가 대상이 `undefined`나 `null`이면 평가를 멈추고 `undefined`를 반환

> 논리 연산자 `&&`는 좌항 피연산자가 `false`로 평가되는 `Falsy`값(`false`, `undefined`, `null`, `0`, `-0`, `NaN`, `''`)이면 좌항 피연산자를 그대로 반환한다.
> 하지만 `0` 이나 `''`는 객체로 평가될 때도 있다.

```jsx
let str = "";
let length = str && str.length;

// ""
console.log(length);
```

> 하지만 옵셔널 체이닝을 사용하면 좌항 피연산자가 Falsy 값이라도 null undefined가 아니면 우항의 프로퍼티 참조를 이어간다.

```jsx
let str = "";
let length = str?.length;
// 0
console.log(length);
```

### 단락 평가

> `?.`는 왼쪽 평가대상에 값이 없으면 즉시 평가를 멈춘다.
> 이런 평가 방법을 단락 평가(short-circuit)라고 부른다.
> 그렇기 때문에 함수 호출을 비롯한 `?.` 오른쪽에 있는 부가 동작은 `?.`의 평가가 멈췄을 때 더는 일어나지 않는다

### **?.()와 ?.[]**

> `muji`엔 `hello` 가 정의되어 있기 때문에 메서드가 제대로 호출되었다.
> 반면 `makji`엔 `hello` 가 정의되어 있지 않았음에도 불구하고 메서드를 호출하면 에러 없이 그냥 평가가 멈추는 것을 확인할 수 있다.

```jsx
let muji = {
  hello() {
    console.log("무지 5세");
  },
};

let makji = {};

// 무지 5세
muji.hello?.();
makji.hello?.();
```

> `.`대신 대괄호 `[]`를 사용해 객체 프로퍼티에 접근하는 경우엔 `?.[]`를 사용할 수도 있다.
> 예시와 마찬가지로 `?.[]`를 사용하면 객체 존재 여부가 확실치 않은 경우에도 안전하게 프로퍼티를 읽을 수 있다.

```jsx
// 무지
console.log(muji?.["name"]);
// undefined
console.log(makji?.["name"]);
```
