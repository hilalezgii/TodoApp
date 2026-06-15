export enum TodoStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}
export enum SectionTitles {
  TODO = "YAPILACAKLAR",
  IN_PROGRESS = "DEVAM EDENLER",
  DONE = "TAMAMLANANLAR",
}

export interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
}
