### **requestAnimationFrame란?**

> 브라우저에게 수행하기를 원하는 애니메이션을 알리고 다음 리페인트가 진행되기 전에 해당 애니메이션을
> 업데이트하는 함수를 호출한다.
> 이 메소드는 리페인트 이전에 실행할 콜백을 인자로 받는다.

브라우저가 매번 계속 화면을 그리는데 변화된 화면을 그릴 준비가 완료되었을 때 그려주는 것
최적화를 해서 애니메이션을 부드럽게 처리할 수 있는 기술이라고 생각할 수 있다.

이 메소드는 애니메이션 구현에 필요한 타임라인 프레임 비율을 모니터의 주사율에 맞추어져 실행하도록 해준다.
만약 모니터의 주사율이 60FPS라면 1초에 60번 프레임 비율을 갖는다. 이말은 1초에 60프레임을 보여준다고
할 수 있다.

1 프레임당 동작할 로직을 구현한 함수를 준비하고 `requestAnimationFrame()` 메소드에게 콜백 함수 타입의 인수로 등록한다.
주의할 점은 콜백 함수내에서 다시 `requestAnimationFrame()` 으로 재귀 호출을 해야 한다.

### 간단한 사용방법

```jsx
(function repeatFunc() {
  // 애니메이션 실행 코드
  requestAnimationFrame(repeatFunc);
})();
```

### requestAnimationFrame 취소하기

`setInterval`이나 `setTimeout`이 `id`를 리턴해서 그 `id`를 통해 취소할 수 있는것처럼 `requestAnimationFrame`도 `cancelAnimationFrame` 을 통해서 `id`를 통해 취소시킬 수 있다.

### 간단한 타이머 만들기

```jsx
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #cancleBtn {
        display: none;
      }
    </style>
  </head>
  <body>
    <div class="timer">00:00:00.000</div>
    <div>
      <button id="startBtn" onclick="startTimer()">시작</button>
      <button id="cancleBtn" onclick="cancleTimer()">종료</button>
    </div>
  </body>
  <script>
    const $timer = document.querySelector(".timer");
    const $startBtn = document.querySelector("#startBtn");
    const $cancleBtn = document.querySelector("#cancleBtn");
    let timerId, startTime;
    const timeValue = "00:00:00.000";
    const startTimer = () => {
      if (!startTime) {
        startTime = Date.now();
        console.log("tlw");
      }
      $startBtn.style.display = "none";
      $cancleBtn.style.display = "block";
      const timeMs = Date.now();
      const timeGap = timeMs - startTime;
      const ms = timeGap % 1000;
      let sec = (timeGap - ms) / 1000;
      const min = Math.floor((sec % 3600) / 60);
      const hour = Math.floor(sec / 3600);
      sec = (sec % 3600) % 60;

      $timer.innerText = `${String(hour).padStart(2, 0)}:${String(min).padStart(
        2,
        0
      )}:${String(sec).padStart(2, 0)}.${String(ms).padStart(3, 0)}`;
      timerId = requestAnimationFrame(startTimer);
    };

    const cancleTimer = () => {
      cancelAnimationFrame(timerId);
      startTime = 0;
      $cancleBtn.style.display = "none";
      $startBtn.style.display = "block";
      $timer.innerText = "00:00:00.000";
    };
  </script>
</html>
```

![requestAnimationFrame](https://user-images.githubusercontent.com/46440898/214495489-419df01c-d156-4136-a6ca-cf3a91047391.gif)
