import { fetchDigitalAssetWithAssociatedToken } from '@metaplex-foundation/mpl-token-metadata';
import { publicKey as umiPublicKey } from '@metaplex-foundation/umi';
import { PublicKey } from '@solana/web3.js';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getTokens } from '../apis/get-tokens';
import { fetchJson } from '../fns/fetch-json';
import { TokenAsset, UriMetadata } from '../types';
import { useUmi } from './use-umi';

const getKey = (pubKey?: PublicKey | null) => ['my-token-assets', pubKey];

const useTokenAssets = (
  pubKey?: PublicKey | null,

  options?: Omit<UseQueryOptions<TokenAsset[]>, 'queryKey' | 'queryFn' | 'enabled'>,
) => {
  const umi = useUmi();

  return useQuery({
    ...options,
    queryKey: getKey(pubKey),
    queryFn: async () => {
      const tokensInfo = await getTokens(pubKey!);

      const temp = await Promise.all(
        tokensInfo.map(async (tokenInfo) => {
          const asset = await fetchDigitalAssetWithAssociatedToken(
            umi,
            umiPublicKey(tokenInfo.mint),
            umiPublicKey(pubKey!.toBase58()),
          ).catch((e) => console.warn('no nft', e));

          console.log(tokenInfo.mint, pubKey!.toBase58(), asset);

          if (!asset) return;

          const metadata = await fetchJson<UriMetadata>(asset.metadata.uri).catch((e) =>
            console.warn('no metadata', e),
          );

          if (!metadata) return;

          return {
            tokenInfo,
            asset,
            metadata,
          };
        }),
      );

      return temp?.filter((item): item is TokenAsset => !!item);
    },
    enabled: !!pubKey,
  });
};

useTokenAssets.getKey = getKey;

export { useTokenAssets };
