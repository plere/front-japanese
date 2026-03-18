import { useEffect, useState } from "react";
import type { Word } from "../../types/Word";
import QuizeBody from "./QuizeBody";
import { getRandomBookmark } from "../../api/BookmarkApi";

type Props = {
  onClose: () => void;
};

export default function BookmarkQuize({onClose}: Props) {
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    getRandomBookmark()
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
          <QuizeBody words={words.map(word => {
            return {
              ...word,
              isBookmarked: true
          }
          })} />
        )
      }
      </div>
    </div>
  );
};