import { Box } from "@/components/ui/box";
import Header from "@/components/Header/Header";
import CreateTodo from "../components/CreateTodo/CreateTodo";
import TodoList from "@/components/TodoList/TodoList";
import { TodoStatus } from "@/types/todo";
import { useTodo } from "../store/todoContext";

export default function Home() {
  const {
    todos,
    todoCount,
    todoTasks,
    inProgressTasks,
    doneTasks,
    addTodo,
    updateStatus,
  } = useTodo();

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
