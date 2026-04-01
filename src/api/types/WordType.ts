export type RegisterWordType = {
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

export type ModifyWordType = {
  id: string;
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

export type WordQuery = {
  page?: number;
  size?: number;
  searchType?: WordQuerySearchType;
  searchValue?: string;
}


export type WordPageRangeType = {
  page?: number;
  size?: number;
  startPage: number;
  endPage?: number;
}

export const WordTypeValue = {
  CHINA_CHAR: "CHINA_CHAR",
  WORD: "WORD",
  GRAMMAR: "GRAMMAR"
} as const;

export type WordTypeValueType = typeof WordTypeValue[keyof typeof WordTypeValue];

export type WordQuerySearchType = "WORD_TYPE"|"KOREAN"|"PAGE"|"PRONUNCIATION";

export const SerchSelectValue ={
  ...WordTypeValue,
  NONE: "NONE"
};

export type SerchSelectType = typeof SerchSelectValue[keyof typeof SerchSelectValue];
