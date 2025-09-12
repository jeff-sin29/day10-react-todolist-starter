import {TodoContext} from "../contexts/TodoContext"
import {useContext} from "react";
import "./TodoList.css";

const TodoList = () => {
    const value = useContext(TodoContext);
    const {state, dispatch} = value;

    function toggleDone(id){
      const action = {type: 'DONE', id};
      dispatch(action);
    }

    return(
        <div className={"todo-group"}>
            <div>This is the TodoList Component</div>
            {state.map(todo => {
                return <div className={`todo-item ${todo.done ? "done" : ""}`} onClick={() => toggleDone(todo.id)}>{todo.text}</div>
            })}
        </div>
    )
};

export default TodoList