function solution(arr1, arr2) {
  return arr1.map((item) =>
    arr2[0].map((_, arr2Idx) =>
      item.reduce((acc, v, idx) => acc + v * arr2[idx][arr2Idx], 0)
    )
  );
}
