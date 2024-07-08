'use client';

import {
  useGetMyInfoQuery,
  useUpdateMyInfo,
  useGetUserInfoQuery,
  useGetFolloewers,
  useGetFolloewees,
  useGetItemsFavoriteProducts,
  useGetUserRanking,
} from '@/hooks/User';

function MyInfo() {
  const { data: myInfoData, isLoading, error } = useGetMyInfoQuery({ url: '/users/270' });
  const updateMyData = useUpdateMyInfo();
  const { data: userInfoData } = useGetUserInfoQuery({ userId: 268 });
  const { data: followersData } = useGetFolloewers();
  const { data: followeesData } = useGetFolloewees();
  const { data: favoriteProductsData } = useGetItemsFavoriteProducts();
  const { data: userRankingData } = useGetUserRanking({ params: { limit: 5 } });

  const handleButtonClick1 = () => {
    updateMyData({ nickname: 'james2' });
  };
  const handleButtonClick2 = () => {
    console.log('Followers:', followersData);
  };
  const handleButtonClick3 = () => {
    console.log('Followees:', followeesData);
  };
  const handleButtonClick4 = () => {
    console.log('Favorite Products:', favoriteProductsData);
  };
  const handleButtonClick5 = () => {
    console.log('User Ranking:', userRankingData);
  };

  return (
    <>
      <div>{myInfoData?.id}</div>
      <div>{userInfoData?.id}</div>
      <button onClick={handleButtonClick1}>닉변</button>
      <br />
      <button onClick={handleButtonClick2}>팔로워</button>
      <br />
      <button onClick={handleButtonClick3}>팔로위</button>
      <br />
      <button onClick={handleButtonClick4}>찜목록</button>
      <br />
      <button onClick={handleButtonClick5}>랭킹</button>
    </>
  );
}

export default MyInfo;
