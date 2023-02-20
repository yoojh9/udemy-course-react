# 리액트 앱 배포하기

## 1) Deployment Steps
-   Test Code
-   Optimize Code
-   Build App for Production
-   Upload Production Code to Server
-   Configure Server

<br><br>

## 2) Lazy Loading
-   레이지 로딩은 해당 코드가 필요할 때만 그 특정 코드를 로딩하는 것이다. React 싱글 페이지 애플리케이션을 사용하면 결국 큰 자바스크립트 코드 번들을 빌드하게 되고 해당 사이트를 사용하려면 웹 사이트의 모든 방문자가 이 전체 번들을 다운로드 해야 한다.
-   즉, 우리 웹사이트 방문자는 코드가 다운로드 될 때까지 기다려야 한다. 따라서 다운로드 되는 이 초기 코드 번들을 가능한 한 작게 만들어야 한다.
-   코드를 여러 덩어리로, 여러 번들로 나누고 각각 필요할 때만 다운로드 하는 것이 이 개념의 핵심이다. 
-   라우팅을 사용하는 경우 해당 라우트를 방문할 때만 다운로드 되도록 할 수 있다.


-   React.lazy()를 통해 코드가 필요할 때만 다운로드 할 수 있다. 코드가 로딩되는데 시간이 조금 더 오래 걸리는 경우 <Suspense> 내의 <LoadingSpinner>가 fallback으로 전달된다.

<br>


```javascript
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from './components/UI/LoadingSpinner';
import QuotesDetail from "./pages/QuotesDetail";

const NewQuotes = React.lazy(() => import('./pages/NewQuotes'));
const QuotesDetail = React.lazy(()=> import ("./pages/QuotesDetail"));
const NotFound = React.lazy(()=> import("./pages/NotFound"));

function App() {
    return (
        <Layout>
            <Suspense fallback={
                <div className='centered'>
                    <LoadingSpinner/>
                </div>
            }>
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
            </Suspense>
        </Layout>
    );
}

export default App;
```

<br>

-   사용자가 이 페이지를 방문할 것이라고 생각된다면 lazyLoading은 불필요하다. 물론 선택 사항이겠지만, 페이지가 많고 각 페이지에 많은 컴포넌트와 많은 복잡한 로직이 붙어있는 애플리케이션에서는 레이지 로딩이 진가를 발휘한다. 웹사이트의 초기 로딩을 훨씬 빠르게 만들어준다.