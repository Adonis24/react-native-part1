import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { ScreenContext } from "../../screen/screenContext";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  UPDATE_TODO,
  FETCH_TODO,
} from "./types";
import {Http} from '../../http'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const addTodo = async (title) => {
    // const response = await fetch(
    //   "https://rn-todo-app-31695.firebaseio.com/todos.json",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ title }),
    //   }
    // );
    // const data = await response.json();
    const data = await Http.post('https://rn-todo-app-31695.firebaseio.com/todos.json', {title})
    dispatch({ type: ADD_TODO, title, id: data.name });
  };
  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert(
      "Удаление элемента",
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          style: "destructive",
          onPress: async () => {
            clearError();
            try {
              // await fetch(
              //   `https://rn-todo-app-31695.firebaseio.com/todos/${id}.json`,
              //   {
              //     method: "DELETE",
              //     headers: { "Content-Type": "application/json" },
              //   }
              // );
              await Http.delete(`https://rn-todo-app-31695.firebaseio.com/todos/${id}.json`)
            changeScreen(null);
            dispatch({ type: REMOVE_TODO, id });
          } catch(e){
            showError('Что-то пошло не так!')
          }
         } 
        }
      ],
      { cancelable: false }
    );
  };
  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      // const response = await fetch(
      //   "https://rn-todo-app-31695.firebaseio.com/todos.json",
      //   {
      //     method: "GET",
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );
      // const data = await response.json();
      const data = await Http.get("https://rn-todo-app-31695.firebaseio.com/todos.json")
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));
     // setTimeout(() => dispatch({ type: FETCH_TODO, todos }), 5000);
     dispatch({ type: FETCH_TODO, todos })
    } catch (err) {
      showError('Что-то пошло не так!')
      console.log(err)
    }
    finally {
 
    hideLoader();
    }
  };

  const updateTodo = async (id, title) => {
    clearError()
    try {
      // await fetch(
      //   `https://rn-todo-app-31695.firebaseio.com/todos/${id}.json`,
      //   {
      //     method: "PATCH",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ title })})
      await Http.patch(`https://rn-todo-app-31695.firebaseio.com/todos/${id}.json`,{title})
        
  dispatch({ type: UPDATE_TODO, id, title });}
  catch(e) {
    showError("Что-то пошло не так!")
  }
}
  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });
  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
