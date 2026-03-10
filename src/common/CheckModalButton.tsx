import { useEffect, useState } from "react";

type Props = {
    text: string;
    callFunction: (...args: any[]) => any;
    args: any[]
}

function CheckModal({text, callFunction, args, onClose}: {
  text: string,
  callFunction: (...args: any[]) => void,
  args: any[],
  onClose: () => void
}) {
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
    <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%", background:"rgba(0,0,0, 0.5)"}}>
        <div style={{background:"#fff", width:"420px", margin:"100px auto", padding:"20px", borderRadius:"8px",
          gap: "10px", display: "flex", flexDirection: "column"}}>
          <div>정말로 {text} 하시겠습니까?</div>
          <div style={{display: "flex", justifyContent: "center", gap: "5px"}}>
            <div>
              <button type="button" onClick={() => callFunction(args)}>{text}</button>
            </div>
            <div>
              <button type="button" onClick={onClose}>취소</button>
            </div>
          </div>
        </div>
    </div>
  );
}


export default function CheckModalButton({text, callFunction, args}:Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

    return (
      <>
        {modalOpen && (
          <CheckModal onClose={closeModal} text={text} callFunction={callFunction} args={args}/>
        )}
        <button type="button" onClick={openModal}>{text}</button>
      </>
    )
}