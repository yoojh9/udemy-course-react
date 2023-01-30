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
