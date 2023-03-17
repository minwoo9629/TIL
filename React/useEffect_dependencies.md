![React](https://user-images.githubusercontent.com/46440898/225893390-5a081240-69f7-481e-8a4d-716fafc25e44.jpeg)

### useEffect

`useEffect` 는 함수형 컴포넌트에서 `Side Effect` 를 수행하기 위해 사용한다.

### sideEffect

> Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.

`Side Effect` 란 `API` 호출, `DOM` 조작 등 컴포넌트 외부에 영향을 주는 작업을 말한다.

```tsx
useEffect(setup, dependencies?)
```

### setup

> The function with your Effect’s logic.
> When your component is first added to the DOM, React will run your setup function. After every re-render with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. After your component is removed from the DOM, React will run your cleanup function one last time.

컴포넌트가 `DOM` 에 처음 추가되면 `React` 는 `setup` 함수를 실행한다.
`dependencies` 가 변한 상태로 리렌더가 완료되면 `cleanup` 함수를 작성했다면 `React` 는 먼저 이전 값에 대한 `cleanup` 함수를 실행하고 새로운 값으로 `setup` 함수를 설정한다.

`DOM` 에서 컴포넌트가 제거되면 `React` 는 마지막으로 `cleanup` 함수를 실행한다.

### **optional dependencies**

> The list of all reactive values referenced inside of the setup code.
> Reactive values include props, state, and all the variables and functions declared directly inside your component body.

`dependencies` 는 `setup` 함수 내에서 참조되는 모든 값들의 목록이다.

`props` 와 `state` 그리고 컴포넌트 내에 작성된 모든 변수와 함수를 포함한다.

### Primitive Type dependencies

```tsx
import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount!");
    // UnMount는 어떻게 만들까?
    // Mount를 제어하는 useEffect에 전달되는 callback함수가 함수를 하나 return 되게 한다.
    return () => {
      // Unmount 시점에 실행되게 됨
      console.log("Unmount");
    };
  }, []);
  return <div>Unmount Testring Component</div>;
};
const LifeCycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [numState, setNumState] = useState(0);
  const toggle = () => setIsVisible(!isVisible);
  useEffect(() => {
    console.log(`num가 변할때마다 실행돼요~ 값 : ${numState}`);
  }, [numState]);
  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON / OFF</button>
      {isVisible && <UnmountTest />}
      <p>숫자 : {numState}</p>
      <button onClick={() => setNumState(numState + 1)}>더하기</button>
      <button onClick={() => setNumState(numState)}>유지하기</button>
    </div>
  );
};

export default LifeCycle;
```

`LifeCycle` 컴포넌트 내에 `useEffect` 의 `dependencies` 에 `primitive` 자료형을 넣었다.
더하기 버튼을 누르면 값이 변하므로 `console.log` 가 실행되고 유지하기를 누르면 값이 변하지 않으므로 실행되지 않는다.

### Object Type dependencies

`dependencies` 에 들어있는 값이 `primitive` 자료형이라면 값을 비교하기 때문에 문제가 되지 않는다.

하지만 객체일때는 이를 어떻게 해야할까? 다음과 같은 컴포넌트가 있다고 해보자.

```tsx
import { useState } from "react";
import PlayerInfo from "./PlayerInfo";

const Player = () => {
  const [player, setPlayer] = useState({ userId: 1 });

  const addNumber = () => {
    setPlayer({ ...player, userId: player.userId + 1 });
  };

  const minusNumber = () => {
    if (player.userId > 1) {
      setPlayer({ ...player, userId: player.userId - 1 });
    }
  };

  const equal = () => {
    setPlayer({ ...player });
  };
  return (
    <div>
      <div>사용자 번호 : {player.userId}</div>
      <PlayerInfo player={player} />
      <button onClick={equal}>=</button>
      <button onClick={addNumber}>+</button>
      <button onClick={minusNumber}>-</button>
    </div>
  );
};

export default Player;
```

`equal` 함수를 실행하면 `player state` 의 `userId` 값이 바뀌지 않는다.

그렇다면 이를 `props` 로 받는 `PlayerInfo` 컴포넌트를 확인해보자.

```tsx
import React, { useEffect, useState } from "react";
const PlayerInfo = ({ player }) => {
  const [info, setInfo] = useState({});
  useEffect(() => {
    const fetchPlayer = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${player.userId}`
      ).then((response) => response.json());

      setInfo({ ...res });
    };
    fetchPlayer();
    console.log("확인해보기");
  }, [player]);

  return (
    <div>
      <p>플레이어 {player.userId}에 대한 정보입니다.</p>
      <div>{info.id}</div>
      <div>{info.name}</div>
      <div>{info.email}</div>
    </div>
  );
};

export default PlayerInfo;
```

이 경우 `props` 의 `userId` 값은 바뀌지 않았지만 객체의 얕은비교로 인해 `useEffect` 내의 `fetch` 함수가 실행된다.

그렇다면 `userId` 값을 `dependencies` 에 넣으면 되지 않을까 라는 생각을 할 수 있다.

틀린 방법이 아니다. 하지만 객체의 값이 여러개 일때 `dependencies` 에 다 넣어야하는 불편함이 발생한다.

그렇다면 이를 어떻게 해결할 수 있을까?

```tsx
import React, { useEffect, useState } from "react";
import isDeepEqual from "fast-deep-equal";

const PlayerInfo = ({ player }) => {
  const [prevData, setPrevData] = useState();
  const [info, setInfo] = useState({});
  if (!isDeepEqual(prevData, player)) {
    setPrevData(JSON.parse(JSON.stringify(player)));
  }
  useEffect(() => {
    const fetchPlayer = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${prevData.userId}`
      ).then((response) => response.json());

      setInfo({ ...res });
    };
    fetchPlayer();
    console.log("확인해보기");
  }, [prevData]);

  return (
    <div>
      <p>플레이어 {player.userId}에 대한 정보입니다.</p>
      <div>{info.id}</div>
      <div>{info.name}</div>
      <div>{info.email}</div>
    </div>
  );
};

export default PlayerInfo;
```

`PlayerInfo` 컴포넌트가 실행되면 이 전의 `props` 를 저장하기 위한 `prevData` `state` 를 선언해준다.

그 다음 객체의 깊은 비교를 수행하는 `isDeepEqual` 이 동작하고 객체를 구성하는 값이 다른 경우 `prevData` 값을 `player` `props` 의 값으로 바꾸어준다.

만약 객체 내부의 값이 같다면 `setState` 함수가 동작하지 않는다.

따라서 객체 내부의 값이 다르면 `setState` 가 일어나고 변화가 감지되므로 `useEffect` 내의 `fetch` 함수가 실행된다.

반면에 값이 같아 `setState` 함수가 동작하지 않으면 변화가 감지되지 않으므로 불필요한 `fetch` 가 동작하지 않게 된다.

### 느낀점

객체가 엄청나게 많은 값을 가지는 것을 피하는 것이 제일 좋겠지만 이러한 경우에 대해서 `useEffect` 를 올바르게 사용할 수 있도록 공부할 수 있는 좋은 시간이였다.
