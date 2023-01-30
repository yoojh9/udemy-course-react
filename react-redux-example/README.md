# React Redux Example

## 1) React Redux 사용하기

```
$ npm install redux react-redux @reduxjs/toolkit
```

<br>

### (1) 리액트 용 리덕스 스토어 만들기

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

<br>

### (2) 리액트 컴포넌트에 스토어 제공하기

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

<br>

### (3) 내부 컴포넌트에서 리덕스 데이터 사용하기

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

<br>

### (4) 내부 컴포넌트에서 Action Dispatch 하기

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

<br>

### (5) 작업에 payload 연결하기

-   https://github.com/yoojh9/udemy-course-react/commit/a915254803d1887026ee1da71079557e73385f5b

<br>

### (6) 여러 state 속성 작업하기

-   https://github.com/yoojh9/udemy-course-react/commit/3b6d5f7451d83918b6bcbb031dbe8b87cb4a8b44

<br>

### (7) 리덕스 State를 올바르게 사용하는 방법

-   아래 reducer 코드는 redux로 작업할 때 절대 작성하면 안된다

<br>

```javascript
const counterReducer = (state = initialState, action) => {
    if (action.type === "increment") {
        state.counter++;
        return state;
    }
};
```

<br>

-   "절대 기존의 state를 변경해서는 안된다." 이로 인해 예측 불가능한 버그가 발생할 수 있고, 프로그램 디버깅도 어려워질 수 있다.
-   대신에 새로운 state 객체를 반환하여 항상 재정의해야 햔다.

<br><br>

## 2) redux-toolkit 사용하기

-   리덕스를 더 편리하고 쉽게 작동할 수 있게 해준다.

<br>

```
$ npm install @reduxjs/toolkit
```

-   redux는 이미 @redux/toolkit에 포함되어 있으므로 더이상 redux 라이브러리는 필요하지 않으므로 package.json에서 삭제한다.

<br>

### (1) createSlice

-   createSlice를 사용하면 기존 state를 절대 바꿀 수 없다. 왜냐하면 reduxjs/toolkit은 내부적으로 immer라는 다른 패키지를 사용하는데 이런 코드르 감지하고 자동으로 원래 있는 상태를 복제하여 새로운 상태 객체를 생성한다.

-   그러므로 아래와 같이 작성할 수 있다.

<br>

```javascript
createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter += action.amount;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        },
    },
});
```

<br>

-   https://github.com/yoojh9/udemy-course-react/commit/79981e7400d00623cfc06d08849f610092a3b841#diff-474a9815fd233d252207393e20e4efe50f4328ba614607a3d347b1c5eff3e880

<br><br>

### (2) redux toolkit State 연결하기

-   configureStore는 여러개의 reducer를 하나의 reducer로 관리할 수 있다.
-   configureStore를 이용하면 여러 리듀서를 하나의 리듀서 맵으로 관리할 수 있다. 이는 모든 리듀서를 하나의 큰 리듀서로 병합해 준다.

<br>

```javascript
const store = configureStore({
    reducer: { counter: counterSlice.reducer },
});
```

<br><br>

### (3) redux toolkit으로 마이그레이션

-   counterSlice.actions를 export 시킨다.

<br>

```javascript
// store/index.js

import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter += action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        },
    },
});

const store = configureStore({
    reducer: counterSlice.reducer,
});

export const counterActions = counterSlice.actions;

export default store;
```

<br>

-   dispatch() 시 reducer의 action.type 대신 slice의 action을 이용한다.

```javascript
// component/Counter.js

import classes from "./Counter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../store";

const Counter = () => {
    const counter = useSelector((state) => state.counter);
    const show = useSelector((state) => state.showCounter);
    const dispatch = useDispatch();

    const incrementHandler = () => {
        dispatch(counterActions.increment());
    };

    const increasehandler = (amount) => {
        dispatch(counterActions.increase(10)); // {type: SOME_UNIQUE_IDENTIFIER, payload: 10}
    };

    const decrementHandler = () => {
        dispatch(counterActions.decrement());
    };

    const toggleCounterHandler = () => {
        dispatch(counterActions.toggleCounter());
    };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {show && <div className={classes.value}>{counter}</div>}
            <div>
                <button onClick={incrementHandler}>Increment</button>
                <button onClick={() => increasehandler(5)}>
                    Increase by 5
                </button>
                <button onClick={decrementHandler}>Decrement</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
```

<br>

-   https://github.com/yoojh9/udemy-course-react/commit/f9809751d215a7bec04f538f4d6ce255420944d7

<br>

### (4) 다중 Slice 작업하기

-   https://github.com/yoojh9/udemy-course-react/commit/87f0e96b136e0fad2974cfd8a4725e8d028b107b

<br>

### (5) 스토어 코드 분할하기

```javascript
// store/index.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import couterReducer from "./counter";

const store = configureStore({
    reducer: {
        counter: couterReducer,
        auth: authReducer,
    },
});

export default store;
```

<br>

```javascript
// store/counter.js
import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
    name: "counter",
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter += action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        },
    },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
```

<br>

```javascript
// store/auth.js

import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isAuthenticated: false };

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
    },
});
export const authActions = authSlice.actions;

export default authSlice.reducer;
```

<br>

-   https://github.com/yoojh9/udemy-course-react/commit/3620b3d473e06cac6a7cbf7cf160b8fee08b3859
