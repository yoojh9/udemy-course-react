import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./AddUser.module.css";

const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredAge, setEnteredAge] = useState("");

    const addUserHandler = (event) => {
        event.preventDefault();
        if (
            enteredUsername.trim().length === 0 ||
            enteredAge.trim().length === 0
        ) {
            return;
        }
        if (+enteredAge < 1) {
            return;
        }
        props.addUser(enteredUsername, enteredAge);
        setEnteredUsername("");
        setEnteredAge("");
    };

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    };

    return (
        // Card라는 사용자가 직접 만든 component에 className을 사용하면 jsx의 className 프로퍼티를 사용하는게 아니라 props로 인식이 된다.
        <Card className={styles.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={enteredUsername}
                    onChange={usernameChangeHandler}
                ></input>
                <label htmlFor="age">Age (Years)</label>
                <input
                    id="age"
                    type="number"
                    value={enteredAge}
                    onChange={ageChangeHandler}
                ></input>
                <Button type="submit">Add User</Button>
            </form>
        </Card>
    );
};

export default AddUser;
