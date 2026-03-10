import type { Word } from "../../types/Word"

export type PageWord = {
     words: Word[],
     currentPage: number,
     totalPages: number,
     startPage: number,
     endPage: number
};