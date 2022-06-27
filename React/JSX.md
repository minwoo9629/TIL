## JSX란?

> `JavaScript` + `XML` 로 자바스크립트를 확장한 문법이다.
>

```jsx
const element = <h1>Hello, React</h1>;
```

- `React`에서는 본질적으로 렌더링 로직이 `UI` 로직(이벤트가 처리되는 방식, 시간에 따라 `state`가 변하는 방식, 화면에 표시하기 위해 데이터가 준비되는 방식 등)과 연결된다는 사실을 받아들인다.

    
💡 `JSX`에서 작성한 내용이 결과적으로 `DOM Element`에 표현이 된다.

    

- `React`는 별도의 파일에 마크업과 로직을 넣어 기술을 인위적으로 분리하는 대신,
  둘 다 포함하는 `컴포넌트`라고 부르는 느슨하게 연결된 유닛으로 관심사를 분리한다.

💡 `HTML` ,`CSS` , `JS` 파일을 각각 작성하지 않고 기능단위(컴포넌트 유닛단위)로 전부 다 작성한다. 이를 통해 다른 컴포넌트에게 영향을 주지 않아 의존성이 낮은 느슨한 결합(`Loose Coupling`)이 된다.



## JSX의 역할

> 내부적으로 `XML` `HTML` 코드를 `JavaScript` 코드로 변환하는 역할을 한다.
>

## JSX 규칙

- 닫힘 규칙 : 태그는 꼭 닫혀있어야 한다.

    ```jsx
    function App() {
      return (
        <div>
          <h1>안녕 리액트</h1>
          <div>
        </div>
      );
    }
    
    export default App;
    ```

  태그가 닫혀있지 않으면 다음과 같음 에러가 발생한다.

  ![닫힘규칙1](https://user-images.githubusercontent.com/46440898/175886407-e5df2902-1505-4db1-a669-7c03c67bda9f.png)

  ![닫힘규칙2](https://user-images.githubusercontent.com/46440898/175886494-0c3c5a9f-28a2-48ff-be5a-19d3261992f5.png)

- 태그와 태그 사이에 내용이 들어가지 않을 때에는, `Self Closing` 태그 라는 것을 사용해야 한다.
  현재 `Header` 컴포넌트를 사용할 때 `Self Closing` 태그를 사용하였다.

    ```jsx
    import "./App.css";
    import Header from "./Header";
    import Container from "./Container";
    function App() {
      return (
        <Container>
          <div className="App">
            <Header />
          </div>
        </Container>
      );
    }
    
    export default App;
    ```


- `JSX` 의 표현식은 반드시 하나의 부모를 가져야 한다.

    ```jsx
    import "./App.css";
    import Header from "./Header";
    import Container from "./Container";
    function App() {
      return (
         <div className="App">
           <Header />
         </div>
         <div></div>
    		
      );
    }
    
    export default App;
    ```

  <img width="772" alt="최상위 태그" src="https://user-images.githubusercontent.com/46440898/175886652-ac968aea-3657-44d0-b881-891d5db6c97a.png">

  이렇게 단순히 감싸기 위하여  `div` 를 사용할 수 있지만, 리액트의 `Fragment` 라는 것을 사용하면 된다.

    ```jsx
    import "./App.css";
    import Header from "./Header";
    import Container from "./Container";
    function App() {
      return (
    		<div>
          <div className="App">
            <Header />
            <div>안녕 {name}</div>
            <Counter {...counterProps} />
            <Footer />
          </div>
          <div></div>
        </div>
      );
    }
    
    export default App;
    ```

    ```jsx
    import "./App.css";
    import Header from "./Header";
    import Container from "./Container";
    function App() {
      return (
    		<>
          <div className="App">
            <Header />
            <div>안녕 {name}</div>
            <Counter {...counterProps} />
            <Footer />
          </div>
          <div></div>
        </>
      );
    }
    
    export default App;
    ```

  다음과 같은 결과를 확인할 수 있다.

  ![결과](https://user-images.githubusercontent.com/46440898/175886737-fa0383d9-f24e-48ba-a57c-0f33320cbdce.png)

- `JSX` 의 중괄호 안에는 유효한 모든 자바스크립트 표현식을 넣을 수 있다.

    ```jsx
    import "./App.css";
    import Container from "./Container";
    function App() {
      let name = "무지";
      return (
        <>
          <div className="App">
            <div>안녕 {name}</div>
          </div>
          <div></div>
        </>
      );
    }
    
    export default App;
    ```