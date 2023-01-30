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
