import { useEffect, useState } from "react";
import { getWordsApi } from "../../api/WordApi";
import CurrentPageList from "../WordPagenation";
import type { PageWord } from "../../api/types/PageWordResponse";
import QuizeBody from "./QuizeBody";
import type { WordQuery } from "../../api/types/WordType";

type Props = {
    onClose: () => void;
};

export default function PageQuize({onClose}: Props) {
  const [getQuery, setGetQuery] = useState<WordQuery>({
      page: 1,
      size: 10,
      searchType: "PAGE"
    });
  const [pageWord, setPageWord] = useState<PageWord|null>(null);
  
  const onCurrentPage = (page: number) => setGetQuery({...getQuery, page: page});
  const callGetPageWordApi = () => {
    getWordsApi(getQuery)
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
    ) => {
    const { name, value } = e.target;
    setGetQuery((prev) => ({
        ...prev,
        searchValue: value,
    }));
  };

  const enterEvent = (e: React.KeyboardEvent<HTMLInputElement> ) => {
    if (e.key === "Enter") {
        callGetPageWordApi();
    }   
  };
  
  return (
    <div style={{position:"fixed", width:"80%", height:"90%", backgroundColor: "#fff",
      top:"50%", left:"50%", transform: "translate(-50%, -50%)"}}>
      <div style={{margin: "20px auto"}}>
        <input type="text" value={getQuery.searchValue} onChange={handleInputChange} onKeyDown={enterEvent}/>
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