'use client';

import { useGetMyInfo } from '@/hooks/User';
import { useDataQuery } from '@/services/common';

function MyInfo() {
  const { data, isLoading, error } = useDataQuery({ queryKey: ['a', 'b'], url: '/users/269' });

  return <div>{isLoading}</div>;
}

export default MyInfo;
