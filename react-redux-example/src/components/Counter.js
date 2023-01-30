import classes from "./Counter.module.css";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
    const counter = useSelector((state) => state.counter);
    const show = useSelector((state) => state.showCounter);
    const dispatch = useDispatch();

    const incrementHandler = () => {
        dispatch({ type: "increment" });
    };

    const increasehandler = (amount) => {
        dispatch({ type: "increase", amount });
    };

    const decrementHandler = () => {
        dispatch({ type: "decrement" });
    };

    const toggleCounterHandler = () => {
        dispatch({ type: "toggle" });
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
