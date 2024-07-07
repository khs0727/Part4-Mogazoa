'use client';

import React from 'react';
import { useSignIn, useSignUp } from '@/hooks/login';
import { SignInRequest, SignUpRequest } from '@/types/data';

const MyPageComponent = () => {
  const signUp = useSignUp();
  const signIn = useSignIn();

  const signUpData: SignUpRequest = {
    email: 'test1231232@naver.com',
    nickname: '저는새로운유저입니다.',
    password: '1248128421',
    passwordConfirmation: '1248128421',
  };

  const signInData: SignInRequest = {
    email: 'test1@codeit.kr',
    password: 'test1234',
  };

  const handleButtonClick1 = () => {
    signUp(signUpData);
  };
  const handleButtonClick2 = () => {
    signIn(signInData);
  };

  return (
    <div>
      <button onClick={handleButtonClick1}>회원가입</button>
      <button onClick={handleButtonClick2}>로그인</button>
    </div>
  );
};

export default MyPageComponent;
