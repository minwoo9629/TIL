![redux](https://user-images.githubusercontent.com/46440898/230768056-ac85a61e-6301-40e3-b3ee-5b3c4baa4513.jpeg)

## Redux-thunk

`redux-thunk`는 리덕스에서 비동기 작업을 처리 할 때 가장 많이 사용하는 미들웨어다.

우리가 `redux` 를 사용할 때 액션 객체를 `return` 하는 `action creator` 를 `dispatch` 했다면 `redux-thunk` 를 이용하여 액션 객체가 아닌 함수를 디스패치 할 수 있다.

`redux-thunk` 의 코드는 다음과 같은데 함수를 `dispatch` 하는 경우 해당 함수에 `dispatch` 와 `getState`
 를 인수로 넘겨준다.

```jsx
const thunkMiddleWare = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};
```

다음은 사용자로부터 `ID` 와 `PASSWORD` 를 전달받아 로그인을 하는 로직이다.

먼저 `API` 호출에 대한 결과는 `msw` 를 통해 `api` 를 모킹했다.

돌아와서 해당 로직의 방향성은 사용자가 `ID` 와 `PASSWORD` 를 입력 후 로그인 버튼을 눌렀을 `login async function`을 `dispatch`로 호출한 후이다.

1. 로그인 성공후 `profile async function` 호출한다.
2. `/` 메인으로 라우팅 - 라우팅의 경우 `Login` 페이지에서 `navigate` 함수를 전달하였다.

```jsx
const login = (navigate, data) => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.login(data);
      sessionStorage.setItem("accessToken", res.data.accessToken);
      dispatch(loginSuccess());
      dispatch(profile());
      navigate("/", { replace: true });
    } catch (e) {
      dispatch(loginFailure());
      dispatch(alertActions.fail(e.response.data.errorMessage));
    }
  };
};
```

```jsx
const profile = () => {
  return async (dispatch, getState) => {
    try {
      const res = await userService.profile();
      dispatch(profileSuccess(res.data));
    } catch (e) {
      dispatch(profileFailure());
    }
  };
};
```

로그인이 완료되면 `Redux` 의 `store` 에는 로그인한 계정의 `profile` 정보를 가지게 된다.

또한 메인으로 이동시 헤더에 로그인 중인 사용자의 이름이 표시되도록 하였다.

### 느낀점

`redux-thunk` 는 처음 `redux` 에서 비동기 관련 로직을 작성할 때 사용했던 미들웨어이다.

당시에는 그냥 이렇게 사용하는거야 하고 급급하게 사용했지만 정리하면서 좀 더 원하는 방향으로 작성할 수 있었다.

당시에는 로그인 요청은 로그인 페이지에서 처리하고 그 이후 프로필을 요청하는 로직만 `redux-thunk` 에 작성했는데 로그인 요청과 프로필 요청을 분리하고 이를 미들웨어로 제어할 수 있었다.

간단하게 로직을 작성하느라 부족한 점이 많은 것 같다.

다음 계획은 다음과 같다.

1. 로그인 이후 `token` 을 `sessionStorage` 에 저장했는데 `localStorage` 에 저장하지 않은 이유 그리고 다른 탭에서는 `token` 이 공유가 되지 않기 때문에 이를 보완할 수 있는 방법 `cookieSession` 사용하기
2. 로그인 `input` 에 대해서 `react-hook-form` 사용하기
