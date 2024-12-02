import { useEffect, useContext, useState } from 'react';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

import { useKakaoSearchQuery } from '../../apis/search/useKakaoSearchQuery';
import { AddressContext } from '../../context/AddressContext';
import useToast from '../../hooks/useToast';

import Icon from './Icon';

interface JejuMapProps {
  filter?: string;
  onClickMarker?: (place: object) => void;
}

// 지도 내 드래그와 바운더리 처리
const MapEventController = ({
  setFixedLocation,
}: {
  setFixedLocation: (value: boolean) => void;
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const bounds = new kakao.maps.LatLngBounds(
      new kakao.maps.LatLng(32.78442221352914, 125.8539291788811),
      new kakao.maps.LatLng(33.95418174379797, 127.20556660191247),
    );

    const handleDrag = () => {
      const mapBounds = map.getBounds();
      if (
        !bounds.contain(mapBounds.getSouthWest()) ||
        !bounds.contain(mapBounds.getNorthEast())
      ) {
        map.panTo(new kakao.maps.LatLng(33.3617, 126.5292));
      }
      setFixedLocation(false);
    };

    kakao.maps.event.addListener(map, 'drag', handleDrag);

    return () => {
      kakao.maps.event.removeListener(map, 'drag', handleDrag);
    };
  }, [map, setFixedLocation]);

  return null;
};

const MapTmp = (props: JejuMapProps) => {
  const { filter = '', onClickMarker = () => {} } = props;
  const { state, dispatch } = useContext(AddressContext);
  const { showToast, renderToasts } = useToast();
  const [fixedLocation, setFixedLocation] = useState(false);

  // 검색어와 위치를 기반으로 쿼리 실행
  const { data, isLoading } = useKakaoSearchQuery(
    state.searchKeyword,
    state.location.longitude || 126.5311884, // 제주시청의 경도
    state.location.latitude || 33.4996213, // 제주시청의 위도
  );

  // 검색 로직을 별도 함수로 분리
  const handleSearch = (keyword: string) => {
    if (!keyword) return;

    if (!data || data.documents.length === 0) {
      showToast({
        message: '제주도 내의 검색 결과가 없습니다.',
        toastType: 'warning',
        timeout: 1000,
      });
    } else if (data && data.documents.length > 0) {
      // 이전 결과와 동일한 경우 dispatch 하지 않음
      if (
        JSON.stringify(state.searchResults) !== JSON.stringify(data.documents)
      ) {
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: data.documents });
      }
    } else {
      showToast({
        message: '검색 결과가 없습니다.',
        toastType: 'warning',
        timeout: 1000,
      });
    }
  };

  // 검색어 변경 시 검색 실행
  useEffect(() => {
    if (state.searchKeyword) {
      handleSearch(state.searchKeyword);
    }
  }, [state.searchKeyword, data]);

  // EventsAndMarkers 컴포넌트
  const EventsAndMarkers = () => {
    const map = useMap();

    useEffect(() => {
      if (fixedLocation && map && !isObjectEmpty(state.location)) {
        map.panTo(
          new kakao.maps.LatLng(
            Number(state.location.latitude),
            Number(state.location.longitude),
          ),
        );
      }
    }, [fixedLocation]);

    useEffect(() => {
      if (!isObjectEmpty(state.currentAddress)) {
        showToast({
          message: '해당 위치는 정보가 없습니다. 다른 지역을 검색해 보세요.',
          toastType: 'warning',
          timeout: 1000,
        });

        if (map) {
          map.panTo(
            new kakao.maps.LatLng(
              Number(state.currentAddress.y),
              Number(state.currentAddress.x),
            ),
          );
        }
      }
    }, [state.currentAddress]);

    return (
      <>
        <MapEventController setFixedLocation={setFixedLocation} />
        {/* 기존 마커 렌더링 로직 유지 */}
        {!isLoading &&
          data?.documents?.map((item: any, index: number) => (
            <MapMarker
              key={`${item.latitude}-${item.longitude}-${index}`}
              position={{
                lat: Number(item.latitude),
                lng: Number(item.longitude),
              }}
              image={{
                src: `/pin/${filter}.png`,
                size: {
                  width: 36,
                  height: 37,
                },
                options: {
                  offset: {
                    x: 18,
                    y: 37,
                  },
                },
              }}
              onClick={() => onClickMarker(item)}
            />
          ))}

        {!isObjectEmpty(state.location) && (
          <MapMarker
            position={{
              lat: Number(state.location.latitude),
              lng: Number(state.location.longitude),
            }}
            image={{
              src: '/pin/location.png',
              size: {
                width: 36,
                height: 37,
              },
              options: {
                offset: {
                  x: 18,
                  y: 37,
                },
              },
            }}
          />
        )}
      </>
    );
  };

  const handleLocationButtonClick = () => {
    if (!fixedLocation && !isObjectEmpty(state.location)) {
      setFixedLocation(true); // map.panTo는 useEffect에서 처리됨
    } else {
      setFixedLocation(false);
    }
  };

  return (
    <>
      <Container>
        <Map
          center={{ lat: 33.3617, lng: 126.5292 }}
          style={{ width: '100%', height: '100%' }}
          level={10}
          minLevel={10}
          maxLevel={5}
          disableDoubleClick={true}
        >
          <EventsAndMarkers />
        </Map>
        <LocationButton onClick={handleLocationButtonClick}>
          <Icon name="location" />
        </LocationButton>
      </Container>
      {renderToasts()}
    </>
  );
};

const isObjectEmpty = (obj: object) => {
  return Object.keys(obj).length === 0;
};

export default MapTmp;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;

const LocationButton = styled.button`
  position: absolute;
  top: 160px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 1;

  &:active {
    background-color: ${({ theme }) => theme.colors.gray50};
  }
`;
