import axios from "axios"

const instance = axios.create({
    baseURL: 'https://68c78ced5d8d9f5147322594.mockapi.io/api/'
})

export const getTodos = async () => {
    const response = await instance.get("/todos")
    return response
}

export const addTodo = async (todo) => {
    const response = await instance.post('/todos', todo)
    return response
}

export const deleteTodo = async (id) => {
    const response = await instance.delete(`/todos/${id}`);
    return response;
};

export const putTodo = async (id, done) =>{
    const response = await instance.put(`/todos/${id}`, {done});
    return response;
}