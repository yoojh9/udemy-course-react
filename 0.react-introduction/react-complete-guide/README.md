## 1. 표준 리액트 프로젝트 분석하기

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

<br>

### 3) JSX

-   우리가 JSX 코드로 작성하면 자동적으로 브라우저에서 작동하는 코드로 변환된다.
