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