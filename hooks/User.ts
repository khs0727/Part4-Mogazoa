import { url } from 'inspector';
import { useDataMutation, useDataQuery } from '../services/common';
import {
  UpdateUserRequest,
  UserResponse,
  HttpMethod,
  ProductsListResponse,
  RankedUserResponse,
  FollowersResponse,
} from '../types/data';

interface BaseRequestConfig {
  url?: string;
  options?: object;
  params?: object;
}

interface UpdateMyInfoConfig extends BaseRequestConfig {
  method?: HttpMethod;
}

interface GetUserInfoConfig extends BaseRequestConfig {
  userId: number;
}

interface GetListInfoConfig extends BaseRequestConfig {
  userId: number;
  cursor?: number;
}

//내 정보 가져오기. url 미입력시 자동으로 로그인 된 유저의 정보를 가져옴
export const useGetMyInfoQuery = (config: BaseRequestConfig = {}) => {
  const { url = '/users/me', options = {}, params } = config;
  const query = useDataQuery<UserResponse>({
    queryKey: ['userInfo', 'me'], //로그아웃시 stale하게 만들어야됨 혹은 로그인 된 유저의 id 필요
    url,
    options,
    params,
  });
  return query;
};

//내 정보 수정하기.
export const useUpdateMyInfo = (config: UpdateMyInfoConfig = {}) => {
  const { method = 'PATCH', url = '/auth/signUp', options = {} } = config;

  const mutation = useDataMutation<UpdateUserRequest, UserResponse>(options);

  return (body: UpdateUserRequest) => {
    return mutation.mutate({ url, method, data: body });
  };
};

//다른 유저 정보 가져오기. 유저 id 필요
export const useGetUserInfoQuery = (config: GetUserInfoConfig = { userId: 0 }) => {
  const { url = `/users`, options = {}, userId, params } = config;
  const fullUrl = userId ? `${url}/${userId}` : url;

  const query = useDataQuery<UserResponse>({
    queryKey: ['userInfo', userId],
    url: fullUrl,
    options,
    params,
  });
  return query;
};

//랭킹유저 목록 조회
export const useGetUserRanking = (config: BaseRequestConfig = {}) => {
  const { url = '/users/ranking', options = {}, params } = config;

  const query = useDataQuery<RankedUserResponse[]>({
    queryKey: ['userInfo', 'ranking'],
    url,
    options,
    params,
  });

  return query;
};

//userID 유저가 생성한 상품 조회
export const useGetItemsCreatedProducts = (config: GetListInfoConfig = { userId: 0 }) => {
  const { url = '/users', options = {}, userId, params } = config;
  const fullUrl = userId ? `${url}/${userId}/created-products` : url;

  const query = useDataQuery<ProductsListResponse>({
    queryKey: ['ProductsList', userId, 'created'],
    url: fullUrl,
    options,
    params,
  });
  return query;
};

//userID 유저가 리뷰한 상품 조회
export const useGetItemsReviewdProducts = (config: GetListInfoConfig = { userId: 0 }) => {
  const { url = '/users', options = {}, userId, params } = config;
  const fullUrl = userId ? `${url}/${userId}/reviewed-products` : url;

  const query = useDataQuery<ProductsListResponse>({
    queryKey: ['ProductsList', userId, 'reviewed'],
    url: fullUrl,
    options,
    params,
  });
  return query;
};

//userID 유저가 찜한 상품 조회
export const useGetItemsFavoriteProducts = (config: GetListInfoConfig = { userId: 0 }) => {
  const { url = '/users', options = {}, userId, params } = config;
  const fullUrl = userId ? `${url}/${userId}/favorite-products` : url;

  const query = useDataQuery<ProductsListResponse>({
    queryKey: ['ProductsList', userId, 'favorite'],
    url: fullUrl,
    options,
    params,
  });
  return query;
};

//userId 유저가 팔로우한 유저 조회
export const useGetFolloewees = (config: GetListInfoConfig = { userId: 0 }) => {
  const { url = '/users', options = {}, userId, params } = config;
  const fullUrl = userId ? `${url}/${userId}/followees` : url;

  const query = useDataQuery<FollowersResponse>({
    queryKey: ['followees', userId],
    url: fullUrl,
    options,
    params,
  });
  return query;
};

//userId 유저가 팔로우한 유저 조회
export const useGetFolloewers = (config: GetListInfoConfig = { userId: 0 }) => {
  const { url = '/users', options = {}, userId, params } = config;
  const fullUrl = userId ? `${url}/${userId}/followers` : url;

  const query = useDataQuery<FollowersResponse>({
    queryKey: ['followers', userId],
    url: fullUrl,
    options,
    params,
  });
  return query;
};
