'use client';

import { useGetUserInfo } from '@/hooks/user';
import { useSession } from 'next-auth/react';

export default function Page() {
  const session = useSession();
  const user = useGetUserInfo(parseInt(session.data?.user.id as string));

  return (
    <div>
      {JSON.stringify(session)}
      {JSON.stringify(user)}
    </div>
  );
}
