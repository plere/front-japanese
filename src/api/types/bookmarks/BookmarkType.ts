import type { Word } from "../../../types/Word";

export type Bookmark = {
    id: string;
    wordId: string,
    type: string;
    word: string;
    pronunciation?: string;
    korean: string[];
    lastPronunciation?: string[];
    meaningPronunciation?: string[];
    example?: string;
    exampleKorean?: string;
    bookPage?: number;
    examplePage: string[];
    etc?: string;
}

export type PageBookmark = {
     bookmarks: Bookmark[],
     currentPage: number,
     totalPages: number,
     startPage: number,
     endPage: number
};

export const BookmarkToWord = (bookmark: Bookmark): Word => {
  return {
    id: bookmark.wordId,
    word: bookmark.word,
    type: bookmark.type,
    pronunciation: bookmark.pronunciation,
    korean: bookmark.korean,
    lastPronunciation: bookmark.lastPronunciation,
    meaningPronunciation: bookmark.meaningPronunciation,
    example: bookmark.example,
    exampleKorean: bookmark.exampleKorean,
    bookPage: bookmark.bookPage,
    examplePage: bookmark.examplePage,
    etc: bookmark.etc,
    isBookmarked: true
  }
}