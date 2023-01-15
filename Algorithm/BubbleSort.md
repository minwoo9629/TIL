### Bubble Sort란?

> **버블 정렬**이란 이웃한 두 숫자를 비교하여 큰 수를 뒤로 보내는 정렬

- 버블 정렬은 첫 번째 자료와 두 번째 자료를, 두 번째 자료와 세 번째 자료를, 세 번째와 네 번째 … 이런 식으로 마지막-1 번째 자료와 마지막 자료를 비교하여 교환하면서 자료를 정렬한다.
- 1회 반복을 수행하고 나면 가장 큰 자료가 맨 뒤로 이동하므로 2번째 반복에서는 맨 끝에 있는 자료는
  정렬에서 제외되고, 2회 반복을 수행하고 나면 끝에서 두 번째 자료까지는 정렬에서 제외된다.
  이렇게 정렬을 1회 반복을 수행할 때마다 정렬에서 제외되는 데이터가 하나씩 늘어난다.

```jsx
const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
};

const arr = [5, 7, 9, 0, 3, 1, 6, 2, 4, 8];

console.log(bubbleSort(arr));
```

### 시간 복잡도

- Best : O(n ^ 2)
- Worst : O(n ^ 2)
