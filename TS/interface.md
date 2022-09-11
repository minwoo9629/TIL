## interface

> 인터페이스는 일반적으로 **타입 체크를 위해 사용되며 변수, 함수, 클래스에 사용**할 수 있다.
> 인터페이스는 여러가지 타입을 갖는 프로퍼티로 이루어진 새로운 타입을 정의하는 것과 유사하다.
> 인터페이스에 선언된 프로퍼티 또는 메소드의 구현을 강제하여 일관성을 유지할 수 있도록 하는 것이다.
>
> 인터페이스는 프로퍼티와 메소드를 가질 수 있다는 점에서 클래스와 유사하나 직접 인스턴스를 생성할 수 없고 모든 메소드는 추상 메소드이다. 단, 추상 클래스의 추상 메소드와 달리 `abstract` 키워드를 사용하지 않는다.

### 변수에 인터페이스 활용

```tsx
interface Cat {
  age: number;
  name: string;
}

let muji: Cat = {
  age: 5,
  name: "무지",
};
```

### 함수의 파라미터를 정의하는 인터페이스 활용

```tsx
interface Cat {
  age: number;
  name: string;
}

let muji: Cat = {
  age: 5,
  name: "무지",
};

const logName = (cat: Cat): void => {
  console.log(cat.name);
};

logName(muji);

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

let todos: Array<Todo> = [];

function addTodo(todo: Todo) {
  todos = [...todos, todo];
}

const newTodo: Todo = {
  id: 1,
  content: "TypeScript TIL 작성하기",
  completed: true,
};

addTodo(newTodo);

console.log(todos);
```

### 옵션 속성

> 인터페이스에 정의하는 속성에 `?` 를 붙여 인터페이스에 정의되어 있는 속성을 모두 다 꼭 사용하지 않을 수 있다.
> 옵션 속성의 장점은 단순히 인터페이스를 사용할 때 속성을 선택적으로 적용할 수 있다는 것과
> 인터페이스에 정의되어 있지 않은 속성에 대해 인지시켜 줄 수 있다.

```tsx
interface Phone {
  type: string;
  name: string;
  phoneNumber?: number;
  owner?: string;
}

const logPhoneNumber = (phone: Phone): void => {
  console.log(phone.phoneNumber);
};

// Property 'type' is missing in type '{ name: string; }' but required in type 'Phone'.
let iphone: Phone = {
  name: "아이폰 14",
};

let galaxy: Phone = {
  type: "안드로이드",
  name: "갤럭시 z플립4",
};

// Object literal may only specify known properties, and 'price' does not exist in type 'Phone'.
let newPhone: Phone = {
  type: "ios",
  name: "iphone8+",
  price: 10000000,
};
```

### 클래스 타입

> 클래스 선언문의 `implements` 뒤에 인터페이스를 선언하면 해당 클래스는 지정된 인터페이스를 반드시 구현하여야 한다.

```tsx
interface ITodo {
  id: number;
  content: string;
  completed: boolean;
}

class Todo implements ITodo {
  constructor(
    public id: number,
    public content: string,
    public completed: boolean
  ) {}
}
let todo = new Todo(1, "TS 공부하기", false);
```

> 인터페이스는 프로퍼티뿐만 아니라 메소드도 포함할 수 있다. 단, 모든 메소드는 **추상 메소드**이어야 한다. 인터페이스를 구현하는 클래스는 인터페이스에서 정의한 프로퍼티와 추상 메소드를 반드시 구현하여야 한다.

```tsx
interface Dog {
  name: string;
  bark(): void;
}

class WelshCorgi implements Dog {
  constructor(public name: string) {}
  bark() {
    console.log("뫙");
  }
}

function barking(dog: Dog) {
  dog.bark();
}
const corgi = new WelshCorgi("웰시");
```

### 함수 타입

```tsx
interface sumFunction {
  (num1: number, num2: number): number;
}

const sum: sumFunction = (num1: number, num2: number): number => {
  return num1 + num2;
};
```

### 상속

```tsx
interface Person {
  name: string;
  age: string;
}

interface Developer extends Person {
  language: Array<string>;
}

let mumin: Developer = {
  name: "무민",
  age: "20",
  language: ["JS", "JAVA", "PYTHON"],
};
```
