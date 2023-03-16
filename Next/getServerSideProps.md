![next](https://user-images.githubusercontent.com/46440898/225577042-8be8411c-2058-4655-a016-d27d4e245c49.png)

### getServerSideProps

> If you export a function called `getServerSideProps`(Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by `getServerSideProps`.

페이지에서 `getServerSideProps(Server-SideRendering)`라는 함수를 `export` 하면 `Next.js`는 `getServerSideProps`에서 반환한 데이터를 사용하여 각 요청에 대해 이 페이지를 미리 렌더링합니다.

```tsx
import { GetServerSideProps, NextPage } from "next";

interface Props {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const ExamplePage: NextPage<Props> = ({ userId, id, title, completed }) => {
  return (
    <div>
      <h1>getServerSideProps</h1>
      <p>userId : {userId}</p>
      <p>id : {id}</p>
      <p>제목 : {title}</p>
      <p>완료여부 : {completed ? "완료" : "미완료"}</p>
    </div>
  );
};

export default ExamplePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
    (response) => response.json()
  );
  return {
    props: { ...data }, // will be passed to the page component as props
  };
};
```

<img width="344" alt="gerServerSidePropsResult" src="https://user-images.githubusercontent.com/46440898/225577142-5a0c4f5a-3ae0-40eb-a62b-fd81c80e6bf3.png">

### 언제 사용하는 것이 좋을까?

> You should use getServerSideProps only if you need to render a page whose data must be fetched at request time. This could be due to the nature of the data or properties of the request (such as authorization headers or geo location). Pages using getServerSideProps will be server side rendered at request time and only be cached if cache-control headers are configured.

요청 시 데이터를 가져와야 하는 페이지를 렌더링해야 하는 경우에만 `getServerSideProps`를 사용해야 한다.

이는 데이터의 특성이나 요청 속성(예: 인증 헤더 또는 지리적 위치) 때문일 수 있다.

`getServerSideProps`를 사용하는 페이지는 요청 시 서버 측에서 렌더링되며 캐시 제어 헤더가 구성된 경우에만 캐시된다.

```tsx
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
    (response) => response.json()
  );

  return {
    props: { ...data, date: new Date().toISOString() },
  };
};
```

로컬에서 테스트할때는 정상적으로 동작하지 않는 것 같다…. 여러예제를 찾아봤는데 배포가 된 상황에서 적용되는 것으로 보인다.
