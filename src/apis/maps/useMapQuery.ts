import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import type { Activity } from '../../consts/label';
// import mockData from '../../mocks/map';
import instance from '../instance';

export interface MapData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  activities: Activity[];
}

interface GetMapsDataResponse {
  total: number;
  places: MapData[];
}

const getMapsData = async (): Promise<MapData[]> => {
  const response = await instance.get<GetMapsDataResponse>(`places`);
  return response.data.places;
};

const useMapsQuery = () => {
  return useQuery<MapData[], AxiosError>({
    queryKey: ['mapsData'],
    queryFn: () => getMapsData(),
    throwOnError: true,
  });
};
export default useMapsQuery;
