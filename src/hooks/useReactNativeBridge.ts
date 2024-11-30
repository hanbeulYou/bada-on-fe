import { useContext, useEffect } from 'react';

import { AddressContext } from '../context/AddressContext';

type MessageType = {
  type?: 'GET_LOCATION';
  [key: string]: any;
};

export const useReactNativeBridge = () => {
  const { dispatch } = useContext(AddressContext);

  const sendToRN = <T extends MessageType>(message: T) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    } else {
      console.error('ReactNative WebView를 찾을 수 없습니다');
    }
  };

  useEffect(() => {
    const tmpLocation = {
      latitude: 33.4890113,
      longitude: 126.4983023,
    };
    dispatch({ type: 'SET_LOCATION', payload: tmpLocation });
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window.ReactNativeWebView) {
        return;
      }

      try {
        const parsedData = JSON.parse(event.data);
        window.alert('RN으로부터 메시지 수신:' + parsedData);
        if (parsedData.type === 'GET_LOCATION') {
          dispatch({ type: 'SET_LOCATION', payload: parsedData.location });
        }
      } catch (error) {
        console.error('메시지 파싱 에러:' + error);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return { sendToRN };
};
