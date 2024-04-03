'use client';

import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { FC, ReactNode, useMemo } from 'react';

import { UmiContext } from '@/lib/hooks/use-umi';

export const UmiProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const wallet = useWallet();

  const { connection } = useConnection();

  const umi = useMemo(
    () =>
      createUmi(connection).use(walletAdapterIdentity(wallet)).use(mplTokenMetadata()),
    [connection, wallet],
  );

  return <UmiContext.Provider value={umi}>{children}</UmiContext.Provider>;
};
