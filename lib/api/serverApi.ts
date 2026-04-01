import { api } from "./api";
import { cookies } from "next/headers";
import { Note } from "@/types/note";
import { User } from "@/types/user";

const NOTES_ENDPOINT = "/notes";

export async function checkSession() {
  const cookieStore = await cookies();
  return await api.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
}

export async function getMe(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const { data } = await api.get<User>("/users/me", {
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  } catch {
    return null;
  }
}

export async function fetchNotes(params: any) {
  const cookieStore = await cookies();
  const { data } = await api.get(NOTES_ENDPOINT, {
    headers: { Cookie: cookieStore.toString() },
    params: { ...params, perPage: 12 },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await api.get<Note>(`${NOTES_ENDPOINT}/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}
