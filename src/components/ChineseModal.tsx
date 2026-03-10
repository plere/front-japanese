import { useEffect, useRef, useState } from "react";
import { modifyWordApi, registerWordApi } from "../api/WordApi";
import type { Word } from "../types/Word";

type Props = {
    word: Word|null,
    createMode: boolean,
    onClose: () => void;
};

export default function ChineseModal({word, createMode, onClose}:Props) {
    const wordInputElement = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState({
        id: "",
        japanese: "",
        korean: "",
        lastPronunciation: "",
        meaningPronunciation: "",
        bookPage: "",
        webLink: "",
        source: ""
    });

    useEffect(() => {
        wordInputElement.current?.focus();
        setForm({
            id: word?.id ?? "",
            japanese: word?.word ?? "",
            korean: word?.korean.join(",") ?? "",
            lastPronunciation: word?.lastPronunciation?.join(",") ?? "",
            meaningPronunciation: word?.meaningPronunciation?.join(",") ?? "",
            bookPage: word?.bookPage?.toString() ?? "",
            webLink: word?.webLink ?? "",
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
            type: "CHINA_CHAR",
            word: form.japanese,
            korean: form.korean.split(','),
            lastPronunciation: form.lastPronunciation.split(','),
            meaningPronunciation: form.meaningPronunciation.split(','),
            bookPage: parseInt(form.bookPage),
            webLink: form.webLink,
            source: form.source
        });
        onClose();
    }

    const modify = async () => {
        await modifyWordApi({
            id: form.id,
            type: "CHINA_CHAR",
            word: form.japanese,
            korean: form.korean.split(','),
            lastPronunciation: form.lastPronunciation.split(','),
            meaningPronunciation: form.meaningPronunciation.split(','),
            bookPage: parseInt(form.bookPage),
            webLink: form.webLink,
            source: form.source
        });
        onClose();
    }


  return (
    <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%",
            background:"rgba(0,0,0,0.5)"}}>

        <div style={{background:"#fff", width:"420px", margin:"100px auto", padding:"20px", borderRadius:"8px"}}>
            <h3>단어 등록</h3>
            {/* <!-- CHINA_CHAR 유형 --> */}
            <form>
                <div>
                    <div style={inputDivStyle}>
                        <label>한자</label><br />
                        <input type="text" name="japanese" style={inputStyle} ref={wordInputElement} 
                            value={form.japanese} onChange={handleInputChange}
                        />
                    </div>
                    <div style={inputDivStyle}>
                        <label>뜻[여러개]</label><br />
                        <input type="text" name="korean" style={inputStyle} value={form.korean} onChange={handleInputChange}/>
                    </div>
                    <div style={inputDivStyle}>
                        <label>음독</label><br />
                        <input type="text" name="lastPronunciation" style={inputStyle} value={form.lastPronunciation} onChange={handleInputChange} />
                    </div>
                    <div style={inputDivStyle}>
                        <label>훈독</label><br />
                        <input type="text" name="meaningPronunciation" style={inputStyle} value={form.meaningPronunciation} onChange={handleInputChange} />
                    </div>
                    <div style={inputDivStyle}>
                        <label>책 page</label><br />
                        <input type="text" name="bookPage" style={inputStyle} value={form.bookPage} onChange={handleInputChange} />
                    </div>
                    <div style={inputDivStyle}>
                        <label>링크</label><br />
                        <input type="text" name="webLink" style={inputStyle} value={form.webLink} onChange={handleInputChange} />
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