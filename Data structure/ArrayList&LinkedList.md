# ArrayList & LinkedList

## List<E>

**순서가 있는** 자료구조로 만들어진 경우 `List` 인터페이스를 구현한다.

---

## ArrayList<E>

`ArrayList`  크기가 가변적으로 변하는 선형리스트이다.

일반적인 배열과 같은 순차리스트이며 `Index` 로 내부의 객체를 관리하는 점은 유사하지만
한 번 생성되면 크기가 변하지 않는 배열과 달리 `ArrayList` 는 저장 용량을 초과하면 자동으로
저장 용량이 늘어난다.

`ArrayList` 인스턴스가 생성되면 `Default` 값 10의 크기 또는 사용자가 직접 지정가능한 크기에
맞게 배열을 생성한다.

그리고 저장 용량이 꽉차게 되면 새로운 배열을 만들어서 기존의 값을 `copy` 하는 단순한 방식이다.

`ArrayList` 의 데이터가 삭제되면 삭제된 `Index` 이후의 데이터 값을 카피후 삭제된 `Index` 부터
덮어쓴다.

---

### ArrayList의 생성

```java
import java.util.ArrayList;

public class ArrayListTest {
    public static void main(String args[]) {
        ArrayList<String> values = new ArrayList<>();
        // 크기 직접 지정
        ArrayList<Integer> nums = new ArrayList<>(20);
        // 타입 미설정 : Object로 선언된다.
        ArrayList list = new ArrayList();

    }
}
```

### ArrayList 데이터 삽입 `add()`

```java
values.add("고양이");
values.add("무지");
values.add("막지");
nums.add(1);
nums.add(2);
nums.add(3);

// 크기 구하기
System.out.println(values.size());
```

### ArrayList 특정 Index에 데이터 삽입 `set(index, value)`

```java
// Index에 데이터 삽입
values.set(0, "코비");
System.out.println(values.toString());
```

> 특정 `index` 에 값을 삽입할 때 주의 할점은 `ArrayList` 의 크기가 10(default)이지만
`size()` 즉 논리적인 공간은 `**3`** 이므로 `index` 값이 논리적인 공간보다 클 수 없다.
>

```java
values.set(3, "베리");
```

### ArrayList 특정 값에 접근 `get(index)`

```java
System.out.println(values.get(1));
// 출력 결과 무지
```

> `get()` 도 마찬가지로 `set()` 과 같이 `index` 의 값은 논리적인 공간보다 클 수 없다.
>

### ArrayList 값 삭제 `remove(index)` or `remove(value)`

```java
// 값 삭제
values.remove(0);
System.out.println(values.toString());
values.add("지울 값");
System.out.println(values.toString());
values.remove("지울 값");
System.out.println(values.toString());
```

`ArrayList` 는 배열 기반이므로 `Index` 를 이용한 삭제는 빠르다, 하지만 `value` 를 이용한 삭제는
저장된 값을 찾아 삭제하는 방식이므로 `0` 부터 순차적으로 찾아 효율이 좋지 않다.

### ArrayList 값 검색 `contains(value)` or `indexOf(index)`

```java
// 값 검색
System.out.println(values.contains("무지")); // 값이 있으면 true 없으면 false
System.out.println(values.indexOf("무지")); // 값이있다면 해당 Index 없으면 -1
System.out.println(values.indexOf("정말 귀여운 고양이")); // -1
```

---

### ArrayList는 얼마만큼 크기가 자동으로 늘어날까?

새롭게 만들어지는 `newCapacity` 는 다음과 같이 진행된다.
**`int newCapacity = oldCapacity + (oldCapacity >> 1);`** 기존 용량 + 기존 용량/2 (우측 쉬프트 연산)

---

## LinkedList<E>

`LinkedList` 는 `Node` 에 의해 데이터들이 연결되어 있는 리스트이다.

`LinkedList` 는 데이터를 배열에 저장하는 구조가 아닌 `Node` 라는 객체에 `data` 를 저장한다.

그리고 `Node` 는 `Node` 끼리 참조 값을 가지고 있는 이중 연결 리스트로 구성된다.

`Node next` 변수에는 다음 `Node` 의 인스턴스 참조 값을 저장하고 있다.

즉 다음 `Node` 에 접근하려면 `Node next` 변수에 저장된 참조 값을 이용해 접근하는 것이다.

---

`Node1` - `Node2` - `Node3` 구조에서 `Node2` 가 삭제되면 `Node1` 은 `Node next` 변수에
`Node3` 의 참조 값을 `Node3` 의 `Node prev` 변수에는 `Node1` 의 참조 값을 저장한다.

---

### ArrayList 와 LinkedList

`LinkedList` 에서는 `Node` 참조 값을 삭제하는 방식으로 데이터를 삭제한다. 그러므로
`ArrayList` 보다 삭제 시 지연시간이 짧다. 또한 데이터가 많더라도 데이터 삭제시간은 동일하다.

반면에 `ArrayList` 는 저장된 데이터 양에 따라 삭제시간 지연이 늘어난다.

특정 데이터를 찾으려면 최초 생성된 `Node` 부터 시작하여 차례로 검색하기 때문에 `Index` 을
사용하는 `ArrayList` 보다 접근 속도가 느리다.
