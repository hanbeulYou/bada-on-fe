import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import useMapInfoQuery from '../apis/maps/useMapInfoQuery';
import BottomSheet from '../components/BottomSheet';
import Icon from '../components/common/Icon';
// import Map from '../components/common/Map';
import MapTmp from '../components/common/MapTmp';
import FilterList from '../components/FilterList';
import Search from '../components/Search';
import SearchBar from '../components/SearchBar';
import { AddressContext } from '../context/AddressContext';
import { DETAILS_TMP } from '../data/data';
import IndexedDBManager from '../db/IndexedDBManager';
import useDebounce from '../hooks/useDebounce';
import { useReactNativeBridge } from '../hooks/useReactNativeBridge';

// 제주 시청 위치
const initialLocation: LocationData = {
  latitude: 33.4890113,
  longitude: 126.4983023,
};

function Home() {
  const currentHour = new Date().getHours();
  const [pickHour, setPickHour] = useState<number>(currentHour);

  const [isSearchPage, setIsSearchPage] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [originalSearchValue, setOriginalSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [dbManager, setDbManager] = useState<IndexedDBManager | null>(null);
  const [filter, setFilter] = useState('');
  const [selectedMarker, setSelectedMarker] = useState<object | null>(null);
  // const { data, isLoading } = useMapInfoQuery(selectedMarker?.id);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);
  const [isBottomSheetFull, setIsBottomSheetFull] = useState(false);
  const { sendToRN } = useReactNativeBridge();

  const { state, dispatch } = useContext(AddressContext);

  useEffect(() => {
    sendToRN({ type: 'GET_LOCATION' });
  }, []);

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
        {isBottomSheetFull ? (
          <CloseBottomSheet>
            <button
              onClick={() => {
                setIsBottomSheetFull(false);
                setIsBottomSheetOpen(false);
              }}
            >
              <Icon name="chevron-down" />
            </button>
          </CloseBottomSheet>
        ) : (
          <SearchBar
            isSearchPage={isSearchPage}
            onClick={openSearchPage}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onClickBtnBackward={closeSearchPage}
          />
        )}
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
        {/* <Map
          filter={filter}
          onClickMarker={handleClickMarker}
          location={location ?? initialLocation}
        /> */}
        <MapTmp filter={filter} onClickMarker={handleClickMarker} />
        {isBottomSheetOpen && selectedMarker && (
          <BottomSheet
            title={selectedMarker.name}
            alert={
              selectedMarker.name === '김녕 세기알 해변' ||
              selectedMarker.name === '용담포구'
                ? '다이빙 금지구역'
                : ''
            }
            dangerValue={DETAILS_TMP[pickHour - currentHour].score}
            recommends={DETAILS_TMP[pickHour - currentHour].feedback}
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

const CloseBottomSheet = styled.div`
  display: flex;
  width: 100%;
  height: 84px;
  padding: 18px 32px 12px 32px;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
`;

export default Home;
