import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:10000/api", // Spring 서버
});

export const registerBookmarkApi = async (wordId: string): Promise<void> => {
  await api.post(`/bookmarks/${wordId}`);
};

export const deleteBookmarkApi = async (wordId: string): Promise<void> => {
  await api.delete(`/bookmarks/${wordId}`);
};
