import { Box } from "@/components/ui/box";
import Header from "@/components/Header/Header";
import CreateTodo from "../components/CreateTodo/CreateTodo";
import { useEffect, useMemo, useState } from "react";
import TodoList from "@/components/TodoList/TodoList";
import { TodoStatus, SectionTitles } from "@/types/todo";

export default function Home() {
  const [todos, setTodos] = useState([]);

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
    const newTodo = {
      id: Date.now(),
      title: title,
      status: TodoStatus.TODO,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleUpdateTodos = (id: number, newStatus: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo,
      ),
    );
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
