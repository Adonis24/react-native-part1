import React, { useContext, useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";
import { AppTextBold } from "../components/ui/AppTextBold";
import { AppButton } from "../components/ui/AppButton";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { ScreenContext } from "../screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";

export const TodoScreen = () => {
  const [modal, setModal] = useState(false);
  const { changeScreen, todoId } = useContext(ScreenContext);
  const { todos, removeTodo, updateTodo } = useContext(TodoContext);
  const todo = todos.find((f) => f.id === todoId);
  const saveHandler = async (title) => {
    await updateTodo(todo.id, title);
    setModal(false);
  };
  return (
    <View>
      <EditModal
        onSave={saveHandler}
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
      />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton
          onPress={() => {setModal(true)}}
        >
          <AntDesign name="edit" size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton onPress={() => changeScreen(null)} color={THEME.GREY_COLOR}>
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}
          >
            <FontAwesome name="remove" size={20} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
  button: {
    width: "40%",
  },
  title: {
    fontSize: 20,
  },
});
