import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import instance from '../instance';

interface MapData {
  id: number;
  name: string;
  coordinates: { lat: number; lng: number };
}

const getMapsData = async (): Promise<MapData[]> => {
  const response = await instance.get<MapData[]>('/maps');
  return response.data;
};

const useMapsQuery = () => {
  return useQuery<MapData[], AxiosError>({
    queryKey: ['mapsData'],
    queryFn: getMapsData,
  });
};

export default useMapsQuery;
