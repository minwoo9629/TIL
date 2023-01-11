### 화살표 함수의 this 바인딩

> 화살표 함수의 `this` 는 일반 함수의 `this` 와 다르게 동작한다.
> `this` 바인딩은 함수의 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.

다음 코드를 보고 결과를 예측해보자.

```jsx
class CatCall {
  constructor(prefix) {
    this.prefix = prefix;
  }

  calling(catNames) {
    console.log(this); // 1
    return catNames.map(function (catName) {
      console.log(this); // 2
      return this.prefix + " " + catName;
    });
  }
}

const catCaller = new CatCall("고양이");
const catNames = ["무지", "막지", "코비", "베리"];
const res = catCaller.calling(catNames);

console.log(res);
```

기대하는 결과는 `["고양이 무지","고양이 막지","고양이 코비","고양이 베리" ]` 일 것이다.

하지만 `TypeError: Cannot read property 'prefix' of undefined` 가 발생한다.

1번에서의 `this` 는 메서드를 호출한 `CatCall` 객체를 가리킨다. 하지만 `Array.prototype.map` 의 인수로

전달된 콜백함수의 내부에서의 `this` , 즉 2번 `this` 는 `undefined` 를 가리킨다.
이는 `Array.prototype.map` 메서드가 콜백 함수를 일반함수로서 호출하기 때문이다.

```jsx
class CatCall {
  constructor(prefix) {
    this.prefix = prefix;
  }
  calling(catNames) {
    const that = this;
    return catNames.map(function (catName) {
      return that.prefix + " " + catName;
    });
  }
}

const catCaller = new CatCall("고양이");
const catNames = ["무지", "막지", "코비", "베리"];
const res = catCaller.calling(catNames);
// [ '고양이 무지', '고양이 막지', '고양이 코비', '고양이 베리' ]
console.log(res);
```

다음과 같이 `CatCall` 을 가리키는 `this` 를 회피시켜 콜백 함수 내부에서 사용한다.

`Array.prototype.map` 은 콜백 함수 내부의 `this` 문제를 해결하기 위해 두 번째 인수로 콜백 함수 내부에서

`this` 로 사용할 객체를 전달할 수 있다.

```jsx
class CatCall {
  constructor(prefix) {
    this.prefix = prefix;
  }
  calling(catNames) {
    return catNames.map(function (catName) {
      return this.prefix + " " + catName;
    }, this);
  }
}
```

`Function.prototype.bind` 를 이용한 `this` 바인딩

```jsx
class CatCall {
  constructor(prefix) {
    this.prefix = prefix;
  }
  calling(catName) {
    return catNames.map(
      function (catName) {
        return this.prefix + " " + catName;
      }.bind(this)
    );
  }
}
```

### 화살표 함수를 사용한 콜백 함수 내부 this 바인딩 문제 해결

```jsx
class CatCall {
  constructor(prefix) {
    this.prefix = prefix;
  }
  calling(catNames) {
    return catNames.map((catName) => this.prefix + " " + catName);
  }
}

const catCaller = new CatCall("고양이");
const catNames = ["무지", "막지", "코비", "베리"];
const res = catCaller.calling(catNames);
// [ '고양이 무지', '고양이 막지', '고양이 코비', '고양이 베리' ]
console.log(res);
```

<aside>
💡 **화살표 함수는 함수 자체의 `this` 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 `this` 를 참조하면 상위 스코프의 `this` 를 그대로 참조한다. 이를 `lexical this` 라 한다.**

</aside>

이는 마치 렉시컬 스코프와 같이 화살표 함수의 `this` 가 함수가 정의된 위치에 의해 결정된다는 것을 의미한다.

렉시컬 스코프에 대한 내용은 여기를 참조하자
[https://github.com/minwoo9629/TIL/blob/main/JS/scope.md#렉시컬-스코프-lexical-scope](https://github.com/minwoo9629/TIL/blob/main/JS/scope.md#%EB%A0%89%EC%8B%9C%EC%BB%AC-%EC%8A%A4%EC%BD%94%ED%94%84-lexical-scope)

다음 코드 결과를 예측해보자.

```jsx
const obj = {
  num: 10,
  hello() {
    console.log(this.num);
  },
  hello2: () => {
    console.log(this.num);
  },
};

obj.hello();
obj.hello2();
```

결과는 `10` 과 `undefined` 다.
`hello2` 프로퍼티에 할당된 화살표 함수의 상위 스코프는 전역이므로 `this` 는 전역 객체를 가리킨다.

메서드를 정의할 때는 `ES6` 메서드 축약 표현으로 정의한 `ES6` 메서드를 사용하도록 하자.
