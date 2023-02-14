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
