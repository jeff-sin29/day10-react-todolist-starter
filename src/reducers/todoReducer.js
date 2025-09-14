export const initialState = [
  {id: 1, text: "the first todo", done: false},
  {id: 2, text: "the second todo", done: false},
];

// reducer is a pure function that define and gather all state update logic
export const todoReducer = (state, action) => {
  // const obj = {a,b,c}
  switch (action.type) {
    case 'DONE':
      return state.map(todo => {
        if (action.id === todo.id) {
          const done = !todo.done;
          return {...todo, done};
        }
        return todo;
      });
    case 'DELETE':
      return state.filter(todo => todo.id !== action.id);
    case 'ADD':
      const nextId = state.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
      const newTodo = { id: nextId, text: action.text, done: false };
      return [...state, newTodo];
    default:
      return state;
  }
};
