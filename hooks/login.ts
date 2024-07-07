import { useDataMutation } from '../services/common';
import { SignUpRequest, AuthResponse, HttpMethod, SignInRequest } from '../types/data';

interface SignUpConfig {
  method?: HttpMethod;
  Url?: string;
}

export const useSignUp = (config: SignUpConfig = {}) => {
  const { method = 'POST', Url = '/auth/signUp' } = config;

  const mutation = useDataMutation<SignUpRequest, AuthResponse>();

  return (body: SignUpRequest, urlParam?: string | number) => {
    const url = urlParam ? `${Url}/${urlParam}` : Url;
    return mutation.mutate({ url, method, data: body });
  };
};

export const useSignIn = (config: SignUpConfig = {}) => {
  const { method = 'POST', Url = '/auth/signIn' } = config;

  const mutation = useDataMutation<SignInRequest, AuthResponse>({
    onSuccess: (data) => {
      localStorage.setItem('Tocken', data?.accessToken);
    },
  });

  return (body: SignInRequest, urlParam?: string | number) => {
    const url = urlParam ? `${Url}/${urlParam}` : Url;
    return mutation.mutate({ url, method, data: body });
  };
};
