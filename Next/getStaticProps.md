![next](https://user-images.githubusercontent.com/46440898/225336825-32f2ad25-15a8-4477-bb59-6598df55773d.png)

### getStaticProps

> If you export a function called `getStaticProps`(Static Site Generation) from a page,
> Next.js will pre-render this page at build time using the props returned by `getStaticProps`.

페이지에서 `getStaticProps(Static Site Generation)`라는 함수를 `export` 하는 경우
`Next.js`는 빌드 시 `getStaticProps`에서 반환한 `props`를 사용하여 이 페이지를 사전 렌더링합니다.

### SSG(Static Site Generation)

- `pre-rendering`: `Static`한 `HTML`을 `build time`에 미리 만들어 두는 것 (`SSR`은 `request time`에 진행)
- 서버 부하 없음, `HTML` 캐시 가능하다.

- `SEO`에 좋다.
- 정적인 사이트에 사용한다.

### ISR(Incremental Static Regeneration)

> Next.js allows you to create or update static pages after you’ve built your site. Incremental Static Regeneration (ISR) enables you to use static-generation on a per-page basis, without needing to rebuild the entire site. With ISR, you can retain the benefits of static while scaling to millions of pages.

`Next.js`를 사용하면 사이트를 구축한 후 정적 페이지를 만들거나 업데이트할 수 있습니다.

`ISR(Incremental Static Regeneration)`을 사용하면 전체 사이트를 재구성할 필요 없이 페이지 단위로 정적 생성을 사용할 수 있습니다.
`ISR`을 사용하면 수백만 페이지로 확장하면서 정적의 이점을 유지할 수 있습니다.

### getStaticProps 사용해보기

```tsx
import { GetStaticProps, NextPage } from "next";

interface Props {
  data: number;
}

const ExamplePage: NextPage<Props> = ({ data }) => {
  return (
    <div>
      <h1>getStaticProps</h1>
      <p>값 : {data}</p>
    </div>
  );
};

export default ExamplePage;

export const getStaticProps: GetStaticProps = async () => {
  const delaySecond = 2;
  const data = await new Promise((resolve, reject) => {
    setTimeout(
      () => resolve(Math.floor(Math.random() * 10)),
      delaySecond * 1000
    );
  });
  return {
    props: { data },
  };
};
```

> In development (`next dev`), `getStaticProps` will be called on every request.

개발환경에서는 `getStaticProps` 는 매요청마다 실행되니 `next build` 이후 `next start` 를 통해 결과를 확인해보면 정적으로 생성된 값이 새로고침을 해도 바뀌지 않는 결과를 확인할 수 있다.

미리 `pre-rendering` 된 `HTML` 을 가져오는 것이다.

`getStaticProps` 에 적은 로직은 `API` 를 호출하는 상황을 가정하여 `promise` 코드를 작성하였다.

`ExamplePage` 는 `getStaticProps` 에서 로 부터 `props` 를 받아 값을 보여준다.

하지만 상황에 따라 `getStaticProps` 에서 호출한 `API` 의 값이 바뀌는 경우가 있다.

이런 경우 `ISR` 방식을 지원하기 위해 `Next.js` 에서 제공하는 `revalidate` 속성을 사용한다.

```tsx
export const getStaticProps: GetStaticProps = async () => {
  const delaySecond = 2;
  const data = await new Promise((resolve, reject) => {
    setTimeout(
      () => resolve(Math.floor(Math.random() * 10)),
      delaySecond * 1000
    );
  });
  return {
    props: { data },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10,
  };
};
```

`revalidate : 10` 의 의미는 10초마다 서버가 `request` 를 받은지 10초가 지난 후, 다시 `request` 가 왔을 때마다 함수를 다시 실행해서 데이터가 바뀌었으면 새로 바뀐 데이터로 `pre-rendering` 하는 것이다.

데이터가 바뀌지 않으면 `Next.js` 는 다시 `pre-rendering` 을 수행하지 않는다.
