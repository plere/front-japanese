import { useState } from "react";
import { deleteBookmarkApi, registerBookmarkApi } from "../api/BookmarkApi";

export default function BookmarkButton({isBookmark, wordId}:{
    isBookmark: boolean,
    wordId: string
  }
) {
  const [checkBookmark, setCheckBookmark] = useState<boolean>(isBookmark)
  
  const toggleBookmark = async () => {
    if(checkBookmark) {
      await deleteBookmarkApi(wordId);
    } else {
      await registerBookmarkApi(wordId);
    }

    setCheckBookmark(!checkBookmark);
  };

  return (
    <button type="button" onClick={toggleBookmark}>
      {checkBookmark ? "⭐":"☆"}
    </button>
  );
}