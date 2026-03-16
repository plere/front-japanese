import { useEffect, useState } from "react";
import RandomQuize from "./RandomQuize";
import PageQuize from "./PageQuize";
import BookmarkQuize from "./BookmarkQuize";


export default function QuizeModal({onClose} : {onClose: () => void}) {
  const [randomQuizeOpen, setRandomQuizeOpen] = useState(false);
  const [pageQuizeOpen, setPageQuizeOpen] = useState(false);
  const [bookmarkQuizeOpen, setBookmarkQuizeOpen] = useState(false);

  const handleOpenRandomQuize = () => setRandomQuizeOpen(true);
  const handleCloseRandomQuize = () => setRandomQuizeOpen(false);
  const handleOpenPageQuize = () => setPageQuizeOpen(true);
  const handleClosePageQuize = () => setPageQuizeOpen(false);
  const handleOpenBookmarkQuize = () => setBookmarkQuizeOpen(true);
  const handleCloseBookmarkQuize = () => setBookmarkQuizeOpen(false);

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
    <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%", background:"rgba(0,0,0,0.5)"}}>
      <div style={{background:"#fff", width:"1000px", margin:"100px auto", padding:"20px", borderRadius:"8px"}}>
        {randomQuizeOpen && (
          <RandomQuize onClose={handleCloseRandomQuize}/>
        )}

        {pageQuizeOpen && (
          <PageQuize onClose={handleClosePageQuize}/>
        )}

        {bookmarkQuizeOpen && (
          <BookmarkQuize onClose={handleCloseBookmarkQuize}/>
        )}
    
        <div style={{width: "80%", margin: "20px auto", textAlign: "center", display: "flex", justifyContent: "center", gap: "8px"}}>
          <a onClick={handleOpenRandomQuize} >1. 랜덤 퀴즈</a>
        </div>
        <div style={{width: "80%", margin: "20px auto", textAlign: "center", display: "flex", justifyContent: "center", gap: "8px"}}>
          <a onClick={handleOpenPageQuize} >2. 페이지 퀴즈</a>
        </div>
        <div style={{width: "80%", margin: "20px auto", textAlign: "center", display: "flex", justifyContent: "center", gap: "8px"}}>
          <a onClick={handleOpenBookmarkQuize} >3. 북마크 퀴즈</a>
        </div>
      </div>
    </div>
  );
};
