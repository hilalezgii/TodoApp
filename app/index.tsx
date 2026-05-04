import { Box } from "@/components/ui/box";
import Header from "@/components/Header/Header";
import CreateTodo from "../components/CreateTodo/CreateTodo";
import TodoList from "@/components/TodoList/TodoList";
import { useTodo } from "../store/todoContext";
import { useEffect, useRef } from "react";
import { storage } from "@/store/todoStorage";
import { STORAGE_KEYS } from "@/constants";
import { AppState } from "react-native";

export default function Home() {
  const {
    todoCount,
    todoTasks,
    inProgressTasks,
    doneTasks,
    addTodo,
    updateStatus,
    initialize,
  } = useTodo();

  const appState = useRef(AppState.currentState);

  const loadTodos = () => {
    const todoList = storage.getString(STORAGE_KEYS.TODO_LIST) || "[]";
    const _todoList = JSON.parse(todoList);
    initialize(_todoList);
  };

  useEffect(() => {
    loadTodos();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        loadTodos();
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);

  return (
    <Box className="flex-1 bg-slate-900 px-4 pt-12">
      <Header todoCount={todoCount} />
      <CreateTodo createTodo={addTodo} />
      <TodoList
        todoTasks={todoTasks}
        inProgressTasks={inProgressTasks}
        doneTasks={doneTasks}
        updateStatus={updateStatus}
      />
    </Box>
  );
}
