import { useDataQuery, useDataMutation } from '../services/common';
import {
  Params,
  ProductDetailResponse,
  ProductsListResponse,
  ProductUpdateRequest,
  ReviewListResponse,
} from '../types/data';
import { UseQueryOptions, QueryKey, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetProducts = (
  params?: Params,
  options?: Omit<
    UseQueryOptions<ProductsListResponse, AxiosError, ProductsListResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const url = '/products';
  return useDataQuery<ProductsListResponse>(['products', params], url, options, params);
};

export const useGetProductDetail = (
  productId: number,
  options?: Omit<
    UseQueryOptions<ProductDetailResponse, AxiosError, ProductDetailResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useDataQuery<ProductDetailResponse>(
    ['productDetail', productId],
    `/products/${productId}`,
    options,
  );
};

export const useGetProductReviews = (
  productId: number,
  params?: { order?: undefined; cursor?: number },
  options?: Omit<
    UseQueryOptions<ReviewListResponse, AxiosError, ReviewListResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useDataQuery<ReviewListResponse>(
    ['productReviews', productId],
    `/products/productId}/reviews`,
    options,
    params,
  );
};

export const useCreateProduct = (
  options?: Omit<
    UseMutationOptions<ProductDetailResponse, AxiosError, ProductUpdateRequest>,
    'mutationFn'
  >,
) => {
  const method = 'post';
  const url = '/products';
  return useDataMutation<ProductUpdateRequest, ProductDetailResponse>(url, method, options);
};

export const useUpdateProduct = (
  productId: number,
  options?: Omit<
    UseMutationOptions<ProductDetailResponse, AxiosError, ProductUpdateRequest>,
    'mutationFn'
  >,
) => {
  const method = 'patch';
  return useDataMutation<ProductUpdateRequest, ProductDetailResponse>(
    `/products/${productId}`,
    method,
    options,
  );
};

export const useFavoriteProduct = (
  productId: number,
  options?: Omit<UseMutationOptions<ProductDetailResponse, AxiosError, void>, 'mutationFn'>,
) => {
  const method = 'post';
  return useDataMutation<void, ProductDetailResponse>(
    `/products/${productId}/favorite`,
    method,
    options,
  );
};

export const useUnfavoriteProduct = (
  productId: number,
  options?: Omit<UseMutationOptions<ProductDetailResponse, AxiosError, void>, 'mutationFn'>,
) => {
  const method = 'delete';
  return useDataMutation<void, ProductDetailResponse>(
    `/products/${productId}/favorite`,
    method,
    options,
  );
};
