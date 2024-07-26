'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useOauthSignUp } from '@/hooks/auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

const FormSchema = z.object({
  nickname: z.string().min(2, { message: '닉네임은 최소 2자 이상이어야 합니다.' }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function OAuthSignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const provider = searchParams.get('provider') as 'google' | 'kakao';
  const token = searchParams.get('token');

  const oauthSignUp = useOauthSignUp(provider, {
    onSuccess: async () => {
      toast.success('회원가입에 성공했습니다.');
      const result = await signIn(provider, { callbackUrl: '/', redirect: false });
      if (result?.url) router.push(result.url);
    },
    onError: (error) => {
      toast.error('회원가입에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nickname: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    if (!token) {
      toast.error('인증 토큰이 없습니다. 다시 로그인해주세요.');
      return;
    }

    oauthSignUp.mutate({
      nickname: values.nickname,
      redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth/${provider}`,
      token: token,
    });
  };

  return (
    <div className="relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[30px] md:gap-[40px]"
        >
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input placeholder="닉네임을 입력해주세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            className="mt-[60px]"
            disabled={oauthSignUp.isPending}
          >
            {oauthSignUp.isPending ? '처리 중...' : '회원가입 완료'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
