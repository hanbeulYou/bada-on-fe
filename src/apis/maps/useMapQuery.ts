import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import type { Activity } from '../../consts/label';
import instance from '../instance';

interface MapData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  activity: Activity;
}

const getMapsData = async (activity: string): Promise<MapData[]> => {
  const response = await instance.get<MapData[]>(
    `markers/find?activity=${activity}`,
  );

  return response.data;
};

const useMapsQuery = (activity: string) => {
  return useQuery<MapData[], AxiosError>({
    queryKey: ['mapsData', activity],
    queryFn: () => getMapsData(activity),
    enabled: !!activity,
  });
};
export default useMapsQuery;
