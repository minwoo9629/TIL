## immutable value

> `Javascript` 의 `primitive type` 은 `immutable value` (변경 불가능한 값)이다.
원시 값을 변수에 할당하면 변수에는 실제 값이 저장된다.
>
- Number
- String
- undefined
- Boolean
- null
- symbol

<aside>
💡 변경 불가능하다는 것은 원시 값 자체를 변경할 수 없다는 뜻이지 변수 값을 변경할 수 없다는 것이 아니다.

</aside>

```jsx
let catName = "무지";
// 무지
console.log(catName);
catName = "막지";
// 막지
console.log(catName);
```

1. 첫번째 구문이 실행되면 메모리에 문자열 `무지`가 생성되고 식별자 `catName`은 메모리에 생성된 문자열
   `무지`의 메모리 주소를 가리킨다.
2. 세번째 구문이 실행되면 이전에 생성된 문자열 `무지` 를 수정하는 것이 아니라 새로운 문자열 `막지`를 메모리에 생성하고 식별자 `catName`은 이것을 가리킨다.

> 이때 문자열 `무지` 와 `막지`는 모두 메모리에 존재하고 있다. 변수 `catName`은 문자열 `무지`를 가리키고 있다가 문자열 `막지`를 가리키도록 변경된 것이다.
>

<aside>
💡 즉, 변수 값을 변경하기 위해 원시 값을 재할당하면 새로운 메모리 공간을 확보하고 재할당한 값을 저장한 후, 변수가 참조하던 메모리 공간의 주소를 변경한다.

</aside>

## 값에 의한 전달

```jsx
let drink = "초록매실";
let copyDrink = drink;

// 초록매실
console.log(drink);
// 초록매실
console.log(copyDrink);
// true
console.log(drink === copyDrink);
drink = "아침햇살";

// 아침햇살
console.log(drink);
// 초록매실
console.log(copyDrink);
```

1. 변수에 원시 값을 갖는 변수를 할당하면 할당받은 변수 `copyDrink` 에는 할당되는 변수 `drink` 의 원시 값이 복사되어 전달된다.
2. `drink` 변수와 `copyDrink` 변수의 `초록매실` 값은 다른 메모리 공간에 저장된 별개의 값이다.
3. 따라서 `drink` 의 값을 변경해도 `copyDrink` 변수의 값에는 어떠한 영향도 주지 않는다.

<aside>
💡 값에 의한 전달은 실제로 값을 전달하는 것이 아닌 메모리 주소를 전달하는 것이며,
전달된 메모리 주소를 통해 메모리 공간에 접근하면 값을 참조할 수 있다.
결국 두 변수의 원시 값은 서로 다른 메모리 공간에 저장된 별개의 값이 되어 어느 한쪽에서 재할당을 통해 값을 변경하더라도 서로 간섭할 수 없다.

</aside>

## mutable value

> 모든 값은 객체(`Object`) 타입이며 객체 타입은 `mutable value` (변경 가능한 값)이다.
객체를 변수에 할당하면 변수에는 참조 값이 저장된다.
>

```jsx
let skill = {
  name: "Vanilla",
};

// { name: 'Vanilla' }
console.log(skill);
```

- 객체를 할당한 변수가 기억하는 메모리 주소를 통해 메모리 공간에 접근하면 생성된 객체가 저장된 메모리 공간의 주소 즉,  `reference value` 에 접근할 수 있다.
- 객체를 할당한 변수는 재할당 없이 프로퍼티를 동적으로 추가하거나 갱신할 수 있으며 삭제할 수 도 있다.

## 얕은복사(Shallow Copy)

> 얕은 복사는 참조 값을 복사한다.
>

```jsx
let skill = {
  name: "Vanilla",
};

let copySkill = skill;
// Vanilla
console.log(skill.name);
// Vanilla
console.log(copySkill.name);

// true
console.log(skill === copySkill);

skill.name = "React";
// React
console.log(skill.name);
// React
console.log(copySkill.name);
```

> `skill` 객체를 새로운 `copySkill`객체에 할당하였으며 이를 `참조 할당`이라 부른다.
복사 후 `copySkill`객체의 `name`값을 변경하면 기존의 `skill.name`값도 같이 변경된 것을 알 수 있다. 두 객체를 비교해도 `true`로 나온다.
이렇게 자바스크립트의 참조 타입은 **얕은 복사**가 된다고 볼 수 있으며, 이는 **해당 데이터의 참조 값(메모리 주소)를 전달하여 결국 한 데이터를 공유하는 것**이다.
>

## 깊은복사(Deep Copy)

```jsx
const phone = { name: "아이폰" };
const copyPhone = { ...phone };

// false
console.log(phone == copyPhone);
// false
console.log(phone === copyPhone);

phone.name = "갤럭시";
// { name: '갤럭시' }
console.log(phone);
//{ name: '아이폰' }
console.log(copyPhone);

const food = { one: "떡볶이", two: "참치김밥" };
const copyFood = Object.assign({}, food);
// false
console.log(food === copyFood);
```

```jsx
const cat = { first: "무지", two: { name: "무지" } };
const copyCat = { ...cat };
// false
console.log(cat === copyCat);
// 무지
console.log(cat.first);
// 무지
console.log(copyCat.first);
// true
console.log(cat.first === copyCat.first);

// 무지
console.log(cat.two.name);
// 무지
console.log(copyCat.two.name);
// true
console.log(cat.two.name === copyCat.two.name);

cat.two.name = "막지";
// 막지
console.log(cat.two.name);
// 막지
console.log(copyCat.two.name);
// true
console.log(cat.two.name === copyCat.two.name);
```

```jsx
let person1 = {
  name: "Lee",
};

let person2 = {
  name: "Lee",
};

// false
console.log(person1 === person2);
// true
console.log(person1.name === person2.name);
```

> `person1` 과 `person2` 변수가 가리키는 객체는 내용은 같지만 다른 메모리에 저장된 별개의 객체다.
프로퍼티를 참조하는 `person1.name` 과 `person2.name` 은 값으로 평가될 수 있으므로 모두 원시 값 `Lee` 로 평가된다.
>