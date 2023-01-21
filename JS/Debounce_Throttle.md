### 디바운스와 스로틀이란

> `scroll` `resize` `input` `mousemove` 같은 이벤트는 짧은 시간 간격으로 연속해서 발생한다.
> 이러한 이벤트에 바인딩한 이벤트 핸들러는 과도하게 호출되어 성능에 문제를 일으킬 수 있다.
> 디바운스와 스로틀은 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해서 과도한 이벤트 핸들러의 호출을 방지하는 프로그래밍 기법이다.

### 디바운스(Debounce)

> 디바운스(Debounce)는 짧은 시간 간격으로 이벤트가 연속해서 발생하면 이벤트 핸들러를 호출하지 않다가 일정시간이 경과한 이후에 이벤트 핸들러가 한 번만 호출되도록 한다.

```jsx
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="text" />
    <div class="result"></div>
    <script>
      const $input = document.querySelector("input");
      const $result = document.querySelector(".result");
      const debonce = (callback, delay) => {
        let timerId;
        return (event) => {
          console.log(event, "event");
          if (timerId) clearTimeout(timerId);
          timerId = setInterval(callback, delay, event);
        };
      };
      $input.oninput = debonce((e) => {
        $result.textContent = e.target.value;
      }, 100);
    </script>
  </body>
</html>
```

`input` 이벤트는 사용자가 텍스트 입력 필드에 값을 입력할 때마다 연속해서 발생한다.

만약 `input` 의 이벤트 핸들러에서 사용자가 입력 필드에 입력한 값으로 `Ajax` 요청을 수행한다면 사용자가 아직 입력을 완료하지 않아도 `Ajax` 요청이 전송될 것이다. 따라서 사용자가 입력을 완료했을 때 한 번만
`Ajax` 요청을 전송하는 것이 바람직하다.

### 스로틀(throttle)

> 스로틀(throttle)은 짧은 시간 간격으로 이벤트가 연속해서 발생하더라도 일정 시간 간격으로
> 이벤트 핸들러가 최대 한 번만 호출되도록 한다.

```jsx
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      .container {
        width: 300px;
        height: 300px;
        background-color: cornflowerblue;
        overflow: scroll;
      }
      .content {
        width: 300px;
        height: 100vh;
      }
    </style>
    <title>Document</title>
  </head>
  <body>
    <div class="container">
      <div class="content"></div>
    </div>
    <div>
      일반 이벤트 핸들러 scroll 이벤트 처리 횟수:
      <span class="normal-count">0</span>
    </div>
    <div>
      throttle 이벤트 핸들러 scroll 이벤트 처리 횟수:
      <span class="throttle-count">0</span>
    </div>
    <script>
      const $container = document.querySelector(".container");
      const $normalCount = document.querySelector(".normal-count");
      const $throttleCount = document.querySelector(".throttle-count");

      const throttle = (callback, delay) => {
        let timerId;

        return (event) => {
          if (timerId) return;

          timerId = setTimeout(
            () => {
              callback(event);
              timerId = null;
            },
            delay,
            event
          );
        };
      };
      let normalCount = 0;
      $container.addEventListener("scroll", () => {
        $normalCount.textContent = ++normalCount;
      });

      let throttleCount = 0;
      $container.addEventListener(
        "scroll",
        throttle(() => {
          $throttleCount.textContent = ++throttleCount;
        }, 100)
      );
    </script>
  </body>
</html>
```
