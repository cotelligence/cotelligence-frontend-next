'use client';
import 'react-toastify/dist/ReactToastify.css';
import '@solana/wallet-standard-util';

import { NextUIProvider } from '@nextui-org/react';
import { Adapter } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/navigation';
import { FC, ReactNode, useState } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { useIsomorphicLayoutEffect } from 'react-use';

import { useIsBrowser } from '@/lib/store/use-is-browser';

import { UmiProvider } from './umi-provider';

export const Providers: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const { push } = useRouter();

  const [queryClient, wallets] = useState(
    () =>
      [
        new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 10_000,
              refetchOnMount: true,
            },
          },
        }),
        // okx does not support solana devnet
        [
          new TorusWalletAdapter({
            params: {
              network: 'devnet',
            },
          }),
          new PhantomWalletAdapter(),
        ] satisfies Adapter[],
      ] as const,
  )[0];

  useIsomorphicLayoutEffect(() => useIsBrowser.setState(true), []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionProvider endpoint={process.env.NEXT_PUBLIC_RPC_ENDPOINT}>
        <WalletProvider autoConnect wallets={wallets}>
          <UmiProvider>
            <NextUIProvider navigate={push}>
              <div className={className}>{children}</div>
              <ToastContainer
                className="!z-[999999]"
                pauseOnFocusLoss={false}
                transition={Zoom}
                // theme="dark"
              />
            </NextUIProvider>
          </UmiProvider>
        </WalletProvider>
      </ConnectionProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
