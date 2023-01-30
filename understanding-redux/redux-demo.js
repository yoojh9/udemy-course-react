const redux = require("redux");
const { configureStore } = require("@reduxjs/toolkit");

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

// const store = redux.createStore() // legacy
const store = configureStore({
    reducer: counterReducer,
});

const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
};

// 리덕스는 데이터 저장소가 변경될 때마다 couterSubscriber()를 실행시켜 준다.
store.subscribe(counterSubscriber);

store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
