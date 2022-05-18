- 디렉티브는 `v-` 접두가사 있는 특수 속성
- 디렉티브 속성 값은 단일 `JavaScript` 표현식이 된다. (`v-for`는 예외)
- 디렉티브의 역할은 표현식의 값이 변경될 때 사이드 이펙트를 반응적으로 `DOM` 에 적용.

## v-model

- **양방향** 바인딩 처리를 위해서 사용
- `form` 에서 주로 사용되는 속성, 폼에 입력한 값을 뷰 인스턴스의 데이터와 즉시 동기화
- `input select textarea` 태그에만 사용할 수 있다.

```jsx
<div id="app">
	<input type="text" v-model="message" />
	<div>{{message}}</div>
</div>
<script>
	new Vue({
	el: "#app",
	data() {
		return {
			message: "안녕 vue",
		};
		},
});
</script>
```

## v-bind

- 아이디, 클래스, 스타일 등의 `HTML` 속성 값에 뷰 데이터 값을 연결할 때 사용하는 데이터 연결 방식
- `v-bind` 는 약어로 `:` 로 사용가능

```html
<style>
#btn1 {
	width: 200px;
	color: azure;
	background-color: cornflowerblue;
	padding: 8px 20px;
	cursor: pointer;
	border: none;
}
</style>
<div id="app">
	<div v-bind:id="idValue">메세지</div>
	<button :id="btnId">버튼</button>
	<!-- 속성이름은 동적으로 바인드가 되지않기 때문에 [] 대괄호 필요 -->
	<button :[key]="btnId">버튼2</button>
  <a v-bind:href="url1">네이버</a>
</div>
```

```jsx
<script>
new Vue({
	el: "#app",
	data() {
		return {
		idValue: "test-id1",
		key: "id",
		btnId: "btn1",
		url1: "http://www.naver.com",
		};
	},
});
</script>
```

## v-show

- `v-if` 와 유사하게 데이터의 진위 여부에 따라 해당 `HTML` 태그를 화면에 표시하거나 표시하지 않는다.
- 다만, `v-if` 는 해당 태그를 완전히 삭제하지만 `v-show` 는 `css` 효과만 `display:none;` 으로 주어 실제 태그는 남아 있고 화면 상으로만 보이지 않는다.

```html
<div id="app">
	<h2>v-Show</h2>
	<div v-show="isShow">{{msg}}</div>
	<button @click="isShow = !isShow">버튼</button>
</div>
```

```jsx
<script>
	new Vue({
	el: "#app",
	data() {
		return {
		msg: "Vue~~",
		isShow: true,
		};
	},
});
</script>
```

## v-if, v-else-if, v-else

- 지정한 뷰 데이터 값의 참, 거짓 여부에 따라 해당 `HTML` 태그를 화면에 표시하거나 표시하지 않는다.

```html
<div id="app">
	<label for="age">나이 : </label>
	<input type="text" id="age" v-model="age" />
	<div>
		<div>요금 :</div>
		<div v-if="age < 18">5000원</div>
		<div v-else-if="age < 70">9000원</div>
		<div v-else>무료</div>
	</div>
</div>
```

```jsx
<script>
	new Vue({
	el: "#app",
	data() {
		return {
			age: 0,
		};
	},
});
</script>
```

## v-for

- 배열이나 객체의 반복에 사용
- `v-for="배열 요소 변수 이름 in 배열"` or `v-for="(배열 요소 변수 이름, 인덱스) in 배열"`

```html
<div id="app">
	<h2>단순 for 문</h2>
	<span v-for="i in 5" :key="i">| {{i}}번 </span>
	<h2>객체 반복</h2>
	<div v-for="value in cat" :key="value.id">{{value}}</div>
	<br />
	<h2>배열 반복</h2>
	<div v-for="(cat, index) in cats" :key="index">{{cat}}</div>
</div>
```

```jsx
<script>
new Vue({
	el: "#app",
	data() {
		return {
			cat: {
				id: "muji",
				name: "무지",
				age: 4,
			},
			cats: ["무지", "막지", "먼지", "코비", "베리"],
		};
	},
});
</script>
```

```html
<div id="app">
	<h2>객체 배열 - 내용 출력</h2>
	<ul>
		<li v-for="(cat, index) in cats" :key="index">
			{{cat.catName}} : {{cat.age}}살
		</li>
	</ul>
</div>
```

```jsx
<script>
new Vue({
	el: "#app",
		data() {
			return {
				cats: [
					{
						catName: "무지",
						age: 4,
					},
					{
						catName: "막지",
						age: 3,
					},
					{
						catName: "먼지",
						age: 3,
					},
					{
						catName: "코비",
						age: 2,
					},
					{
						catName: "베리",
						age: 3,
					},
				],
			};
		},
});
</script>
```

## v-cloak

- `vue Instance` 가 준비될 때까지 `mustache` 바인딩을 숨기는데 사용.
- `[v-cloak] { display: none }` 과 같은 `CSS` 규칙과 함께 사용
- `Vue Instance` 가 준비되면 `v-cloak` 는 제거됨

```css
<style>
	[v-cloak]::before {
		content: "로딩중..";
	}
	[v-cloak] > * {
		display: none;
	}
</style>
```

```html
<div id="app">
	<h2>v-cloak</h2>
	<h1>1. 일반 - {{msg}}</h1>
	<div v-cloak>
		<h2>2. v-cloak - {{msg}}</h2>
	</div>
</div>
```

```jsx
<script>
	setTimeout(function () {
		new Vue({
			el: "#app",
			data() {
				return {
					msg: "Hello Vue",
				};
			},
		});
	}, 3000);
</script>
```

<img width="243" alt="스크린샷 2022-05-15 오후 11 48 04" src="https://user-images.githubusercontent.com/46440898/169057384-586d6cd6-a634-4e14-a443-1f679c47cbd4.png">
<img width="267" alt="스크린샷 2022-05-15 오후 11 51 12" src="https://user-images.githubusercontent.com/46440898/169057527-7c7f736a-4f94-425f-b90c-95320210bdf4.png">
