import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Activity } from '../../consts/label';
import instance from '../instance';

export interface Summary {
  date: number;
  hour: number;
  score: number;
  message: string;
}

export interface Details {
  date: number;
  time: number;
  precipitationProbability: number;
  precipitationType: string;
  hourlyPrecipitation: number;
  humidity: number;
  hourlySnowAccumulation: number;
  skyCondition: string;
  hourlyTemperature: number;
  waveHeight: number;
  windDirection: number;
  windSpeed: number;
  waterTemperature: number;
  tideInfoList: TideInfo[];
}

export interface TideInfo {
  tidalLevel: number;
  tidalTime: string;
  code: '저조' | '고조';
}

interface WeatherInfo {
  details: Details[];
  summary: Summary[];
}

const getMapDetail = async (id: number): Promise<Details[]> => {
  const response = await instance.get<Details[]>(`weather/details?id=${id}`);
  return response.data;
};

const getMapSummary = async (
  id: number,
  activity: Activity,
): Promise<Summary[]> => {
  const response = await instance.get<Summary[]>(
    `weather/summary?id=${id}&category=${activity}`,
  );
  return response.data;
};

const getMapInfo = async (
  id: number,
  activity: Activity,
): Promise<WeatherInfo> => {
  const [detailResponse, summaryResponse] = await Promise.all([
    getMapDetail(id),
    getMapSummary(id, activity),
  ]);

  return { details: detailResponse, summary: summaryResponse };
};

const useWeatherQuery = (id: number | undefined, activity: Activity) => {
  return useQuery<WeatherInfo, AxiosError>({
    queryKey: ['weatherSummary', id],
    queryFn: () => getMapInfo(id as number, activity),
    enabled: !!id,
  });
};
export default useWeatherQuery;
