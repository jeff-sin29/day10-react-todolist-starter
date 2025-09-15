import {TodoContext} from "../contexts/TodoContext"
import {useContext, useState, useEffect} from "react";
import "./TodoList.css";
import {getTodos, deleteTodo, addTodo, putTodo} from "../apis/api.js"

const TodoList = () => {
    const value = useContext(TodoContext);
    const {state, dispatch} = value;
    const [newTodo, setNewTodo] = useState("");

    async function toggleDone(todo){
        const response = await putTodo(todo.id, !todo.done);
        const action = {type: 'DONE', id: response.data.id};
        dispatch(action);
    }

    // function deleteTodo(id) {
    //     const action = { type: "DELETE", id: id };
    //     dispatch(action);
    // }

    // function addTodo() {
    //     if (newTodo.trim()) {
    //         const action = { type: "ADD", text: newTodo };
    //         dispatch(action);
    //         setNewTodo("");
    //     }
    // }

    useEffect(() => {
        getTodos().then(response => {
            dispatch({type: 'LOAD_TODOS', todos: response.data})
        })
    }, [dispatch])

    const handleSubmit = async () => {
        if (newTodo && newTodo.trim()) {
            const newTodoItem = { text: newTodo.trim(), done: false };
            const response = await addTodo(newTodoItem);
            dispatch({type: 'ADD', todo: response.data});
            setNewTodo("");
        }
    }

    const handleDelete = async (id) => {
        const response = await deleteTodo(id);
        dispatch({ type: "DELETE", id: response.data.id });
    }

    return(
        <div className="todo-group">
      <h2>Todo List</h2>
      {state.length === 0 ? (
        <p>Add the things you need to do today...</p>
      ) : (
        state.map((todo) => (
          <div key={todo.id} className="todo-item">
            <span
              className={todo.done ? "done" : ""}
              onClick={() => toggleDone(todo)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)}>X</button>
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
        <button onClick={handleSubmit}>add</button>
      </div>
    </div>
    )
};

export default TodoList