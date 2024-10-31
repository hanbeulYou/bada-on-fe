import React, { useState } from 'react';
import styled from 'styled-components';

import BottomSheet from '../components/BottomSheet';
import RollList from '../components/RollList';
import Search from '../components/Search';
import SearchBar from '../components/SearchBar';

function Home() {
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <Container>
      <Header>
        {isSearchPage ? (
          <CloseButton onClick={() => setIsSearchPage(false)}>X</CloseButton>
        ) : null}
        <SearchBar
          onClick={() => !isSearchPage && setIsSearchPage(prev => !prev)}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </Header>
      {isSearchPage ? (
        <Search searchValue={searchValue} />
      ) : (
        <>
          <RollList />
          <MapTmp />
          <BottomSheet>
            <div>Hello World</div>
          </BottomSheet>
        </>
      )}
    </Container>
  );
}

const MapTmp = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: aqua;
`;

const Container = styled.div``;

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CloseButton = styled.div`
  display: flex;
  padding-left: 16px;
`;

export default Home;
