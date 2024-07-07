'use client';

import { useGetMyInfoQuery, useUpdateMyInfo, useGetUserInfoQuery } from '@/hooks/User';
import { useDataQuery } from '@/services/common';

function MyInfo() {
  const { data: myInfoData, isLoading, error } = useGetMyInfoQuery({ url: '/users/270' });
  const updateMyData = useUpdateMyInfo();
  const { data: userInfoData } = useGetUserInfoQuery({ userId: 268 });
  const handleButtonClick = () => {
    updateMyData({ nickname: 'james2' });
  };

  return (
    <>
      <div>{myInfoData?.id}</div>
      <div>{userInfoData?.id}</div>
      <button onClick={handleButtonClick}>닉변</button>
    </>
  );
}

export default MyInfo;
