import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { kakaoInstance } from './kakaoInstance';

interface KakaoSearchData {
  keyword: string;
  longitude: number;
  latitude: number;
  rect?: string;
}

interface ResMeta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
  same_name: {
    keyword: string;
    region: string[];
    selected_region: string;
  };
}

interface ResDocument {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
  distance: string;
}

interface KakaoSearchResponse {
  meta: ResMeta;
  documents: ResDocument[];
}

const getKakaoSearchData = async ({
  keyword,
  longitude,
  latitude,
  rect = '125.8539291788811,32.78442221352914,127.20556660191247,33.95418174379797',
}: KakaoSearchData): Promise<KakaoSearchResponse> => {
  const response = await kakaoInstance.get('', {
    params: {
      query: keyword,
      x: longitude,
      y: latitude,
      rect: rect,
      sort: 'distance',
    },
  });
  return response.data;
};

export const useKakaoSearchQuery = (
  keyword: string,
  longitude: number,
  latitude: number,
) => {
  return useQuery<KakaoSearchResponse, AxiosError>({
    queryKey: ['kakaoSearch', keyword, longitude, latitude],
    queryFn: () => getKakaoSearchData({ keyword, longitude, latitude }),
  });
};
