![typesript](https://user-images.githubusercontent.com/46440898/223417544-b1817a6d-4a50-49d6-9e55-3f6136fe00d6.png)

### **Utility Types**

`TypeScript`는 일반적인 타입 변환을 용이하게 하기 위해 몇 가지 유틸리티 유형을 제공한다.

### Partial<Type>

타입의 모든 속성이 선택적으로 설정된 타입을 구성한다.

```tsx
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

```tsx
interface UserInfo {
  name: string;
  age: number;
  address: string;
}

const kim: UserInfo = {
  name: "김철수",
  age: 5,
  address: "떡잎마을",
};

const jjang: Partial<UserInfo> = {
  name: "신짱구",
  age: 5,
};

const yuri: Partial<UserInfo> = {
  name: "유리",
  address: "떡잎마을",
};

const who: Partial<UserInfo> = {};
```

### Pick<Type, keys>

타입에서 특성 `Keys` 집합을 선택하여 타입을 구성한다.

```tsx
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

```tsx
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  created: number;
}

const todo: Pick<Todo, "title" | "completed"> = {
  title: "타입스크립트 공부하기",
  completed: true,
};
```

### Omit<Type, keys>

타입에서 정의된 객체 형태의 타입에서 특정한 프로퍼티들을 제외시켜준다.

```tsx
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

```tsx
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  created: number;
}

const todo: Omit<Todo, "created"> = {
  title: "omit",
  description: "상세내용",
  completed: false,
};
```

### Exclude<**UnionType, ExcludedMembers>**

```tsx
type Exclude<T, U> = T extends U ? never : T;
```

타입스크립트에서 조건부 형식으로 타입을 정의할 수 있다!

`T` 에 오는 타입들 중 `U` 에 오는 타입들을 제외한다.

```tsx
type OnlyNumber = Exclude<number | string, string>;
type cat = Exclude<"cat" | "dog" | "bird", "dog" | "bird">;
```

### Extract<**Type, Union>**

타입에서 `Union`에 할당할 수 있는 모든 `Union` 멤버를 추출하여 타입을 구성한다.

```tsx
type Extract<T, U> = T extends U ? T : never;
```

```tsx
type numberOrString = Extract<number | string | boolean, number | string>;
```

### 느낀점

공식문서 설명을 보고 해당 타입들을 직접 사용해보고 만들어 보았다.

만들어진 코드를 읽는 것도 쉽지 않지만 이걸 스스로 생각하면서 만들어보는 작업도 결코 쉬운 작업이 아닌 것을 느꼈다.

특히 `omit` 을 직접 만들어 보는데 해결이 잘 안돼서 `es5.d.ts` 를 참고하였는데 `pick` 을 함께 응용해서 만든 것을 확인하였다.

어떤 타입을 만들 때 다른 타입을 사용해서 만들 수 있구나….

앞으로 새롭게 나오는 것들에 대해서도 직접 한 번씩 구현을 해보도록 노력해보자.
