import { useState } from "react";
import { WordTypeValue, type WordQuerySearchType, type WordTypeValueType } from "../api/types/WordType";

const searchTypes = [
  { value: "WORD_TYPE", label: "유형" },
  { value: "WORD", label: "일본어" },
  { value: "KOREAN", label: "뜻" },
  { value: "PAGE", label: "페이지" },
  { value: "PRONUNCIATION", label: "발음" },
];


export default function SearchWord ({onGetQuery}: {onGetQuery: (type?: WordQuerySearchType, value?: string) => void}) {
  const [search, setSearch] = useState<{
    searchType?: WordQuerySearchType;
    searchValue?: string
  }>({
    searchType: "WORD_TYPE",
    searchValue: WordTypeValue.CHINA_CHAR
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
    ) => {
    const { name, value } = e.target;
    setSearch((prev) => ({
        ...prev,
        searchValue: value,
    }));
  };

  const handleTypeChange = (value: WordTypeValueType) => setSearch({...search, searchValue: value});

  const setSearchType = (value: WordQuerySearchType) => {
    if(value === "WORD_TYPE") {
      setSearch({ searchType: value, searchValue: WordTypeValue.CHINA_CHAR});
    }
    else {
      setSearch({ searchType: value, searchValue: ""});      
    }
  }
  const startSearch = () => {
    onGetQuery(search.searchType, search.searchValue);
  }

  return (
    <div style={{display:"flex", justifyContent:"center", gap:"5px"}}>
    <select value={search.searchType} onChange={(e) => setSearchType(e.target.value as WordQuerySearchType )}>
      {searchTypes.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {
      search.searchType === "WORD_TYPE" ? (
        <select value={search.searchValue} onChange={(e) => handleTypeChange(e.target.value as WordTypeValueType )}>
        {
          Object.values(WordTypeValue).map(value => (
          <option key={value} value={value}>
            {value}
          </option>
          )) 
        }
        </select>
      ) : (
        <input type="text" value={search.searchValue} onChange={handleInputChange}/>
      )
    }

    <button type="button" onClick={startSearch}>검색</button>
    </div>
  )
};