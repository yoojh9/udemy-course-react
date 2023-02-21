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

<br><br>

## 5) 사전 렌더링 작동 방식 및 우리가 직면한 문제
-   useEffect()는 컴포넌트 함수가 실행되고 난 '이후'에 실행되는 방식으로 작동된다.

<br>

```javascript
import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!'
  }
]

const HomePage = () => {
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(()=>{
    // send a http request and fetch data
    setLoadedMeetups(DUMMY_MEETUPS);
  },[])

  return (
    <MeetupList meetups={loadedMeetups}/>
  )
}

export default HomePage;
```

<br>

-   즉, 위 코드에서 컴포넌트는 두번 렌더링 되는데 첫번째는 loadedMeetups가 [] 빈 배열일 때 렌더링 되고, 두번째는 useEffect()에 의해 loadedMeetups 상태값이 업데이트 된 이후에 컴포넌트 함수가 다시 실행된다. 이렇게 컴포넌트 렌더링은 두 번 일어난다.
-   이 두번의 렌더링 사이클 때문에 검색 엔진 최적화에 문제가 생긴다. 위 코드에 들어있는 Meetups 배열은 HTML 콘텐츠에 들어있지 않다. HTML 코드에 들어있지 않은 이유는 그것들이 두번째 컴포넌트 실행 사이클에서만 렌더링 되기 때문이다. 하지만 NextJS가 자동으로 생성하는 사전 렌더링 된 페이지는 이 두번째 사이클을 기다리지 않는다. 언제나 첫 번째 렌더링 사이클의 결과를 가져와서 사전 렌더링한 HTML 코드를 반환한다. 거기에는 Meetups 데이터는 없다.
-   NextJS는 가져올 데이터를 기다리지 않고 완전히 사전 렌더링 된 페이지를 반환한다. 그러면 첫 번째 렌더링 사이클의 결과만을 반환하게 된다. 그건 완전히 빈 페이지다.

<br><br>