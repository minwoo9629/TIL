![next](https://user-images.githubusercontent.com/46440898/225577042-8be8411c-2058-4655-a016-d27d4e245c49.png)

### Hydration이란?

> In web development, hydration or rehydration is a technique in which client-side JavaScript converts a static HTML web page, delivered either through static hosting or server-side rendering, into a dynamic web page by attaching event handlers to the HTML elements.

웹 개발에서 클라이언트 측 자바스크립트가 정적 호스팅이나 서버 측 렌더링을 통해 제공되는 정적 `HTML` 웹 페이지를 `HTML` 요소에 `이벤트 핸들러`를 부착하여 동적 웹 페이지로 변환하는 기술이다.

`Server Side` 단에서 렌더링 된 정적 페이지와 번들링된 `JS` 파일을 클라이언트에게 보내주고, 클라이언트 단에서 `HTML` 코드와 `React`인 `JS`코드를 서로 매칭 시키는 과정을 말한다.

<img width="705" alt="server-side-rendering" src="https://user-images.githubusercontent.com/46440898/225579616-4e7e7f32-4a31-4fb9-936c-2f241a5133a9.png">

출처 : [https://conf.reactjs.org/stage](https://conf.reactjs.org/stage)

> In React, “hydration” is how React “attaches” to existing HTML that was already rendered by React in a server environment. During hydration, React will attempt to attach event listeners to the existing markup and take over rendering the app on the client.

`React` 에서 `hydration` 이란 `server side` 에서 이미 렌더링한 기존 `HTML` 에 `React` 를 연결하는 방식이다. `hydration` 중에 `React` 는 `event listeners` 를 기존 마크업에 부착하고 앱을 렌더링 한다.
