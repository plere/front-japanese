import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addLinkWordApi, getWordApi, getWordsApi, removeLinkWordApi } from "../../api/WordApi";
import type { Word } from "../../types/Word";
import SearchWord from "../ SearchWord ";
import type { WordQuery, WordQuerySearchType } from "../../api/types/WordType";
import type { PageWord } from "../../api/types/PageWordResponse";
import CurrentPageList from "../WordPagenation";

export default function AddLinkWord() {
  const navigate = useNavigate();
  const { id } = useParams<{id: string}>();
  const [word, setWord] = useState<Word>();
  const [linkWordSet, setLinkWordSet] = useState(new Set());
  const [getQuery, setGetQuery] = useState<WordQuery>({
    page: 1,
    size: 10,
  });
  const [pageWord, setPageWord] = useState<PageWord|null>();

  useEffect(() => {
    getWordApi(id!)
    .then(res => {
      setWord(res);
      const temp = new Set();
      res.linkWords?.forEach(item => temp.add(item.wordId));
      setLinkWordSet(temp)
      
    })
    .catch((error) => {
      console.error("getWordApi 호출 실패", error);
    })
  }, [id])

  const onGetQuery = (type?: WordQuerySearchType, value?: string) => {
    if(type != null && value != null) {
      setGetQuery({
        page: 1,
        size: 10, 
        searchType: type, 
        searchValue: value
      })
    }
  };
  const onCurrentPage = (page: number) => setGetQuery({...getQuery, page: page});

  useEffect(() => {
    console.log("pageword")
    getWordsApi(getQuery)
    .then(setPageWord)
    .catch((error) => {
      console.error("API 호출 실패", error);
    })
  }, [getQuery]);

  const onOffLinkWord = async (linkId: string) => {
    const temp = new Set(linkWordSet);
    
    if(linkWordSet.has(linkId)) {
      await removeLinkWordApi(id!, linkId);
      temp.delete(linkId);
    } else {
      await addLinkWordApi(id!, linkId);
      temp.add(linkId);
    }

    setLinkWordSet(temp)
  };

  return (
    <>
    <button onClick={() => navigate(`/`)}>🏠</button><br />
    <label>현재 단어</label>
    <h1>
      {word?.word}
    </h1>
    <div>
      <SearchWord onGetQuery={onGetQuery}/>      
      <table style={{ width: "100%",  tableLayout:"fixed", borderCollapse: "collapse"}}>
        <thead style={{backgroundColor: "#242424", color: "#f9f9f9"}}>
          <tr>
            <th style={{width: "150px"}}>유형</th>
            <th>일본어</th>
            <th>한국어 의미</th>
            <th style={{width: "100px"}}></th>
          </tr>
        </thead>
        <tbody>
          {pageWord && pageWord.words.map((word) => (
            <tr key={word.id}>
              <td style={tdStyle}>
                {word.type}
              </td>
              <td style={{...tdStyle, fontSize: "30px"}} onClick={() => navigate(`/details/${word.id}/`)}>
                {word.word}
              </td>
              <td style={tdStyle}>{word.korean.join(",")}</td>
              <td style={tdStyle}>
                <button style={{background: "transparent", border: "none", padding: 0, cursor: "pointer"}} onClick={() => onOffLinkWord(word.id!)}>
                  {linkWordSet.has(word.id!) === true ? "✅" : "☑️"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{textAlign:"center", margin:"10px 0"}}>
      <button onClick={() => onCurrentPage(1)}>
          🏠
      </button>
      {
        pageWord && (
          <>
          {/* <!-- < : 이전 10페이지 --> */}
          { pageWord!.currentPage > 10 ?
            (<button onClick={() => onCurrentPage(Math.max(1, pageWord!.currentPage-10))}>
                &laquo;
            </button>) : (null)
          }
    
          {/* <!-- << : 이전 한 페이지 --> */}
          {
            pageWord!.currentPage > 1 ?
            (<button onClick={() => onCurrentPage(Math.max(1, pageWord!.currentPage-1))}>
                &lt;
            </button>) : (null)
          }
    
          <CurrentPageList pageWord={pageWord!} onCurrentPage={onCurrentPage}/>
    
          {/* <!-- > : 다음 1페이지 --> */}
          {
            pageWord!.currentPage < pageWord!.totalPages ?
            (<button onClick={() => onCurrentPage(Math.min(pageWord!.totalPages, pageWord!.currentPage+1))}>
                &gt;
            </button>) : (null)
          }
    
          {/* <!-- > : 다음 10페이지 --> */}
          {
            pageWord!.currentPage < pageWord!.totalPages ?
            (<button onClick={() => onCurrentPage(Math.min(pageWord!.totalPages, pageWord!.currentPage+10))}>
                &raquo;
            </button>) : (null)
          }
          </>
          )
      }
      </div>
    </>
  )
}

const tdStyle = {
  border: "1px solid",
  padding: "8px",
  wordBreak: "break-word", // 긴 단어 줄바꿈
  overflowWrap: "break-word", // 호환용
  whiteSpace: "normal"
};