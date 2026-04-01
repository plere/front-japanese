import type { Word } from "../../../types/Word";

type Props = {
  word: Word
};

export default function ViewGrammar({word}:Props) {
  return (
    <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%",
            background:"rgba(0,0,0,0.5)"}}>
        <div style={{background:"#fff", width:"420px", margin:"100px auto", padding:"20px", borderRadius:"8px"}}>
            <h3>문법</h3>
            {/* <!-- WORD 유형 --> */}
            <form>
                <div>
                    <div style={inputDivStyle}>
                        <div style={{fontSize: "25px"}}>
                          {word.word}
                        </div>
                    </div>
                    <div style={inputDivStyle}>
                        <label>뜻:</label><br />
                        <div>
                          {word.korean}
                        </div>
                    </div>
                    <div style={inputDivStyle}>
                        <label>예시:</label><br />
                        <div>
                          {word.example}
                        </div>
                    </div>
                    <div style={inputDivStyle}>
                        <label>예시 뜻:</label><br />
                        <div>
                          {word.exampleKorean}
                        </div>
                    </div>
                    <div style={inputDivStyle}>
                        <label>예시페이지:</label><br />
                        <div>
                          {word.examplePage}
                        </div>
                    </div>
                </div>
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
}