import { BASE_BACKEND_URL } from '@/lib/constants';
import { fetchJson } from '@/lib/fns/fetch-json';

export const getRunpodStartMsg = (mint: string) =>
  fetchJson<{ data: string }>(`${BASE_BACKEND_URL}/api/v1/runpod/start-msg/${mint}`).then(
    ({ data }) => data,
  );
