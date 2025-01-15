import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { Address } from '../apis/search/useKakaoSearchQuery';
import useAvailableTimeQuery from '../apis/weather/useAvailableTimeQuery';
import useWeatherQuery from '../apis/weather/useWeatherQuery';
import PlaceInfo from '../components/info/PlaceInfo';
import MapComponent from '../components/map/MapComponent';
import Search from '../components/Search';
import SearchBar from '../components/SearchBar';
import TimeSelect from '../components/timeSelect/TimeSelect';
import TimeSelectHeader from '../components/timeSelect/TimeSelectHeader';
import { Activity } from '../consts/label';
import { AddressContext } from '../context/AddressContext';
import { SafeAreaContext, SafeAreaState } from '../context/SafeAreaContext';
import IndexedDBManager from '../db/IndexedDBManager';
import useDebounce from '../hooks/useDebounce';
import { useReactNativeBridge } from '../hooks/useReactNativeBridge';
import FetchBoundary from '../providers/FetchBoundary';
import { DateFormat } from '../utils/timeFormat';

export type Marker = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
};

export interface FilterTime {
  date: number;
  hour: number;
}

function Home() {
  const currentTime = new Date();

  const [filterTime, setFilterTime] = useState<FilterTime>({
    date: +DateFormat(currentTime),
    hour: currentTime.getHours(),
  });
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [originalSearchValue, setOriginalSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [dbManager, setDbManager] = useState<IndexedDBManager | null>(null);
  const [filter, setFilter] = useState<Activity>('snorkeling');
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const { data } = useWeatherQuery(
    selectedMarker?.id,
    filterTime.date,
    filterTime.hour,
  );
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

  const { data: availableTimeData } = useAvailableTimeQuery(
    currentTime.getDate(),
    currentTime.getHours(),
  );

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
              date={filterTime.date.toString().slice(-2)}
              time={filterTime.hour.toString()}
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
                address={selectedMarker.address}
                filterTime={filterTime}
                summaryData={data.summary}
                detailData={data.details}
                bottomSheetStatus={bottomSheetStatus}
                setBottomSheetStatus={setBottomSheetStatus}
                setSelectedMarker={setSelectedMarker}
              />
            </FetchBoundary>
          )}
        {timeSelectStatus === 'middle' && availableTimeData && (
          <TimeSelect
            handleClose={() => setTimeSelectStatus('hidden')}
            setBottomSheetStatus={setBottomSheetStatus}
            filterTime={filterTime}
            setFilterTime={setFilterTime}
            availableTimeData={availableTimeData}
          />
        )}
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
  z-index: 10;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;

export default Home;
