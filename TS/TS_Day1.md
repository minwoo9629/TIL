![typesript](https://user-images.githubusercontent.com/46440898/223417544-b1817a6d-4a50-49d6-9e55-3f6136fe00d6.png)

타입스크립트와 리액트를 이용한 간단한 프로젝트를 스스로 진행해 보면서 타입스크립트에 대해 아직 제대로

이해를 하지 못한 것 같다는 느낌을 받아서 기초부터 실전까지 기록하기로 했다.

<aside>
💡 typescript는 최종적으로 javascript로 변환된다.

</aside>

### tsc (TypeScript Compiler)의 역할

1. `typescript` 코드를 `javascript` 코드로 변환해주는 역할을 한다.
2. 두번째 코드 자체의 타입 검사 역할을 한다.
3. 1번과 2번의 역할이 각각 개별적으로 일어난다. 타입 검사에서 오류가 났다하더라도
   `javascript` 코드로 변환이 가능하다.

---

### 기본타입

<aside>
💡 기본적으로 변수, 속성, 매개변수, 리턴값에 타입이 붙었다고 생각하면 된다.

</aside>

```tsx
// 문자열
const message: string = "hello Typescript";

// 숫자
const avg: number = 100;

// 진위값
const flag: boolean = true;

// object
const personInfo: { name: string; age: number } = { name: "무지", age: 5 };

// Array
const address: number[] = [1, 2, 3, 4, 5];
const address2: Array<number> = [1, 2, 3];
const cats: string[] = ["무지", "막지"];
const cats2: Array<string> = ["코비", "베리"];
```

### 튜플

튜플이란 배열의 길이가 고정적이고 각 요소에 대한 타입이 정의되어 있는 배열이다.

```tsx
// Tuple
const catsInfo: [string, number, string] = ["무지", 5, "스코티쉬폴드"];
```

### 함수

`function` 키워드로 함수를 정의할 때 `return` 에 대한 `type` 은 `:` 을 이용한다.

화살표 함수로 함수를 정의할 때 `return` 에 대한 `type` 은 `=>` 을 이용한다.

```tsx
// 함수
function add(num1: number, num2: number): number {
  return num1 + num2;
}

// 화살표 함수
const multi: (num1: number, num2: number) => number = (num1, num2) =>
  num1 * num2;
```

### 느낌표(non-null assertion)

`null` 이나 `undefined` 가 아님을 보장하는 방식

다음과 같은 코드가 있다고 해보자.

```tsx
const head = document.querySelector("#head");
```

<img width="426" alt="headCodeCapt" src="https://user-images.githubusercontent.com/46440898/223417685-9022a3a3-f9ed-4cce-b448-fbaee3d8d9d6.png">

head 타입 추론

`head` 는 `HTML` 의 `Element` 로 존재할 수 도 있고 존재하지 않는다면 `null` 값이 될 수 있다.

만약 `head` 가 있음을 무조건 보장할 수 있다면 다음과 같이 코드를 작성할 수 있다.

```tsx
const head = document.querySelector("#head")!;
```

<img width="441" alt="headCodeCapt2" src="https://user-images.githubusercontent.com/46440898/223417695-44646161-525b-4352-a648-65f38aca2c40.png">

하지만 이러한 방식은 누군가 `HTML` 태그의 `id` 값을 수정해버리면 오류가 발생할 수 있다.

따라서 안전하게 `if` 문을 통한 분기처리로 하자.

```tsx
const head = document.querySelector("#head");
if (head) {
  head.innerHTML = "TypeScript";
}
```

### 템플릿 리터럴 타입

템플릿 리터럴 타입을 통해 타입 추천을 정교하게 만들 수 있다.

```tsx
type Cat = "무지" | "막지";

type CatMessage = `귀여운 ${Cat}`;

const myMessage: CatMessage = "귀여운 막지";
```

<img width="799" alt="template_literal_type" src="https://user-images.githubusercontent.com/46440898/223417703-ae0134b0-d898-422b-bf4c-95a60fca1dcb.png">

추천된 값이 두 가지로 알 수 있다.

### Type Aliases vs Interface

`TypeScript`는 데이터에 대한 사용자 지정 유형을 만드는 두 가지 방법을 제공하며 여기에는 `Type Aliases` 와 `Interface`가 있다.

```tsx
type Phone = { ring: true };
const myPhone: Phone = { ring: true };

interface Dog {
  bark: boolean;
}
const myDog: Dog = { bark: true };
```

`Aliases` 와 `Interface`모두 확장할 수 있다. 그러나 구문이 다르니 주의하자.

`Aliases` 는 `&(intersection)` 를 사용하여 확장할 수 있고 `interface` 는 `extends` 키워드를 사용해 확장할 수 있다.

```tsx
type Phone = { ring: true };
type Galaxy = Phone & { os: "android" };
type GalaxyZFlip = Galaxy & { foldable: true };

const myPhone: GalaxyZFlip = { ring: true, os: "android", foldable: true };

interface Dog {
  bark: boolean;
}

interface WelshiCogi extends Dog {
  leg: string;
}

const welshi: WelshiCogi = { bark: true, leg: "짧다" };
```

### 언제 사용하는 것이 좋을까?

> Type aliases and interfaces are very similar and you can choose freely between them. Personally, I use type aliases when defining primitive, union, intersection, function or tuple types. However, I make use of interfaces when defining object types or to take advantage of declaration merging.

참고링크 : [https://dev.to/toluagboola/type-aliases-vs-interfaces-in-typescript-3ggg](https://dev.to/toluagboola/type-aliases-vs-interfaces-in-typescript-3ggg)

### Declaration merging(선언 병합)

`interface`동일한 이름을 가진 것을 두 번 이상 선언하면 `TypeScript`는 이를 하나의 선언으로 병합하고 단일 인터페이스로 취급한다. 이것을 선언 병합 이라고 한다.

```tsx
interface Person {
  name: string;
}

interface Person {
  age: number;
}

type Num = numbers;
type Num = string; // Duplicate identifier Num

let user: Person = {
  name: "sonny",
  age: 10,
};
```
