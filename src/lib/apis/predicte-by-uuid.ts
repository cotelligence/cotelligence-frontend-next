import { MODEL_BACKEDN_URL } from '../constants';
import { fetchJson } from '../fns/fetch-json';

export interface PredictInput {
  height?: number;
  max_new_tokens?: number;
  prompt: string;
  width?: number;
}

export interface PredictByUuidRequest {
  input: PredictInput;
  stream?: boolean;
}

export interface PredictByUuidResponse {
  id: number;
  input: PredictInput;
  output?: string[];
  stream: boolean;
}

export const getPredictByUuidEndpointUrl = (uuid: string) =>
  `${MODEL_BACKEDN_URL}/prediction/${uuid}`;

export const predictByUuid = (uuid: string, payload: PredictByUuidRequest) =>
  fetchJson<PredictByUuidResponse>(getPredictByUuidEndpointUrl(uuid), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
