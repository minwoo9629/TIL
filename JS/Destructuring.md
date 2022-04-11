## Destructuring Assignment - 구조 분해 할당이란

> 구조화된 배열과 같은 이터러블 또는 객체를 비구조화하여 1개 이상의 변수에 개별적으로 할당하는 것
배열과 같은 이터러블 또는 객체 리터럴에서 필요한 값만 추출하여 변수에 할당할 때 유용하다.
>

### ES5 Destructuring 할당

```jsx
let catArr = ['무지', '막지', '먼지'];
let cat1 = catArr[0];
let cat2 = catArr[1];
let cat3 = catArr[2];
// 무지 막지 먼지
console.log(cat1, cat2, cat3);
```

### ES6 Destructuring 할당

**배열 Destructuring 할당 대상은 이터러블이어야 하며, 할당 기준은 배열의 인덱스이다.**

구조 분해 할당을 위해서는 할당 연산자 왼쪽에 값을 할당받을 수 있는 변수를 선언하며, 변수를 배열 리터럴 형태로 선언한다.

```jsx
let catArr = ['무지', '막지', '먼지'];
let [element1, element2, element3] = catArr;
// 무지 막지 먼지
console.log(element1, element2, element3);

// 변수의 개수와 이터러블의 요소 개수가 반드시 일치할 필요는 없다.
let [num1, num2] = [1];
// 1 undefined
console.log(num1, num2);

let [num3, num4] = [2,3,4];
// 2 3
console.log(num3, num4);

let [num5, , num6] = [1,2,3];
// 1 3
console.log(num5, num6);

// 기본값을 설정 할 수 있으며 기본 값보다 할당된 값이 우선한다.
let [lang1, lang2='css', lang3='react']= ['js','html'];
// js html react
console.log(lang1,lang2,lang3);
```

### 구조 분해 할당을 위한 변수에 Rest 요소 `...` 을 사용할 수 있다.

```jsx
let [a, ...b] = [1,2,3];
// 1 [2, 3]
console.log(a, b)
```

---

## 객체 Destructuring 할당

### ES5 Destructuring 할당

객체의 각 프로퍼티를 객체로부터 디스트럭처링하여 변수에 할당하기 위해서는 프로퍼티 키를 사용해야 한다.

```jsx
let cat = {'catName' : '무지', 'age': '4살'};
let catName = cat.catName;
let catAge = cat.age;
// 무지 4살
console.log(catName, catAge);
```

### ES6 Destructuring 할당

객체의 각 프로퍼티를 객체로부터 추출하여 1개 이상의 변수에 할당한다.

**할당 기준은 프로퍼티의 `key`다. 순서는 의미 없으며 선언된 변수 이름과 프로퍼티 `key`가 일치하면 할당된다.**

```jsx
let cat = {'catName' : '무지', 'age': '4살'};
let catInfo = {catName, age } = cat;
console.log(catName, age)

let person = {'personName': '집사', 'age': '20살'};
// 객체의 프로퍼티 키와 다른 변수 이름으로 프로퍼티 값을 할당 받으려면 다음과 같이 변수를 선언한다.
let {personName : pName, age : pAge } = person;
// 집사 20살
console.log(pName, pAge);
```

### 객체 Destructuring 할당은 객체에서 프로퍼티 키로 필요한 프로퍼티 값만 추출하여 변수에 할당하고 싶을 때 유용하다.

```jsx
let str = "macBook";
let { length } = str;
// String 래퍼 객체로부터 length 프로퍼티만 추출
// 7
console.log(length);

let macBookInfo = {'modelName':'14Pro', 'company':'Apple'};
// 맥북정보 객체로 부터 모델명 프로퍼티만 추출
let { modelName } = macBookInfo;
// 14Pro
console.log(modelName);
```

### 객체 Destructuring 할당은 객체를 인수로 전달받는 함수의 매개변수에도 사용할 수 있다.

```jsx
let macBookInfo = {'modelName':'14Pro', 'company':'Apple'};

function printMacInfo(info){
    //모델명 : 14Pro 제조사 : Apple
    console.log(`모델명 : ${info.modelName} 제조사 : ${info.company}`)
}

printMacInfo(macBookInfo);

// 매개변수에 객체 디스트럭처링 할당을 사용하면 좀 더 간단하고 가독성 좋게 작성할 수 있다.
function printMacInfo2({modelName, company}){
    // 모델명 : 14Pro 제조사 : Apple
    console.log(`모델명 : ${modelName} 제조사 : ${company}`)
}
printMacInfo2(macBookInfo);
```

### Destructuring 할당 혼용

```jsx
let cats = [
    {'catName': '무지', 'age': '4'},
    {'catName': '막지', 'age': '2'},
    {'catName': '먼지', 'age': '3'}
]

let [, { catName }] = cats;
// 막지
console.log(catName);

let cats = {
    catName : '무지',
    info:{
        age:'4살',
        type:'스코티쉬폴드'
    }
}

let { info : {type}} = cats;
// 스코티쉬폴드
console.log(type);
```