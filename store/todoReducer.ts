import { TodoStatus, Todo } from "@/types/todo";
import { storage } from "@/store/todoStorage";
import { STORAGE_KEYS, TODO_CONTEXT_KEYS } from "@/constants";

export type todoAction =
  | { type: typeof TODO_CONTEXT_KEYS.ADD_TODO; payload: string }
  | {
      type: typeof TODO_CONTEXT_KEYS.UPDATE_STATUS;
      payload: { id: number; newStatus: TodoStatus };
    }
  | { type: typeof TODO_CONTEXT_KEYS.INITIALIZE; payload: Todo[] };

export const todoReducer = (state: Todo[], action: todoAction) => {
  switch (action.type) {
    case TODO_CONTEXT_KEYS.INITIALIZE:
      return action.payload;
    case TODO_CONTEXT_KEYS.ADD_TODO:
      const todoInstance = {
        id: Date.now(),
        title: action.payload,
        status: TodoStatus.TODO,
      };

      const todoList = [...state, todoInstance];
      storage.set(STORAGE_KEYS.TODO_LIST, JSON.stringify(todoList));
      return todoList;
    case TODO_CONTEXT_KEYS.UPDATE_STATUS:
      const updatedTodoList = state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, status: action.payload.newStatus }
          : todo,
      );
      storage.set(STORAGE_KEYS.TODO_LIST, JSON.stringify(updatedTodoList));
      return updatedTodoList;
    default:
      return state;
  }
};
