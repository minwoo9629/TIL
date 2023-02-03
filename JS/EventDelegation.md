### 이벤트 위임이란?

이벤트 리스너를 하위에 추가하는 대신 상위요소에 추가하는 기법이다.

`DOM` 의 `Event Bubbling` 으로 인해 하위 요소에서 이벤트가 발생할때마다 실행된다.

이벤트 위임을 사용하면 요소마다 핸들러를 할당하지 않고, 요소의 공통 조상에 이벤트 핸들러를

단 하나만 할당해도 여러 요소를 한꺼번에 다룰 수 있다.

```jsx
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="menu">
      <button>멍이</button>
      <button>무지</button>
      <button>막지</button>
      <button>만두</button>
    </div>
    <script>
      let clickedBtn;
      const $menu = document.querySelector("#menu");

      menu.addEventListener("click", (e) => {
        let target = e.target;
        if (target.tagName !== "BUTTON") {
          return;
        }

        highlight(target);
      });

      const highlight = (el) => {
        if (clickedBtn) {
          clickedBtn.classList.remove("active");
        }
        clickedBtn = el;
        clickedBtn.classList.add("active");
      };
    </script>
  </body>
</html>
```

4개의 버튼이있고, 각 버튼을 클릭하면 버튼이 활성화 되도록 간단하게 코드를 작성해보았다.

각 `<button>`마다 `onclick` 핸들러를 할당하는 대신, ‘모든 이벤트를 잡아내는’

핸들러를 `<div>` 요소에 할당했다.

`<div>` 요소에 할당하게 될 핸들러는 `event.target`을 이용해 어떤 버튼이 클릭 되었는지

감지하고, 해당 칸을 강조하게 된다.

이렇게 코드를 작성하면 활성화기능을 유지하면서 `<button>`를 언제라도 넣고 뺄 수 있다.

![btnEventDelegationSample](https://user-images.githubusercontent.com/46440898/216551027-34c13911-1093-491e-b571-4809944f7aae.gif)
