![typesript](https://user-images.githubusercontent.com/46440898/223417544-b1817a6d-4a50-49d6-9e55-3f6136fe00d6.png)

### 인터페이스에 제네릭 선언해보기

```tsx
interface Props<T> {
  value: T;
  active: boolean;
}

const strBtn: Props<string> = {
  value: "muji",
  active: false,
};

const numBtn: Props<number> = {
  value: 10,
  active: true,
};
```

### 제네릭 활용해보기

`dropdown` 메뉴를 만드는데 `value` 의 타입이 다른 경우에 대해서 `interface` 를 정의하여 다음과 같이

로직을 작성해보았다.

`item` 의 타입에 대해서 `item : DropDownItem<string> | DropDownItem<number>` 와 같이 작성할 수 있겠지만 `createDropdownItem` 함수에 대해서 마찬가지로 제네릭을 활용해 `item` 에 대한 타입정의를 간결하게 작성하였다.

제네릭을 사용하였을 때 `toString` 메소드에 대해서 에러가 발생해 `extends` 키워드를 사용해 타입에 제한을

두도록하였다.

```tsx
interface DropDownItem<T> {
  value: T;
  name: string;
  selected: boolean;
}

const emails: DropDownItem<string>[] = [
  { value: "naver.com", name: "muji", selected: true },
  { value: "gmail.com", name: "makji", selected: false },
  { value: "hanmail.net", name: "cobi", selected: false },
];

const beverages: DropDownItem<number>[] = [
  { value: 4800, name: "americano", selected: false },
  { value: 5600, name: "latte", selected: false },
  { value: 6000, name: "smoothie", selected: false },
];

function createDropdownItem<T extends string | number>(item: DropDownItem<T>) {
  const option = document.createElement("option");
  option.value = item.value.toString();
  option.innerText = item.name.toString();
  option.selected = item.selected;
  return option;
}

emails.forEach(function (email) {
  const item = createDropdownItem<string>(email);
  const selectTag = document.querySelector("#email-dropdown");
  if (selectTag) {
    selectTag.appendChild(item);
  }
});

beverages.forEach(function (beverage) {
  const item = createDropdownItem<number>(beverage);
  const selectTag = document.querySelector("#beverages-dropdown");
  if (selectTag) {
    selectTag.appendChild(item);
  }
});
```

### 타입가드 (Type Guard) & Type Assertion

`Type Assertion`을 사용하여 보다 구체적인 유형을 지정할 수 있다.

```tsx
// DOM API 접근할 때
const button = document.querySelector("active_btn") as HTMLButtonElement;
const app = document.querySelector("#app") as HTMLDivElement;
```

`Type Guard`를 통해 **컴파일러가 타입을 예측할 수 있도록 타입을 좁혀 주어서** 좀 더 `type safety` 함을 보장할 수 있다.

`jobType` 함수에 `person is Developer` 를 작성하여 인수로 전달받은 사람이 개발자인지 운동선수인지

판별하는 커스텀함수를 만들었다.

`explainPerson` 함수의 `if` 문제에서 커스텀 타입 검사 함수를 통해 타입을 예측할 수 있다.

```tsx
interface Developer {
  name: string;
  skills: string[];
}

interface Athlete {
  name: string;
  team: string;
}

const jobType = (person: Developer | Athlete): person is Developer => {
  return (person as Developer).skills ? true : false;
};

const explainPerson = (person: Developer | Athlete) => {
  if (jobType(person)) {
    console.log(person.skills);
  } else {
    console.log(person.team);
  }
};
```

<img width="521" alt="typeguard" src="https://user-images.githubusercontent.com/46440898/224740294-6035bb47-a78f-4e25-b62f-b5097fe34054.png">
