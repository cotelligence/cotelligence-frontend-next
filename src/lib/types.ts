import { DigitalAssetWithToken } from '@metaplex-foundation/mpl-token-metadata';

export enum RunpodStatus {
  Error = 'Error',
  NotStarted = 'NotStarted',
  Running = 'Running',
  Starting = 'Starting',
  Stopped = 'Stopped',
}

export interface RunpodMintInfo {
  id: number;
  mint: string;
  owner: string;
  runpodHostId: string;
  runpodId: string;
  runpodPort: number;
  runpodPrivateKey: string;
  runpodPublicIp: string;
  runpodPublicKey: string;
  runpodStatus: RunpodStatus;
  sig: string;
}

export interface UriMetadata {
  attributes: Array<{
    trait_type: string;
    value: any;
  }>;
  description: string;
  image: string;
  name: string;
  symbol: string;
}

export interface TokenAsset {
  asset: DigitalAssetWithToken;
  metadata: UriMetadata;
  tokenInfo: RunpodMintInfo;
}

export enum GpuSource {
  Runpod = 'Runpod',
}

export interface StartRunpodBody {
  mint: string;
  sig: string;
  signer: string;
}

export enum ModelType {
  Text2Img = 'Text2Img',
  Text2Text = 'Text2Text',
}

export interface ModelInfo {
  image_url: string;
  max_instance_cnt: number;
  min_instance_cnt: number;
  name: string;
  type: ModelType;
  uuid: string;
}

export interface BondInfo {
  createAt: number;
  expireTime: number;
  expired: boolean;
  mint: string;
  owner: string;
  rewards: number;
}

export interface BondAsset {
  asset: DigitalAssetWithToken;
  bondInfo: BondInfo;
  metadata: UriMetadata;
}
