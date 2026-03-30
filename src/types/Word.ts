export type Word = {
    id?: string;
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
    bookmarked: boolean;
}