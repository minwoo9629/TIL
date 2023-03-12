![typesript](https://user-images.githubusercontent.com/46440898/223417544-b1817a6d-4a50-49d6-9e55-3f6136fe00d6.png)

### 제네릭이란

단일 타입이 아닌 다양한 타입에서 작동하는 컴포넌트를 생성하는데 사용된다.

사용자는 제네릭을 통해 여러 타입의 컴포넌트나 자신만의 타입을 사용할 수 있다.

### 제네릭 사용하기

다음과 같이 인수를 받아 그 인수를 출력하는 `logText` 함수가 있다 해보자.

```tsx
function logText(text) {
  console.log(text);
  return text;
}

logText("typescript generics");
logText(1);
```

이는 `union` 을 이용해서 다음과 같이 작성할 수 있다.

```tsx
function logText(text: number | string) {
  console.log(text);
  return text;
}

logText("typescript generics");
logText(1);
```

또는 `any` 키워드를 사용해서 인수가 어떤 타입이든 받을 수 있게 작성할 수 있겠지만

실제로 함수가 반환할 때 어떤 타입인지에 대한 정보는 잃게 된다.

만약 `number` 타입을 넘긴다고 해도 `any` 타입이 반환된다는 타입 추론을 확인할 수 있다.

다음과 같이 코드를 작성하면 어떻게 될까?

공식문서 내용을 확인하면

> `T`는 유저가 준 인수의 타입을 캡처하고 이 정보를 나중에 사용할 수 있게 합니다.
> 여기에서는 `T`를 반환 타입으로 다시 사용합니다.
> 인수와 반환 타입이 같은 타입을 사용하고 있는 것을 확인할 수 있습니다.
> 이를 통해 타입 정보를 함수의 한쪽에서 다른 한쪽으로 운반할 수 있게끔 합니다.

```tsx
function logText<T>(text: T) {
  console.log(text);
  return text;
}

logText("typescript generics");
logText(1);
```

해당 로직에 대해서 `logText` 에 대한 타입추론은 `any` 를 사용할때와 다르다는 것을 확인할 수 있다.

<img width="605" alt="generics1" src="https://user-images.githubusercontent.com/46440898/224551274-ec43a075-7fc4-49c7-9596-be72a3475513.png">

### 화살표 함수의 제네릭 (with React)

다음과 같은 코드가 있을 때 `vscode` 에서는 에러가 잡히지 않는다 하지만 **[`TSPlayground`](https://www.typescriptlang.org/play) 에서 `JSX` 환경에서 실행하면 오류가 발생한다.**

```tsx
const logText = <T,>(text: T): T => {
  console.log(text);
  return text;
};

logText<number>(1000);
logText<string>("typescript generics");
```

`.tsx` 확장자 파일은 `TypeScript + JSX`로 구성되어 있어서 `<T>` 가 태그 문제가 발생한다.

따라서 `.tsx` 확장자 파일에서 제네릭 화살표 함수를 구현해야 하는 경우 제네릭 매개변수에 `extneds`를 사용하여 컴파일러에게 제네릭 화살표 함수라고 알려줘야 한다.

```tsx
const logText = <T extends unknown>(text: T): T => {
  console.log(text);
  return text;
};
```

```tsx
const logText = <T = unknown,>(text: T): T => {
  console.log(text);
  return text;
};
```
