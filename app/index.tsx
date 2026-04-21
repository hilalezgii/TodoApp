import { Box } from "@/components/ui/box";
import Header from "@/components/Header/Header";
import CreateTodo from "../components/CreateTodo/CreateTodo";
import { useEffect, useMemo, useState } from "react";
import TodoList from "@/components/TodoList/TodoList";

export default function Home() {
  const [todos, setTodos] = useState([]);

  const todoCount = useMemo(() => {
    return todos.filter((t) => t.status !== "done").length;
  }, [todos]);

  const todoTasks = useMemo(
    () => todos.filter((t) => t.status === "todo"),
    [todos],
  );
  const inProgressTasks = useMemo(
    () => todos.filter((t) => t.status === "in_progress"),
    [todos],
  );
  const doneTasks = useMemo(
    () => todos.filter((t) => t.status === "done"),
    [todos],
  );

  const handleCreateTodo = (title: string) => {
    const newTodo = {
      id: Date.now(),
      title: title,
      status: "todo",
    };
    setTodos([...todos, newTodo]);
  };
  useEffect(() => {
    console.log("Güncel Todolar:", todos);
  }, [todos]);

  const handleUpdateTodos = (id: number, newStatus: string) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo,
    );
    setTodos(updated);
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
