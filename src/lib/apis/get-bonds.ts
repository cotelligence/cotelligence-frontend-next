import { PublicKey } from '@solana/web3.js';

import { BASE_BACKEND_URL } from '../constants';
import { fetchJson } from '../fns/fetch-json';
import { BondInfo } from '../types';

export const getBonds = (owner: PublicKey) =>
  fetchJson<BondInfo[]>(`${BASE_BACKEND_URL}/api/v1/nft/bonds/${owner}`);
