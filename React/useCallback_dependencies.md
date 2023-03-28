![React](https://user-images.githubusercontent.com/46440898/225893390-5a081240-69f7-481e-8a4d-716fafc25e44.jpeg)

### useCallback

`useCallback` 는 `memoization` 된 콜백 함수를 반환한다.

`memoization` 이란 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술이다.

컴포넌트가 렌더링 될 때 그 안에 있는 함수도 다시 만들게 된다.
하지만 똑같은 함수를 컴포넌트가 리렌더링 된다고 해서 **계속 다시 만드는 것**은 좋은 현상이 아니다.

```jsx
import { useCallback, useState } from "react";
import ChildrenComponent from "./ChildrenComponent";

const ParentComponet = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  const add = useCallback(() => {
    setCount((prevState) => prevState + 1);
  }, []);

  return (
    <div>
      <p>카운트1 : {count}</p>
      <ChildrenComponent onClick={add} />
      <input onChange={(e) => setMessage(e.target.value)} value={message} />
    </div>
  );
};

export default ParentComponet;
```

```jsx
import React, { useEffect } from "react";

const ChildrenComponent = ({ onClick }) => {
  useEffect(() => {
    console.log("children component rendered");
  });
  return (
    <div>
      <button onClick={onClick}>더하기</button>
    </div>
  );
};

export default React.memo(ChildrenComponent);
```

해당 코드의 결과로 기대할 수 있는 것은 `ChildrenComponent` 는 `ParentComponent` 로 부터 `memoization` 된 함수의 참조 값을 `props` 로 전달받기 때문에 `React.memo` 를 통해서 불필요한 리렌더를 방지 할 수 있다.

### useCallback 뜯어보기

```jsx
export function useCallback<T>(
  callback: T,
  deps: Array<mixed> | void | null
): T {
  const dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, deps);
}
```

여기서 `mixed` 는 무엇인가?

### Mixed

> `mixed` is the supertype of all types. All values are `mixed`.
> However, this means that very few operations are permitted on it, without refining to some more specific type. That's because the valid operations on `mixed`
>  must be valid for all types.

`mixed` 는 모든 타입에 대한 상위 타입이다.

`mixed` 타입을 사용하는 경우에는 구체적인 타입에 대한 정의 없이는 특정한 작업을 허용하지 않는다.

`flow` 라는 타입스크립트와는 다른 자바스크립트의 슈퍼셋에서 사용되는 것 같다.

```jsx
// @ flow
function mixedFunc(arg: mixed) {
  // Error
  return arg.indexOf("a");
}

function anyFunc(arg: any) {
  return arg.indexOf("a");
}
```

위의 코드에서 에러를 해결하기 위해서는 `typeof` 를 이용해서 그 타입을 확인하고, 나머지 모든 케이스에 대한 처리를 해줘야 한다.
이렇게 `typeof` 를 이용해서 런타임의 값을 타입으로 처리하는 방식을 `flow` 에서는 `refinement`
타입스크립트에서는 `type guard` 라고 한다.

```jsx
function mixedFunc(arg: mixed) {
  if (typeof arg === "string") {
    return arg.indexOf("a");
  } else {
    return -1;
  }
}
```

`type guard` 에 대해서는 저번에 `TS` 를 공부하면서 정리했으니 한 번 더 읽어보도록 하자.

### 느낀점

`useCallback` 을 왜 사용해야하는지 한 번 더 리마인드하게 되는 시간이었다.

중간에 `props` 로 전달받은 `memoization` 된 함수에 대해서 어떻게 `React.memo` 가 비교하는거지? 라는
고민에 빠졌었다.

`useCallback` 을 통해 생성된`memoization` 된 함수에 대한 참조값은 메모리에 저장되어 있다.

이 함수를 `props` 로 전달하면 그 함수의 참조값이 전달된다.

이 때 `React.memo` 가 이전에 렌더링했을 때 전달된 `props` 값을 기억하고 있기 때문에,

이전에 전달된 함수와 현재 전달된 함수의 참조값이 동일하다면, 렌더링을 생략하는 것이다.
