import axios from "axios";
import type { WordQuery } from "./types/WordQuery";
import type { PageWord } from "./types/PageWordResponse";
import type { Word } from "../types/Word";

const api = axios.create({
  baseURL: "http://localhost:10000", // Spring 서버
});

export const getWordsApi = async (query: WordQuery): Promise<PageWord> => {
  const response = await api.get<PageWord>("/api", {
    params: query
  });

  return response.data;
};

export const getRandomWordsApi = async (): Promise<Word[]> => {
  const response = await api.get<Word[]>("/api/random");

  return response.data;
}

export const registerWordApi = (word: Word) => {
    return api.post<void>("/api", word);
};

export const modifyWordApi = (word: Word) => {
    return api.put<void>("/api", word);
}

export const deleteWordApi = (id: string) => {
    return api.delete<void>(`/api/${id}`);
};