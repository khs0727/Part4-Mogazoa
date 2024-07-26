'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { AiOutlineGoogle } from 'react-icons/ai';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SocialLogin() {
  const router = useRouter();

  const handleSignIn = async (provider: 'google' | 'kakao') => {
    try {
      const result = await signIn(provider, {
        callbackUrl: '/',
        redirect: false,
      });

      if (result?.error) {
        toast.error('로그인 중 오류가 발생했습니다.');
      } else if (result?.url) {
        if (result.url.includes('/oauth/signup')) {
          router.push(result.url);
        } else {
          router.push('/');
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('로그인 프로세스를 시작할 수 없습니다.');
    }
  };

  return (
    <div className="flex items-center justify-center gap-5 pt-5">
      <Button
        onClick={() => handleSignIn('google')}
        variant="circleGary"
        className="w-[56px] h-[56px]"
        size="auto"
      >
        <AiOutlineGoogle size="28" className="text-gray-600" />
      </Button>
      <Button
        onClick={() => handleSignIn('kakao')}
        variant="circleGary"
        className="w-[56px] h-[56px]"
        size="auto"
      >
        <RiKakaoTalkFill size="28" className="text-gray-600" />
      </Button>
    </div>
  );
}
