import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';

const getKey = (pubKey?: PublicKey | null) => ['sol-balance', pubKey];

const useSolBalance = (pubKey?: PublicKey | null) => {
  const { connection } = useConnection();

  return useQuery({
    queryKey: getKey(pubKey),
    queryFn: () => connection.getBalance(pubKey!),
    enabled: !!pubKey,
  });
};

useSolBalance.getKey = getKey;

export { useSolBalance };
