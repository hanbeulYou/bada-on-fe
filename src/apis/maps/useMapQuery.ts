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
  activity: Activity;
}

interface GetMapsDataResponse {
  total: number;
  places: MapData[];
}

const getMapsData = async (activity: Activity): Promise<MapData[]> => {
  const response = await instance.get<GetMapsDataResponse>(
    `places/find?activity=${activity}`,
  );

  // TODO 테스트를 위해 임시로 mockData를 사용합니다.
  // const data = mockData[activity as Activity];

  return response.data.places;
};

const useMapsQuery = (activity: Activity) => {
  return useQuery<MapData[], AxiosError>({
    queryKey: ['mapsData', activity],
    queryFn: () => getMapsData(activity),
    enabled: !!activity,
    throwOnError: true,
  });
};
export default useMapsQuery;
