import { useState, useEffect } from 'react';

import useToast from './useToast';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'location') {
          const { latitude, longitude } = data.payload;
          if (
            latitude < 32.78442221352914 ||
            latitude > 33.95418174379797 ||
            longitude < 125.8539291788811 ||
            longitude > 127.20556660191247
          ) {
            setLocation({ latitude: 33.4996, longitude: 126.5312 });
            showToast({
              message: '현재 위치가 제주도 외부입니다.',
              toastType: 'error',
              timeout: 2000,
            });
          } else {
            setLocation(data.payload);
          }
          setError(null);
        } else if (data.type === 'location_error') {
          setError(data.payload.message);
        }
      } catch (err) {
        console.error('위치 정보 처리 중 오류:', err);
      }
    };

    window.addEventListener('message', handleMessage);

    window.parent.postMessage(JSON.stringify({ type: 'GET_LOCATION' }), '*');

    // window.parent.postMessage('test', '*');

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return { location, error };
};
