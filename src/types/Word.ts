export type Word = {
    id?: string;
    type: string;
    word: string;
    pronunciation?: string;
    korean: string[];
    lastPronunciation?: string[];
    meaningPronunciation?: string[];
    bookPage?: number;
    source: string;
    webLink?: string;
}