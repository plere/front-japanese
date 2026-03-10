import type { PageWord } from "../api/types/PageWordResponse";

type Props = {
    pageWord: PageWord,
    onCurrentPage: (page: number) => void,
};

export default function CurrentPageList({pageWord, onCurrentPage}:Props) {
    const startPage = Math.floor((pageWord.currentPage - 1) / 10) * 10 + 1;
    const lastPage = Math.min(pageWord.totalPages, Math.ceil(pageWord.currentPage/10)*10);
    
    return (
        <>
            {Array.from({ length: lastPage - startPage + 1 }).map((_, i) => {
                const p = startPage + i;
                return (
                <button
                    key={p}
                    onClick={() => onCurrentPage(p)}
                    style={{ fontWeight: pageWord.currentPage === p ? "bold" : "normal" ,
                        background: pageWord.currentPage === p ? "#a0a0a0" : "#242424" 
                    }}
                >
                    {p}
                </button>
                );
            })}
        </>
    )
}