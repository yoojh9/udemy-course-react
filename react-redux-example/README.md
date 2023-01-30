# React Redux Example

## 1) React Redux 사용하기

```
$ npm install redux react-redux @redux/toolkit
```

<br><br>

## 2) 리액트 용 리덕스 스토어 만들기

```javascript
// store/index.js
import { configureStore } from "@reduxjs/toolkit";

const counterReducer = (state = { counter: 0 }, action) => {
    if (action.type === "increment") {
        return {
            counter: state.counter + 1,
        };
    }
    if (action.type === "decrement") {
        return {
            counter: state.counter - 1,
        };
    }

    return state;
};

const store = configureStore({
    reducer: counterReducer,
});

export default store;
```

<br><br>

## 3) 리액트 컴포넌트에 스토어 제공하기

```javascript
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
```

<br><br>

## 4) 내부 컴포넌트에서 리덕스 데이터 사용하기

-   Counter 컴포넌트에서 리덕스 스토어를 활용하려면 react-redux 만든 커스텀 훅인 useSelector()를 사용한다.
-   useSelector()를 사용하면 react-redux는 이 컴포넌트를 위해 리덕스 저장소에 자동으로 구독을 설정한다. 그래서 컴포넌트는 리덕스 저장소에서 데이터가 변경될 때마다 자동으로 업데이트 되고 최신 카운터를 받게 된다.
-   이 컴포넌트가 제거되거나 DOM에서 제거되면 react-redux도 자동으로 구독을 해지할 것이다.

<br>

```javascript
import classes from "./Counter.module.css";
import { useSelector } from "react-redux";

const Counter = () => {
    const counter = useSelector((state) => state.counter);
    const toggleCounterHandler = () => {};

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            <div className={classes.value}>{counter}</div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
```

<br><br>

## 5) 내부 컴포넌트에서 Action Dispatch 하기

-   useDispatch() 훅을 사용한다.

<br>

```javascript
import classes from "./Counter.module.css";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
    const counter = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    const incrementHandler = () => {
        dispatch({ type: "increment" });
    };

    const decrementHandler = () => {
        dispatch({ type: "decrement" });
    };

    const toggleCounterHandler = () => {};

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            <div className={classes.value}>{counter}</div>
            <div>
                <button onClick={incrementHandler}>Increment</button>
                <button onClick={decrementHandler}>Decrement</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
```

<br><br>
