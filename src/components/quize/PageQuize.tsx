import { useEffect, useState } from "react";
import { getWordPageRangeApi, getWordsApi } from "../../api/WordApi";
import CurrentPageList from "../WordPagenation";
import type { PageWord } from "../../api/types/PageWordResponse";
import QuizeBody from "./QuizeBody";
import type { WordPageRangeType, WordQuery, WordQuerySearchType } from "../../api/types/WordType";

type Props = {
    onClose: () => void;
};

const searchTypes = [
  { value: "PAGE", label: "페이지" },
  { value: "RANGE", label: "범위" },
];

export default function PageQuize({onClose}: Props) {
  const [search, setSearch] = useState<{
    searchType: string;
    startPage: number;
    endPage: number;
  }>({
    searchType: "PAGE",
    startPage: 0,
    endPage: 0
  });
  const [getQuery, setGetQuery] = useState<WordPageRangeType>({
      page: 1,
      size: 10,
      startPage: 0
    });
  const [pageWord, setPageWord] = useState<PageWord|null>(null);
  
  const onCurrentPage = (page: number) => setGetQuery({...getQuery, page: page});
  const callGetPageWordApi = () => {
    getWordPageRangeApi(getQuery)
      .then(setPageWord)
      .catch((error) => {
        console.error("API 호출 실패", error);
      })
  }

  useEffect(() => {
    callGetPageWordApi();
  }, [getQuery.page]);

  useEffect(() => {
      const escHandler = (e: KeyboardEvent) => {
          if (e.key === "Escape") onClose();
      };
      
      window.addEventListener("keydown", escHandler); 

      return () => {
          window.removeEventListener("keydown", escHandler)
      };
  }, []);

  const handleStartInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
    ) => {
    const { name, value } = e.target;
    const endPage = search.searchType == "PAGE" ? Number(value): search.endPage;

    setGetQuery((prev) => ({
        ...prev,
        startPage: Number(value),
        endPage: endPage
    }));

    setSearch((prev) => ({
      ...prev,
      startPage: Number(value),
      endPage: endPage
    }))
  };

  const handleEndInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
    ) => {
    const { name, value } = e.target;

    setGetQuery((prev) => ({
        ...prev,
        endPage: Number(value)
    }));

    setSearch((prev) => ({
      ...prev,
      endPage: Number(value)
    }))
  };

  const enterEvent = (e: React.KeyboardEvent<HTMLInputElement> ) => {
    if (e.key === "Enter") {
        callGetPageWordApi();
    }   
  };

  const setSearchType = (value: string) => {
    setSearch({
      searchType: value,
      startPage: search.startPage,
      endPage: 0
    });
  }
  
  return (
    <div style={{position:"fixed", width:"80%", height:"90%", backgroundColor: "#fff",
      top:"50%", left:"50%", transform: "translate(-50%, -50%)"}}>
      <div style={{margin: "20px auto"}}>
        <select value={search.searchType} onChange={(e) => setSearchType(e.target.value )}>
          {searchTypes.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <input type="text" value={getQuery.startPage} onChange={handleStartInputChange} onKeyDown={enterEvent}/>
        {
          search.searchType == "RANGE" && <input type="text" value={getQuery.endPage} onChange={handleEndInputChange} onKeyDown={enterEvent}/>
        }
        <button type="button" onClick={callGetPageWordApi}>검색</button>
      </div>
      <div>
      {
        pageWord && (<QuizeBody words={pageWord.words}/>)
      }
      </div>
      {
        pageWord && (
          <div style={{textAlign:"center", margin:"10px 0"}}>
        <button onClick={() => onCurrentPage(1)}>
            🏠
        </button>
        
        {/* <!-- < : 이전 10페이지 --> */}
        { pageWord.currentPage > 10 ?
          (<button onClick={() => onCurrentPage(Math.max(1, pageWord.currentPage-10))}>
              &laquo;
          </button>) : (null)
        }
  
        {/* <!-- << : 이전 한 페이지 --> */}
        {
          pageWord.currentPage > 1 ?
          (<button onClick={() => onCurrentPage(Math.max(1, pageWord.currentPage-1))}>
              &lt;
          </button>) : (null)
        }
  
        <CurrentPageList pageWord={pageWord} onCurrentPage={onCurrentPage}/>
  
        {/* <!-- > : 다음 1페이지 --> */}
        {
          pageWord.currentPage < pageWord.totalPages ?
          (<button onClick={() => onCurrentPage(Math.min(pageWord.totalPages, pageWord.currentPage+1))}>
              &gt;
          </button>) : (null)
        }
  
        {/* <!-- > : 다음 10페이지 --> */}
        {
          pageWord.currentPage < pageWord.totalPages ?
          (<button onClick={() => onCurrentPage(Math.min(pageWord.totalPages, pageWord.currentPage+10))}>
              &raquo;
          </button>) : (null)
        }
        </div> 
        )
      }
    </div>
  );
};

const inputStyle = {
    width:"80%",
    height:"20px",
    fontSize:"10px",
    background: "#fff",
    color: "#000",
    wordBreak: "break-word", // 긴 단어 줄바꿈
    overflowWrap: "break-word", // 호환용
    whiteSpace: "normal"
};