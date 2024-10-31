import { useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';

import { AddressContext } from '../../context/AddressContext';
import KakaoMapManager from '../../helpers/kakaoMapManger';

const JejuMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { dispatch, state } = useContext(AddressContext);
  const kakaoMapManager = useRef<KakaoMapManager | null>(null);

  useEffect(() => {
    const args = {
      mapContainer: mapContainer.current,
      boundary: [
        [33.086415360763105, 126.07509577087393],
        [33.628831954811545, 126.98830359334572],
      ],
    };
    kakaoMapManager.current = new KakaoMapManager(args);
  }, []);

  useEffect(() => {
    if (!kakaoMapManager.current) return;

    kakaoMapManager.current.initializeMap(33.3617, 126.5292);
    if (state.searchKeyword) {
      kakaoMapManager.current.searchPlaces(state.searchKeyword, onSearch);
    }
  }, [kakaoMapManager.current]);

  useEffect(() => {
    if (kakaoMapManager.current && state.searchKeyword) {
      kakaoMapManager.current.searchPlaces(state.searchKeyword, onSearch);
    }
  }, [state.searchKeyword]);

  useEffect(() => {
    if (kakaoMapManager.current) {
      kakaoMapManager.current.setMarker(state.currentAddress);
    }
  }, [state.currentAddress]);

  const onSearch = (places, status, currStatus) => {
    const JEJUPlaces = places.filter(place => {
      return place.address_name.includes('제주특별자치도');
    });
    const hasInvalidPlaces = places.length > JEJUPlaces.length;

    // TODO: 핸들링 추가하기
    if (JEJUPlaces.length === 0 && hasInvalidPlaces) {
      // alert('제주특별자치도에 해당하는 장소가 없습니다');
    } else if (status === currStatus.OK) {
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: JEJUPlaces });
    } else if (status === currStatus.ZERO_RESULT) {
      // alert('검색 결과가 존재하지 않습니다.');
    } else if (status === currStatus.ERROR) {
      // alert('검색 결과 중 오류가 발생했습니다.');
    }
  };

  return <Container id="map" ref={mapContainer}></Container>;
};

export default JejuMap;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;
