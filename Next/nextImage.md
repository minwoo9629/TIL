![next](https://user-images.githubusercontent.com/46440898/225577042-8be8411c-2058-4655-a016-d27d4e245c49.png)

### next/image

`Next.js` 에서 제공하는 `next/image` 를 알아보기전에 `HTML` 에서의 `img` 태그를 살펴보자.

```tsx
import { NextPage } from "next";

const ExamplePage: NextPage = () => {
  return (
    <div>
      <section style={{ height: "500vh", backgroundColor: "cornflowerblue" }}>
        임시 구역
      </section>
      <h1>Next Image</h1>
      <div>
        <p>html img 태그 사용</p>
        <figure>
          <img src="/puppy.png" alt="puppyImage" width={300} height={300} />
        </figure>
      </div>
    </div>
  );
};

export default ExamplePage;
```

![nextImage1](https://user-images.githubusercontent.com/46440898/226599905-de1e0e6c-b301-4822-80f7-df2656142987.png)

브라우저의 스크롤을 내려야만 이미지를 확인할 수 있지만 네트워크 탭을 확인해보면 이미지 리소스가 다운로드 받은 것을 확인할 수 있다.

이 `img` 태그에 크롬에서 지원되는 `loading="lazy"` 를 적용해보자.

```tsx
<img
  src="/puppy.png"
  alt="puppyImage"
  width={300}
  height={300}
  loading="lazy"
/>
```

| ![nextImage2](https://user-images.githubusercontent.com/46440898/226599956-f21004c4-4250-4274-84d1-42f0eb0b6e01.png) | ![nextImage3](https://user-images.githubusercontent.com/46440898/226600009-5ea757e3-ef44-4dd3-95a9-4859d55fa3bd.png) |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |

이렇게 이미지가 보여질 시점에 이미지 리소스가 다운되는 것을 확인할 수 있다.

이제 `next/image` 를 사용해보자.

### next/image 사용법

1. Local Image

`.jpg` , `.png` , `.webp` 파일 등을 `import` 한다.

```tsx
import { NextPage } from "next";
import Image from "next/image";
import puppyImage from "/public/puppy.png";

const ExamplePage: NextPage = () => {
  return (
    <div>
      <h1>Next Image</h1>
      <div>
        <p>next/image 사용</p>
        <Image
          src={puppyImage}
          // 현재 코드에선 원본 이미지 넓이와 높이 값이 커서 직접 값을 주었다.
          width={300}
          height={300}
          alt={"puppyImg"}
          quality={100}
          placeholder="blur"
        />
      </div>
    </div>
  );
};

export default ExamplePage;
```

`Next.js`는 가져온 파일을 기준으로 이미지의 너비와 높이를 자동으로 결정한다.

이러한 값은 이미지를 로드하는 동안 `Cumulative Layout Shift(CLS)` 방지하는 데 사용된다.

이미지가 로드되기 전까지 영역의 높이가 `0`이었다가 이미지가 로드된 후 이미지만큼 영역이 늘어서 레이아웃이 흔들리는 바람에 다른 링크를 클릭하는 경험을 우리는 경험을 해보았을 것이다. 이를 `CLS` 라 한다.

또한 `base64`로 인코딩된 `blur` 이미지가 생성되어 별도의 작업 없이 `placeholder="blur"`를 사용할 수 있다.

![blur](https://user-images.githubusercontent.com/46440898/226600063-e0ecfcdd-9f37-4c10-8425-6c524e33cd27.gif)

1. Remote Image

`remote image` 를 사용하기 위해선 `src` 속성에 `URL` 을 문자열로 작성한다.

`Next.js` 는 빌드 중 `remote image` 에 접근할 수 없으므로 `width`, `height` 을 작성해야 한다.
선택적으로 `blurDataURL` 을 작성하는데 이때 `base64`로 인코딩된 이미지 데이터를 작성해 줘야 한다.

또한 리모트 이미지의 경우 `Next.js` 서버에서 이미지를 가지고 있는 리모트 서버에 직접 요청을 하기 때문에 모든 `url`에 대한 접근을 허용할 경우 악의를 가진 사용자에 의해 공격을 받을 가능성이 있기 때문에 `next.config.js` 파일에 `CDN`의 `host`를 명시해야 한다.

```tsx
// next.config.js
module.exports = {
  images: {
    domains: ["image-domain"],
  },
};
```

### next/image의 기능

`next/image` 컴포넌트가 제공하는 대표적인 기능은 다음과 같다.

1. lazy loading
2. 이미지 사이즈 최적화
3. placeholder 제공

### lazy loading

현재 브라우저를 통해 바라보고 있는 스크린에 사진이 없는데도 네트워크에 이미지 리소스를 요청한다면 불필요한 요청이 될 수 있다.

따라서 이미지를 로드하는 시점을 필요할때 까지 지연을 시키는 것이다.

`next/image` 는 자동으로 `lazy loading` 이 적용된다.

만약 일부 사진이 우선적으로 로드되는 것을 원한다면 `priority` 속성을 추가하면 된다.

### 이미지 사이즈 최적화

`next/image` 는 `webp` 와 같은 용량이 작은 포맷으로 이미지를 변환해서 제공한다.

`next/image` 를 사용했을 때와 일반 `HTML` 의 `img` 태그를 사용했을 때의 크기 차이를 확인할 수 있다.

![nextImage4](https://user-images.githubusercontent.com/46440898/226600110-01cdd01e-5c44-4417-b1f1-db0efb17ab1b.png)

### 이미지 사이즈를 모를땐 어떻게 해야할까

우리는 이미지의 사이즈를 모를때가 있는데 이를 어떻게 `Next.js` 에서 처리하면 좋을지 알아보자.

`fill` 속성을 사용하면 상위 요소에 따라 이미지 크기를 조정할 수 있다.

또한 `fill` 속성과 함께 `object-fit` 을 사용할 수 있다. (`contain` 과 `cover` 값을 가진다.)

```tsx
import { NextPage } from "next";
import Image from "next/image";
import puppyImage from "/public/puppy.png";

const ExamplePage: NextPage = () => {
  return (
    <div>
      <h1>Next Image</h1>
      <div>
        <div>
          <h1>이미지의 사이즈를 모르는 경우</h1>
          <div
            style={{ width: "400px", height: "400px", position: "relative" }}
          >
            <Image
              src={"/moon.jpg"}
              fill
              alt="moonImage"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
    </div>
  );
};

export default ExamplePage;
```

다른 방법으로 `CMS` 와 같은 `API` 요청을 통해 이미지 `URL` 을 검색하는 경우 `URL` 과 함께 이미지의 `width` 와 `height` 값을 반환하도록 할 수 있을 것이다.

### placeHorder

`static` 이미지를 사용하는 경우는 `blur` 이미지가 자동으로 생성된다.
그렇다면 외부 리소스로 얻는 이미지의 `blur` 이미지는 어떻게 처리를 하면 좋을까?

[https://png-pixel.com/](https://png-pixel.com/) 페이지에서 `base64` 로 인코딩된 `blur` 이미지를 만들 수 있겠지만 상황에 따라 다른 이미지를 만드는 것은 불편할 것이라 판단된다.

공식문서에서 제안하는 [https://github.com/joe-bell/plaiceholder](https://github.com/joe-bell/plaiceholder) 을 사용해서 문제를 해결해보자.

```powershell
npm install sharp
npm install plaiceholder
```

```tsx
import { GetStaticProps, NextPage } from "next";
import { getPlaiceholder } from "plaiceholder";
import Image from "next/image";
interface Props {
  imgInfo: { src: string; width: number; height: number; type: string };
  blurDataURL: string;
}
const ExmplePage: NextPage<Props> = ({ imgInfo, blurDataURL }) => {
  return (
    <div>
      <h3>외부로 부터 받은 이미지 리소스를 사용하는 경우 blur image 만들기</h3>
      <div style={{ width: "800px", height: "400px", position: "relative" }}>
        <Image
          src={imgInfo.src}
          placeholder="blur"
          blurDataURL={blurDataURL}
          alt="myImage"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default ExmplePage;

export const getStaticProps: GetStaticProps = async () => {
  const { base64, img } = await getPlaiceholder(
    "https://images.unsplash.com/photo-1678776682765-25854662bbdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2981&q=80",
    { size: 10 }
  );
  return {
    props: {
      imgInfo: { ...img },
      blurDataURL: base64,
    },
  };
};
```

`img` 값에는 `img` 의 `url` , `width`, `height`, `type(jpg etc)` 의 값이 있고 `base64` 에는 인코딩된 `blurDataURL` 에 쓰일 값이 있다.

![blurDataURL](https://user-images.githubusercontent.com/46440898/226600178-3553b60a-94b5-4830-9508-d23ede749593.gif)

### 느낀점

외부 이미지 리소스를 사용하는 경우 미리 `blurDataURL` 을 만들어서 사용을 할지 다음과 같이 `plaiceholder` 를 이용하여 `blur` 이미지를 사용할지 적절한 기준을 생각해봐야 할 것 같다.

디자인 컨셉이 이미지가 불러와지는 동안 `skeleton ui` 와 같은 회색 이미지를 보여줘야 한다면 미리 만들어둔 이미지를 사용하면 될 것이고 각 컨텐츠가 희미하게 보이도록 한다면 지금과 같이 `placieholder` 을 사용하면 좋을 것 같다.
