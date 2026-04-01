import type { PageWord } from "../api/types/PageWordResponse";
import { deleteWordApi } from "../api/WordApi";
import CheckModalButton from "../common/CheckModalButton";
import type { Word } from "../types/Word";
import BookmarkButton from "./BookmarkButton";
import CurrentPageList from "./WordPagenation";
import { useNavigate } from "react-router-dom";


type Props = {
    pageWord: PageWord,
    onOpenModal: (word: Word) => void
    onReset: () => void,
    onCurrentPage: (page: number) => void,
};


export default function WordTable({ pageWord, onOpenModal, onReset, onCurrentPage }: Props) {
  const navigate = useNavigate();
  const onDlete = async (id?: string) => {
    if(id != null) {
      await deleteWordApi(id);
      onReset();
    }
  };

  const changePage = (page: number) => onCurrentPage(page);

  return (
    <>
      <table style={{ width: "100%",  tableLayout:"fixed", borderCollapse: "collapse"}}>
        <thead style={{backgroundColor: "#242424", color: "#f9f9f9"}}>
          <tr>
            <th style={thStyle}>유형</th>
            <th style={thStyle}>⭐</th>
            <th style={{...thStyle, width: "200px"}}>일본어</th>
            <th style={thStyle}>발음</th>
            <th style={thStyle}>한국어 의미</th>
            <th style={thStyle}>음독</th>
            <th style={thStyle}>훈독</th>
            <th style={thStyle}>예시</th>
            <th style={thStyle}>예시페이지</th>
            <th style={thStyle}>삭제</th>
            <th style={thStyle}>수정</th>
          </tr>
        </thead>
        <tbody>
          {pageWord.words.map((word) => (
            <tr key={word.id}>
              <td style={tdStyle}>
                {
                  word.type !== "GRAMMAR" ?
                  (<a href={`https://ja.dict.naver.com/#/search?query=${word?.word}`} target="_blank" rel="noopener noreferrer">
                    {word.type}
                  </a>) : (<>{word.type}</>)
                }
              </td>
              <td style={tdStyle}>
                <BookmarkButton isBookmark={word.bookmarked} wordId={word.id!}/>
              </td>
              <td style={{...tdStyle, fontSize: "30px"}} onClick={() => navigate(`/details/${word.id}/`)}>
                {word.word}
              </td>
              <td style={tdStyle}>{word.pronunciation}</td>
              <td style={tdStyle}>{word.korean.join(",")}</td>
              <td style={tdStyle}>{word.lastPronunciation == null ? null : word.lastPronunciation.join(", ")}</td>
              <td style={tdStyle}>{word.meaningPronunciation == null ? null : word.meaningPronunciation.join(", ")}</td>
              <td style={tdStyle}>{word.example}</td>
              <td style={tdStyle}>{word.examplePage.join(",")}</td>
              <td style={tdStyle}>
                <CheckModalButton text="삭제" callFunction={onDlete} args={[word.id]}></CheckModalButton>
              </td>
              <td style={tdStyle}>
                <button type="button" onClick={() => onOpenModal(word)}>수정</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{textAlign:"center", margin:"10px 0"}}>
      <button onClick={() => changePage(1)}>
          🏠
      </button>
      
      {/* <!-- < : 이전 10페이지 --> */}
      { pageWord.currentPage > 10 ?
        (<button onClick={() => changePage(Math.max(1, pageWord.currentPage-10))}>
            &laquo;
        </button>) : (null)
      }

      {/* <!-- << : 이전 한 페이지 --> */}
      {
        pageWord.currentPage > 1 ?
        (<button onClick={() => changePage(Math.max(1, pageWord.currentPage-1))}>
            &lt;
        </button>) : (null)
      }

      <CurrentPageList pageWord={pageWord} onCurrentPage={onCurrentPage}/>

      {/* <!-- > : 다음 1페이지 --> */}
      {
        pageWord.currentPage < pageWord.totalPages ?
        (<button onClick={() => changePage(Math.min(pageWord.totalPages, pageWord.currentPage+1))}>
            &gt;
        </button>) : (null)
      }

      {/* <!-- > : 다음 10페이지 --> */}
      {
        pageWord.currentPage < pageWord.totalPages ?
        (<button onClick={() => changePage(Math.min(pageWord.totalPages, pageWord.currentPage+10))}>
            &raquo;
        </button>) : (null)
      }
    </div>
  </>
  );
}

const thStyle = {
  // overflow : "hidden"
}

const tdStyle = {
  border: "1px solid",
  padding: "8px",
  wordBreak: "break-word", // 긴 단어 줄바꿈
  overflowWrap: "break-word", // 호환용
  whiteSpace: "normal"
};