import { useState } from "react";
import "./App.css";
import NewTodo from "./components/NewTodo";
import Todos from "./components/Todos";
import Todo from "./models/todo";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (todoText: string) => {
        const newToDo = new Todo(todoText);
        setTodos((prev) => prev.concat(newToDo));
    };

    const removeTodoHandler = (todoId: string) => {
        const filteredTodos = todos.filter((todo) => todo.id !== todoId);
        setTodos(filteredTodos);
    };

    return (
        <div className="App">
            <NewTodo onAddTodo={addTodoHandler} />
            <Todos items={todos} onRemoveTodo={removeTodoHandler} />
        </div>
    );
}

export default App;
