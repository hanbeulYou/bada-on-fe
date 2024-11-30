import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'location') {
          setLocation(data.payload);
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

    window.parent.postMessage('test', '*');

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return { location, error };
};
