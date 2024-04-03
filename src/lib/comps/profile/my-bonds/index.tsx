import { Spinner } from '@nextui-org/react';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { FC } from 'react';

import { useBondAssets } from '@/lib/hooks/use-bond-assets';

import MyBondRow from './my-bond-row';
import RedeemModal from './redeem-modal';

export enum ColKey {
  Identity = 'Identity',
  Redeem = 'Redeem',
  Rewards = 'Rewards',
  VestDate = 'VestDate',
}

export type Col = {
  className?: string;
  key: ColKey;
  label?: string;
};

export const COLUMNS: Array<Col> = [
  {
    key: ColKey.Identity,
    label: '',
    className: 'flex-1 px-2 min-w-[240px] sticky left-0 z-20',
  },
  {
    key: ColKey.VestDate,
    label: 'Fully VESTED DATE',
    className: 'flex-1 px-2 min-w-[240px]',
  },
  {
    key: ColKey.Rewards,
    label: 'VESTED REWARDS',
    className: 'flex-1 px-2 min-w-[200px]',
  },
  { key: ColKey.Redeem, label: '', className: 'flex-1 px-2 min-w-[200px]' },
];

const MyBonds: FC = () => {
  const { publicKey } = useWallet();

  const { data } = useBondAssets(publicKey);

  return (
    <>
      <div className="overflow-auto h-full relative w-full">
        <div className="min-w-[800px] font-medium">
          <div className="flex gap-3 h-[50px] items-center border-b border-divider py-3 sticky top-0 bg-white z-30 uppercase text-[#4D4D4D]">
            {COLUMNS.map(({ key, label, className }) => (
              <div key={key} className={className}>
                {label ?? key}
              </div>
            ))}
          </div>
          {data && (
            <div>
              {data?.map((item) => <MyBondRow key={item.bondInfo.mint} data={item} />)}
            </div>
          )}
        </div>
        {(!publicKey || !data?.length) && (
          <div className="absolute inset-0 bg-white/40 flex items-center justify-center z-[200]">
            {publicKey ? (
              data ? (
                <div>Nothing here</div>
              ) : (
                <Spinner className="w-full h-full" color="default" />
              )
            ) : (
              <div>Connect first</div>
            )}
          </div>
        )}
      </div>
      <RedeemModal />
    </>
  );
};

export default MyBonds;
