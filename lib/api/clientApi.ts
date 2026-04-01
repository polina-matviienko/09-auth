import { api } from "./api";
import { Note, NoteTag } from "@/types/note";
import { User } from "@/types/user";

export const ENDPOINT = "/notes";

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesParams {
  search?: string;
  tag?: NoteTag;
  page?: number;
  perPage?: number;
  sortBy?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type RegisterRequest = { email: string; password: string };
export type LoginRequest = { email: string; password: string };
export type UpdateUserRequest = { email?: string; username: string };

export async function register(data: RegisterRequest): Promise<User> {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
}

export async function login(data: LoginRequest): Promise<User> {
  const response = await api.post<User>("/auth/login", data);
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<boolean> {
  try {
    const response = await api.get("/auth/session");
    return !!response.data;
  } catch {
    return false;
  }
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/users/me");
  return data;
}

export async function updateMe(payload: UpdateUserRequest): Promise<User> {
  const res = await api.patch<User>("/users/me", payload);
  return res.data;
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const response = await api.get<FetchNotesResponse>(ENDPOINT, {
    params: { ...params, perPage: 12 },
  });
  return response.data;
}

export async function createNote(body: CreateNotePayload): Promise<Note> {
  const response = await api.post<Note>(ENDPOINT, body);
  return response.data;
}

export async function deleteNote(id: Note["id"]): Promise<Note> {
  const response = await api.delete<Note>(`${ENDPOINT}/${id}`);
  return response.data;
}

export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const response = await api.get<Note>(`${ENDPOINT}/${id}`);
  return response.data;
}
