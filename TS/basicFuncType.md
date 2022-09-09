### 함수의 기본적인 타입 선언

```tsx
// JS
function jsSum(num1, num2) {
  return num1 + num2;
}
// TS
function tsSum(num1: number, num2: number): number {
  return num1 + num2;
}

let result = 0;

result = jsSum(1, 2);
// 3
console.log(result);

result = tsSum(10, 20);
// 30
console.log(result);
```

> 타입스크립트에서는 함수의 인자를 모두 필수 값으로 간주한다.
> 컴파일러에서 정의된 매개변수 값이 넘어 왔는지 확인한다.

```tsx
// Expected 2 arguments, but got 1.
result = tsSum(1);

// Argument of type 'string' is not assignable to parameter of type 'number'.
result = tsSum("고양이", 1);
```

### Optional Parameter

> 정의된 매개변수의 갯수 만큼 인자를 넘기지 않아도 되는 `JS` 의 특성을 살리고자 한다면
> `?` 를 이용해 정의할 수 있다.

```tsx
// Optional Parameter
// 추가적으로 들어올 수 있는 parameter에 대해서 쓰지 않아도 된다는 뜻
function log(a: string, b?: string): void {
  console.log(a);
  console.log(b);
}

// 무지
log("무지");
// 무지
// 막지
log("무지", "막지");

function sum(a: number, b?: number): number {
  return a + b;
}

// Expected 1-2 arguments, but got 3.
sum(10, 20, 30);

result = sum(10);
// NaN
console.log(result);
result = sum(10, undefined);
// NaN
console.log(result);
result = sum(10, 20);
// 30
console.log(result);
```
