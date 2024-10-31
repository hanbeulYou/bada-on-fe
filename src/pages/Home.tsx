import { useState, useContext } from 'react';
import styled from 'styled-components';

import BottomSheet from '../components/BottomSheet';
import Map from '../components/common/Map';
import RollList from '../components/RollList';
import Search from '../components/Search';
import SearchBar from '../components/SearchBar';
import { AddressContext } from '../context/AddressContext';

function Home() {
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [originalSearchValue, setOriginalSearchValue] = useState('');

  const { dispatch } = useContext(AddressContext);

  const handleEnter = () => {
    dispatch({ type: 'SET_SEARCH_KEYWORD', payload: searchValue });
  };

  const closeSearchPage = () => {
    setSearchValue(originalSearchValue);
    setIsSearchPage(false);
  };

  const openSearchPage = () => {
    setOriginalSearchValue(searchValue);
    setIsSearchPage(true);
  };

  const updateCurrentAddress = (address: object) => {
    setSearchValue(address.address_name);
    dispatch({ type: 'SET_CURRENT_ADDRESS', payload: address });
    setIsSearchPage(false);
  };

  return (
    <Container>
      <Header>
        {isSearchPage ? (
          <CloseButton onClick={closeSearchPage}>X</CloseButton>
        ) : null}
        <SearchBar
          onClick={openSearchPage}
          onEnter={handleEnter}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </Header>
      <>
        {isSearchPage && (
          <Search searchValue={searchValue} onClick={updateCurrentAddress} />
        )}
        <RollList />
        <Map />
        <BottomSheet>
          <div>Hello World</div>
        </BottomSheet>
      </>
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
  z-index: 12;
`;

const CloseButton = styled.div`
  position: relative;
  display: flex;
  padding-left: 16px;
`;

export default Home;
