# Deep Dive NextJS

## 1) Meetup 목록 출력하기
-   https://github.com/yoojh9/udemy-course-react/commit/54f882c90cfedbf85bd452d43585515137de5207

<br><br>

## 2) 새 Meetup 양식 추가하기
-   https://github.com/yoojh9/udemy-course-react/commit/166bc2967fdb7acef5a29f624ab0addfafcbdd89

<br><br>

## 3) "_app.js" 파일 및 레이아웃 감싸기

<br>

```javascript
// _app.js
import '../styles/globals.css'
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout> 
}

export default MyApp
```

<br><br>

## 4) 프로그래밍 방식 navigate 사용하기
-   next/link \<Link\> 컴포넌트와 동일한 역할을 하도록 프로그래밍 방식으로 navigate를 추가할 수 있다.
-   next/router의 useRouter()를 사용하여 push() 메소드를 호출한다.

<br>

```javascript
import { useRouter } from 'next/router'

function MeetupItem(props) {
  const router = useRouter();

  const showDetailHandler = () => {
    router.push(`/${props.id}`) // Link 컴포넌트 대신
  }

  return <></>;
}
```