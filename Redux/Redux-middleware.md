![redux](https://user-images.githubusercontent.com/46440898/230768056-ac85a61e-6301-40e3-b3ee-5b3c4baa4513.jpeg)

## Redux middleware

> Redux middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. People use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.

`dispatch` 와 `reducer` 사이에서 동작하며, 대표적으로 `redux-thunk` `redux-saga` 가 있다.

비동기를 다루기 위해서 `middleware` 를 사용하는 것이 아니라 `dispatch` 와 `reducer` 사이에서 어떠한 동작이든 할 수 있게 해주는 것이 `middleware` 다.

`Redux middleware` 는 로깅, 충돌 보고, 비동기 `API` 통신, 라우팅 등을 위해 사용한다.

### middleware 연결하기

`store` 를 생성할 때 두번째 인수로 `enhancer` 를 넘겨준다.

`enhancer` 는 `store` 에 `redux` 가 할 수 없던 기능을 덧붙이는 것이다.

현재 코드는 `redux-devtools` 와 `LogginMiddleware` 그리고 `SecondMiddleware` 를 미들웨어로 생성한 코드이다.

```jsx
import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import LoggingMiddleWare from "./middleware/LoggingMiddleware";
import SecondMiddleware from "./middleware/SecondMiddleware";
import reducer from "./reducers";

const enhancer = composeWithDevTools(
  applyMiddleware(LoggingMiddleWare, SecondMiddleware)
);
const store = createStore(reducer, enhancer);

export default store;
```

기본적인 미들웨어의 코드를 확인해보자.

```jsx
const middleware = (store) => (next) => (action) => {};
```

기본적으로 `(store) => (next) => (action) =>` 으로 이루어진 3단 함수이다.

`store` 는 리덕스 스토어 인스턴스이다. `dispatch` , `getState` 내장 함수가 있다.

`next` 는 `action`을 다음 미들웨어에게 전달하는 함수이다.

`next(action)`형태로 사용하며 만약 다음 미들웨어가 없다면 리듀서에게 액션을 전달한다.

만약에 `next`를 호출하지 않으면 `action`이 무시되며 리듀서에게로 전달되지 않는다.

`action` 은 현재 처리하고 있는 `action` 객체를 의미한다.

현재 `LogginMiddleware` , `SecondMiddleware` 순서로 미들웨어를 등록했기에 새로운 `action`이 `dispatch` 되면 첫 번째로 등록한 미들웨어가 호출된다.

만약에 첫번째 미들웨어에서 `next(action)`을 호출하게 되면 다음 미들웨어로 액션이 넘어가 동작하게 된다.

미들웨어를 등록할땐 순서에 유의하도록 하자.

이제 `LoggingMiddleware` 와 `SecondMiddleware`코드를 확인해보자.

```jsx
const LoggingMiddleWare = (store) => (next) => (action) => {
  if (action.type === "INCREMENT" || action.type === "DECREMENT") {
    console.log("첫번째 미들웨어");
    console.log(store.getState().counter.count, "before");
    return next(action);
  }
};

export default LoggingMiddleWare;
```

```jsx
const SecondMiddleware = (store) => (next) => (action) => {
  if (action.type === "INCREMENT" || action.type === "DECREMENT") {
    console.log("두번째 미들웨어");
    next(action);
    console.log(store.getState().counter.count, "after");
  }
};

export default SecondMiddleware;
```

해당 코드는 `action creator` 로 부터 전달받은 `action` 의 `type` 이 증가 또는 감소인 경우 `store` 의 `state` 가 변하기 전 과 후의 `state` 값을 출력하도록 하는 미들웨어이다.
하나의 미들웨어로 처리할 수 있지만 미들웨어에서 다른 미들웨어로 전달하는 과정을 확인하고자 두 개의 미들웨어로 분리하여 작성해보았다.

<img width="648" alt="middleware" src="https://user-images.githubusercontent.com/46440898/230900194-39620dd4-1245-4617-b8bb-b9e8a70d7d6b.png">

### 느낀점

비동기 요청을 관리하는 미들웨어가 아닌 단순히 로그를 확인하는 정도의 간단한 미들웨어를 작성해보았다.

다음 글은 `redux-thunk` 에 대해 알아보고 간단한 비동기 요청을 실행해보고 요청이 성공적으로 완료 된 후에 미들웨어를 통해 페이지 라우팅까지 처리하는 미들웨어를 만들어 보도록하자.

로그인이 성공되면 해당 유저의 프로필 정보를 불러오는 걸 만들어 보는 것도 미들웨어를 사용하는 예시로 적합할 것 같다.
