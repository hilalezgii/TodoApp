import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { todoReducer } from "./todoReducer";
import { TodoStatus, Todo } from "@/types/todo";
import { TODO_CONTEXT_KEYS } from "@/constants";
import { todoCache, getCachedTodos, removeCache } from "./todoCache";

interface TodoContextType {
  todos: Todo[];
  todoCount: number;
  todoTasks: Todo[];
  inProgressTasks: Todo[];
  doneTasks: Todo[];
  addTodo: (title: string) => void;
  updateStatus: (id: number, newStatus: TodoStatus) => void;
  initialize: (todoList: Todo[]) => void;
  removeCache: () => void;
  loadTodos: () => void;
}
export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const loadTodos = () => {
    const cached = getCachedTodos();
    if (cached) {
      dispatch({ type: TODO_CONTEXT_KEYS.INITIALIZE, payload: cached });
      console.log("AppState: Cache'den veriler tazelendi.");
    }
  };

  const initialize = async (todoList: Todo[]) => {
    const cached = getCachedTodos();
    console.log("Initialize çağrıldı, cached:", cached);
    if (cached) {
      console.log("cache yüklendi");
      dispatch({ type: TODO_CONTEXT_KEYS.INITIALIZE, payload: cached });
      return;
    }
    console.log("initializing");
    dispatch({ type: TODO_CONTEXT_KEYS.INITIALIZE, payload: todoList });
    todoCache(todoList);
    await new Promise((res) => setTimeout(res, 50));
    const verify = getCachedTodos();
  };

  const addTodo = (title: string) => {
    dispatch({ type: TODO_CONTEXT_KEYS.ADD_TODO, payload: title });
    todoCache([...todos, { title }]);
  };

  const updateStatus = (id: number, newStatus: TodoStatus) => {
    dispatch({
      type: TODO_CONTEXT_KEYS.UPDATE_STATUS,
      payload: { id, newStatus },
    });
    const updated = todos.map((t: Todo) =>
      t.id === id ? { ...t, status: newStatus } : t,
    );
    todoCache(updated);
  };
  const clearCache = () => {
    removeCache();
    console.log("Cache temizlendi!");
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
        initialize,
        loadTodos,
        removeCache: clearCache,
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
