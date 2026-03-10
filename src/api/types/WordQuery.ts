export type WordQuery = {
    page?: number;
    size?: number;
    searchType?: WordQuerySearchType;
    searchValue?: string;
}

export const WordTypeValue = {
    CHINA_CHAR: "CHINA_CHAR",
    WORD: "WORD",
} as const;

export type WordTypeValueType = typeof WordTypeValue[keyof typeof WordTypeValue];

export type WordQuerySearchType = "WORD_TYPE"|"KOREAN"|"PAGE";