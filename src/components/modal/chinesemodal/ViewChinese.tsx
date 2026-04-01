import type { Word } from "../../../types/Word";

type Props = {
  word: Word
};

export default function ViewChinese({word}:Props) {
  return (
    <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%",
            background:"rgba(0,0,0,0.5)"}}>
        <div style={{background:"#fff", width:"420px", margin:"100px auto", padding:"20px", borderRadius:"8px"}}>
            <h3>한자</h3>
            {/* <!-- WORD 유형 --> */}
            <form>
                <div>
                    <div style={{marginBottom:"10px"}}>
                        <div style={{fontSize: "50px"}}>
                          {word.word}
                        </div>
                    </div>
                    <div style={inputDivStyle}>
                        <label>뜻[여러개]:</label><br />
                        <div>
                          {word.korean}
                        </div>
                    </div>
                    <div style={inputDivStyle}>
                        <label>음독:</label><br />
                        <div>
                          {word.lastPronunciation}
                        </div>
                    </div>
                    <div style={inputDivStyle}>
                        <label>훈독:</label><br />
                        <div>
                            {word.meaningPronunciation}
                        </div>
                    </div>
                    <div style={inputDivStyle}>
                        <label>예시:</label><br />
                        <div>
                          {word.example}
                        </div>
                    </div>
                    <div style={inputDivStyle}>
                        <label>예시 발음:</label><br />
                        <div>
                            {word.exampleKorean}
                        </div>
                    </div>
                    <div style={inputDivStyle}>
                        <label>책 page:</label><br />
                        <div>
                          {word.bookPage}
                        </div>
                    </div>
                    <div style={inputDivStyle}>
                        <label>출처:</label><br />
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