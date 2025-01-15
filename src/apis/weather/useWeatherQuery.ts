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

const getMapDetail = async (
  id: number,
  date: number,
  hour: number,
): Promise<Details> => {
  const response = await instance.get<Details>(
    `weather/details?id=${id}&date=${date}&hour=${hour}`,
  );
  return response.data;
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
