import Todo from "../models/todo";
import TodoItem from "./TodoItem";
import classes from "./Todos.module.css";
import { TodosContext } from "../store/todos-context";
import { useContext } from "react";

const Todos: React.FC = () => {
    const todoCtx = useContext(TodosContext);

    return (
        <ul className={classes.todos}>
            {todoCtx.items.map((item) => (
                <TodoItem
                    key={item.id}
                    text={item.text}
                    onRemoveTodo={todoCtx.removeTodo.bind(null, item.id)}
                />
            ))}
        </ul>
    );
};

export default Todos;
