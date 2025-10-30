import { Task, Status } from "./types";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function listTasks(): Promise<Task[]> {
  const r = await fetch(`${BASE_URL}/tasks`);
  if (!r.ok) throw new Error("Failed to load tasks");
  return r.json();
}
export async function createTask(data: Partial<Task>): Promise<Task> {
  const r = await fetch(`${BASE_URL}/tasks`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error("Failed to create task");
  return r.json();
}
export async function updateTask(id: number, data: Partial<Task>): Promise<Task> {
  const r = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error("Failed to update task");
  return r.json();
}
export async function deleteTask(id: number): Promise<void> {
  const r = await fetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Failed to delete task");
}
export function nextStatus(s: Status): Status { return s === "backlog" ? "in_progress" : "done"; }
export function prevStatus(s: Status): Status { return s === "done" ? "in_progress" : "backlog"; }
