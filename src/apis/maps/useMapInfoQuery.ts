import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import instance from '../instance';

interface Summary {
  id: number;
  markerName: string;
  message: string;
  recommend_scores: number[];
}

interface Details {
  id: number;
  hour: number;
  score: number;
  feedback: {
    swimming: string;
    snorkeling: string;
  };
}

interface MapInfo {
  details: Details[];
  summary: Summary;
}

const getMapDetail = async (id: number): Promise<Details[]> => {
  const response = await instance.get<Details[]>(`markers/details/${id}`);
  return response.data;
};

const getMapSummary = async (id: number): Promise<Summary> => {
  const response = await instance.get<Summary>(`markers/summary/${id}`);
  return response.data;
};

const getMapInfo = async (id: number): Promise<MapInfo> => {
  const [detailResponse, summaryResponse] = await Promise.all([
    getMapDetail(id),
    getMapSummary(id),
  ]);

  return { details: detailResponse, summary: summaryResponse };
};

const useMapInfoQuery = (id: number) => {
  return useQuery<MapInfo, AxiosError>({
    queryKey: ['mapData', id],
    queryFn: () => getMapInfo(id),
    enabled: !!id,
  });
};
export default useMapInfoQuery;
