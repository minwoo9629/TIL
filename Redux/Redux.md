![redux](https://user-images.githubusercontent.com/46440898/230768056-ac85a61e-6301-40e3-b3ee-5b3c4baa4513.jpeg)

`Redux` 에 대해 글을 쓴 적이 있지만 내용이 부족한거 같아서 새롭게 다시 작성해 보기로 했다.

### Redux란?

> A Predictable State Container for JS Apps

`Redux`는 자바스크립트 앱을 위한 예측 가능한 상태 컨테이너이다.

`Redux` 는 대표적으로 `React` 와 함께 사용되는 상태 관리 라이브러리이다.

### Redux를 왜 사용할까?

> 컴포넌트간의 `state` 가 넘나들면서 수정하기에 어렵기 때문에 좀 더 용이하다.
> 그렇다면 `state` 가 특정 컴포넌트에 종속적이라면 그 컴포넌트 내에서 `state` 를 사용한다.
> `Redux` 를 사용한다 해서 `state` 를 무조건 사용하지 않는다는 것은 아니다.

### Redux의 특징

`Redux` 는 단방향 데이터 흐름을 따르며, 상태를 변경하기 위해서는 다음과 같은 과정을 거친다.

![redux-cycle](https://user-images.githubusercontent.com/46440898/230768062-8cb3643c-199d-4ed5-8b5d-4e1cf72c9733.png)

`Action`은 상태 변경을 위한 명령이다. 즉 상태를 어떻게 변경할 것인지에 대한 행동이다.

이러한 `Action` 을 `Dispatch` 를 통해서 실행한다.

`Reducer` 는 `Action` 의 `type` 에 따라 상태를 변경하는 함수이다.

`Store` 는 애플리케이션 상태를 저장하고, 상태가 변경되면 스토어를 업데이트한다.

이미지 출처 : [https://codeit.mk/home/followUs/blog/KEY-BENEFITS-OF-REDUX.html](https://codeit.mk/home/followUs/blog/KEY-BENEFITS-OF-REDUX.html)

코드를 작성해보면서 리덕스에 대해 이해해보자.

### CreateStore(reducer, enhancer?)

어플리케이션의 전체 상태 트리를 보유하는 `Store` (저장소)를 생성한다.

첫번째 인자로 `reducer` 가 들어간다.

`enhancer` 부분은 `redux-thunk` 를 도입할 때 좀 더 자세히 보자.

```jsx
import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers";

const enhancer = composeWithDevTools(applyMiddleware());
const store = createStore(reducer, enhancer);

export default store;
```

### Reducer

`combineReducers`헬퍼 함수는 서로 다른 리듀싱 함수들을 값으로 가지는 객체를 받아서 `createStore`에 넘길 수 있는 하나의 리듀싱 함수로 바꿔준다.

생성된 리듀서는 내부의 모든 리듀서들을 호출하고 결과를 모아서 하나의 상태 객체로 바꿔준다.

상태 객체의 형태는 `reducer`로 전달된 키들을 따른다.

```jsx
import { combineReducers } from "redux";
import counter from "./Counter";
const reducer = combineReducers({
  counter,
  // 추후 users 추가 예정
});

export default reducer;
```

`count` 상태를 변화시키는 `reducer`.

중요한 점은 상태 객체를 직접 변경해서는 안되며, 상태가 바뀐다면 새로운 객체를 반환해야 한다는 것이다.

### **불변성**

불변성을 지켜야하는 이유는 `redux`는 이전 `state`와 바뀐 `state`를 구분하는 방법이 참조값이 바뀌었는지 확인하고, 참조값이 바뀌면, `state`가 바뀌었다고 `redux`가 인식하여, 해당 `state`를 사용하는 컴포넌트에게 리렌더링을 요청하기 때문이다.

그렇기 때문에, `prevState.count += action.data`와 같이 직접적으로 `state`를 변경하면 참조값이 변하지 않아 `redux`는 값이 바뀌었다고 인식하지 않고 리렌더링 되지 않는다.

```jsx
const initialState = {
  count: 0,
};
const couter = (prevState = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...prevState, count: prevState.count + action.data };
    case "DECREMENT":
      return { ...prevState, count: prevState.count - action.data };
    default:
      return prevState;
  }
};

export default couter;
```

## action

코드의 중복을 방지하고 가독성을 위해 `action` 객체를 `return` 하는 `creator` 함수를 작성하는 것이 좋다.
`action Creator` -> `initialState` 또는 기존 `state` 중심으로 생각
내가 기존 `state`를 어떻게 바꿀 것인가에 대해 생각을 하자

```jsx
const increment = (data) => {
  return {
    type: "INCREMENT",
    data,
  };
};

const decrement = (data) => {
  return {
    type: "DECREMENT",
    data,
  };
};

export { increment, decrement };
```

### React-Redux

> React Redux is the official React UI bindings layer for Redux.
> It lets your React components read data from a Redux store, and dispatch actions to the store to update state.

`React Redux`는 `Redux`의 공식 React UI 바인딩 계층이다. (`React` 와 `Redux` 를 연결해 준다.)

`React` 구성 요소가 `Redux` 저장소에서 데이터를 읽고 작업을 저장소로 전송하여 상태를 업데이트할 수 있다.

### Provider

`Provider` 는 `Redux` 의 `Store` 에 접근해야 하는 모든 중첩 구성 요소에서 `Store` 저장소를 사용할 수 있도록 한다.
`React` 의 모든 구성 요소가 저장소에 연결할 수 있도록 최상위 수준에서 `Provider`를 작성해주도록 한다.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
```

### useSelector & useDispatch

> A hook(useSelector) to access the redux store's state.

`useSelector Hooks`를 이용해 스토어의 값에 접근할 수 있다.

> A hook(useDispatch) to access the redux `dispatch`function.

`store`에 있는 `dispatch` 함수에 접근하는 `hooks` 이다.

```jsx
import { useDispatch, useSelector } from "react-redux";
import CountButton from "../components/buttons/CountButton";
import { decrement, increment } from "../store/actions/counter";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const incrementCount = (e) => {
    dispatch(increment(Number.parseInt(e.target.value)));
  };

  const decrementCount = (e) => {
    dispatch(decrement(Number.parseInt(e.target.value)));
  };
  return (
    <div>
      <h1>Redux를 이용한 카운터</h1>
      <p>현재 카운트 : {count}</p>
      <CountButton
        onClick={incrementCount}
        value={1}
        buttonName={"1증가 시키기"}
      />
      <CountButton
        onClick={decrementCount}
        value={2}
        buttonName={"2감소 시키기"}
      />
    </div>
  );
};

export default Counter;
```

`useSelector` 는 두번째인자로 `useSelector` 를 최적화하기 위한 `equalityFn` 을 옵션으로 받는 것을 확인했다.

## Redux를 이용한 `state` 관리 일반적인 `state` 사용하는 것이 좋을까

> 컴포넌트간의 이동하는 `state` 의 경우 `Redux` 를 통해 관리하고 하나의 컴포넌트 안에서만 또는 부모 자식 관계안에서는 일반적인 `state` 로 관리한다.
