import { useEffect, useContext, useState, useRef } from 'react';
import { CustomOverlayMap, Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import useMapsQuery, { MapData } from '../../apis/maps/useMapQuery';
import { AddressContext } from '../../context/AddressContext';
import { SafeAreaContext, SafeAreaState } from '../../context/SafeAreaContext';
import { useReactNativeBridge } from '../../hooks/useReactNativeBridge';
import useToast from '../../hooks/useToast';
import { Marker } from '../../pages/Home';
import { starListState } from '../../recoil/starListAtom';
import { MapButton } from '../common/MapButton';

import Pin from './Pin';

interface JejuMapProps {
  selectedMarker?: Marker | null;
  onClickMarker?: (place: Marker) => void;
  setBottomSheetStatus: React.Dispatch<
    React.SetStateAction<'middle' | 'full' | 'hidden'>
  >;
}

// 지도 내 드래그와 바운더리 처리
const MapEventController = ({
  setFixedLocation,
  setBottomSheetStatus,
}: {
  setFixedLocation: (value: boolean) => void;
  setBottomSheetStatus: (value: 'middle' | 'full' | 'hidden') => void;
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const bounds = new kakao.maps.LatLngBounds(
      new kakao.maps.LatLng(32.78442221352914, 125.8539291788811),
      new kakao.maps.LatLng(33.95418174379797, 127.20556660191247),
    );

    const handleDrag = () => {
      setBottomSheetStatus('hidden');
      const mapBounds = map.getBounds();
      const mapCenter = map.getCenter();

      // 지도의 현재 영역이 제한 영역을 벗어났는지 확인
      const sw = mapBounds.getSouthWest();
      const ne = mapBounds.getNorthEast();

      let lat = mapCenter.getLat();
      let lng = mapCenter.getLng();
      let needsAdjustment = false;

      // 남쪽 경계를 벗어난 경우
      if (sw.getLat() < bounds.getSouthWest().getLat()) {
        lat += bounds.getSouthWest().getLat() - sw.getLat();
        needsAdjustment = true;
      }
      // 북쪽 경계를 벗어난 경우
      if (ne.getLat() > bounds.getNorthEast().getLat()) {
        lat -= ne.getLat() - bounds.getNorthEast().getLat();
        needsAdjustment = true;
      }
      // 서쪽 경계를 벗어난 경우
      if (sw.getLng() < bounds.getSouthWest().getLng()) {
        lng += bounds.getSouthWest().getLng() - sw.getLng();
        needsAdjustment = true;
      }
      // 동쪽 경계를 벗어난 경우
      if (ne.getLng() > bounds.getNorthEast().getLng()) {
        lng -= ne.getLng() - bounds.getNorthEast().getLng();
        needsAdjustment = true;
      }

      if (needsAdjustment) {
        map.setCenter(new kakao.maps.LatLng(lat, lng));
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

const MapComponent = (props: JejuMapProps) => {
  const { onClickMarker = () => {}, setBottomSheetStatus } = props;
  const { state } = useContext(AddressContext);
  const { showToast, renderToasts } = useToast();
  const [fixedLocation, setFixedLocation] = useState(false);
  const { data: mapsData, isLoading: mapsIsLoading } = useMapsQuery();
  const { state: safeArea } = useContext(SafeAreaContext);
  const starList = useRecoilValue(starListState);

  const previousAddressRef = useRef(state.currentAddress);
  const { sendToRN } = useReactNativeBridge();

  // EventsAndMarkers 컴포넌트
  const EventsAndMarkers = () => {
    const map = useMap();

    const isLocationInJeju = (lat: number, lng: number) => {
      const jejuBounds = new kakao.maps.LatLngBounds(
        new kakao.maps.LatLng(32.78442221352914, 125.8539291788811),
        new kakao.maps.LatLng(33.95418174379797, 127.20556660191247),
      );
      return jejuBounds.contain(new kakao.maps.LatLng(lat, lng));
    };

    const handleClickMarker = (marker: Marker) => {
      onClickMarker(marker);

      if (map) {
        map.panTo(
          new kakao.maps.LatLng(
            Number(marker.latitude),
            Number(marker.longitude),
          ),
        );
      }
    };

    useEffect(() => {
      if (fixedLocation && map && !isObjectEmpty(state.location)) {
        const lat = Number(state.location.latitude);
        const lng = Number(state.location.longitude);

        if (!isLocationInJeju(lat, lng)) {
          showToast({
            message: '현재 위치가 제주도 밖입니다.',
            toastType: 'warning',
            timeout: 3000,
          });
          setFixedLocation(false);
          return;
        }

        map.panTo(new kakao.maps.LatLng(lat, lng));
      }
    }, [fixedLocation]);

    useEffect(() => {
      if (
        previousAddressRef.current !== state.currentAddress &&
        !isObjectEmpty(state.currentAddress)
      ) {
        map.panTo(
          new kakao.maps.LatLng(
            Number(state.currentAddress.y),
            Number(state.currentAddress.x),
          ),
        );
        previousAddressRef.current = state.currentAddress;
      }
    }, [state.currentAddress]);

    return (
      <>
        <MapEventController
          setFixedLocation={setFixedLocation}
          setBottomSheetStatus={setBottomSheetStatus}
        />
        {/* 기존 마커 렌더링 로직 유지 */}
        {!mapsIsLoading &&
          mapsData?.map((item: MapData, index: number) => (
            <CustomOverlayMap
              key={`${item.latitude}-${item.longitude}-${index}`}
              position={{
                lat: Number(item.latitude),
                lng: Number(item.longitude),
              }}
            >
              <Pin
                icon={starList.includes(item.id.toString()) ? 'star' : 'beach'}
                hasLabel={false}
                onClick={() => handleClickMarker(item)}
                hasAlert={false}
              />
            </CustomOverlayMap>
          ))}

        {!isObjectEmpty(state.currentAddress) && (
          <CustomOverlayMap
            position={{
              lat: Number(state.currentAddress.y),
              lng: Number(state.currentAddress.x),
            }}
          >
            <div style={{ marginTop: '-20px' }}>
              <Pin
                icon="search"
                hasLabel={true}
                label={state.currentAddress.place_name}
              />
            </div>
          </CustomOverlayMap>
        )}

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
      setFixedLocation(true);
    } else if (isObjectEmpty(state.location)) {
      showToast({
        message: '현재 위치를 확인할 수 없어요.',
        toastType: 'warning',
        timeout: 3000,
      });
      sendToRN({ type: 'GET_LOCATION' });
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
          maxLevel={3}
          disableDoubleClick={true}
        >
          <EventsAndMarkers />
        </Map>
        <LocationButton
          safeArea={safeArea}
          onClick={handleLocationButtonClick}
          iconName={fixedLocation ? 'location' : 'location-grey'}
        />
      </Container>
      {renderToasts()}
    </>
  );
};

const isObjectEmpty = (obj: object) => {
  return Object.keys(obj).length === 0;
};

export default MapComponent;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;

const LocationButton = styled(MapButton)<{ safeArea: SafeAreaState }>`
  bottom: ${({ safeArea }) => safeArea.bottom + 20}px;
  right: 20px;
`;
