import { useEffect, useState } from "react";
import { getRandomWordsApi } from "../../api/WordApi";
import type { Word }  from "../../types/Word";
import QuizeBody from "./QuizeBody";


type Props = {
    onClose: () => void;
};


export default function RandomQuize({onClose}: Props) {
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    getRandomWordsApi()
    .then(setWords)
    .catch((error) => {
      console.error("API 호출 실패", error);
    })
    .finally(() => setLoading(false));        
    }, []);

    useEffect(() => {
        const escHandler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        
        window.addEventListener("keydown", escHandler); 

        return () => {
            window.removeEventListener("keydown", escHandler)
        };
    }, []);
  
  return (
    <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%",
            background:"rgba(0,0,0,0.5)"}}>
     <div style={{background:"#fff", width:"1000px", margin:"100px auto", padding:"20px", borderRadius:"8px"}}>
      {
        loading ? <p>loading..</p> : (
          <QuizeBody words={words} />
        )
      }
      </div>
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