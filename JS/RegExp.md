### 정규 표현식이란?

일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어.

### 정규 표현식의 생성

정규 표현식 리터럴 : `/regexp/i`

`/` : 시작, 종료 기호

`regexp` : 패턴

`i` : 플래그

패턴은 `is` , 플래그 : `i` ⇒ 대소문자를 구분하지 않는다.

```jsx
const message = "Is this is this";

const regexp = /is/i;

// true
console.log(regexp.test(message));
```

### RegExp 메서드

### RegExp.prototype.exec

`exec` 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환한다.

`exec` 메서드는 문자열 내의 모든 패턴을 검색하는 `g` 플래그를 지정해도 첫 번째 매칭 결과만 반환한다.

```jsx
const message = "There is a apple";

const regexp = /is/i;
// [ 'is', index: 6, input: 'There is a apple', groups: undefined ]
console.log(regexp.exec(message));
```

### RegExp.prototype.test

`test` 메서드는 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 `boolean` 값으로

반환한다.

```jsx
const message = "There is a apple";

const regexp = /is/;

// true
console.log(regexp.test(message));
```

### RegExp.prototype.match

`String` 표준 빌트인 객체가 제공하는 `match` 메서드는 대상 문자열과 인수로 전달받은 정규 표현식과의

매칭 결과를 배열로 반환한다.

```jsx
const catName = "cat name is muji";

const regexp = /muji/;
// [ 'muji', index: 12, input: 'cat name is muji', groups: undefined ]
console.log(catName.match(regexp));
```

`exec` 메서드는 `g` 플래그를 지정해도 첫 번째 매칭 결과만을 반환하지만 `match` 메서드는 `g` 플래그를

사용하면 모든 매칭 결과를 배열로 반환한다.

```jsx
const introduce = "Muji Makji Youtue cat is Muji";
const regexp = /Muji/g;
// [ 'Muji', 'Muji' ]
console.log(introduce.match(regexp));
```

### 플래그

| 플래그          | 설명                                                            |
| --------------- | --------------------------------------------------------------- |
| i (ignore case) | 대소문자를 구분하지 않고 패턴을 검색한다.                       |
| g (global)      | 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다. |
| m (multi line)  | 문자열의 행이 바뀌더라도 패턴 검색을 계속한다.                  |

```jsx
const introduce = "Muji Makji Youtue's cat is muji";
// [ 'Muji', 'muji' ]
console.log(introduce.match(/muji/gi));
```

### 반복검색

`{m,n}` 은 최소 `m` 번 최대 `n` 번 반복되는 문자열을 의미한다. `,` 뒤에 공백이 있으면 정상 동작하지 않으니

주의해야 한다.

```jsx
const alpha = "a aa aaa bb aaaa ab";
const aRegexp = /a{1,3}/g;
// [ 'a', 'aa', 'aaa', 'aaa', 'a', 'a' ]
console.log(alpha.match(aRegexp));
```

`{n}` 은 패턴이 `n` 번 반복되는 문자열을 의미한다. `{n,n}` 과 같다.

```jsx
const alpha = "a aa aaa bb aaaa ab";
const aRegexp2 = /a{2}/g;
// [ 'aa', 'aa', 'aa', 'aa' ]
console.log(alpha.match(aRegexp2));
```

`{n,}` 은 패턴이 최소 `n` 번 반복되는 문자열을 의미한다.

`+` 은 패턴이 최소 한번 이상 반복되는 문자열을 의미한다. `{1,}` 과 같다.

`?` 는 앞선 패턴이 최대 한번 이상(0번도 포함) 반복되는 문자열을 의미한다.

```jsx
const message2 = "muji muuji";

const mujiRegexp = /muu?ji/g;
// [ 'muji', 'muuji' ]
console.log(message2.match(mujiRegexp));
```

### OR 패턴

```jsx
const mujiMakjiRegexp = /muji|makji/g;
// [ 'muji',  'makji', 'muji',  'makji', 'muji',  'muji', 'makji' ]
console.log(message3.match(mujiMakjiRegexp));
```

분해되지 않는 단어 레벨로 검색하기 위해 `+` 를 함께 사용한다.

```jsx
const message4 = "A AA B BB Aa Bb";
const message4Regexp = /A+|B+/g;
// [ 'A', 'AA', 'B', 'BB', 'A', 'B' ]
console.log(message4.match(message4Regexp));
```

`[]` 내의 문자는 `or` 로 동작한다.

```jsx
const message5 = "a b c d aa bc de ff gg";

const message5Regexp = /[ab]+/g;
// [ 'a', 'b', 'aa', 'b' ]
console.log(message5.match(message5Regexp));
```

### NOT 검색

`[...]` 내의 `^` 은 `not` 의미를 갖는다.

```jsx
const message6 = "hello my name is muji123";

const mesage6Regexp = /[^0-9]+/g;
// [ 'hello my name is muji' ]
console.log(message6.match(mesage6Regexp));
```

### 시작, 마지막 위치로 검색

`[...]` 밖의 `^` 은 문자열의 시작을 의미한다.

```jsx
const targetUrl = "https://localhost:8000";
const targetUrl2 = "http://localhost:8000";
const urlRegexp = /^https/;

// true
console.log(urlRegexp.test(targetUrl));
// false
console.log(urlRegexp.test(targetUrl2));
```

`$` 은 문자열의 마지막을 의미한다.

```jsx
const targetUrl3 = "www.naver.com";
const targetUrl4 = "www.naver.co";

const urlRegexp2 = /com$/;

// true
console.log(urlRegexp2.test(targetUrl3));
// false
console.log(urlRegexp2.test(targetUrl4));
```

### 정규식 갯수 반복 패턴

| 기호 | 의미                     |
| ---- | ------------------------ |
| ?    | 없거나 or 최대 한개만    |
| \*   | 없거나 or 있거나(여러개) |
| \*?  | {0}와 동일               |
| +?   | {1}와 동일               |

### 다양한 정규 표현식 연습하기

해당 `url` 이 `http://` 또는 `https://` 로 시작하는지 검사하기

```jsx
const targetUrls = [
  "http://example.com",
  "https://example.com",
  "http:/exaple.com",
  "https:example.com",
];

const urlRegexp = /^https?:\/\//;

for (const url of targetUrls) {
  console.log(urlRegexp.test(url));
}
```

숫자로만 이루어진 문자열인가 검사하기

```jsx
const numberStrs = ["안녕하세요11", "1234141", "010-1234-1234", "hello", "1"];

const numberRegexp = /^[0-9]+$/;
const numberRegexp2 = /^\d+$/;

console.log("숫자로만 이루어진 문자열인가 검사하기");
for (const numberStr of numberStrs) {
  console.log(numberRegexp.test(numberStr), "", numberRegexp2.test(numberStr));
}
```

휴대전화 번호 또는 지역번호 양식에 맞는지 검사

```jsx
// 휴대전화 번호 또는 지역번호 양식에 맞는지 검사
// ex) 010-1234-5678 또는 02-1234-5678 또는 042-123-5678 과 같은 양식이어야 한다.
const phoneNumbers = [
  "010-2334-5378",
  "02-3333-2342",
  "042-112-1231",
  "031-113-111",
  "010-1123",
];

const phoneRegexp = /\d{2,3}-\d{3,4}-\d{4}/;

for (const phoneNumber of phoneNumbers) {
  console.log(`${phoneNumber} : ${phoneRegexp.test(phoneNumber)}`);
}
```

**영문 대소문자 및 숫자로 이루어진 8자이상 20자 이하 문자열**

```jsx
const idRegexp1 = /^[a-zA-Z0-9]{8,20}$/;
```

이메일 형식 검사하기

```jsx
const mail = "mymail2@naver.com";
const mailRegexp =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

console.log(mailRegexp.test(mail));
```

최소 8자, 하나 이상의 문자와 하나의 숫자

```jsx
const muji = "muji1234";
const muji2 = "muuuuuuuji1";
const makji = "makji";
const regexp3 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
console.log(regexp3.test(muji));
console.log(regexp3.test(muji2));
console.log(regexp3.test(makji));
```
