import { useEffect, useState } from 'react'
import './App.css'
import { getWordsApi } from './api/WordApi';
import WordTable from './components/WordTable';
import type { PageWord } from './api/types/PageWordResponse';
import WordModal from './components/WordModal';
import type { Word } from './types/Word';
import ChineseModal from './components/ChineseModal';
import SearchWord from './components/ SearchWord ';
import QuizeModal from './components/quize/QuizeModal';
import GrammarModal from './components/GrammarModal';
import type { WordQuery, WordQuerySearchType } from './api/types/WordType';

const ModalValue = {
  CREATE: "CREATE",
  MODIFY: "MODIFY",
  VIEW: "VIEW"
} as const;

export type ModalType = typeof ModalValue[keyof typeof ModalValue];


function App() {
  const [getQuery, setGetQuery] = useState<WordQuery>({
    page: 1,
    size: 10,
  });
  const [pageWord, setPageWord] = useState<PageWord|null>(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wordModalOpen, setWordModalOpen] = useState(false);
  const [chineseModalOpen, setChineseModalOpen] = useState(false);
  const [quizeModalOpen, setQuizeModalOpen] = useState(false);
  const [grammarModalOpen, setGrammarModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalType>("CREATE");
  const [word, setWord] = useState<Word|null>(null);

  useEffect(() => {
    getWordsApi(getQuery)
      .then(setPageWord)
      .catch((error) => {
        console.error("API 호출 실패", error);
      })
      .finally(() => setLoading(false));
  }, [refresh, getQuery]);

  const handleOpenWordModal = () => {
    setWord(null);
    setModalMode("CREATE")
    // setCreateMode(true);
    setWordModalOpen(true);
  };

  const handleCloseWordModal = () => {
    setWordModalOpen(false);
    onRefresh();
  };

  const handleOpenChineseModal = () => {
    setWord(null);
    setModalMode("CREATE")
    setChineseModalOpen(true);
  };

  const handleCloseChineseModal = () => {
    setChineseModalOpen(false);
    onRefresh();
  };

  const handleOpenGrammarModal = () => {
    setWord(null);
    setModalMode("CREATE")
    setGrammarModalOpen(true);
  };

  const handleCloseGrammarModal = () => {
    setGrammarModalOpen(false);
    onRefresh();
  };

  const handleOpenQuizeModal = () => setQuizeModalOpen(true);

  const handleCloseQuizeModal = () => {
    setQuizeModalOpen(false);
  };

  const onGetQuery = (type?: WordQuerySearchType, value?: string) => {
    if(type != null && value != null) {
      setGetQuery({
        page: 1,
        size: 10, 
        searchType: type, 
        searchValue: value
      })
    }
  };
  const onCurrentPage = (page: number) => setGetQuery({...getQuery, page: page});
  const onReset = () => setGetQuery({page: 1, size:10});
  const onRefresh = () => setRefresh(!refresh);
  const onOpenModal = (word: Word, mode: ModalType) => {
    setWord(word);
    mode == "MODIFY" ? setModalMode("MODIFY") : setModalMode("VIEW");

    switch(word.type) {
      case "WORD":
        setWordModalOpen(true);
        break;
      case "CHINA_CHAR":
        setChineseModalOpen(true);
        break;
      case "GRAMMAR":
        setGrammarModalOpen(true);
        break;
    }
  };

  return (
    <>
    <h2 style={{textAlign: "center"}}><a onClick={onReset}>📘 일본어 단어 학습</a></h2>

    {wordModalOpen && (
      <WordModal onClose={handleCloseWordModal} mode={modalMode} word={word}/>
    )}

    {chineseModalOpen && (
      <ChineseModal onClose={handleCloseChineseModal} mode={modalMode} word={word}/>
    )}

    {grammarModalOpen && (
      <GrammarModal onClose={handleCloseGrammarModal} mode={modalMode} word={word}/>
    )}

    {quizeModalOpen && (
      <QuizeModal onClose={handleCloseQuizeModal}/>
    )}

    <div style={{width: "80%", margin: "20px auto", textAlign: "right", display: "flex", justifyContent: "flex-end", gap: "8px"}}>
      <SearchWord onGetQuery={onGetQuery}/>
      <a onClick={handleOpenWordModal} >➕ 단어 등록</a>
      <a onClick={handleOpenChineseModal} >➕ 한자 등록</a>
      <a onClick={handleOpenGrammarModal} >➕ 문법 등록</a>
      <a onClick={handleOpenQuizeModal} >Q. 퀴즈풀기</a>
    </div>

    <div>
      {loading ? (
        <p>로딩 중...</p>
      ) : !pageWord ? (
        <p>데이터 로딩 에러...</p>
      ) : (
        <WordTable pageWord={pageWord} onReset={onRefresh} onOpenModal={onOpenModal} onCurrentPage={onCurrentPage}/>
      )}
    </div>
    </>
  );
}

export default App
