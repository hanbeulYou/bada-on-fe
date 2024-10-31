import React from 'react';

import ColList from './common/ColList';
import SearchItem from './common/SearchItem';

type SearchProps = { searchValue: string };

const isEmptyOrWhitespace = (str: string) => {
  return str.trim().length === 0;
};

// 검색 결과 및 히스토리 페이지입니다.
const Search: React.FC<SearchProps> = ({ searchValue }) => {
  const isValidSearch = isEmptyOrWhitespace(searchValue);
  const histories = ['history1', 'history2', 'history3']; // localStorage.getItem('histories')
  const searchResults = ['result1', 'result2', 'result3']; // useQuery 값으로 대체

  return (
    <div>
      {isValidSearch ? (
        <>
          <h1>History Page</h1>
          <ColList>
            {histories?.map((history, index) => (
              <SearchItem key={index} isHistory={true} content={history} />
            ))}
          </ColList>
        </>
      ) : (
        <>
          <h1>Search Page</h1>
          <ColList>
            {searchResults?.map((result, index) => (
              <SearchItem key={index} isHistory={false} content={result} />
            ))}
          </ColList>
        </>
      )}
      {/* Add your search functionality here */}
    </div>
  );
};

export default Search;
