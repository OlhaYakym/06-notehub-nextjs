import axios from "axios";
import type { Note } from "../types/note";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
interface FetchNotesParams {
  search: string;
  page: number;
}
interface CreateNoteParams {
  title: string;
  content?: string;
  tag: string;
}
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export const fetchNotes = async ({
  search,
  page,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params = {
    page,
    perPage: 12,
    ...(search && { search }),
  };

  const res = await axios.get<FetchNotesResponse>("/notes", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params,
  });

  return res.data;
};

export const createNote = async ({
  title,
  content,
  tag,
}: CreateNoteParams): Promise<Note> => {
  const res = await axios.post<Note>(
    "/notes",
    { title, content, tag },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );
  return res.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return res.data;
};
