import { useEffect, useRef, useState } from "react";
import { modifyWordApi, registerWordApi } from "../api/WordApi";
import type { Word } from "../types/Word";

type Props = {
    word: Word|null,
    createMode: boolean,
    onClose: () => void;
};


export default function WordModal({word, createMode, onClose}:Props) {
    const wordInputElement = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState({
        id: "",
        japanese: "",
        pronunciation: "",
        korean: "",
        source: ""
    });

    useEffect(() => {
        wordInputElement.current?.focus();
        setForm({
            id: word?.id ?? "",
            japanese: word?.word ?? "",
            pronunciation: word?.pronunciation ?? "",
            korean: word?.korean.join(",") ?? "",
            source: word?.source ?? ""
        })

        const escHandler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        
        window.addEventListener("keydown", escHandler); 

        return () => {
            window.removeEventListener("keydown", escHandler)
        };
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
        ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const enterEvent = (e: React.KeyboardEvent<HTMLInputElement> ) => {
        if (e.key === "Enter") {
            if(createMode) {
                submitAndClose();
            } else {
                modify();
            }
        }   
    };

    const submitAndClose = async() => {
        await registerWordApi({
            type: "WORD",
            word: form.japanese,
            pronunciation: form.pronunciation,
            korean: form.korean.split(','),
            source: form.source
        });
        onClose();
    }

    const modify = async () => {
        await modifyWordApi({
            id: form.id,
            type: "WORD",
            word: form.japanese,
            pronunciation: form.pronunciation,
            korean: form.korean.split(','),
            source: form.source
        });
        onClose();
    }


  return (
    <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%",
            background:"rgba(0,0,0,0.5)"}}>

        <div style={{background:"#fff", width:"420px", margin:"100px auto", padding:"20px", borderRadius:"8px"}}>
            <h3>단어 등록</h3>
            {/* <!-- WORD 유형 --> */}
            <form>
                <div>
                    {/* <input type="hidden" name="mode">
                    <input type="hidden" name="id"> */}

                    <div style={inputDivStyle}>
                        <label>일본어 단어</label><br />
                        <input type="text" name="japanese" style={inputStyle} ref={wordInputElement} 
                            value={form.japanese} onChange={handleInputChange}
                        />
                    </div>

                    <div style={inputDivStyle}>
                        <label>발음</label><br />
                        <input type="text" name="pronunciation" style={inputStyle} value={form.pronunciation} onChange={handleInputChange}/>
                    </div>
                    <div style={inputDivStyle}>
                        <label>뜻[여러개]</label><br />
                        <input type="text" name="korean" style={inputStyle} value={form.korean} onChange={handleInputChange}/>
                    </div>
                    <div style={inputDivStyle}>
                        <label>출처</label><br />
                        <input type="text" name="source" style={inputStyle} value={form.source} onChange={handleInputChange} onKeyDown={enterEvent}/>
                    </div>
                </div>

                <div style={{textAlign:"right", marginTop:"15px"}}>
                    {
                        createMode ? (
                            <button type="button" name="createBtn" onClick={submitAndClose}>등록</button>
                        ):(
                            <button type="button" name="modifyBtn" onClick={modify}>수정</button>
                        )
                    }
                    <button type="button" onClick={onClose}>취소</button>
                </div>
            </form>
        </div>
    </div>
  );
}
const inputStyle = {
    width:"100%",
    height:"40px",
    fontSize:"20px",
    background: "#fff",
    color: "#000"
};

const inputDivStyle = {
    marginBottom:"10px"   
}