## 비동기(**Asynchronous)** 처리란?

<aside>
💡 현재 실행 중인 태스크가 종료되지 않은 상태라 해도 다음 태스크를 곧바로 실행하는 방식이다.

즉, 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성을 의미한다.

</aside>

다음 예제를 한 번 확인해 보자

```jsx
function task1(){
    console.log("라면을 다 끓였다.");
}

function task2(){
    console.log("라면을 끓이는 동안 다를 일을 한다.");
}

setTimeout(task1, 5*1000);
task2();
```

<img width="314" alt="async" src="https://user-images.githubusercontent.com/46440898/157446731-0d168fe5-73e4-4327-9b1c-8f393aa4194d.png">
실행화면

위 예시 처럼 `setTimeout` 함수 이후의 `task`를 `blocking(작업중단)`하지 않고 곧바로 실행한다.

또 다른 예시를 확인해보자

```jsx
function fetchData(){
	let result = [];

	$.get('url주소부분',function(response){
		result = data;
	});
	return reulst;
}
// undefined
console.log(fetchData());
```

 `$.get()` 는 `ajax` 통신을 하는 부분이다.

`url` 주소 부분에 해당하는  `url` 주소로 `HTTP GET` 요청을 날려 정보를 요청하는 코드이다. 

그렇게 서버에서 받아온 데이터는 `reseponse` 인자에 담기고 `result = response;` 코드로 받아온 데이터를 `result`라는 변수에 저장한다. 

이제 이 `fetchData()`를 호출하면 `undefined` 가 된다.

그 이유는 `$.get()`로 데이터를 요청하고 받아올 때까지 기다려주지 않고 다음 코드인 `return result;`를 실행했기 때문이다. 

따라서, `fetchData()`의 결과 값은 초기 값을 설정하지 않은 `result`의 값 `undefined`를 출력한다

> 이 처럼 비동기 처리 방식은 현재 실행 중인 `task` 가 종료되지 않은 상태라 해도 다음 `task` 를 곧바로 실행하므로 `blocking` 이 발생하지 않는 장점이 있지만, 실행 순서가 보장되지 않는 단점이 있다.
> 

---

## Callback Hell

`CallbackHell (콜백 지옥)`은 비동기 처리 로직을 위해 콜백 함수를 연속해서 사용할 때 발생하는 문제이다.

```jsx
$.get('url', function(response) {
	// 전달받은 response data를 파싱하는 함수
	parseData(response, function(id) {
		// 데이터 파싱후 사용자 인증을 확인하는 함수
		userCheck(id, function(result) {
			// 사용자 인증 완료 후 화면에 보여주는 함수
			display(result, function(text) {
				console.log(text);
			});
		});
	});
});
```