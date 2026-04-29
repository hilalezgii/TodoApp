import { Box } from "@/components/ui/box";
import Header from "@/components/Header/Header";
import CreateTodo from "../components/CreateTodo/CreateTodo";
import TodoList from "@/components/TodoList/TodoList";
import { useTodo } from "../store/todoContext";
import { useEffect } from "react";
import { storage } from "@/store/todoStorage";
import { STORAGE_KEYS } from "@/constants";

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

  useEffect(() => {
    const todoList = storage.getString(STORAGE_KEYS.TODO_LIST) || "[]";
    const _todoList = JSON.parse(todoList);
    initialize(_todoList);
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
