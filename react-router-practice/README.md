# React Router Practice

## 1) 라우팅 설정

-   https://github.com/yoojh9/udemy-course-react/commit/505fd28a1d87d12b0c11cbd09d155ec419992204

## 2) 매개변수 추출 및 리다이렉션

-   https://github.com/yoojh9/udemy-course-react/commit/fd19fe54279e43f9cc5bd13f203deaec4fce8ec1

## 3) Nested Route 사용하기

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
