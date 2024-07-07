import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import axiosInstance from '../utils/axiosInstance';
import { handleErrorResponse } from '../utils/errorHandler';
import { HttpMethod } from '@/types/data';

interface RequestConfig<TData> {
  url: string;
  method: HttpMethod;
  data?: TData;
}

interface SearchParams {
  search?: string;
  page?: number;
  limit?: number;
  offset?: number;
  sort?: string;
  cursor?: number;
  keyword?: string;
  category?: string;
  order?: string;
}

interface DataQueryConfig<TQueryFnData, TError, TData> {
  queryKey: readonly unknown[];
  params?: SearchParams;
  url: string;
  body?: any;
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey' | 'queryFn'>;
}

async function fetchData<TData = any, TResponse = any>(
  config: RequestConfig<TData>,
): Promise<TResponse> {
  const response = await axiosInstance(config);
  return response.data;
}

// url과 파라미터를 조합해 axios 인스턴스에 요청을 보낼 URL을 만듭니다.
function buildUrl(endpoint: string, params: SearchParams) {
  let url = `${endpoint.replace(/^\/+/, '')}`;

  const queryString = Object.keys(params)
    .map((key) => {
      const value = params[key as keyof SearchParams];
      if (value !== undefined && value !== null) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`;
      }
      return '';
    })
    .filter((param) => param.length > 0)
    .join('&');

  if (queryString) {
    url += `?${queryString}`;
  }

  return url;
}

export function useDataQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>({
  queryKey,
  url,
  body = '',
  options,
  params = {},
}: DataQueryConfig<TQueryFnData, TError, TData>) {
  const fullUrl = buildUrl(url, params);

  const queryResult = useQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn: () => fetchData({ url: fullUrl, method: 'GET', data: body }),
    ...options,
  });

  return queryResult;
}

export function useDataMutation<
  TData = unknown,
  TError = unknown,
  TVariables extends RequestConfig<TData> = RequestConfig<TData>,
>(options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>) {
  return useMutation<TData, TError, TVariables>({
    mutationFn: fetchData,
    onError: (error) => {
      const errorMessage = handleErrorResponse(error);
      alert(errorMessage);
    },
    ...options,
  });
}
