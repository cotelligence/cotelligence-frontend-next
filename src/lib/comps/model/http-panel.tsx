import { Snippet } from '@nextui-org/react';
import { useWallet } from '@solana/wallet-adapter-react';
import React from 'react';

import {
  getPredictByUuidEndpointUrl,
  PredictByUuidRequest,
} from '@/lib/apis/predicte-by-uuid';

import { useModelInfo } from '.';

const HttpPanel = () => {
  const { name, uuid } = useModelInfo();

  const { publicKey } = useWallet();

  return (
    <div className="pr-9">
      <p className="mb-2">Set the Cotelligence_API_Token environment variable:</p>
      <Snippet
        fullWidth
        classNames={{
          pre: 'whitespace-pre-wrap break-all',
        }}
      >{`export Cotelligence_API_Token=${publicKey?.toBase58() || `<your api token>`}`}</Snippet>
      <p className="mt-7 mb-2">{`Run ${name} using Cotelligence's API.`}</p>
      <Snippet
        fullWidth
        classNames={{
          pre: 'whitespace-pre-wrap break-all',
        }}
      >{`curl '${getPredictByUuidEndpointUrl(uuid)}' \\
-X POST \\
-H "Authorization: $Cotelligence_API_Token" \\
-H "Content-Type: application/json" \\
-d $'${JSON.stringify(
        {
          input: { prompt: 'a cat', width: 1024, height: 1024 },
          stream: false,
        } as PredictByUuidRequest,
        undefined,
        '\t',
      )}'`}</Snippet>
    </div>
  );
};

export default HttpPanel;
