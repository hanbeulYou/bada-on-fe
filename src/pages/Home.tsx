import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { Address } from '../apis/search/useKakaoSearchQuery';
import useWeatherQuery from '../apis/weather/useWeatherQuery';
import PlaceInfo from '../components/info/PlaceInfo';
import MapComponent from '../components/map/MapComponent';
import Search from '../components/Search';
// import SearchBar from '../components/SearchBar';
import SearchBar from '../components/SearchBar';
import TimeSelect from '../components/timeSelect/TimeSelect';
import TimeSelectHeader from '../components/timeSelect/TimeSelectHeader';
import { Activity } from '../consts/label';
import { AddressContext } from '../context/AddressContext';
import { SafeAreaContext, SafeAreaState } from '../context/SafeAreaContext';
// import { DETAILS_TMP } from '../data/data';
import IndexedDBManager from '../db/IndexedDBManager';
import useDebounce from '../hooks/useDebounce';
import { useReactNativeBridge } from '../hooks/useReactNativeBridge';
import FetchBoundary from '../providers/FetchBoundary';

// 제주 시청 위치
// const initialLocation: LocationData = {
//   latitude: 33.4890113,
//   longitude: 126.4983023,
// };

export type Marker = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

function Home() {
  // const currentHour = new Date();
  const [timeIndex, setTimeIndex] = useState<number>(0);

  const [isSearchPage, setIsSearchPage] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [originalSearchValue, setOriginalSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [dbManager, setDbManager] = useState<IndexedDBManager | null>(null);
  const [filter, setFilter] = useState<Activity>('snorkeling');
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const { data } = useWeatherQuery(selectedMarker?.id, filter);
  const [bottomSheetStatus, setBottomSheetStatus] = useState<
    'middle' | 'full' | 'hidden'
  >('hidden');
  const [timeSelectStatus, setTimeSelectStatus] = useState<'middle' | 'hidden'>(
    'hidden',
  );
  const { sendToRN } = useReactNativeBridge();

  const { state, dispatch } = useContext(AddressContext);
  const { state: safeAreaState, dispatch: safeAreaDispatch } =
    useContext(SafeAreaContext);

  useEffect(() => {
    const safeAreaInsets = (window as any).safeAreaInsets;
    if (safeAreaInsets) {
      safeAreaDispatch({
        type: 'SET_SAFE_AREA',
        payload: safeAreaInsets,
      });
    }
  }, []);

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

  const handleSearchCloseClick = () => {
    dispatch({ type: 'SET_CURRENT_ADDRESS', payload: {} as Address });
    setSearchValue('');
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

  // const handleFilterChange = (selected: Activity) => {
  //   sendToRN({ type: 'POST_ACTIVITY', activity: selected });
  //   setFilter(selected);
  //   setBottomSheetStatus('hidden');
  //   setSelectedMarker(null);
  //   setTimeIndex(0);
  // };

  const updateCurrentAddress = (address: Address) => {
    const MAX_HISTORY = 15;

    if (state.histories.some(history => history.id === address.id)) {
      dispatch({ type: 'DELETE_HISTORY', payload: address.id });
      if (dbManager) dbManager.delete(address.id);
    } else if (state.histories.length >= MAX_HISTORY) {
      const oldestHistory = state.histories[state.histories.length - 1];
      dispatch({ type: 'DELETE_HISTORY', payload: oldestHistory.id });
      if (dbManager) dbManager.delete(oldestHistory.id);
    }

    setSearchValue(address.place_name);
    dispatch({ type: 'ADD_HISTORY', payload: address });
    dispatch({ type: 'SET_CURRENT_ADDRESS', payload: address });
    if (dbManager) dbManager.add(address);
    setIsSearchPage(false);
  };

  const handleClickMarker = (marker: Marker) => {
    setSelectedMarker(marker);
    setTimeIndex(0);
    setBottomSheetStatus('middle');
  };

  return (
    <Container>
      <Header safeArea={safeAreaState}>
        {bottomSheetStatus !== 'full' &&
          (isSearchPage ? (
            <SearchBar
              isSearchPage={isSearchPage}
              onClick={openSearchPage}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onClickBtnBackward={closeSearchPage}
            />
          ) : (
            <TimeSelectHeader
              date={'28'}
              time={'23'}
              onTimeClick={() => setTimeSelectStatus('middle')}
              onMenuClick={() => console.log('menu')}
              hasSearchValue={searchValue.trim().length > 0}
              onSearchOpenClick={openSearchPage}
              onSearchCloseClick={handleSearchCloseClick}
            />
          ))}
      </Header>
      <>
        {isSearchPage && (
          <FetchBoundary>
            <Search
              isSearching={isSearching}
              onClick={updateCurrentAddress}
              onDeleteHistory={deleteHistory}
            />
          </FetchBoundary>
        )}
        {/* {bottomSheetStatus !== 'full' && (
          <FilterList onFilterChange={handleFilterChange} />
        )} */}
        <FetchBoundary>
          <MapComponent
            filter={filter}
            onClickMarker={handleClickMarker}
            selectedMarker={selectedMarker}
            setBottomSheetStatus={setBottomSheetStatus}
          />
        </FetchBoundary>
        {bottomSheetStatus !== 'hidden' &&
          !isSearchPage &&
          selectedMarker &&
          data && (
            <FetchBoundary>
              <PlaceInfo
                title={selectedMarker.name}
                alert={
                  selectedMarker.name === '김녕 세기알 해변' ||
                  selectedMarker.name === '용담포구'
                    ? '다이빙 금지구역'
                    : ''
                }
                dangerValue={data.summary[timeIndex]?.score ?? 0}
                recommends={data.summary[timeIndex]?.message ?? ''}
                activity={filter}
                // currentHour={currentHour}
                timeIndex={timeIndex}
                setTimeIndex={setTimeIndex}
                bottomSheetStatus={bottomSheetStatus}
                setBottomSheetStatus={setBottomSheetStatus}
                detailData={data.details[timeIndex]}
                detailDataLength={data.details.length}
                setSelectedMarker={setSelectedMarker}
              />
            </FetchBoundary>
          )}
        {/* {timeSelectStatus === 'middle' && (
          <TimeSelect
            handleClose={() => setTimeSelectStatus('hidden')}
            setBottomSheetStatus={setBottomSheetStatus}
          />
        )} */}
      </>
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.header<{ safeArea: SafeAreaState }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: ${({ safeArea }) => safeArea.top}px;
  z-index: 2;
`;

export default Home;
