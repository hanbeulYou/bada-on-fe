import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import type { Activity } from '../../consts/label';
import mockData from '../../mocks/map';
import instance from '../instance';

interface MapData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  activity: Activity;
}

const getMapsData = async (activity: string): Promise<MapData[]> => {
  // TODO 테스트를 위해 임시로 mockData를 사용합니다.
  // const response = await instance.get<MapData[]>(
  //   `markers/find?activity=${activity}`,
  // );

  const data = mockData[activity as Activity];

  console.log(data);

  return data;
};

const useMapsQuery = (activity: string) => {
  return useQuery<MapData[], AxiosError>({
    queryKey: ['mapsData', activity],
    queryFn: () => getMapsData(activity),
    enabled: !!activity,
  });
};
export default useMapsQuery;
