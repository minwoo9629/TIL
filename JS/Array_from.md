### Array.from

`ES6` 에서 도입된 `Array.from` 메서드는 유사 배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로 변환하여 반환한다.

<aside>
💡 유사 배열 객체란? 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 `length` 프로퍼티를 갖는 객체를 말한다.

</aside>

```
const catName = {
  0: "무지",
  1: "막지",
  2: "양꾸륵",
  length: 3,
};

// 배열처럼 순회가 가능하다.
for (let i = 0; i < catName.length; i++) {
  console.log(catName[i]);
}
```

```jsx
const arr = Array.from({ length: 2, 0: "1", 1: "2" });
// [ '1', '2' ]
console.log(arr);

const alphaArr = Array.from("LifeIsEgg");
// [ 'L', 'i', 'f', 'e', 'I', 's', 'E', 'g', 'g' ]
console.log(alphaArr);
```

`Array.from` 을 사용하면 두 번째 인수로 전달한 콜백 함수를 통해 값을 만들면서 요소를 채울 수 있다.

`Array.from` 메서드는 두 번째 인수로 전달한 콜백 함수에 첫 번째 인수에 의해 생성된 배열의 요소값과

인덱스를 순차적으로 전달하면서 호출하고, 콜백 함수의 반환값으로 구성된 배열을 반환한다.

```jsx
const numArr = Array.from({ length: 5 }, (_, idx) => idx + 1);
// [ 1, 2, 3, 4, 5 ]
console.log(numArr);
```

### 2차원 배열 만들어 보기

`3 * 3` 배열을 만들고 각 값은 `"*"` 로 채워보자

```jsx
const twoArr = Array.from(Array(3), () => Array(3).fill("*"));
// [ [ '*', '*', '*' ], [ '*', '*', '*' ], [ '*', '*', '*' ] ]
console.log(twoArr);
```

### 3차원 배열 만들어 보기

> 간혹 알고리즘 문제를 풀다보면 2차원 좌표평면에서 주인공이 공주를 구하러 간다.
> 이때 검을 들고 있으면 벽을 부술 수 있고 검이 없으면 벽을 부술 수 없다고 한다.
> 중복 방문을 피하기 위한 `discovered`를 만든다 할때 해당 좌표에서 검을 들고 있을 때 방문한적이 있는지
> 검이 없이 방문했는지 확인하도록 3차원 배열을 사용할때가 있다.
> `Array.from`을 이용해 만들어보자.

```
const discovered = Array.from(Array(5), () =>
  Array.from(Array(5), () => Array(2).fill(false))
);

// 주인공은 검이 없는 상태로 0,0  을 방문했다.
discovered[0][0][0] = true;
// [ true, false ]
console.log(discovered[0][0]);
```
