import axios from "axios";
import type { Word } from "../types/Word";

const api = axios.create({
  baseURL: "http://localhost:10000/api", // Spring 서버
});

export const registerBookmarkApi = async (wordId: string): Promise<void> => {
  await api.post(`/bookmarks/${wordId}`);
};

export const deleteBookmarkApi = async (wordId: string): Promise<void> => {
  await api.delete(`/bookmarks/${wordId}`);
};

export const getRandomBookmark = async (size: number=10): Promise<Word[]> => {
  const response = await api.get<Word[]>(`/bookmarks/random`);
  return response.data;
};