import type { Word } from "../../../types/Word";

type Props = {
  word: Word
};

export default function ViewWord({word}:Props) {
  return (
    <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%",
            background:"rgba(0,0,0,0.5)"}}>
        <div style={{background:"#fff", width:"420px", margin:"100px auto", padding:"20px", borderRadius:"8px"}}>
            <h3>단어</h3>
            {/* <!-- WORD 유형 --> */}
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