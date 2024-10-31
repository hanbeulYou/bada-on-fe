import { useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';

import useMapsQuery from '../../apis/maps/useMapQuery';
import { AddressContext } from '../../context/AddressContext';
import KakaoMapManager from '../../helpers/kakaoMapManger';

interface JejuMapProps {
  filter?: string;
}

const JejuMap = (props: JejuMapProps) => {
  const { filter = '' } = props;
  const mapContainer = useRef<HTMLDivElement>(null);
  const { dispatch, state } = useContext(AddressContext);
  const kakaoMapManager = useRef<KakaoMapManager | null>(null);
  const { data, isLoading } = useMapsQuery(filter);

  useEffect(() => {
    const args = {
      mapContainer: mapContainer.current,
      boundary: [
        [32.78442221352914, 125.8539291788811],
        [33.95418174379797, 127.20556660191247],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kakaoMapManager.current]);

  useEffect(() => {
    if (kakaoMapManager.current && state.searchKeyword) {
      kakaoMapManager.current.searchPlaces(state.searchKeyword, onSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchKeyword]);

  useEffect(() => {
    kakaoMapManager.current?.clearMarker();
    if (!isLoading) addActivityMarkers();
  }, [data, isLoading]);

  const addActivityMarkers = () => {
    if (data.length > 0) {
      data.forEach(({ latitude, longitude }) => {
        const imageSrc = `/public/pin/${filter}.png`;
        const place = { x: longitude, y: latitude };
        kakaoMapManager.current?.setMarker({ place, imageSrc });
      });
      kakaoMapManager.current?.rerender();
    }
  };

  useEffect(() => {
    if (kakaoMapManager.current) {
      kakaoMapManager.current.clearMarker();
      kakaoMapManager.current.setMarker({
        place: state.currentAddress,
        movePlace: true,
      });
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
