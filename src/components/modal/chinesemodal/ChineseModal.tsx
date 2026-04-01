import { useEffect, useRef, useState } from "react";
import { modifyWordApi, registerWordApi } from "../../../api/WordApi";
import type { Word } from "../../../types/Word";
import type { ModalType } from "../../../App";

type Props = {
    word: Word|null,
    mode: ModalType,
    onClose: () => void;
};

export default function ChineseModal({word, mode, onClose}:Props) {
    const wordInputElement = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState({
        id: "",
        japanese: "",
        korean: "",
        lastPronunciation: "",
        meaningPronunciation: "",
        example: "",
        exampleKorean: "",
        bookPage: "",
        examplePage: ""
    });

    useEffect(() => {
        wordInputElement.current?.focus();
        setForm({
            id: word?.id ?? "",
            japanese: word?.word ?? "",
            korean: word?.korean.join(",") ?? "",
            lastPronunciation: word?.lastPronunciation?.join(",") ?? "",
            meaningPronunciation: word?.meaningPronunciation?.join(",") ?? "",
            example: word?.example ?? "",
            exampleKorean: word?.exampleKorean ?? "",
            bookPage: word?.bookPage?.toString() ?? "",
            examplePage: word?.examplePage.join(",") ?? "",
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
            switch(mode) {
                case "CREATE":
                    submitAndClose();
                    break;
                case "MODIFY":
                    modify();
                    break;
            }
        }   
    };

    const submitAndClose = async() => {
        const res = await registerWordApi({
            type: "CHINA_CHAR",
            word: form.japanese,
            korean: form.korean.split(','),
            lastPronunciation: form.lastPronunciation.split(','),
            meaningPronunciation: form.meaningPronunciation.split(','),
            example: form.example,
            exampleKorean: form.exampleKorean,
            bookPage: parseInt(form.bookPage),
            examplePage: form.examplePage.split(','),
        });
        
        if(res) {
            onClose();
        }
    }

    const modify = async () => {
        await modifyWordApi({
            id: form.id,
            type: "CHINA_CHAR",
            word: form.japanese,
            korean: form.korean.split(','),
            lastPronunciation: form.lastPronunciation.split(','),
            meaningPronunciation: form.meaningPronunciation.split(','),
            example: form.example,
            exampleKorean: form.exampleKorean,
            bookPage: parseInt(form.bookPage),
            examplePage: form.examplePage.split(','),
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
                        <input type="text" name="japanese" style={inputStyle} ref={wordInputElement} value={form.japanese} onChange={handleInputChange}/>
                    </div>
                    <div style={inputDivStyle}>
                        <label>뜻[여러개]</label><br />
                        <input type="text" name="korean" style={inputStyle} value={form.korean} onChange={handleInputChange} />
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
                        <label>예시</label><br />
                        <input type="text" name="example" style={inputStyle} value={form.example} onChange={handleInputChange} />
                    </div>
                    <div style={inputDivStyle}>
                        <label>예시 발음</label><br />
                        <input type="text" name="exampleKorean" style={inputStyle} value={form.exampleKorean} onChange={handleInputChange} />
                    </div>
                    <div style={inputDivStyle}>
                        <label>책 page</label><br />
                        <input type="text" name="bookPage" style={inputStyle} value={form.bookPage} onChange={handleInputChange} />
                    </div>
                    <div style={inputDivStyle}>
                        <label>출처</label><br />
                        <input type="text" name="examplePage" style={inputStyle} value={form.examplePage} onChange={handleInputChange} onKeyDown={enterEvent} />
                    </div>
                </div>

                <div style={{textAlign:"right", marginTop:"15px"}}>
                    {
                        mode == "CREATE" ? (
                            <button type="button" name="createBtn" onClick={submitAndClose}>등록</button>
                        ):(
                            mode == "MODIFY" ?
                            (<button type="button" name="modifyBtn" onClick={modify}>수정</button>)
                            : (null)
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