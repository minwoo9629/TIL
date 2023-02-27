### 힙(heap)이란?

`heap` 은 최댓값 또는 최솟값을 찾아내는 연산을 빠르게 하기 위한 완전 이진 트리를 기본으로 한 자료구조이다.

`A` 노드가 `B` 노드의 부모노드이면 이 두 노드 사이에는 대소 관계가 성립한다.

`heap`에서는 가장 높은 우선순위를 가지는 노드가 항상 루트노드에 오게 되는 특징이 있으며,

이를 응용하여 우선순위 큐와 같은 자료형을 구현 할 수 있다.

또한 삽입과 삭제에 `O(logN)` 의 시간이 소요된다.

### 힙의 종류

1. 최대 힙(max heap) : 부모 노드의 값이 자식 노드의 값보다 크거나 같은 완전 이진 트리
2. 최소 힙(min heap) : 부모 노드의 값이 자식 노드의 값보다 작거나 같은 완전 이진 트리

### 우선순위 큐(Priority Queue)란?

`Queue` 는 먼저 삽입된 데이터가 먼저 나가는 `FIFO (First In First Out)` 형식의 자료구조이다.

`Priority Queue`는 먼저 삽입된 데이터가 아닌, 우선순위가 높은 데이터가 먼저 나가는 형태의 자료구조이다.

일반적으로 `heap` 을 이용하여 구현한다.

### 우선순위 큐 구현하기

- 일반적으로 배열을 이용하여 구현한다.
- 구현의 편의를 위해 배열의 첫번째 인덱스는 `0` 은 사용하지 않는다.
- 부모 노드와 자식 관계가 다음과 같을 때 배열로 다음과 같이 표현 할 수 있다.
- 왼쪽 자식의 `index` = 부모 `index` \_ 2
- 오른쪽 자식의 `index` = 부모 `index` \_ 2 + 1
- 부모 `index` = 자식 `index` / 2
  ![heap.png](https://user-images.githubusercontent.com/46440898/221505716-d829b0fa-c0c4-43be-9fa4-8575e8c368b9.png)

### 힙의 삽입

1. 힙에 새로운 요소가 들어오면 새로운 노드를 힙의 마지막 노드에 삽입한다.
2. 새로운 노드를 부모 노드들과 비교하여 교환한다.

`10` 이 삽입되면 부모인 `3` 과 값을 비교하며 값이 더 크면 노드를 교환한다. (현재는 최대 힙으로 가정)
![10삽입.png](https://user-images.githubusercontent.com/46440898/221505953-c8ef81a9-15c3-4fdb-990f-2b19c1b87ce0.png)

다시 한 번 부모인 `7` 과 값을 비교하며 값이 더 크면 노드를 교환한다.
![7과비교.png](https://user-images.githubusercontent.com/46440898/221506008-cfee531d-b78e-4640-b178-25a7df1eaab7.png)

다시 한 번 부모인 `9` 와 값을 비교하며 값이 더 크면 노드를 교환한다.
![9와비교.png](https://user-images.githubusercontent.com/46440898/221506075-e10e08bf-a9d9-46d3-b7a7-b5819595d117.png)

완료
![4.png](https://user-images.githubusercontent.com/46440898/221506133-f4f96723-aa34-4d13-804b-2bac2a7e5b35.png)

### 힙의 삭제

1. 루트 노드를 삭제한다.
2. 삭제된 루트 노드에 힙의 마지막 노드를 가져온다.
3. 힙을 재구성한다. (자식 노드와 비교하면서 우선순위를 변경한다.)

![1.png](https://user-images.githubusercontent.com/46440898/221506217-b733fda5-ea93-4993-a4ac-d6746463ff3a.png)

![max.png](https://user-images.githubusercontent.com/46440898/221506313-18d84d1d-2bc7-49bd-8f9c-2204421ff14c.png)

### 힙 구현하기

- 다익스트라 알고리즘을 이용한 최단거리를 구하는 문제에서 사용한 힙이다.
  최소힙을 구현하였으며 배열에는 `[ 노드 번호 , 거리 값 ]` 을 저장하였기 때문에 이를 비교하기 위한
  `compare` 함수를 구현하였다.

```jsx
const Heap = function () {
  this.heap = [null];
  this.len = 0;
  this.compare = function (idx1, idx2) {
    return this.heap[idx1][1] > this.heap[idx2][1];
  };
  this.add = function (value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parentIdx = Math.floor(curIdx / 2);
    // 저장된 데이터의 우선순위를 비교하여 변경하는 작업
    while (curIdx > 1 && this.compare(parentIdx, curIdx)) {
      this.swap(parentIdx, curIdx);
      curIdx = parentIdx;
      parentIdx = Math.floor(curIdx / 2);
    }
    this.len++;
  };
  this.swap = function (idx1, idx2) {
    const temp = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    this.heap[idx2] = temp;
  };

  this.poll = function () {
    const value = this.heap[1];
    if (this.heap.length <= 2) {
      this.heap = [null];
      this.len = 0;
    } else {
      this.heap[1] = this.heap.pop();
      this.len--;
    }

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;
    if (!this.heap[leftIdx]) {
      return value;
    }
    if (!this.heap[rightIdx]) {
      if (this.compare(curIdx, leftIdx)) {
        this.swap(leftIdx, curIdx);
      }
      return value;
    }
    // 힙의 맨 마지막의 값을 루트로 옮긴 다음 다시 정렬하는 과정
    while (this.compare(curIdx, leftIdx) || this.compare(curIdx, rightIdx)) {
      const minIdx = this.compare(leftIdx, rightIdx) ? rightIdx : leftIdx;
      this.swap(minIdx, curIdx);
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
      if (leftIdx > this.len || rightIdx > this.len) {
        break;
      }
    }

    return value;
  };
};
```

### 느낀점

`Java` 나 `python` 의 경우 우선순위 큐가 구현되어 있기 때문에 편하지만 `javascript` 같은 경우 직접

구현을 해야하기 때문에 이번 기회에 한 번 더 정리하게 된 기회가 되었다.

데이터가 삽입되거나 삭제되는 경우 힙을 재정렬 하는 로직을 함수로 분리하면 조금 더 가독성이 좋지 않을까

생각된다.
