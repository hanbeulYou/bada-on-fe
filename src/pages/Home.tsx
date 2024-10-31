import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import useMapInfoQuery from '../apis/maps/useMapInfoQuery';
import BottomSheet from '../components/BottomSheet';
import ContentBox from '../components/common/ContentBox';
import Map from '../components/common/Map';
import FilterList from '../components/FilterList';
import Search from '../components/Search';
import SearchBar from '../components/SearchBar';
import { AddressContext } from '../context/AddressContext';
import IndexedDBManager from '../db/IndexedDBManager';
import useDebounce from '../hooks/useDebounce';

function Home() {
  const EXAMPLE_DATA = {
    title: '세기알 해변',
    alert: '다이빙 금지 구역 (간조 시간 절대 금지)',
    dangerValue: 73,
    recommends: [
      { title: '스노클링', description: '맑은 시야 덕분에 강력 추천!' },
      { title: '해수욕', description: '잔잔한 파도로 편안하게 즐기기 좋아요' },
    ],
    now: 19,
  };

  const currentHour = new Date().getHours();
  const [pickHour, setPickHour] = useState<number>(currentHour);

  const [isSearchPage, setIsSearchPage] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [originalSearchValue, setOriginalSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [dbManager, setDbManager] = useState<IndexedDBManager | null>(null);
  const [filter, setFilter] = useState('');
  const [selectedMarker, setSelectedMarker] = useState<object | null>(null);
  const { data, isLoading } = useMapInfoQuery(selectedMarker?.id);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);
  const [isBottomSheetFull, setIsBottomSheetFull] = useState(false);

  const { state, dispatch } = useContext(AddressContext);

  useEffect(() => {
    setSearchValueDebounce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    initIndexedDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initIndexedDB = async () => {
    const manager = IndexedDBManager.getInstance('MyDatabase', 'MyStore');
    await manager.init();
    setDbManager(manager);
    const histories = (await manager.getAll()) || [];
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

  const handleFilterChange = (selected: string) => {
    setFilter(selected);
  };

  const updateCurrentAddress = (address: object) => {
    const MAX_HISTORY = 15;

    if (state.histories.length >= MAX_HISTORY) {
      const oldestHistory = state.histories.at(-1);
      dispatch({ type: 'DELETE_HISTORY', payload: oldestHistory.id });
      dbManager.delete(oldestHistory.id);
    }

    setSearchValue(address.address_name);
    dispatch({ type: 'ADD_HISTORY', payload: address });
    dispatch({ type: 'SET_CURRENT_ADDRESS', payload: address });
    dbManager.add(address);
    setIsSearchPage(false);
  };

  const handleClickMarker = (marker: object) => {
    setSelectedMarker(marker);

    setIsBottomSheetOpen(true);
  };

  return (
    <Container>
      <Header>
        <SearchBar
          isSearchPage={isSearchPage}
          onClick={openSearchPage}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onClickBtnBackward={closeSearchPage}
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
        {!isBottomSheetFull && (
          <FilterList onFilterChange={handleFilterChange} />
        )}
        <Map filter={filter} onClickMarker={handleClickMarker} />
        {isBottomSheetOpen && selectedMarker && data && (
          <BottomSheet
            title={selectedMarker.name}
            alert={EXAMPLE_DATA.alert}
            dangerValue={data.details[pickHour - currentHour].score}
            recommends={data.details[pickHour - currentHour].feedback}
            defaultTime={currentHour}
            pickHour={pickHour}
            setPickHour={setPickHour}
            onClosed={() => {
              setIsBottomSheetOpen(false);
              setIsBottomSheetFull(false);
            }}
            isFull={isBottomSheetFull}
            onMiddle={() => setIsBottomSheetFull(false)}
            onFull={() => setIsBottomSheetFull(true)}
          />
        )}
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

export default Home;
