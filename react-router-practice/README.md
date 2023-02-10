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

## 5) Quote Detail

-   https://github.com/yoojh9/udemy-course-react/commit/08a5c6cebcc6044be7e516d3e0155648a43c47e3

## 6) 404 페이지

```javascript
function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/quotes" />
                </Route>
                <Route path="/quotes" exact>
                    <AllQuotes />
                </Route>
                <Route path="/quotes/:quoteId">
                    <QuotesDetail />
                </Route>
                <Route path="/new-quotes">
                    <NewQuotes />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </Layout>
    );
}
```

## 7) 프로그래밍 방식의 Navigation

-   react-router-dom의 userHistory() 커스텀 훅을 사용한다.

<br>

```javascript
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";

const NewQuotes = () => {
    const history = useHistory();

    const addQuoteHandler = (quoteData) => {
        console.log(quoteData);
        history.replace("/quotes");
    };

    return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuotes;
```

<br>

## 8) 'Prompt' 컴포넌트를 사용하여 원치 않은 경로 전환 방지하기

-   Prompt 컴포넌트는 react-router-dom에서 제공하는 컴포넌트로 다른 화면으로 이동할 때 자동으로 그걸 감시한다. 그리고 특정 조건이 충족되면 떠나기 전에 경고를 표시해준다.
-   Prompt 컴포넌트는 두가지 prop이 필요하다. 사용자가 URL을 변경하는 경우 이 프롬프트가 표시되어야 하는지의 true 또는 false를 전달하는 when prop이 있어야 하고, message prop에는 보여주고 싶은 문자열을 넣는다.

<br>

```javascript
<Prompt
    when={isEntering}
    message={(location) =>
        "Are you sure you want to leave? All your entered data will be lost!"
    }
/>
```

<br>
