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
  addTodo: (title: string) => void;
  updateStatus: (id: number, newStatus: TodoStatus) => void;
}
export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (title: string) => {
    dispatch({ type: "ADD_TODO", payload: title });
  };

  const updateStatus = (id: number, newStatus: TodoStatus) => {
    dispatch({ type: "UPDATE_STATUS", payload: { id, newStatus } });
  };

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
        todoCount,
        todoTasks,
        inProgressTasks,
        doneTasks,
        addTodo,
        updateStatus,
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
