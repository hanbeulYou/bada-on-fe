import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import BottomSheet from '../components/BottomSheet';
import Map from '../components/common/Map';
import RollList from '../components/RollList';
import Search from '../components/Search';
import SearchBar from '../components/SearchBar';
import { AddressContext } from '../context/AddressContext';
import IndexedDBManager from '../db/IndexedDBManager';
import useDebounce from '../hooks/useDebounce';

function Home() {
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [originalSearchValue, setOriginalSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [dbManager, setDbManager] = useState<IndexedDBManager | null>(null);

  const { dispatch } = useContext(AddressContext);

  useEffect(() => {
    setSearchValueDebounce();
  }, [searchValue]);

  useEffect(() => {
    initIndexedDB();
  }, []);

  const initIndexedDB = async () => {
    const manager = IndexedDBManager.getInstance('MyDatabase', 'MyStore');
    await manager.init();
    setDbManager(manager);
    const histories = (await manager.getAll()) || [];
    console.log('histories', histories);
    dispatch({ type: 'SET_HISTORIES', payload: histories });
  };

  const setSearchValueDebounce = useDebounce(() => {
    dispatch({ type: 'SET_SEARCH_KEYWORD', payload: searchValue });
    setIsSearching(searchValue.trim().length > 0);
  }, 200);

  const closeSearchPage = () => {
    setSearchValue(originalSearchValue);
    setIsSearchPage(false);
  };

  const deleteHistory = (id: number) => {
    if (dbManager) dbManager.delete(id);
    dispatch({ type: 'DELETE_HISTORY', payload: id });
  };

  const openSearchPage = () => {
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
    setSearchValue('');
    setOriginalSearchValue(searchValue);
    setIsSearchPage(true);
    setIsSearching(false);
  };

  const updateCurrentAddress = (address: object) => {
    setSearchValue(address.address_name);
    dispatch({ type: 'ADD_HISTORY', payload: address });
    dispatch({ type: 'SET_CURRENT_ADDRESS', payload: address });
    dbManager.add(address);
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
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </Header>
      <>
        {isSearchPage && (
          <Search
            isSearching={isSearching}
            onClick={updateCurrentAddress}
            onDeleteHistory={deleteHistory}
          />
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
