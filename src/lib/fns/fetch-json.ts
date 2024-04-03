import { checkFetchResponse } from './check-fetch-response';

export const fetchJson = async <T = any>(...params: Parameters<typeof fetch>) => {
  const res = await fetch(...params);

  await checkFetchResponse(res);

  return res.json() as Promise<T>;
};
