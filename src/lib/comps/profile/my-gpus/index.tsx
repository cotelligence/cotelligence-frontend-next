import { Spinner } from '@nextui-org/react';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { FC } from 'react';

import { useTokenAssets } from '@/lib/hooks/use-token-assets';

import MyTableRow from './my-table-row';
import OperationModal from './operation-modal';
import TransferModal from './transfer-modal';

export enum ColKey {
  Expire = 'Expire',
  Identity = 'Identity',
  Status = 'Status',
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
    className: 'flex-1 px-2 basis-2/5 sticky left-0 z-20',
  },
  { key: ColKey.Expire, label: 'Expire Date', className: 'flex-1 px-2 basis-2/5' },
  { key: ColKey.Status, className: 'flex-1 px-2 basis-1/5' },
];

const MyGpus: FC = () => {
  const { publicKey } = useWallet();

  const { data } = useTokenAssets(publicKey);

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
              {data?.map((item) => <MyTableRow key={item.tokenInfo.id} data={item} />)}
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
      <TransferModal />
      <OperationModal />
    </>
  );
};

export default MyGpus;
