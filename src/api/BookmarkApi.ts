import axios from "axios";
import type { Word } from "../types/Word";
import type { PageWord } from "./types/PageWordResponse";
import type { WordQuery } from "./types/WordType";
import { BookmarkToWord, type Bookmark, type PageBookmark } from "./types/bookmarks/BookmarkType";

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
  const response = await api.get<Bookmark[]>(`/bookmarks/random`);
  
  return response.data.map((value) => {
    return BookmarkToWord(value)
  });
};

export const getAllBookmark = async (query: WordQuery): Promise<PageWord> => {
  const response = await api.get<PageBookmark>(`/bookmarks`, {
    params: query
  });

  return {
    ...response.data,
    words: response.data.bookmarks.map((value) => {
      return BookmarkToWord(value)
    })
  };
}