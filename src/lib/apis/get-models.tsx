import { MODEL_BACKEDN_URL } from '../constants';
import { fetchJson } from '../fns/fetch-json';
import { ModelInfo, ModelType } from '../types';

export const getModels = () =>
  fetchJson<ModelInfo[]>(`${MODEL_BACKEDN_URL}/models`).then((models) =>
    models.filter(
      ({ type }) => type === ModelType.Text2Img || type === ModelType.Text2Text,
    ),
  );
