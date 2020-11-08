import {
  ADD_TODO, UPDATE_TODO, REMOVE_TODO,CLEAR_ERROR,SHOW_ERROR, SHOW_LOADER, HIDE_LOADER, FETCH_TODO
} from "./types";
const handlers = {
  [ADD_TODO]: (state, { title, id }) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id,
        title
      },
    ],
  }),
  [UPDATE_TODO]: (state, { id, title }) => ({
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    }),
  }),
  [REMOVE_TODO]: (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  }),
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [HIDE_LOADER]: (state) => ({ ...state, loading: false }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: null }),
  [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  [FETCH_TODO]: (state, { todos }) => ({ ...state, todos }),
  DEFAULT: (state) => state,
};
export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

//first
//  switch (action.type) {
//   case ADD_TODO:
//     return {...state, todos: [...state.todos, {
//       id: Date.now().toString(),
//       title: action.title
//     }]}
//   case UPDATE_TODO:
//     return {...state, todos:state.todos.map(todo=>{
//         if (todo.id===action.id){
//             todo.title=action.title
//         }
//         return todo
//     })}
//   case REMOVE_TODO:
//     return {...state, todos: state.todos.filter(todo=>todo.id!==action.id)};
//   default:
//     return state;
// }
