## LIS란

`Longest Increasing Subsequence`
최장 증가 수열이라고 말하며, 어떤 수열이 나열 되어있을때, 그 배열의 순서를 유지하며 `크기가 점차 커지는`
가장 긴 부분 수열의 길이가 몇인지를 구하는 알고리즘이다.

---

## 가장 긴 증가하는 부분 수열 - DP 이용

```java
public class Main {
    public static void main(String[] args) throws IOException {
        int N = 7;
        int[] arr = {8, 2, 4, 1, 6, 11, 5};
        int[] dp = new int[N];
        Arrays.fill(dp, 1);
            for (int i = 1; i < N; i++) {
                // 내 앞의 숫자 중에 작은 숫자들을 찾기
                for (int j = 0; j < i; j++) {
                    // 나를 기준으로 내앞의 원소가 작으며,
                    if (arr[j] < arr[i]) {
                        // 현재 최장 증가 수열의 길이보다 작은 원소의 최장 증가 수열 길이에
                        // +1을 넣은 값이 크다면 값을 교체해 준다.
                        dp[i] = Math.max(dp[i], dp[j] + 1);
                    }
                }
            }
        System.out.println(Arrays.stream(dp).max().getAsInt());
        
    }
}
```

> `dp[i]` : `arr` 배열의 `i`번째 원소가 수열의 마지막 일 때 최장길이의 값
>

|  | dp[1] | dp[2] | dp[3] | dp[4] | dp[5] | dp[6] | dp[7] |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 길이 | 1 | 1 | 2 | 1 | 3 | 4 | 3 |
| 원소 | 8 | 2 | 2,4 | 1 | 2,4,6 | 2,4,6,11 | 2,4,5 |

따라서 최장 증가 수열의 제일 긴 길이는 `dp[6] = 4`이라고 볼 수 있습니다.

시간 복잡도는 `O(N^2)` 으로 `N` 의 크기가 크게 되었을 때 시간 초과가 날 수 있다.

그러므로 이분탐색을 이용하여 `LIS` 를 구하는 방법을 정리해보자.

---

## 가장 긴 증가하는 부분 수열 - 이분탐색 사용

- `dp[len]` : 길이가 `len` 의 증가 수열에서 가장 작은 값을 저장
- `dp` 배열에서 각 위치의 값을 갱신하기 위해 이분탐색 사용
- 새로운 숫자 `num`이 현재 `dp[len]`의 값보다 크다면 새로운 `LIS`가 갱신된다.

`int[] arr = {20, 10, 30, 20, 50}`

|  | dp[1] | dp[2] | dp[3] | dp[4] |
| --- | --- | --- | --- | --- |
| 최소 | 20 | 0 | 0 | 0 |
- 두 번째 원소 10은 20보다 작으므로 `dp[1]` 값 갱신

|  | dp[1] | dp[2] | dp[3] | dp[4] |
| --- | --- | --- | --- | --- |
| 최소 | 10 | 0 | 0 | 0 |
- 세 번째 원소 30은 10보다 크므로 `dp[2]` 값 갱신

|  | dp[1] | dp[2] | dp[3] | dp[4] |
| --- | --- | --- | --- | --- |
| 최소 | 10 | 30 | 0 | 0 |
- 네 번째 원소 20은 30보다 작으므로 `dp[2]` 값 갱신

|  | dp[1] | dp[2] | dp[3] | dp[4] |
| --- | --- | --- | --- | --- |
| 최소 | 10 | 20 | 0 | 0 |
- 마지막 원소 50은 20보다 크므로 `dp[3]` 값 갱신

|  | dp[1] | dp[2] | dp[3] | dp[4] |
| --- | --- | --- | --- | --- |
| 최소 | 10 | 20 | 50 | 0 |

```java
public class Main {
    public static void main(String[] args) {
        int N = 5;
        int[] arr = {20, 10, 30, 20, 50};
        int[] dp = new int[N + 1];
        // len은 최장 수열의 길이
        int len = 0;
        for (int i = 0; i < N; i++) {
            if (arr[i] > dp[len]) {
                dp[++len] = arr[i];
            } else {
                int idx = binarySearch(0, len, arr[i], dp);
                dp[idx] = arr[i];
            }
        }
        System.out.println(len);
    }

    private static int binarySearch(int left, int right, int target, int[] dp) {
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (target > dp[mid]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return right;
    }
}
```