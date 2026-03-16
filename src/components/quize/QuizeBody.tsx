import { useState } from "react";
import type { Word } from "../../types/Word";
import BookmarkButton from "../BookmarkButton";

export default function QuizeBody({words}: {words: Word[]}) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const showAnswer = (id: string|undefined) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if(id) {
        next.has(id) ? next.delete(id) : next.add(id); 
      }
      return next;
    });
  };


  return (
    <table style={{ width: "100%",  tableLayout:"fixed", borderCollapse: "collapse"}}>
      <thead style={{backgroundColor: "#242424", color: "#f9f9f9"}}>
        <tr>
          <th>유형</th>
          <th>⭐</th>
          <th>일본어</th>
          <th>발음</th>
          <th>한국어 의미</th>
          <th>음독</th>
          <th>훈독</th>
          <th>정답</th>
          <th>출처</th>
        </tr>
      </thead>
      <tbody>
        {
          words.map(word => (
            <tr key={word.id}>
              <td>{word.type}</td>
              <td><BookmarkButton isBookmark={word.isBookmarked} wordId={word.id!}></BookmarkButton></td>
              <td>{word.word} </td>
              <td>
                <input type="text" style={inputStyle} />
                <td>{word.id != null && openIds.has(word.id) && word.pronunciation}</td>
              </td>
              <td>
                <input type="text" style={inputStyle} />
                <td>{word.id != null && openIds.has(word.id) && word.korean.join(",")}</td>
              </td>
              <td>
                <input type="text" style={inputStyle} />
                <td>{word.id != null && openIds.has(word.id) && word.lastPronunciation}</td>
              </td>
              <td>
                <input type="text" style={inputStyle} />
                <td>{word.id != null && openIds.has(word.id) && word.meaningPronunciation}</td>
              </td>
              <td><button onClick={() => showAnswer(word.id)}>정답</button></td>
              <td>{word.examplePage}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
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