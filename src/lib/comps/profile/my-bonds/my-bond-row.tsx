import { Image } from '@nextui-org/react';
import clsx from 'clsx';
import { format, formatDistanceToNow } from 'date-fns';
import React, { FC, useEffect, useState } from 'react';

import { GPU_NAME, GPU_VRAM } from '@/lib/constants';
import { formatNumber } from '@/lib/fns/format-number';
import { BondAsset } from '@/lib/types';

import { MyButton } from '../../my-button';
import { ColKey, COLUMNS } from '.';
import { useRedeemModal } from './redeem-modal';

const MyBondRow: FC<{
  data: BondAsset;
}> = ({ data }) => {
  const expireTime = data.bondInfo.expireTime;

  const [distance, setDistance] = useState('');

  useEffect(() => {
    if (!expireTime) {
      return setDistance('-');
    }

    setDistance(
      formatDistanceToNow(expireTime, {
        addSuffix: true,
        includeSeconds: true,
      }),
    );
  }, [expireTime]);

  return (
    <div className="flex gap-3 min-h-10 items-center rounded-md hover:bg-[#F2F2F2] py-3 transition-all duration-300">
      {COLUMNS.map((col) => (
        <div key={col.key} className={clsx(col.className, 'flex items-center gap-2')}>
          {col.key === ColKey.Identity && (
            <>
              <Image
                alt=""
                className="w-12 h-12"
                classNames={{
                  wrapper: 'bg-black/5',
                }}
                radius="none"
                src={data.metadata?.image}
              />
              <div>
                <p>{GPU_NAME}</p>
                <p>{GPU_VRAM}</p>
              </div>
            </>
          )}
          {col.key === ColKey.VestDate && (
            <div>
              <p>{expireTime ? format(expireTime, 'yyyy-MM-dd HH:mm:ss') : '-'}</p>
              <p>{distance}</p>
            </div>
          )}
          {col.key === ColKey.Rewards && `${formatNumber(data.bondInfo.rewards)} CToken`}
          {col.key === ColKey.Redeem && (
            <MyButton
              onClick={() =>
                useRedeemModal.setState({ open: true, mint: data.bondInfo.mint })
              }
            >
              Redeem
            </MyButton>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyBondRow;
