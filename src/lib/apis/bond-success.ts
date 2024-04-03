import { BASE_BACKEND_URL } from '../constants';
import { checkFetchResponse } from '../fns/check-fetch-response';

export const bondSuccess = (owner: string, mint: string) =>
  fetch(`${BASE_BACKEND_URL}/api/v1/nft/bonding-transaction-success`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      owner,
      mint,
    }),
  }).then(checkFetchResponse);
