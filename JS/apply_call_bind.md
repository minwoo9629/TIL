### apply / call / bind 메서드란?

`Function.prototype` 의 메서드이다. 즉, 모든 함수가 상속받아 사용할 수 있다.

### apply vs call

- `apply`와 `call` 메서드의 본질적인 기능은 **함수를 호출하는 것**이다.
- `apply`와 `call` 메서드는 함수를 호출하면 첫 번째 인수로 전달한 특정 객체를 호출한 함수의
  `this`에 바인딩한다.

```jsx
function getThisBinding() {
  return this;
}

const thisArgs = { catName: "무지" };
console.log(getThisBinding.apply(thisArgs), "apply");
console.log(getThisBinding.call(thisArgs), "call");

// { catName: '무지' } apply
// { catName: '무지' } call
```

- `apply` 와 `call` 메서드는 호출할 **함수에 인수를 전달하는 방식만 다를 뿐** 동일하게 동작한다.

```jsx
function getThisBinding() {
  return this;
}

const thisArgs = { catName: "무지" };

function getThisBinding() {
  console.log(arguments);
  return this;
}

console.log(getThisBinding.apply(thisArgs, ["무지", "막지"]), "apply");
console.log(getThisBinding.call(thisArgs, "무지", "막지"), "call");

//[Arguments] { '0': '무지', '1': '막지' }
// { catName: '무지' } apply
// [Arguments] { '0': '무지', '1': '막지' }
// { catName: '무지' } call
```

- `apply` 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다.
- `call` 메서드는 호출할 함수의 인수를 구분하여 전달한다.

### bind

`bind` 메서드는 `apply` 와 `call` 메서드와 달리 함수를 호출하지 않고 `this` 로 사용할 객체만 전달한다.

`bind` 메서드는 함수를 호출하지 않으므로 명시적으로 호출해야 한다.

```jsx
function getThisBinding() {
  return this;
}

const thisArgs = { catName: "무지" };

console.log(getThisBinding.bind(thisArgs));
console.log(getThisBinding.bind(thisArgs)(), "bind");

// [Function: bound getThisBinding]
// { catName: '무지' } bind
```

`bind` 메서드는 메서드의 `this` 와 메서드 내부의 중첩 함수 또는 콜백 함수의 `this` 가 불일치하는
문제를 해결하기 위해 유용하게 사용된다.

```jsx
const cat = {
  name: "무지",
  hello(callback) {
    console.log(this, "this1");
    setTimeout(callback, 3000);
  },
};

cat.hello(function () {
  console.log(this, "this2");
  console.log(this.name);
});
// undefined
```

1. `cat.hello` 의 콜백함수가 호출되기 전의 `this1` 은 `hello` 메서드를 호출한 객체인 `cat` 객체이다.
2. `cat.hello` 의 콜백함수는 일반 함수로서 호출되기 때문에 `this2` 는 전역 객체를 가리킨다.

```jsx
const cat = {
  name: "무지",
  hello(callback) {
    setTimeout(callback, 3000);
  },
  helloBindthis(callback) {
    setTimeout(callback.bind(this), 3000);
  },
};

cat.helloBindthis(function () {
  console.log(this.name);
});

// {
//  name: '무지',
//  hello: [Function: hello],
//  helloBindthis: [Function: helloBindthis]
// } this2
// 무지
```
