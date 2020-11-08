import React, { useState, useEffect, useContext, useCallback } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { AppButton } from "../components/ui/AppButton";
import { AppLoader } from "../components/ui/AppLoader";
import { AppText } from "../components/ui/AppText";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../screen/screenContext";
import { THEME } from "../theme";

export const MainScreen = () => {
  const [diviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );
  const { todos, addTodo, removeTodo, fetchTodos, loading, error } = useContext(
    TodoContext
  );
  const { changeScreen } = useContext(ScreenContext);

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);
  useEffect(() => {
    loadTodos()
  }, []);
  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };

    Dimensions.addEventListener("change", update);
    return () => {
      Dimensions.removeEventListener("change", update);
    };
  });
  if (loading) {
   return ( <AppLoader/>)
  }

  if (error) {
    return (<View style= {styles.center}> 
      <AppText style = {styles.error}>{error}</AppText>
      <AppButton onPress={loadTodos}>Повторить</AppButton>
    </View>)
  }
  let content = (
    <View style={{ width: diviceWidth }}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
        )}
      />
    </View>
  );
  if (todos.length === 0) {
    content = (
      <View style={styles.imageWrap}>
        {/* <Image  style ={styles.image} source= {require('../../assets/no-items.png')}></Image> */}
        <Image
          style={styles.image}
          source={{
            uri:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2560px-React-icon.svg.png",
          }}
        />
      </View>
    );
  }
  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrap: {
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  center: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  error: {
    fontSize: 20,
    color:THEME.DANGER_COLOR
  }
});
