import { useEffect, useRef, useState } from "react";
import { modifyWordApi, registerWordApi } from "../api/WordApi";
import type { Word } from "../types/Word";

type Props = {
    word: Word|null,
    createMode: boolean,
    onClose: () => void;
};


export default function GrammarModal({word, createMode, onClose}:Props) {
    const wordInputElement = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState({
        id: "",
        japanese: "",
        korean: "",
        example: "",
        examplePage: ""
    });

    useEffect(() => {
        wordInputElement.current?.focus();
        setForm({
            id: word?.id ?? "",
            japanese: word?.word ?? "",
            korean: word?.korean.join(",") ?? "",
            example: word?.example ?? "",
            examplePage: word?.examplePage.join(",") ?? ""
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
            type: "GRAMMAR",
            word: form.japanese,
            korean: form.korean.split(','),
            example: form.example,
            examplePage: form.examplePage.split(',')
        });
        onClose();
    }

    const modify = async () => {
        await modifyWordApi({
            id: form.id,
            type: "GRAMMAR",
            word: form.japanese,
            korean: form.korean.split(','),
            example: form.example,
            examplePage: form.examplePage.split(','),
        });
        onClose();
    }


  return (
    <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%",
            background:"rgba(0,0,0,0.5)"}}>

        <div style={{background:"#fff", width:"420px", margin:"100px auto", padding:"20px", borderRadius:"8px"}}>
            <h3>문법 등록</h3>
            {/* <!-- GRAMMAR 유형 --> */}
            <form>
                <div>
                    <div style={inputDivStyle}>
                        <label>문법</label><br />
                        <input type="text" name="japanese" style={inputStyle} ref={wordInputElement} 
                            value={form.japanese} onChange={handleInputChange}
                        />
                    </div>
                    <div style={inputDivStyle}>
                        <label>뜻</label><br />
                        <input type="text" name="korean" style={inputStyle} value={form.korean} onChange={handleInputChange}/>
                    </div>
                    <div style={inputDivStyle}>
                        <label>예시</label><br />
                        <input type="text" name="example" style={inputStyle} value={form.example} onChange={handleInputChange}/>
                    </div>
                    <div style={inputDivStyle}>
                        <label>예시페이지</label><br />
                        <input type="text" name="examplePage" style={inputStyle} value={form.examplePage} onChange={handleInputChange} onKeyDown={enterEvent}/>
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