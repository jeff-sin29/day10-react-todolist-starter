import {TodoContext} from "../contexts/TodoContext"
import {useContext, useState} from "react";
import "./TodoList.css";

const TodoList = () => {
    const value = useContext(TodoContext);
    const {state, dispatch} = value;
    const [newTodo, setNewTodo] = useState("");

    function toggleDone(id){
      const action = {type: 'DONE', id};
      dispatch(action);
    }

    function deleteTodo(id) {
        const action = { type: "DELETE", id };
        dispatch(action);
    }

    function addTodo() {
        if (newTodo.trim()) {
        const action = { type: "ADD", text: newTodo };
        dispatch(action);
        setNewTodo("");
        }
    }

    return(
        <div className="todo-group">
      <h2>Todo List</h2>
      {state.length === 0 ? (
        <p>Add the things you need to do today...</p>
      ) : (
        state.map((todo) => (
          <div key={todo.id} >
            <span className={`todo-item ${todo.done ? "done" : ""}`} 
                onClick={() => toggleDone(todo.id)}>{todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>X</button>
          </div>
        ))
      )}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={addTodo}>add</button>
      </div>
    </div>
    )
};

export default TodoList