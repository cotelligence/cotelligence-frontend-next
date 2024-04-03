'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { FC, ReactNode } from 'react';

import { maskString } from '@/lib/fns/mask-string';

const ProfileLayout: FC<{
  children: ReactNode;
  left: ReactNode;
}> = ({ children, left }) => {
  const { publicKey } = useWallet();

  return (
    <div className="w-full max-w-screen-2xl mx-auto h-full max-h-[calc(100vh-136px)] grid grid-cols-[335px,minmax(0,1fr)] grid-rows-[max-content,minmax(0,1fr)]">
      <div className="flex items-center gap-4 border-r border-b border-divider text-xl font-medium py-[30px] px-[50px]">
        <div className="w-10 h-10 rounded-full bg-[#535353]" />
        {publicKey ? maskString(publicKey.toString()) : '-'}
      </div>
      <div className="border-b border-divider text-xl font-medium pl-9 pr-[50px] py-[30px] flex items-center">
        My Assets
      </div>
      <div className="border-r border-divider px-[50px] py-[30px]">{left}</div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default ProfileLayout;
