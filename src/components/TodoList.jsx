import {TodoContext} from "../contexts/TodoContext"
import {useContext, useState, useEffect} from "react";
import "./TodoList.css";
import {getTodos, deleteTodo, addTodo, putTodo, changeTaskName} from "../apis/api.js"
import TaskEditModal from "./TaskEditModal.jsx";

const TodoList = () => {
    const value = useContext(TodoContext);
    const {state, dispatch} = value;
    const [newTodo, setNewTodo] = useState("");
    const [editingTask, setEditingTask] = useState(null);

    async function toggleDone(todo){
        const response = await putTodo(todo.id, !todo.done);
        const action = {type: 'DONE', id: response.data.id};
        dispatch(action);
    }

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

    const handleEdit = async (id, newText) => {
        const response = await changeTaskName(id, newText);
        dispatch({ type: "EDIT", id: response.data.id, text: response.data.text });
    };

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
              {typeof todo.text === 'object' ? todo.text.text : todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)}>X</button>
            <button onClick={() => setEditingTask(todo)}>Edit</button>
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
      {editingTask && (
        <TaskEditModal
          visible={!!editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleEdit}
          task={editingTask}
        />
      )}
    </div>

    )
};

export default TodoList