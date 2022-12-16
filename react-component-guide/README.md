## 1. 새로운 리액트 앱 만들기

-   create-react-app이라는 툴을 사용한다.
-   https://create-react-app.dev/docs/getting-started

<br><br>

## 2. 표준 리액트 프로젝트 분석하기

### 1) SPA

-   public/index.html 단일 HTML 파일이 브라우저에서 로딩되는데 오직 이 HTML 파일만이 React 애플리케이션에서 사용된다.
-   Single Page Application에서는 한 개의 HTML 파일만 사용하고 그 외 웹 페이지상의 모든 사용자 인터페이스 관련 변경 사항은 React가 처리한다.
-   <div id="root"> 영역에 React가 관리하는 사용자 인터페이스가 렌더링 된다.

```javascript
// index.js
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

<br>

### 2) App.js

-   App 컴포넌트는 root라는 id를 갖는 요소가 있는 곳에 렌더링되는 컴포넌트이다.
-   App 컴포넌트는 시작 파일인 index.js에서 렌더링 되는 루트 컴포넌트가 되고 그리고 모든 컴포넌트들은 App.js 안에 또는 다른 컴포넌트 안에 중첩된다.
-   그래서 리액트로 작업을 하면 컴포넌트 트리를 만들게 된다.
-   컴포넌트 트리에서 맨 위에 있는 <App/> 컴포넌트만이 ReactDom 렌더의 지시로 html 페이지에 직접 렌더링된다.

<br>

### 3) JSX

-   우리가 JSX 코드로 작성하면 자동적으로 브라우저에서 작동하는 코드로 변환된다.

<br><br>

## 3. 리액트 기초 및 실습

### 1) 컴포넌트

-   리액트로 작성된 컴포넌트는 단지 함수일 뿐이다. 리액트 컴포넌트는 단지 자바스크립트로 작성된 함수이다.
-   컴포넌트는 html 코드를 반환하는 함수일 뿐이다.
-   JSX 코드로 컴포넌트를 사용할 때 컴포넌트는 반드시 대문자여야 한다. 리액트에서 소문자로 시작하는 element는 내장된 html요소이기 때문이다.
-   컴포넌트를 사용하는 이유는 Reusability, 그리고 Seperation of Concerns를 위함이다.

<br>

### 2) 컴포넌트 재사용

-   컴포넌트도 함수이므로 매개변수와 리액트의 props라는 개념을 사용해서 재사용 할 수 있다.
-   리액트는 모든 컴포넌트에서는 한 개의 매개변수 객체만을 사용한다. 그래서 전체적인 개념에 대해 props라는 이름을 붙였다.
