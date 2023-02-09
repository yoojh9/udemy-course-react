# React Router

## 1) Building SPAs

-   사용자가 웹 사이트를 처음 방문할 때 페이지는 하나이며, 자바스크립트를 사용하여 도메인 뒤에 URL과 해당 경로를 조작할 수 있다.
-   또한 URL이 변경되어도 기존 서버렌더링처럼 새 HTML 파일을 가져오지 않고 링크를 클릭할 때 화면에 표시되는 내용을 변경하는 클라이언트 사이드(React Code)를 사용한다.
-   실제로 새 HTML 파일에 대한 요청을 서버에 보내지 않고 리액트가 포함된 클라이언트 사이드 javascript로 화면에 표시되는 내용을 업데이트 한다.

<br><br>

## 2) React Router 설치하기

-   클라이언트 사이드 라우팅을 지원하는 React Router 패키지를 설치한다.
-   라우팅이란 서로 다른 URL, 즉 URL의 여러 경로로 서로 다른 페이지를 로드할 수 있는 기능이다.

<br>

```javascript
$ npm install react-router-dom@5
```

<br><br>

## 3) React Router 사용하기

-   index.js파일에 <App> 컴포넌트를 <BrowserRouter>가 래핑하도록 추가한다.

<br>

```javascript
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
```

<br>

-   App.js에 라우터를 추가해보자

<br>

```javascript
import { Route } from "react-router-dom";
import Products from "./pages/Products";
import Welcome from "./pages/Welcome";

function App() {
    return (
        <div>
            <Route path="/welcome">
                <Welcome />
            </Route>
            <Route path="/products">
                <Products />
            </Route>
        </div>
    );
}

export default App;
```

<br><br>

## 4) \<Link\> 사용하기

-   react-router-dom 의 \<Link/\> 컴포넌트를 이용하면 \<a> 태그의 href와 다르게 화면 전체가 새로고침 되지 않는다. \<Link\> 태그는 같은 페이지 안에 머물게 하고, React 어플리케이션이 전체 페이지를 re-render 하지 않게 하고 변경되는 컴포넌트만 렌더한다. 이는 네비게이션을 좀 더 빠르고 부드럽게 처리되도록 만들어준다.
-   반면 \<a\> 태그의 href는 전체 페이지를 reload 하고 네비게이션 성능이 느려질 수 있다.

<br>

```javascript
// Mainheader.js

import { Link } from "react-router-dom";

const Mainheader = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/welcome">Welcome</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Mainheader;
```

<br><br>

## 5) \<NavLink\> 사용하기

-   \<NavLink\>는 \<Link\>의 더 개선된 버전으로 'activeClassName' prop 등을 더 사용할 수 있어 active 라우트와 inactive 라우트를 더 구별하기 쉽게 해준다.

<br>

```javascript
import { NavLink } from "react-router-dom";
import classes from "./Mainheader.module.css";

const Mainheader = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <NavLink activeClassName={classes.active} to="/welcome">
                            Welcome
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName={classes.active}
                            to="/products"
                        >
                            Products
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Mainheader;
```

<br><br>

## 6) Params를 사용하여 동적 경로 추가하기
