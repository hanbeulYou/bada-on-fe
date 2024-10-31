import React, { useContext } from 'react';
import styled from 'styled-components';

import { AddressContext } from '../context/AddressContext';

import ColList from './common/ColList';
import SearchItem from './common/SearchItem';

type SearchProps = {
  onClick?: (address: string) => void;
  onDeleteHistory?: (id: number) => void;
  isSearching: boolean;
};

const Search: React.FC<SearchProps> = ({
  onClick,
  onDeleteHistory,
  isSearching,
}) => {
  const { state } = useContext(AddressContext);

  return (
    <Container>
      {isSearching ? (
        <>
          {state.searchResults?.length === 0 ? (
            <div>검색 결과가 없습니다.</div>
          ) : (
            <ColList>
              {state.searchResults?.map((result, index) => (
                <SearchItem
                  key={index}
                  isHistory={false}
                  content={result.address_name}
                  onClick={() => onClick && onClick(result)}
                />
              ))}
            </ColList>
          )}
        </>
      ) : (
        <>
          <ColList>
            {state.histories?.map((history, index) => (
              <>
                <SearchItem
                  key={index}
                  isHistory={true}
                  content={history.address_name}
                  onClick={() => onClick && onClick(history)}
                />
                <button onClick={() => onDeleteHistory(history.id)}>
                  삭제
                </button>
              </>
            ))}
          </ColList>
        </>
      )}
      {/* Add your search functionality here */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px 20px; // TODO: padding-top을 검색바 높이만큼 조절하기!
  position: absolute;
  z-index: 3;
  background-color: #fff;
  width: 100%;
  height: 100%;
}
`;

export default Search;
