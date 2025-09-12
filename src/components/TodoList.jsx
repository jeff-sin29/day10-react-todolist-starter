import {TodoContext} from "../contexts/TodoContext"
import {useContext} from "react";

const TodoList = () => {
    const value = useContext(TodoContext);
    const {state, dispatch} = value;

    return(
        <div>
            <div>This is the TodoList Component</div>
            {state.map(todo => {
                <div>{todo.text}</div>
            })}
        </div>
    )
};

export default TodoList