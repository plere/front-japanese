import { useNavigate } from "react-router-dom";
import type { Word } from "../../types/Word";
type Props = {
  word: Word
};

export default function AddLinkButton({word}:Props) {
  const navigate = useNavigate();

  return (
    <button style={{fontSize: "20px", height: "20px", width: "20px", display: "flex",
      justifyContent: "center", alignItems: "center"}} type="button" onClick={() => navigate(`/add/linkword/${word.id}`)}>
      ✚
    </button>
  )
}