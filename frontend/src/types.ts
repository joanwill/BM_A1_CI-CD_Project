export type Status = "backlog" | "in_progress" | "done";
export type Priority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: Status;
  priority?: Priority;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
}
