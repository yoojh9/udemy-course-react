# React Router Practice

## 1) 라우팅 설정

-   https://github.com/yoojh9/udemy-course-react/commit/505fd28a1d87d12b0c11cbd09d155ec419992204

## 2) 매개변수 추출 및 리다이렉션

-   https://github.com/yoojh9/udemy-course-react/commit/fd19fe54279e43f9cc5bd13f203deaec4fce8ec1

## 3) Nested Route 사용하기

-   https://github.com/yoojh9/udemy-course-react/commit/474ec82344afb29be2185d2a142d02ac12a70217

```javascript
import { Route, useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
const QuotesDetail = () => {
    const params = useParams();
    return (
        <>
            <h1>Quote Detail Page</h1>
            <p>{params.quoteId}</p>
            <Route exact path={`/quotes/${params.quoteId}/comments`}>
                <Comments />
            </Route>
        </>
    );
};

export default QuotesDetail;
```

<br>

## 4) 레이아웃 Wrapper 컴포넌트 추가하기

-   https://github.com/yoojh9/udemy-course-react/commit/93ed80ab7e4d235b31c614f5fa319fe36f0b803f

<br>
