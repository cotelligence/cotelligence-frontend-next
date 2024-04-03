import { BASE_BACKEND_URL } from '../constants';
import { checkFetchResponse } from '../fns/check-fetch-response';

export const mintSuccess = (signature: string) =>
  fetch(`${BASE_BACKEND_URL}/api/v1/nft/mint-success/${signature}`, {
    method: 'PUT',
  }).then(checkFetchResponse);
