import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  Dispatch,
  useMemo,
} from "react";
import { todoReducer, todoAction } from "./todoReducer";
import { TodoStatus } from "@/types/todo";

interface TodoContextType {
  todos: any[];
  todoCount: number;
  todoTasks: any[];
  inProgressTasks: any[];
  doneTasks: any[];
  dispatch: React.Dispatch<todoAction>;
}
export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

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

  return (
    <TodoContext.Provider
      value={{
        todos,
        dispatch,
        todoCount,
        todoTasks,
        inProgressTasks,
        doneTasks,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo TodoProvider içinde kullanılmalıdır");
  }
  return context;
};
