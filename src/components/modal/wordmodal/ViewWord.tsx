import { useNavigate } from "react-router-dom";
import type { Word } from "../../../types/Word";
import AddLinkButton from "../../link/AddLinkButton";

type Props = {
  word: Word
};

export default function ViewWord({word}:Props) {
  const navigate = useNavigate();

  return (
    <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%",
            background:"rgba(0,0,0,0.5)"}}>
        <div style={{background:"#fff", width:"420px", margin:"100px auto", padding:"20px", borderRadius:"8px"}}>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
            <h3>단어</h3>
            <AddLinkButton word={word} />
          </div>
            <form>
                <div>
                    <div style={{marginBottom:"10px"}}>
                      <div style={{fontSize: "35px"}}>
                        {word.word}
                      </div>
                    </div>
                    <div style={inputDivStyle}>
                      <label>발음: </label><br />
                      <div>
                        {word.pronunciation}
                      </div>
                    </div>
                    <div style={inputDivStyle}>
                      <label>뜻[여러개]:</label><br />
                      <div>
                        {word.korean}
                      </div>
                    </div>
                    <div style={inputDivStyle}>
                      <label>etc:</label><br />
                      <div>
                        {word.etc}
                      </div>
                    </div>
                    <div style={inputDivStyle}>
                      <label>출처:</label><br />
                      <div>
                        {word.examplePage}
                      </div>
                    </div>
                </div>
                <table style={{ width: "100%",  tableLayout:"fixed", borderCollapse: "collapse"}}>
                  <thead style={{backgroundColor: "#242424", color: "#f9f9f9"}}>
                    <tr>
                      <th style={{width: "150px"}}>유형</th>
                      <th>일본어</th>
                    </tr>
                  </thead>
                  <tbody>
                    {word.linkWords && word.linkWords.map((linkWord) => (
                      <tr key={word.id}>
                        <td style={tdStyle}>
                          {linkWord.type}
                        </td>
                        <td style={{...tdStyle, fontSize: "30px"}} onClick={() => navigate(`/details/${word.id}/`)}>
                          {linkWord.word}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </form>
        </div>
    </div>
  );
}

const inputDivStyle = {
  marginBottom:"10px",
  display: "flex", 
  justifyContent: "center", 
  gap: "5px"
};

const tdStyle = {
  border: "1px solid",
  padding: "8px",
  wordBreak: "break-word", // 긴 단어 줄바꿈
  overflowWrap: "break-word", // 호환용
  whiteSpace: "normal"
};