import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  Dispatch,
} from "react";
import { todoReducer, todoAction } from "./todoReducer";
import { TodoStatus } from "@/types/todo";

interface TodoContextType {
  todos: any[];
  dispatch: React.Dispatch<todoAction>;
}
export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
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
