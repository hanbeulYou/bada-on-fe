import { useEffect, useContext, useState } from 'react';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

import useMapsQuery from '../../apis/maps/useMapQuery';
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
  const { data, isLoading } = useMapsQuery(filter);
  const { showToast, renderToasts } = useToast();
  const [fixedLocation, setFixedLocation] = useState(false);

  const handleLocationButtonClick = () => {
    if (!fixedLocation && !isObjectEmpty(state.location)) {
      setFixedLocation(true); // map.panTo는 useEffect에서 처리됨
    } else {
      setFixedLocation(false);
    }
  };

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

    // 검색 결과 처리
    useEffect(() => {
      if (state.searchKeyword) {
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(state.searchKeyword, (places, status) => {
          const JEJUPlaces = places.filter(place => {
            return place.address_name.includes('제주특별자치도');
          });
          const hasInvalidPlaces = places.length > JEJUPlaces.length;

          if (JEJUPlaces.length === 0 && hasInvalidPlaces) {
            showToast({
              message: '제주도 내의 검색 결과가 없습니다.',
              toastType: 'warning',
              timeout: 1000,
            });
          } else if (status === kakao.maps.services.Status.OK) {
            dispatch({ type: 'SET_SEARCH_RESULTS', payload: JEJUPlaces });
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            showToast({
              message: '검색 결과가 없습니다.',
              toastType: 'warning',
              timeout: 1000,
            });
          }
        });
      }
    }, [state.searchKeyword]);

    // 현재 주소 마커 처리
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

    useEffect(() => {
      if (isObjectEmpty(state.location)) return;

      console.log('location', state.location);

      // if (map) {
      //   map.panTo(
      //     new kakao.maps.LatLng(
      //       Number(state.location.latitude),
      //       Number(state.location.longitude),
      //     ),
      //   );
      // }
    }, [state.location]);

    return (
      <>
        <MapEventController setFixedLocation={setFixedLocation} />

        {!isLoading &&
          data?.map((item: any, index: number) => (
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
