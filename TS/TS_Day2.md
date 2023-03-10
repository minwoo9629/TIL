![typesript](https://user-images.githubusercontent.com/46440898/223417544-b1817a6d-4a50-49d6-9e55-3f6136fe00d6.png)

### void 타입

일반적으로 `return` 해주는 값이 없으면 `void` 로 타입을 명시한다.

```tsx
function sampleFunc() {}
const res = sampleFunc();
```

다음과 같이 함수의 `return` 타입을 `void` 로 지정하면 해당 함수는 `return` 값이 들어가면 안된다.

<aside>
💡 Type 'number' is not assignable to type 'void'

</aside>

```tsx
function sampleFunc2(): void {
  return 3;
}
```

하지만 다음과 같은 경우를 보면 의아함이 든다.

```tsx
function sampleFunc2(callback: () => void): void {}

interface Runner {
  run: () => void;
}

const runner: Runner = {
  run() {
    return "뛴다.";
  },
};
```

이렇게 `void` 에 대해 정리를 해보면 다음과 같다.

1. 함수에 직접적인 `return`이 `void`인 경우 `return`을 사용하면 에러가 난다.
2. 매개변수 또는 메서드에서의 `void` 의 의미는 `return` 값이 있어도 신경쓰지 않겠다는 의미이다.

화살표함수에 대해 살펴보자.

```tsx
const testFunc: () => void = () => "1";
const testFunc2 = (): void => "1";
```

`testFunc2` 에 대해서 `Type 'string' is not assignable to type 'void'.` 라는 에러가 발생한다.

함수 타입에 대한 `void` 는 `void` 반환은 강제가 아니라, 다른 모든 타입을 반환할 수 있음을 의미한다.

그러나 리터럴하게 함수 리턴값을 `void`로 정의한다면 말 그대로 아무 것도 반환해서는 안된다를 의미한다.

### {} 와 Object

```tsx
const msg: {} = "hello";
const x: Object = 1;
const y: Object = "hello";
```

`{}` 와 `Object` 타입을 보면 객체라고 생각할 수 있지만 문자열이든 숫자든 에러가 발생하지 않는다.

`{}` 와 `Object` 는 모든 타입을 의미한다. 단, `null` 과 `undefined` 는 제외

### unknown

```tsx
const cat: unknown = "muji";
const cat2: unknown = null;
const cat3: unknown = undefined;
```

`unknown` 타입은 `{}` | `null` | `undefined` 을 의미한다.

### **Index Signatures**

타입을 정의할 때 다음과 같이 길어지는 상황이 발생할 수 있다.

```tsx
type TypeName = { one: string; two: string; three: string };
```

이때 어떤 `key` 던 `string` 이고 값이 `string` 원한다면 다음과 같이 코드를 작성할 수 있다.

또는 고양이 이름을 저장하는 배열을 만들고 싶다면 다음과 같이 만들 수 있다.

```tsx
type Coffee = { [key: string]: string };

const num: number = 1;
const americano: Coffee = {
  bean: "Arabica",
  color: "black",
  taste: "bitter",
};

type CatArray = { [index: number]: string };

const catNames: CatArray = { 0: "cobi", 1: "muji", 2: "makji" };

console.log(catNames[0]);
```

### **Optional Parameters**

- 파라미터 타입을 정의할 때, `?` 를 사용하면 입력을 받아도 되고, 받지 않아도 된다. 라는 의미이다.
- 정의한 파라미터 개수와 옵션만 허용하고, 그 이상의 개수로 파라미터를 입력하는 경우 오류가 발생한다.

```tsx
function testFunction(el1: number, el2: string, el3?: number) {}

testFunction(1, "muji");
testFunction(1, "muji", 3);
// Expected 2-3 arguments, but got 4.
testFunction(1, "muji", 10, 5);

const testFunction2 = (el1: string, el2: number, el3?: string | number) => {};
// Expected 2-3 arguments, but got 4.
testFunction2("muji", 1, "makji", "hello");
```
