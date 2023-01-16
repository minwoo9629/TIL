### Selection Sort란?

- 선택 정렬은 첫 번째 원소를 두 번째 원소부터 마지막 원소까지 차례대로 비교하여 가장 작은 값을 찾아
  첫 번째에 놓고, 두 번째 원소를 세 번째 원소부터 마지막 원소까지 차례대로 비교하여 그 중 가장 작은 값을 찾아 두 번째 위치에 놓는 과정을 반복하며 정렬을 수행한다.
- 1회 반복을 수행하고 나면 가장 작은 값의 원소가 맨 앞에 오게 되므로 그 다음 반복에서는 두 번째 원소를
  가지고 비교한다.
  마찬가지로 3번째 반복에서는 세 번째 원소를 정렬한다.

```jsx
const selectionSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let least = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[least] > arr[j]) {
        least = j;
      }
    }
    if (least !== i) {
      const temp = arr[i];
      arr[i] = arr[least];
      arr[least] = temp;
    }
  }

  return arr;
};

const arr = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8];
console.log(selectionSort(arr));
```

### 시간 복잡도

- Best : O(n ^ 2)
- Worst : O(n ^ 2)
