export type WordQuery = {
    page?: number;
    size?: number;
    searchType?: WordQuerySearchType;
    searchValue?: string;
}

export type WordQuerySearchType = "WORD_TYPE"|"KOREAN"|"PAGE";