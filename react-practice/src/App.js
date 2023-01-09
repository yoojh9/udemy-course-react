import { useState } from "react";
import "./App.css";
import AddUser from "./components/Users/AddUser";
import UserList from "./components/UserList";

function App() {
    const [usersList, setUsersList] = useState([]);

    const addUserHandler = (name, age) => {
        setUsersList((prev) => [
            ...prev,
            { name, age, id: Math.random().toString() },
        ]);
    };

    return (
        <div>
            <AddUser onAddUser={addUserHandler} />
            <UserList users={usersList} />
        </div>
    );
}

export default App;
