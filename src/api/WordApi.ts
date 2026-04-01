import axios, { AxiosError } from "axios";
import type { PageWord } from "./types/PageWordResponse";
import type { Word } from "../types/Word";
import type { ModifyWordType, RegisterWordType, WordPageRangeType, WordQuery } from "./types/WordType";

const api = axios.create({
  baseURL: "http://localhost:10000", // Spring 서버
});

export const getWordApi = async (id: string): Promise<Word> => {
  const response = await api.get<Word>(`/api/${id}`);

  return response.data;
};

export const getWordsApi = async (query: WordQuery): Promise<PageWord> => {
  const response = await api.get<PageWord>("/api", {
    params: query
  });

  return response.data;
};

export const getWordPageRangeApi = async (query: WordPageRangeType): Promise<PageWord> => {
  const response = await api.get<PageWord>("/api/pages/range", {
    params: query
  });

  return response.data;
};

export const getRandomWordsApi = async (): Promise<Word[]> => {
  const response = await api.get<Word[]>("/api/random");

  return response.data;
}

export const registerWordApi = async (word: RegisterWordType): Promise<boolean> => {
  try{
    await api.post<void>("/api", word);
    return true;
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 409) {
      console.log("이미 존재하는 단어입니다");
      alert("이미 존재하는 단어입니다");
    }
    return false;
  }
};

export const modifyWordApi = (word: ModifyWordType) => {
    return api.put<void>("/api", word);
}

export const deleteWordApi = (id: string) => {
    return api.delete<void>(`/api/${id}`);
};