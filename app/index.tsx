import { Box } from "@/components/ui/box";
import Header from "@/components/Header/Header";
import CreateTodo from "../components/CreateTodo/CreateTodo";
import TodoList from "@/components/TodoList/TodoList";
import { useTodo } from "../store/todoContext";
import { useEffect } from "react";
import { useAppState } from "@/hooks/useAppState";
<<<<<<< HEAD
import Native3DView from "@/components/Native3dBox/Native3dView";
=======
>>>>>>> fd17ea8c6554a6f2a0ac902fa173e2cf317eb3f4

export default function Home() {
  const {
    todoCount,
    todoTasks,
    inProgressTasks,
    doneTasks,
    addTodo,
    updateStatus,
    loadTodos,
  } = useTodo();

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);
  useAppState(loadTodos);
  return (
    <Box className="flex-1 bg-slate-900 px-4 pt-12">
      <Header todoCount={todoCount} />
      <CreateTodo createTodo={addTodo} />
<<<<<<< HEAD
      <Native3DView
        todoCount={todoTasks.length}
        inProgressCount={inProgressTasks.length}
        doneCount={doneTasks.length}
      />
=======
>>>>>>> fd17ea8c6554a6f2a0ac902fa173e2cf317eb3f4
      <TodoList
        todoTasks={todoTasks}
        inProgressTasks={inProgressTasks}
        doneTasks={doneTasks}
        updateStatus={updateStatus}
      />
    </Box>
  );
}
