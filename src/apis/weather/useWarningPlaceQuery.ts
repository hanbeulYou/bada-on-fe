import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import instance from '../instance';

export interface WarningPlace {
  id: number;
  warning: string[];
}

const getWarningPlace = async (): Promise<WarningPlace[]> => {
  const response = await instance.get<WarningPlace[]>(`weather/warning`);
  return response.data;
};

const useWarningPlaceQuery = () => {
  return useQuery<WarningPlace[], AxiosError>({
    queryKey: ['warningPlace'],
    queryFn: () => getWarningPlace(),
    throwOnError: true,
  });
};

export default useWarningPlaceQuery;
