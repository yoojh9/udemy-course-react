## 1. 새로운 리액트 앱 만들기

- create-react-app이라는 툴을 사용한다.
- https://create-react-app.dev/docs/getting-started

<br><br>

## 2. 표준 리액트 프로젝트 분석하기

### 1) SPA

- public/index.html 단일 HTML 파일이 브라우저에서 로딩되는데 오직 이 HTML 파일만이 React 애플리케이션에서 사용된다.
- Single Page Application에서는 한 개의 HTML 파일만 사용하고 그 외 웹 페이지상의 모든 사용자 인터페이스 관련 변경 사항은 React가 처리한다.
- <div id="root"> 영역에 React가 관리하는 사용자 인터페이스가 렌더링 된다.

```javascript
// index.js
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

<br>

### 2) App.js

- App 컴포넌트는 root라는 id를 갖는 요소가 있는 곳에 렌더링되는 컴포넌트이다.
- App 컴포넌트는 시작 파일인 index.js에서 렌더링 되는 루트 컴포넌트가 되고 그리고 모든 컴포넌트들은 App.js 안에 또는 다른 컴포넌트 안에 중첩된다.
- 그래서 리액트로 작업을 하면 컴포넌트 트리를 만들게 된다.
- 컴포넌트 트리에서 맨 위에 있는 <App/> 컴포넌트만이 ReactDom 렌더의 지시로 html 페이지에 직접 렌더링된다.

<br>

### 3) JSX

- 우리가 JSX 코드로 작성하면 자동적으로 브라우저에서 작동하는 코드로 변환된다.
- package.json에는 수많은 dependency들이 있다. 그것들은 대부분 화면 뒷단에 있는 변환(transformation)을 다루고 있다. 하지만 리액트와 관련있는 두 가지 dependency가 있는데 그것은 바로 react, react-dom이다.
- index.js에서는 react-dom을 import하지만 프로젝트 어디에서도 react는 임포트하지 않는다. react 모듈은 create-react-app에서 생성된 리액트 프로젝트 셋업 시 import 된다.

- JSX를 사용하지 않으면 이렇게 작성해야 한다.

```javascript
// App.js

return React.createElement(
  "div",
  {},
  React.createElement("h2", {}, "Let's get started!"),
  React.createElement(Expenses, { items: expenses })
);

// JSX

// return (
//     <div>
//         <h2>Let's get started!</h2>
//         <Expenses items={expenses} />
//     </div>
// );
```

<br><br>

## 3. 리액트 기초 및 실습

### 1) 컴포넌트

- 리액트로 작성된 컴포넌트는 단지 함수일 뿐이다. 리액트 컴포넌트는 단지 자바스크립트로 작성된 함수이다.
- 컴포넌트는 html 코드를 반환하는 함수일 뿐이다.
- JSX 코드로 컴포넌트를 사용할 때 컴포넌트는 반드시 대문자여야 한다. 리액트에서 소문자로 시작하는 element는 내장된 html요소이기 때문이다.
- 컴포넌트를 사용하는 이유는 Reusability, 그리고 Seperation of Concerns를 위함이다.

<br>

### 2) 컴포넌트 재사용

- 컴포넌트도 함수이므로 매개변수와 리액트의 props라는 개념을 사용해서 재사용 할 수 있다.
- 리액트는 모든 컴포넌트에서는 한 개의 매개변수 객체만을 사용한다. 그래서 전체적인 개념에 대해 props라는 이름을 붙였다.

<br>

### 3) props

- 하위 컴포넌트에 데이터를 전달하기 위해서는 props를 이용한다.

<br>

### 4) Composition

- props.children은 예약어로 컴포넌트 태그 사이에 있는 컴포넌트를 가져올 수 있다.
- 모달창이나 경고창과 같은 중복된 래퍼 컴포넌트를 추출하면 수많은 코드 중복을 피할 수 있게 해주고 다른 컴포넌트를 더 깔끔하게 유지할 수 있다.

```javascript
// ExpenseItem.js
function ExpenseItem(props) {
  return (
    <Card>
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </Card>
  );
}

export default ExpenseItem;

// Card.js
function Card(props) {
  const classes = "card " + props.className;

  return <div className={classes}>{props.children}</div>;
}
```

<br><br>

## 4. 리액트 State 및 이벤트 다루기

### 1) State

- 일부 변수가 변한다고 하더라도 전반적인 컴포넌트 함수는 다시 실행되지 않는다.
- useState()를 이용하여 state 변수를 생성하면 변수는 변경사항으로 인해 컴포넌트 함수가 다시 호출된다.
- useState() 리액트 훅을 컴포넌트 함수 안에서 직접적으로 호출한다.
- useState()는 항상 두 가지 요소의 배열을 반환한다. 첫번째 요소는 현재 상태 값이고 두번째 요소는 그것을 업데이트 하는 함수이다.
- 아래 Expenses 컴포넌트는 4개의 ExpenseItem 컴포넌트를 가지고 있다. 컴포넌트마다 새로운 별도의 state가 생성되며 리액트에 의해 독립적으로 관리된다. 즉 리액트는 state가 변경될 때 그 state가 존재하는 컴포넌트와 그 컴포넌트가 사용되고 있는 곳에 있는 특정 인스턴스만 리액트는 re-rendering 할 것이다.
- state는 컴포넌트의 인스턴스 별로 나누어져 있다.
- state가 없다면 사용자 인터페이스는 절대 바뀌지 않을 것이다. 


<br>

```javascript
const Expenses = (props) => {
    return (
        <div className="expenses">
            <ExpenseItem
                title={props.items[0].title}
                amount={props.items[0].amount}
                date={props.items[0].date}
            />
            <ExpenseItem
                title={props.items[1].title}
                amount={props.items[1].amount}
                date={props.items[1].date}
            />
            <ExpenseItem
                title={props.items[2].title}
                amount={props.items[2].amount}
                date={props.items[2].date}
            />
            <ExpenseItem
                title={props.items[3].title}
                amount={props.items[3].amount}
                date={props.items[3].date}
            />
        </div>
    );
};

export default Expenses;
```

<br><br>

### 2) 이전 State에 의존하는 State 업데이트

- state 변경 시 아래와 같이 하는 게 아니라 setState에 함수를 전달해야 한다. 이전 snapshot을 이용해 새로운 state의 스냅샷을 반환해야 한다.

<br>

```javascript
const [userInput, setUserInput] = useState();

setUserInput({...userInput, title: 'abc'}) // (1) X

setUserInput((prev) => {
  return {...prev, title: 'abc'}  // (2) O
})

```
<br>

- 대부분 위 경우 모두 괜찮지만 리액트가 상태 업데이트 스케줄을 갖고 있어서 바로 실행되지 않을 수 있다. 이론적으로 동시에 많은 상태 업데이트를 계획하고 있다면 (1)번과 같은 케이스는 오래되었거나 잘못된 상태 스냅샷에 의존할 수도 있게 된다. (2)번과 같은 방법은 리액트가 prev State가 가장 최신 상태의 스냅샷이라는 것과 항상 계획된 상태 업데이트를 염두에 두고 있다는 것을 보장한다. 
- 그래서 (2)번과 같은 방법은 항상 최신의 스냅샷에서 작업하도록 하는 좀 더 안전한 방법이다. 그래서 (2)번과 같은 함수 구문을 사용해야 한다.

<br><br>

### 3) 양방향 바인딩
- state를 이용하면 양방향 바인딩을 구현할 수 있다. 양방향 바인딩이랑 간단히 말해서 변경되는 입력값만 수신하는 것이 아니라 입력에 새로운 값을 다시 전달할 수도 있다는 것이다.
- 입력 요소에 기본 속성인 value를 추가하기만 하면 된다.

<br>

```html
<input type='text' value={enteredTitle} onChange={titleChangeHandler}>
```

<br>

- 상태를 업데이트하기 위해 입력에서 변경사항을 수신하는 것 뿐만 아니라 입력에 상태값을 다시 보내주기도 한다. 그래서 상태를 변경하면 입력도 변한다.
- 양방향 바인딩은 폼으로 작업할 때 유용하다. 예를 들면 폼 전송에 따라 사용자의 입력을 모으거나 변경할 수 있게 해주기 때문이다.