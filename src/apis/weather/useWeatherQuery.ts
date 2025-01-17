import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Activity } from '../../consts/label';
import instance from '../instance';

export interface Summary {
  date: number;
  hour: number;
  warning: Warning['title'][];
  recommendActivity: Activity[];
  skyCondition: string;
  temperature: number;
  wind: string;
  tideHeight: number;
  waveHeight: number;
}

export interface Warning {
  title: string;
  location: string;
  description: string;
  startTime: string;
  endTime: string;
}

export interface Details {
  date: number;
  hour: number;
  warning: Warning[];
  skyCondition: string;
  temperature: number;
  wind: number;
  waveHeight: number;
  tideInfo: number;
  precipitation: number;
  tideInfoList: TideInfo[];
  score: ActivityScore[];
}

export interface ActivityScore {
  activity: Activity;
  score: number;
}

export interface TideInfo {
  tidalLevel: number;
  tidalTime: string;
  code: '저조' | '고조';
}

interface WeatherInfo {
  details: Details;
  summary: Summary;
}

const WeatherKeyHasNumber = ['wind', 'waveHeight', 'tideInfo', 'precipitation'];

const getMapDetail = async (
  id: number,
  date: number,
  hour: number,
): Promise<Details> => {
  const response = await instance.get<Details>(
    `weather/details?id=${id}&date=${date}&hour=${hour}`,
  );

  const data = { ...response.data };
  (Object.keys(data) as Array<keyof Details>).forEach(key => {
    const value = data[key];
    if (
      typeof value === 'number' &&
      value < 0 &&
      WeatherKeyHasNumber.includes(key)
    ) {
      (data[key] as number) = 0;
    }
  });

  return data;
};

const getMapSummary = async (
  id: number,
  date: number,
  hour: number,
): Promise<Summary> => {
  const response = await instance.get<Summary>(
    `weather/summary?id=${id}&date=${date}&hour=${hour}`,
  );
  return response.data;
};

const getMapInfo = async (
  id: number,
  date: number,
  hour: number,
): Promise<WeatherInfo> => {
  const [detailResponse, summaryResponse] = await Promise.all([
    getMapDetail(id, date, hour),
    getMapSummary(id, date, hour),
  ]);

  return { details: detailResponse, summary: summaryResponse };
};

const useWeatherQuery = (
  id: number | undefined,
  date: number,
  hour: number,
) => {
  return useQuery<WeatherInfo, AxiosError>({
    queryKey: ['weatherSummary', id, date, hour],
    queryFn: () => getMapInfo(id as number, date, hour),
    enabled: !!id,
    throwOnError: true,
  });
};
export default useWeatherQuery;
