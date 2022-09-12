### 타입 별칭(Type Aliases)

> 타입 별칭은 특정 타입이나 인터페이스를 참조할 수 있는 타입 변수를 의미한다.

```tsx
type Cat = {
  name: string;
  age: number;
};

let makji: Cat = {
  name: "막지",
  age: 5,
};

type TodoItem = { id: number; content: string; completed: boolean };
let myNewTodo: TodoItem = { id: 1, content: "카페가기", completed: true };
```

### 타입 별칭의 특징

> 타입 별칭은 새로운 타입 값을 생성하는게 아니라 정의한 타입에 대해 쉽게 참고할 수 있게 이름을 부여한다고 생각하자.

interface로 선언한 타입
<br/>
<img width="294" alt="interface" src="https://user-images.githubusercontent.com/46440898/189677403-62176339-d3a8-4860-b44b-1fef08b565d4.png">

type으로 선언한 타입
<br/>
<img width="330" alt="type" src="https://user-images.githubusercontent.com/46440898/189677254-04a7bdc4-0fe1-4de7-a735-0903d01e0e72.png">

### interface 와 Type Aliases 차이

<aside>
💡 가장 큰 차이점은 타입의 확장 가능 여부이다.
인터페이스는 확장이 가능하지만 타입 별칭은 확장이 불가능하다.

</aside>
