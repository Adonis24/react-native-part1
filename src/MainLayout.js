import React ,{useState, useContext} from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { THEME } from "./theme";
import { Navbar } from "./components/Navbar";
import { MainScreen } from './screens/MainScreen'
import { TodoScreen } from "./screens/TodoScreen";
import { TodoContext} from './context/todo/todoContext'
import { ScreenContext } from './screen/screenContext';

export const MainLayout = () => {
    const {todoId} = useContext(ScreenContext)

  return (
    <View style={styles.wrapper}>
      <Navbar title="Todo App!" />
      <View style={styles.container}>{
        todoId ? <TodoScreen/>: <MainScreen/>
      }</View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
    flex:1
  },
  wrapper:{
    flex:1
  }
});


    // const [todos, setTodos] = useState(todoContext.todos);
    // const addTodo = (title) => {
    //     setTodos((prev) => [
    //       ...prev,
    //       {
    //         id: Date.now().toString(),
    //         title,
    //       },
    //     ]);
    //   };
    
    //   const removeTodo = (id) => {
    //     const todo = todos.find((t) => t.id === id);
    //     Alert.alert(
    //       "Удаление элемента",
    //       `Вы уверены, что хотите удалить "${todo.title}"?`,
    //       [
    //         {
    //           text: "Отмена",
    //           style: "cancel",
    //         },
    //         {
    //           text: "Удалить",
    //           style: "destructive",
    //           onPress: () => {
    //             setTodoId(null);
    //             setTodos((prev) => prev.filter((todo) => todo.id !== id));
    //           },
    //         },
    //       ],
    //       { cancelable: false }
    //     );
    //   };
    //   const updateTodo = (id, title) => {
    //     setTodos((old) =>
    //       old.map((todo) => {
    //         if (todo.id === id) {
    //           todo.title = title;
    //         }
    //         return todo;
    //       })
    //     );
    //   };

        //const [todoId, setTodoId] = useState(null);

      // let content = (
      //   <MainScreen />
      // );
    
      // if (todoId) {
      //   const selectedTodo = todos.find((todo) => todo.id === todoId);
      //   content = (
      //     <TodoScreen
      //       onSave={updateTodo}
      //       onRemove={removeTodo}
      //       goBack={() => changeScreen(null)}
      //       todo={selectedTodo}
      //     />
      //   );
      // }