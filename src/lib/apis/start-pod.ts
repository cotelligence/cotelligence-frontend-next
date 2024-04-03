import { BASE_BACKEND_URL } from '@/lib/constants';
import { fetchJson } from '@/lib/fns/fetch-json';
import { RunpodMintInfo, StartRunpodBody } from '@/lib/types';

export const startRunpod = (body: StartRunpodBody) => {
  return fetchJson<RunpodMintInfo>(`${BASE_BACKEND_URL}/api/v1/runpod/start`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
