import { TodoStatus, Todo } from "@/types/todo";
import { TODO_CONTEXT_KEYS } from "@/constants";

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
      return [...state, todoInstance];
    case TODO_CONTEXT_KEYS.UPDATE_STATUS:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, status: action.payload.newStatus }
          : todo,
      );
    default:
      return state;
  }
};
