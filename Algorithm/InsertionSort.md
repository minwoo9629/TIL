### Insertion Sort란?

> 배열의 모든 요소를 앞에서부터 차례대로 이미 정렬된 배열 부분과 비교 하여, 자신의 위치를 찾아
> 삽입함으로써 정렬을 완성하는 알고리즘

- 삽입 정렬은 두 번째 원소부터 시작하여 그 앞(왼쪽)의 원소들과 비교하여 삽입할 위치를 지정한 후 원소를
  뒤로 옮기고 지정한 자리에 원소를 삽입하여 정렬하는 알고리즘이다.
- 즉, 두 번째 원소는 첫 번째 원소와 비교, 세 번째 원소는 두 번째와 첫 번째 원소와 비교, 네 번째 원소는
  세 번째, 두 번째, 첫 번째 원소와 비교한 후 원소가 삽입될 위치를 찾는다.
  원소가 삽입될 위치를 찾았다면 그 위치에 원소를 삽입하기 위해 원소를 한 칸씩 뒤로 이동시킨다.

```jsx
const insertionSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let j = i;
    while (j >= 0 && arr[j] > arr[j + 1]) {
      const temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
      j--;
    }
  }
  return arr;
};

const arr = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8];
console.log(insertionSort(arr));
```

### 시간 복잡도

- Best : O(n)
- Worst : O(n ^ 2)
