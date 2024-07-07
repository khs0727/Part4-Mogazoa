import { useDataMutation, useDataQuery } from '../services/common';
import { UpdateUserRequest, UserResponse, HttpMethod } from '../types/data';

interface GetMyInfoConfig {
  url?: string;
  options?: object;
}

interface UpdateMyInfoConfig {
  method?: HttpMethod;
  Url?: string;
  options?: object;
}

interface GetUserInfoConfig {
  url?: string;
  options?: object;
  userId: number;
}

//내 정보 가져오기. url 미입력시 자동으로 로그인 된 유저의 정보를 가져옴
export const useGetMyInfoQuery = (config: GetMyInfoConfig = {}) => {
  const { url = '/users/me', options = {} } = config;
  const query = useDataQuery<UserResponse>({
    queryKey: ['userInfo', 'me'], //로그아웃시 stale하게 만들어야됨 혹은 로그인 된 유저의 id 필요
    url,
    options: {
      ...options,
    },
  });
  return query;
};

//내 정보 수정하기.
export const useUpdateMyInfo = (config: UpdateMyInfoConfig = {}) => {
  const { method = 'PATCH', Url = '/auth/signUp', options = {} } = config;

  const mutation = useDataMutation<UpdateUserRequest, UserResponse>();

  return (body: UpdateUserRequest, urlParam?: string | number) => {
    const url = urlParam ? `${Url}/${urlParam}` : Url;
    return mutation.mutate({ url, method, data: body });
  };
};

//다른 유저 정보 가져오기. 유저 id 필요
export const useGetUserInfoQuery = (config: GetUserInfoConfig = { userId: 0 }) => {
  const { url = `/users`, options = {}, userId } = config;
  const fullUrl = `${url}/${userId}`;

  const query = useDataQuery<UserResponse>({
    queryKey: ['userInfo', userId],
    url: fullUrl,
    options: {
      ...options,
    },
  });
  return query;
};
