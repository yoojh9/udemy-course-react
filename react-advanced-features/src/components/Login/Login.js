import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// 이 Reducer 함수는 컴포넌트의 어느 데이터도 필요로 않으므로 컴포넌트 외부에 생성
const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.includes("@") };
    }
    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.includes("@") };
    }
    return { value: "", isValid: false };
};

const Login = (props) => {
    //const [enteredEmail, setEnteredEmail] = useState("");
    // const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState("");
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: "",
        isValid: null,
    });
    // useEffect(() => {
    //     const identifier = setTimeout(() => {
    //         setFormIsValid(
    //             enteredEmail.includes("@") && enteredPassword.trim().length > 6
    //         );
    //     }, 500);

    //     return () => {
    //         clearTimeout(identifier); // 이렇게 하면 클린업 함수가 실행될 때마다 클린업 함수가 실행되기 전에 설정된 타이머를 지운다.
    //         console.log("CLEANUP");
    //     };
    // }, [enteredEmail, enteredPassword]);

    const emailChangeHandler = (event) => {
        //setEnteredEmail(event.target.value);
        dispatchEmail({ type: "USER_INPUT", val: event.target.value });
        setFormIsValid(
            event.target.value.includes("@") &&
                enteredPassword.trim().length > 6
        );
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
        setFormIsValid(
            emailState.isValid && event.target.value.trim().length > 6
        );
    };

    const validateEmailHandler = () => {
        //setEmailIsValid(emailState.isValid);
        dispatchEmail({ type: "INPUT_BLUR" });
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, enteredPassword);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ""
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordIsValid === false ? classes.invalid : ""
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button
                        type="submit"
                        className={classes.btn}
                        disabled={!formIsValid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
