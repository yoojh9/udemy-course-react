# Better Fetching Data with React Router v6.4

- React Router v6.4에 React에서 Fetching과 Submission을 간소화하는 주요 기능이 추가 됨.

<br>

```bash
$ npm install react-router-dom@6.4
```

### 1) getPosts() fetch 코드 간소화

- https://github.com/yoojh9/udemy-course-react/commit/d493dda90debc34af0d62b5265b2dd79d68ec8ec


<br><br>

### 2) getPost() fetch 코드 간소화
- https://github.com/yoojh9/udemy-course-react/commit/118a351b234a3a27203375d69f83448e0af5dc66

<br><br>

### 3) error 처리
- 오류 상태를 수동으로 추적하는 대신 data fetch를 수행하는 라우트에 errorElement 프로퍼티를 추가한다.
- useRouteError() 훅을 이용하여 발생한 error의 데이터에 접근할 수 있다.
- https://github.com/yoojh9/udemy-course-react/commit/5a12a1bf15a35856302a2b4debcf914507cd87b5

<br><br>

## 4) submit 코드 간소화
- \<form\> 대신 react-router-dom의 \<Form\>을 이용한다.
- useActionData() 훅을 사용한다
- https://github.com/yoojh9/udemy-course-react/commit/4cc90d49589102231b913f923b81845dcb5ce1fb

<br><br>

## 5) useNavigation() 
- Navigation 정보 일부를 사용할 수 있다.
- navigation 객체 내 state에는 idle, loading, submitting 등이 있다. 만약 navigation.state === 'submitting'이라면, 즉 action 함수가 submit 작업을 수행하는 중인지 체크할 수 있다.
- 즉 useNavigation은 action 함수나 loader 함수가 현재 수행 중인 작업에 대한 정보를 제공한다.

<br><br>


## 6) defer

- defer({ posts: await getSlowPosts() }) 일 경우에는 데이터가 로드 되고 나서 페이지를 보여주고, defer({ posts: getSlowPosts() }) 코드는 페이지가 먼저 로드 되고 나서 데이터를 받아온다.

<br>

```javascript
import { Suspense } from 'react';
import { defer, useLoaderData, Await } from 'react-router-dom';

import Posts from '../components/Posts';
import { getSlowPosts } from '../util/api';

function DeferredBlogPostsPage() {
  const loaderData = useLoaderData();

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Suspense fallback={<p>Loading...</p>}> 
        <Await resolve={loaderData.posts} errorElement={<p>Error loading posts.</p>}>
          {(loadedPosts) => <Posts blogPosts={loadedPosts} />}
        </Await>
      </Suspense>
    </>
  );
}

export default DeferredBlogPostsPage;

export async function loader() {
  return  defer({posts: getSlowPosts()});
}
```
