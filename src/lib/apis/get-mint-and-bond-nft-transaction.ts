import { PublicKey } from '@solana/web3.js';

import { BASE_BACKEND_URL } from '../constants';
import { fetchJson } from '../fns/fetch-json';

export const getMintAndBondNftTransaction = (publicKey: string | PublicKey) =>
  fetchJson<{
    bondMint: string;
    gpuMint: string;
    serializedTx: string;
  }>(`${BASE_BACKEND_URL}/api/v1/nft/mint-and-bond/${publicKey.toString()}`);
