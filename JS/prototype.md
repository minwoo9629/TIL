![js](https://user-images.githubusercontent.com/46440898/227780677-fb45f8da-116d-46eb-8763-30382c347cef.jpeg)

### 프로토타입이란?

프로토타입이란 객체를 생성할 때 참조하는 원형 객체로, 해당 객체의 속성과 메서드를 상속 받아 사용할 수 있게 한다.

이해를 쉽게 하기 위해 상속의 표현을 사용하겠지만 엄밀히 말하면 **프로토타입은 객체 간의 상속을 구현하는 것이 아니라, 객체 생성 시 프로토타입 객체를 참조하여 프로토타입 체인을 이루는 것이다.**

```tsx
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * this.radius ** 2;
  };
}
const circle1 = new Circle(5);
const circle2 = new Circle(5);

console.log(circle1.getArea === circle2.getArea);
```

다음 코드를 보면 `Circle` 생성자 함수는 인스턴스를 생성할 때 마다 동일한 동작을 하는 `getArea` 함수를 중복생성한다.

이렇게 `getArea` 메서드를 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 좋다.

```tsx
function Cat(catName) {
  this.catName = catName;
}
Cat.prototype.sayHello = function () {
  return `안녕하세요 저는 ${this.catName}입니다.`;
};

const muji = new Cat("무지");
const makji = new Cat("막지");

console.log(muji.sayHello());
console.log(makji.sayHello());
```

`Cat` 생성자 함수가 생성한 모든 인스턴스는 자신의 프로토타입, 즉 원형 객체 역할을 하는 `Cat.prototype`의 모든 프로퍼티와 메서드를 참조하여 사용할 수 있다.

`sayHello` 메서드는 단 하나만 생성되어 프로토타입인 `Cat.prototype`의 메서드로 할당되어 있다.

### **proto** 접근자 프로퍼티

모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 원형 객체의 `[[Prototype]]` 내부 슬롯에 간접적으로 접근할 수 있다.

### Prototype Chain

자바스크립트는 객체의 프로퍼티나 메서드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없는 경우
`[[Prototype]]` 내부 슬롯의 참조를 따라 자신의 프로토타입 객체의 프로퍼티 또는 메서드를 검색한다.

```tsx
function Animal(name, age) {
  this.name = name;
  this.age = age;
}

Animal.prototype.introduce = function () {
  console.log(`이름 : ${this.name}, 나이 : ${this.age}살`);
};

function Dog(name, age) {
  Animal.call(this, name, age);
  this.bark = function () {
    console.log("왈왈");
  };
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const welshi = new Dog("코기", 5);

welshi.bark();
welshi.introduce();
```

다음코드에서 `welshi`는 `introduce` 메서드를 실행하고자 할때 자신의 원형객체 즉, 프로토타입인 `Dog`에게서 `introduce`메서드를 찾게되는데 `Dog`에게는 `introduce` 메서드가 없기때문에 `Dog`의 원형객체 즉 `Animal` 프로토타입에 접근하여 `introduce`메서드를 찾아 실행한다.
이러한 자신에게 존재하지 않는 메서드나 프로퍼티에 접근하기위해 점차 상위의 원형객체 즉, 프로토타입에 연쇄적으로 접근하는 것이 프로토타입 체인인 것이다.

여기서 `Object.create` 는 첫번째 인자로 생성할 객체의 프로타입으로 지정할 객체를 전달한다.

### 느낀점

프로토타입에 대한 설명을 읽어보면 대부분 상속이라는 키워드를 이용해서 설명을 한다.

이해를 쉽게 하기 위해 쓴 단어이긴 하지만 정확히 이야기하자면 상속이라는 단어가 어울리지 않는다고 생각했다. 그래서 상속이라는 단어를 최대한 쓰지 않고 상위 원형 객체의 값 또는 메서드에 대한 참조라는 말로 내가 누군가에게 설명했을때 이해시킬 수 있게 내가 생각한 내용을 정리해보았다.

중요하면서도 어려운 내용이지만 잘 이해할 수 있도록 이해한 내용을 바탕으로 직접 코드로 작성해서 연습해보도록 해야겠다.
