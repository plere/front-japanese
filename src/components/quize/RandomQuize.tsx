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
            background:"rgba(0,0,0,0.5)", overflowY: "auto"}}>
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
