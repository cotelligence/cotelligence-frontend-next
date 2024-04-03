import { PublicKey } from '@solana/web3.js';

import { GpuSource } from '@/lib/types';

import { BASE_BACKEND_URL } from '../constants';
import { fetchJson } from '../fns/fetch-json';

export const getMintNftTransaction = (
  publicKey: string | PublicKey,
  gpuSource: GpuSource = GpuSource.Runpod,
) =>
  fetchJson<{
    mint: string;
    serializedTx: string;
  }>(
    `${BASE_BACKEND_URL}/api/v1/nft/mint-transaction/${publicKey.toString()}?gpuSource=${gpuSource}`,
  );
