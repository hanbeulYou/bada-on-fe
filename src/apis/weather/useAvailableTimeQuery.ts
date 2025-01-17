import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import instance from '../instance';

export interface Time {
  date: number;
  hours: number[];
}
const getAvailableTime = async (
  date: number,
  hour: number,
): Promise<Time[]> => {
  const response = await instance.get<Time[]>(
    `weather/available?date=${date}&hour=${hour}`,
  );
  return response.data;
};

const useAvailableTimeQuery = (date: number, hour: number) => {
  return useQuery<Time[], AxiosError>({
    queryKey: ['availableTime', date, hour],
    queryFn: () => getAvailableTime(date, hour),
    enabled: !!date || !!hour,
    throwOnError: true,
  });
};

export default useAvailableTimeQuery;
