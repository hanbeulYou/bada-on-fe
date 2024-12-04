import axios, { AxiosError } from 'axios';

export const kakaoInstance = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local/search/keyword',
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
  },
});

kakaoInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.error(error.response);
    }
    return Promise.reject(error);
  },
);
