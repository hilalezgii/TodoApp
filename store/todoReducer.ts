import { TodoStatus } from "@/types/todo";

export type todoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "UPDATE_STATUS"; payload: { id: number; newStatus: TodoStatus } };

export const todoReducer = (state: any[], action: todoAction) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload,
          status: TodoStatus.TODO,
        },
      ];
    case "UPDATE_STATUS":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, status: action.payload.newStatus }
          : todo,
      );
    default:
      return state;
  }
};
