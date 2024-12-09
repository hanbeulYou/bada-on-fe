import * as Sentry from '@sentry/react';
import { useContext, useEffect } from 'react';

import { AddressContext } from '../context/AddressContext';

import useToast from './useToast';

type MessageType = {
  type?: 'GET_LOCATION' | 'POST_ACTIVITY';
  [key: string]: any;
};

export const useReactNativeBridge = () => {
  const { dispatch } = useContext(AddressContext);
  const { showToast } = useToast();

  const sendToRN = <T extends MessageType>(message: T) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    } else {
      console.error('ReactNative WebView를 찾을 수 없습니다');
    }
  };

  // useEffect(() => {
  //   const tmpLocation = {
  //     latitude: 33.4890113,
  //     longitude: 126.4983023,
  //   };
  //   dispatch({ type: 'SET_LOCATION', payload: tmpLocation });
  // }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // window.alert('메시지 수신\n' + JSON.stringify(event.data));
      if (!event.data) {
        console.warn('메시지 데이터가 비어있습니다');
        return;
      }

      // 문자열이 아닌 경우 처리하지 않음
      if (typeof event.data !== 'string') {
        console.warn('메시지 데이터가 문자열 형식이 아닙니다');
        return;
      }

      try {
        const parsedData = JSON.parse(event.data);
        // window.alert('parsedData\n' + JSON.stringify(parsedData));

        // type 필드가 없는 경우 처리하지 않음
        if (!parsedData.type) {
          console.warn('메시지 타입이 없습니다');
          return;
        }

        // window.alert('payload\n' + JSON.stringify(parsedData.payload));
        if (parsedData.type === 'location' && parsedData.payload) {
          dispatch({
            type: 'SET_LOCATION',
            payload: parsedData.payload,
          });
        }
        if (parsedData.type === 'notice' && parsedData.payload) {
          showToast({
            message: parsedData.payload.message,
            toastType: parsedData.payload.type,
            timeout: 2000,
          });
        }
      } catch (error) {
        console.error('메시지 파싱 에러:', error);
        Sentry.captureException(error);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return { sendToRN };
};
