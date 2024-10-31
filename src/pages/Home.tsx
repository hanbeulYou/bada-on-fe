import { useState } from 'react';
import styled from 'styled-components';

import BottomSheet from '../components/BottomSheet';
import Map from '../components/common/Map';
import RollList from '../components/RollList';
import Search from '../components/Search';
import SearchBar from '../components/SearchBar';
import localKey from '../consts/localKey';

function Home() {
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleEnter = () => {
    sessionStorage.setItem(localKey.searchKeyword, searchValue); // TODO: 키를 상수로 분리
    closeSearchPage();
  };

  const closeSearchPage = () => {
    const localSearchValue = sessionStorage.getItem(localKey.searchKeyword);
    setSearchValue(localSearchValue || '');
    setIsSearchPage(false);
  };

  return (
    <Container>
      <Header>
        {isSearchPage ? (
          <CloseButton onClick={closeSearchPage}>X</CloseButton>
        ) : null}
        <SearchBar
          onClick={() => !isSearchPage && setIsSearchPage(prev => !prev)}
          onEnter={handleEnter}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </Header>
      {isSearchPage ? (
        <Search searchValue={searchValue} />
      ) : (
        <>
          <RollList />
          <Map />
          <BottomSheet>
            <div>Hello World</div>
          </BottomSheet>
        </>
      )}
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  z-index: 2;
`;

const CloseButton = styled.div`
  position: relative;
  display: flex;
  padding-left: 16px;
`;

export default Home;
