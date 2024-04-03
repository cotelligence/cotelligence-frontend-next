import { fetchDigitalAssetWithAssociatedToken } from '@metaplex-foundation/mpl-token-metadata';
import { publicKey as umiPublicKey } from '@metaplex-foundation/umi';
import { PublicKey } from '@solana/web3.js';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getBonds } from '../apis/get-bonds';
import { fetchJson } from '../fns/fetch-json';
import { BondAsset, UriMetadata } from '../types';
import { useUmi } from './use-umi';

const getKey = (pubKey?: PublicKey | null) => ['my-bond-assets', pubKey];

const useBondAssets = (
  pubKey?: PublicKey | null,
  options?: Omit<UseQueryOptions<BondAsset[]>, 'queryKey' | 'queryFn' | 'enabled'>,
) => {
  const umi = useUmi();

  return useQuery({
    ...options,
    queryKey: getKey(pubKey),
    queryFn: async () => {
      const bondsInfo = await getBonds(pubKey!);

      const temp = await Promise.all(
        bondsInfo.map(async (bondInfo) => {
          const asset = await fetchDigitalAssetWithAssociatedToken(
            umi,
            umiPublicKey(bondInfo.mint),
            umiPublicKey(pubKey!.toBase58()),
          ).catch((e) => console.warn('no nft', e));

          console.log(bondInfo.mint, pubKey!.toBase58(), asset);

          if (!asset) return;

          const metadata = await fetchJson<UriMetadata>(asset.metadata.uri).catch((e) =>
            console.warn('no metadata', e),
          );

          if (!metadata) return;

          return {
            bondInfo,
            asset,
            metadata,
          };
        }),
      );

      return temp?.filter((item): item is BondAsset => !!item);
    },
    enabled: !!pubKey,
  });
};

useBondAssets.getKey = getKey;

export { useBondAssets };
