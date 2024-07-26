/**
 * NextAuth 설정 옵션
 *
 * @description
 * 이 파일은 NextAuth의 설정 옵션을 정의합니다.
 * CredentialsProvider, GoogleProvider, KakaoProvider를 사용한 인증,
 * JWT 및 세션 콜백, 그리고 커스텀 페이지 설정을 포함합니다.
 *
 * @requires next-auth
 * @requires next-auth/providers/credentials
 * @requires next-auth/providers/google
 * @requires next-auth/providers/kakao
 * @requires @/types/data
 * @requires @/utils/axiosInstance
 */

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import { AuthResponse } from '@/types/data';
import { axiosInstance } from '@/utils/axiosInstance';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const { email, password } = credentials;
          const { data } = await axiosInstance.post<AuthResponse>('/auth/signIn', {
            email,
            password,
          });
          return {
            id: data.user.id.toString(),
            email: data.user.email,
            name: data.user.nickname,
            image: data.user.image || null,
            description: data.user.description || null,
            accessToken: data.accessToken,
          };
        } catch (error) {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_API_KEY!,
      clientSecret: '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account && (account.provider === 'google' || account.provider === 'kakao')) {
        try {
          const provider = user.email?.includes('gmail.com') ? 'google' : 'kakao';
          const { data } = await axiosInstance.post<AuthResponse>(`/auth/SignIn/${provider}`, {
            redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/${account.provider}`,
            token: account.id_token || account.access_token,
          });

          if (data.user) {
            user.id = data.user.id.toString();
            user.email = data.user.email;
            user.name = data.user.nickname;
            user.image = data.user.image || null;
            user.description = data.user.description || null;
            user.accessToken = data.accessToken;
            return true;
          } else {
            return `/oauth/signup?provider=${provider}&token=${account.id_token || account.access_token}`;
          }
        } catch (error) {
          return `/oauth/signup?provider=${account.provider}&token=${account.id_token || account.access_token}`;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.description = user.description;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        image: token.picture as string | null,
        description: token.description as string | null,
        accessToken: token.accessToken as string,
      };
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
