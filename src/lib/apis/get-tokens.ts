import { PublicKey } from '@solana/web3.js';

import { BASE_BACKEND_URL } from '../constants';
import { fetchJson } from '../fns/fetch-json';
import { RunpodMintInfo } from '../types';

export const getTokens = (owner: PublicKey) =>
  fetchJson<RunpodMintInfo[]>(`${BASE_BACKEND_URL}/api/v1/runpod/token-assets/${owner}`);
