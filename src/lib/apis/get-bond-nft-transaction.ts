import { PublicKey } from '@solana/web3.js';

import { BASE_BACKEND_URL } from '../constants';
import { fetchJson } from '../fns/fetch-json';

export const getBondNftTransaction = (publicKey: string | PublicKey, nftMint: string) =>
  fetchJson<{
    mint: string;
    serializedTx: string;
  }>(
    `${BASE_BACKEND_URL}/api/v1/nft/bonding-transaction/${publicKey.toString()}?gpuNftMint=${nftMint}`,
  );
