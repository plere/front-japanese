import { useEffect, useState } from "react";
import type { Word } from "../../types/Word";
import ViewWord from "./wordmodal/ViewWord";
import { useParams } from "react-router-dom";
import { getWordApi } from "../../api/WordApi";
import ViewChinese from "./chinesemodal/ViewChinese";
import ViewGrammar from "./grammarmodal/ViewGrammar";

export default function ViewPage() {
  const { id } = useParams<{id: string}>();
  const [word, setWord] = useState<Word|null>();


  useEffect(() => {
    getWordApi(id!)
      .then(res => {
        console.log("res");
        console.log(res);
        setWord(res);

      })
      .catch((error) => {
        console.error("getWordApi 호출 실패", error);
      })
  }, [id])

  return (
    <>
     {
      word && (word!.type == "WORD" ? <ViewWord word={word!} /> :
        word!.type == "CHINA_CHAR" ? <ViewChinese word={word!} /> : <ViewGrammar word={word} />)
     }
    </>
  );
}