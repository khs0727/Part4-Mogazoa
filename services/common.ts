import { handleErrorResponse } from '@/utils/errorHandler';
import {
  UseMutationOptions,
  useQuery,
  useMutation,
  QueryKey,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { axiosInstance } from '@/utils/axiosInstance';
import { HttpMethod, Params } from '@/types/data';

export function useDataQuery<TData, TResponse>(
  queryKey: QueryKey,
  url: string,
  data?: TData,
  options?: Omit<
    UseQueryOptions<TResponse, AxiosError, TResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
  params?: Params,
) {
  return useQuery<TResponse, AxiosError, TResponse, QueryKey>({
    queryKey,
    queryFn: () => fetchData<TData, TResponse>({ url, method: 'get', data, params }),
    ...options,
  });
}

export function useDataMutation<TData, TResponse>(
  url: string,
  method: HttpMethod,
  options?: Omit<UseMutationOptions<TResponse, AxiosError, TData>, 'mutationFn'> & {
    headers?: Record<string, string>;
  },
) {
  const mutation = useMutation<TResponse, AxiosError, TData>({
    mutationFn: (data: TData) =>
      fetchData<TData, TResponse>({ url, method, data, headers: options?.headers }),
    ...options,
  });
  return {
    ...mutation,
    mutate: (data: TData) => mutation.mutate(data),
    mutateAsync: (data: TData) => mutation.mutateAsync(data),
  };
}

async function fetchData<TData, TResponse>({
  url,
  data,
  method,
  params,
  headers,
}: {
  url: string;
  method: HttpMethod;
  data?: TData | null;
  params?: Params;
  headers?: Record<string, string>;
}): Promise<TResponse> {
  const response = await axiosInstance({
    method,
    url,
    params,
    headers,
    data: method !== 'get' ? data : undefined,
  });

  return response.data;
}
