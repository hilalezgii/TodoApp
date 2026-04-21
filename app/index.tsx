import { Box } from "@/components/ui/box";
import Header from "@/components/Header/Header";
import CreateTodo from "../components/CreateTodo/CreateTodo";
import { useEffect, useMemo, useReducer, useState } from "react";
import TodoList from "@/components/TodoList/TodoList";
import { TodoStatus } from "@/types/todo";
import { todoReducer } from "../store/todoReducer";
import { useTodo } from "../store/todoContext";

export default function Home() {
  const { todos, dispatch } = useTodo();

  const todoCount = useMemo(() => {
    return todos.filter((t) => t.status !== TodoStatus.DONE).length;
  }, [todos]);

  const todoTasks = useMemo(
    () => todos.filter((t) => t.status === TodoStatus.TODO),
    [todos],
  );
  const inProgressTasks = useMemo(
    () => todos.filter((t) => t.status === TodoStatus.IN_PROGRESS),
    [todos],
  );
  const doneTasks = useMemo(
    () => todos.filter((t) => t.status === TodoStatus.DONE),
    [todos],
  );

  const handleCreateTodo = (title: string) => {
    dispatch({
      type: "ADD_TODO",
      payload: title,
    });
  };

  const handleUpdateTodos = (id: number, newStatus: TodoStatus) => {
    dispatch({
      type: "UPDATE_STATUS",
      payload: { id, newStatus },
    });
  };

  return (
    <Box className="flex-1 bg-slate-900 px-4 pt-12">
      <Header todoCount={todoCount} />
      <CreateTodo createTodo={handleCreateTodo} />
      <TodoList
        todoTasks={todoTasks}
        inProgressTasks={inProgressTasks}
        doneTasks={doneTasks}
        updateStatus={handleUpdateTodos}
      />
    </Box>
  );
}
