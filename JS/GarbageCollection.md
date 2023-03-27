![js](https://user-images.githubusercontent.com/46440898/227780677-fb45f8da-116d-46eb-8763-30382c347cef.jpeg)

### 가비지 컬렉션이란?

`Garbage Collection` 는 동적으로 할당된 메모리 중에서 더 이상 사용되지 않는 메모리를 자동으로 해제하는 기능을 말한다.

원시 값, 객체, 함수 등 우리가 코드로 작성한 것은 메모리를 차지한다.

`GC` 는 더 이상 사용하지 않는 객체를 식별하고, 해당 객체를 참조하는 모든 변수를 제거한다.

### Reachability

자바스크립트 엔진의 `GC` 는 더 이상 사용되지 않는 객체를 식별하기 위해 `Reachability` 라는 개념을 사용한다.

어떤 객체가 다른 객체를 통해 접근 가능한지를 판단하는 것이다.

`root` 는 그 태생부터 도달 가능하기 때문에, 명백한 이유 없이는 삭제되지 않는 값을 뜻한다.

- 현재 실행 중인 함수의 지역 변수와 매개변수
- 중첩 함수의 체인에 있는 함수에서 사용되는 변수와 매개변수
- 전역 객체 (global object), 전역 변수

전역 변수에 객체가 저장되어있다고 가정해 보면, 이 객체의 프로퍼티가 또 다른 객체를 참조하고 있다면, 프로퍼티가 참조하는 객체는 도달 가능한 값이 된다.
이 객체가 참조하는 다른 모든 것들도 도달 가능하다고 여겨진다.

```tsx
let cat = {
  name: "muji",
  age: 5,
};
```

전역 변수 `cat` 은 `{ name : "muji", age : 5 }` 라는 객체를 참조한다.

```tsx
cat = null;
```

이제 `cat` 은 도달할 수 없는 상태가 되었다. `GC` 는 이제 해당 객체를 메모리에서 삭제한다.

```tsx
let cat = {
  name: "muji",
  age: 5,
};

let muji = cat;

cat = null;
```

전역 변수 `muji` 를 통해 여전히 객체에 접근할 수 있기 때문에 객체는 메모리에서 삭제되지 않는다.
이 상태에서 `muji` 를 다른 값으로 덮어쓰면 객체는 메모리에서 삭제될 수 있다.

```jsx
function family(older, younger) {
  younger.olderBrother = older;
  older.youngerBrother = younger;

  return {
    olderBrother: older,
    youngerBrother: younger,
  };
}
let sibling = family({ name: "muji" }, { name: "makji" });
```

함수 `family` 는 인수로 전달받은 두 객체에 대해서 형제의 관계를 표현하고 이를 새로운 객체로 반환한다.

이 때 모든 객체가 도달 가능한 상태이다.

```jsx
delete sibling.youngerBrother;
delete sibling.olderBrother.youngerBrother;
```

`makji` 에 대한 참조를 지우면 `makji` 는 도달 가능한 상태에서 벗어난다.

### mark-and-sweep 알고리즘

가비지 컬렉션은 보통 다음과 같은 단계를 거쳐 수행된다.

1. `GC`는 `root`정보를 수집하고 이를 `mark`(기억) 한다.

- `root`가 참조하고 있는 모든 객체를 방문하고 이것들을 `mark` 한다.
- `mark` 된 모든 객체에 방문하고 그 객체들이 참조하는 객체도 `mar` 합니다.
  한번 방문한 객체는 전부 `mark` 하기 때문에 같은 객체를 다시 방문하는 일은 없다.
- `root`에서 도달 가능한 모든 객체를 방문할 때까지 위 과정을 반복한다.
- `mark` 되지 않은 모든 객체 즉, `unreachable` 한 객체들을 메모리에서 삭제한다.

### V8 메모리 구조

실행 중인 프로그램은 항상 V8 프로세스에서 할당된 메모리로 표시되며 이를 `Resident Set` 이라 한다.

![residentSet](https://user-images.githubusercontent.com/46440898/227934454-6c24b6b9-8884-48f5-a9a2-8e26d4e79d1a.png)

출처 : [https://deepu.tech/memory-management-in-v8/](https://deepu.tech/memory-management-in-v8/)

### Stack

원시 타입 변수, 함수 인자, 객체를 가리키는 포인터 등이 저장되는 공간이다.

### Heap memory

힙 메모리는 V8엔진이 객체나 동적 데이터를 저장하는 곳이다. 메모리 영역의 가장 큰 블록이며
오늘 내용의 핵심은 `Garbage Collection` 이 일어나는 곳이다.

`New space` 와 `Old space` 만 `GC` 에 의해 관리된다.

### New space

새로운 객체가 생성되는 공간으로, 대부분의 객체가 짧은 수명을 가지기 때문에 생성된지 얼마 되지 않은 객체들이 이 공간에 존재한다.

`New space` 는 2개의 `Semi space` 를 가지고 있으며, 이 `Semi space` 는 `Minor GC(Scavenger)` 에 의해 관리된다.

### Old space

두 번의 `Minor GC` 가 발생할 동안 `New Space` 에서 생존한 객체들이 이동하는 곳이며, `Major GC(Mark-Sweep & Mark-Compact)`가 관리한다.

- Old pointer space : 살아남은 객체들을 가지며, 이 객체들은 다른 객체들을 참조한다.
- Old data space : 데이터만 가진 객체들을 가진다.(다른 객체들을 참조하지 않음)

### Large object space

다른 영역의 크기보다 큰 객체들이 저장되는 공간으로, 각 객체는 `mmap` (메모리 맵) 영역을 가진다. 여기에 저장된 객체들은 가비지 컬렉트 되지 않는다.

### Code-space

`Just-In-Time` 즉, `JIT` 컴파일러가 컴파일된 코드들을 저장하는 곳이다.
유일하게 실행 가능한 메모리가 있는 영역이다.

### Cell space / Property cell space / Map space

이 영역들은 각각 `Cells`, `PropertyCells`, `Maps`을 포함한다.
각 영역은 모두 같은 크기의 객체들을 포함하며, 어떤 종류의 객체를 참조하는지에 대한 제약이 있어서 수집을 단순하게 만든다.

### 느낀점

막연하게 알고있는 `GC` 에 대해서 여러문서를 찾아보면서 공부하는 시간이었다.
`Mark-Sweep & Mark-Compact` 알고리즘을 설명하는 그림을 보는데 익숙한 `DFS` 탐색 과정이 있어서 이해하는데 도움이 되었다.

아직은 내 수준에서는 `V8` 엔진의 메모리 구조 전체에 대한 완벽한 이해가 되지 않았다.
추후에 문서를 다시 읽어보면서 이해를 하는 능력을 길러야겠다.

오늘 이해한 내용을 정리해보자.

1. `Garbage Collection` 이란 동적으로 할당된 메모리 중에서 더 이상 사용되지 않는 메모리를 자동으로 해제하는 기능이다.
2. 더 이상 사용되지 않는지에 대한 확인은 `ReachAbility` 라는 개념이 등장한다.
   이는 어떤 객체가 다른 객체를 통해서 접근 가능한지에 대해 판단하는 것이다.
   현재 실행 중인 함수의 지역변수, 매개변수 / 전역 변수 / window객체 등 태생부터 도달가능하기 때문에 `root` 라 한다.
3. 이 `root` 를 시작으로 다른 객체에 도달이 가능한지 검사한다.
4. 검사를 하는 대표적인 알고리즘은 `mark-and-sweep` 알고리즘이다.
5. 실행 중인 프로그램은 항상 V8 프로세스에서 할당된 메모리로 표시되며 이를 `Resident Set` 이라 한다.
6. 이 `Resident Set` 내부는 `Stack` `Heap` 두 가지로 나누어 지며 `Heap` 은 `Old Space` `New Space` 가 있다.
7. `New space` 에는 `semi space` 두 영역으로 나누어지며 여기서는 `Minor GC` 에 의해 가비지 컬렉션이 수행 된다.
8. `New space` 에서 살아남은 객체들은 `Old space` 로 이동하며 이는 `Major GC` 에 의해 관리된다.
