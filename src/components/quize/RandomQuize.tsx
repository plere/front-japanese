import { useEffect, useState } from "react";
import { getRandomWordsApi } from "../../api/WordApi";
import type { Word }  from "../../types/Word";
import QuizeBody from "./QuizeBody";
import { SerchSelectValue, type SerchSelectType } from "../../api/types/WordType";

type Props = {
    onClose: () => void;
};

export default function RandomQuize({onClose}: Props) {
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState<Word[]>([]);
  const [quizeType, setQuizeType] = useState<SerchSelectType>(SerchSelectValue.NONE);

  useEffect(() => {
    
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

  const changeType = (type: SerchSelectType) => {
    setQuizeType(type);
  }

  const getQuize = () => {
    getRandomWordsApi(quizeType)
    .then(setWords)
    .catch((error) => {
      console.error("API 호출 실패", error);
    })
    .finally(() => setLoading(false));        
  }


  
  return (
    <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%",
            background:"rgba(0,0,0,0.5)", overflowY: "auto"}}>
     <div style={{background:"#fff", width:"1000px", margin:"100px auto", padding:"20px", borderRadius:"8px"}}>
      <div>
        { loading && (
          <>
          <select value={quizeType} onChange={(e) => changeType(e.target.value as SerchSelectType )}>
          {Object.keys(SerchSelectValue).map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
          </select>
          <button style={{width: "60px", fontSize: "13px"}} onClick={getQuize}>선택</button>
          </>
        )}
      </div>
      {
        loading ? <p>loading..</p> : (
          <QuizeBody words={words} />
        )
      }
      </div>
    </div>
  );
};
