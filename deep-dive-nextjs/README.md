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

## 6) 정적 페이지에 대한 데이터 가져오기

### (1) 정적 생성(Static Generation)
-   정적 생성에서 페이지 컴포넌트가 사전 렌더링 되는 시점은 애플리케이션을 빌드할 때, 즉 프로덕션 용으로 빌드하는 시점이다. 
-   정적 생성에서는 기본적으로 요청이 서버에 도달했을 때 서버에서 즉각적으로 페이지를 사전 렌더링 하지 않는다. 대신에 개발자가 사이트를 빌드할 때 사전 렌더링한다. 즉 사이트가 배포되고 나면 사전 렌더링한 페이지는 변경되지 않는다는 뜻이다.
-   데이터를 업데이트 했는데 사전 렌더링 한 페이지를 변경해야 한다면 해당 빌드 프로세스를 다시 실행하고 다시 배포해야 한다.
-   페이지 컴포넌트에 데이터를 fetch해서 추가해야 한다면 페이지 컴포넌트 파일 안에서 "getStaticProps"이라는 이름의 특수 함수를 export로 내보내면 된다.
-   NextJS는 사전 렌더링 프로세스 중에 getStaticProps라는 함수를 찾으면 그 함수를 실행한다. 컴포넌트 함수를 호출하기 전에 getStaticProps 함수를 호출한다. getStaticProps라는 함수 이름에서 알 수 있듯이 이 함수는 실제로 이 페이지에서 사용할 props를 준비한다. 이 props는 페이지에서 필요한 데이터를 포함할 수 있다. 또한 getStaticProps는 비동기적으로 설정할 수 있고 Promise를 반환할 수 있어서 유용하다. NextJS는 Promise가 해결될 때까지 기다린다. (다시 말하면 데이터를 읽어 들일 때까지) 그 다음에 컴포넌트 함수에서 사용할 props를 반환한다.
-   이렇게 하면 컴포넌트 함수가 실행되기 전에 데이터를 읽어 들일 수 있어서 이 컴포넌트를 필요한 데이터와 함께 렌더링 할 수 있다.
-   getStaticProps 내부의 코드는 클라이언트 side에 들어가지 않기 때문에 클라이언트 side에서 절대 실행되지 않는다. 따라서 getStaticProps의 코드는 절대 방문자의 컴퓨터에 도달하지 못한다. 
-   getStaticProps에는 API나 데이터베이스에서 데이터를 가져오거나 파일 시스템의 일부 파일에서 데이터를 읽어올 수 있다.
<br>

```javascript
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

const HomePage = (props) => {

  return (
    <MeetupList meetups={props.meetups}/>
  )
}

export const getStaticProps = async () => {
  // fetch data from an API
  return {
    props: {
      meetups: DUMMY_MEETUPS
    }
  }
}

export default HomePage;
```

<br>

-   이제 페이지 소스를 보면 비어있던 리스트는 보이지 않고 이미지, 제목 등이 들어있는 항목들이 리스트에 있는 것을 확인할 수 있다. 당연히 검색엔진에도 좋다. 
-   이제 클라이언트 측 컴포넌트의 두 번째 렌더링 사이클에서 데이터를 받는 것이 아니라 초기에 이 페이지를 사전 렌더링하기 전에 빌드 프로세스에서 받게 된다.
-   https://github.com/yoojh9/udemy-course-react/commit/870657770ac5ca761b09ec88bc03cda55725cac9

<br>

```javascript
export const getStaticProps = async () => {
  // fetch data from an API
  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate: 10
  }
}
```

<br>

- revalidate는 이 페이지에 요청이 들어오면 적어도 10초마다 서버에서 페이지를 다시 생성하라는 의미이다. 새로 렌더링 된 페이지는 생성했던 오래된 페이지를 대체한다.

### (2) Server-side Rendering
