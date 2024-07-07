import { useDataMutation, useDataQuery } from '../services/common';
import { UpdateUserRequest, UserResponse, HttpMethod } from '../types/data';

interface GetMyInfoConfig {
  url?: string;
}

interface UpdateMyInfoConfig {
  method?: HttpMethod;
  Url?: string;
}

export const useGetMyInfo = (config: GetMyInfoConfig = {}) => {
  const { url = '/users/me' } = config;
  const query = useDataQuery<UserResponse>({
    queryKey: ['userInfo', 'me'],
    url,
    options: {
      staleTime: 5 * 60 * 1000,
    },
  });
  return query;
};

export const useUpdateMyInfo = (config: UpdateMyInfoConfig = {}) => {
  const { method = 'PATCH', Url = '/auth/signUp' } = config;

  const mutation = useDataMutation<UpdateUserRequest, UserResponse>();

  return (body: UpdateUserRequest, urlParam?: string | number) => {
    const url = urlParam ? `${Url}/${urlParam}` : Url;
    return mutation.mutate({ url, method, data: body });
  };
};