export type Word = {
    id?: string;
    type: string;
    word: string;
    pronunciation?: string;
    korean: string[];
    lastPronunciation?: string[];
    meaningPronunciation?: string[];
    example?: string;
    bookPage?: number;
    examplePage: string[];
    webLink?: string;
}