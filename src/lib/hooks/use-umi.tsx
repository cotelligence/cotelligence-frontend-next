import type { Umi } from '@metaplex-foundation/umi';
import { createContext, useContext } from 'react';

export const UmiContext = createContext<Umi | null>(null);

export const useUmi = () => {
  const umi = useContext(UmiContext);

  if (!umi) {
    throw new Error(
      'Umi context was not initialized. ' +
        'Did you forget to wrap your app with <UmiProvider />?',
    );
  }

  return umi;
};
