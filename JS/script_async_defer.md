### script 태그의 async / defer 어트리뷰트

자바스크립트 파싱에 의한 `DOM` 생성이 중단되는 문제를 근복적으로 해결하기 위해 `HTML5` 부터

`script` 태그에 `async` 와 `defer` 어트리뷰트가 추가되었다.

`async` 와 `defer` 어트리뷰트는 `src` 어트리뷰트를 통해 외부 자바스크립트 파일을 로드하는 경우에서만

사용할 수 있다.

```jsx
<script async src="apple.js"></script>
<script defer src="banana.js"></script>
```

### async 어트리뷰트

`HTML` 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다.

단, 자바스크립트의 파싱과 실행은 자바스크립트 파일에 로드가 완료된 직후 진행되며, 이때 `HTML` 파싱이 중단된다.

### defer 어트리뷰트

`async` 어트리뷰트와 마찬가지로 `HTML` 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다.

**단, 자바스크립트 파싱과 실행은 `HTML` 파싱이 완료된 직후, 즉 `DOM` 생성이 완료된 직후 진행된다.**

![async_defer](https://user-images.githubusercontent.com/46440898/212106295-05beac16-e3eb-4970-9241-75abad5f2b46.png)

출처 : [https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)
