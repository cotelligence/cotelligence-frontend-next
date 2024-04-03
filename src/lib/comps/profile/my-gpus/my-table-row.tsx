import { Button, Image } from '@nextui-org/react';
import clsx from 'clsx';
import { format, formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { GPU_NAME, GPU_VRAM } from '@/lib/constants';
import { TokenAsset } from '@/lib/types';

import { ColKey, COLUMNS } from '.';
import ExpandItem from './expand-item';
import StatusDisplay from './status-display';

const MyTableRow: FC<{
  data: TokenAsset;
}> = ({ data }) => {
  const expireTime: number = data.metadata?.attributes?.[0].value;

  const [distance, setDistance] = useState('');

  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (!expireTime) {
      return setDistance('-');
    }

    console.log({ expireTime });

    setDistance(
      formatDistanceToNow(expireTime, {
        addSuffix: true,
        includeSeconds: true,
      }),
    );
  }, [expireTime]);

  return (
    <div
      className={clsx(
        'border border-transparent rounded-md transition-colors duration-300',
        expand && '!border-divider',
      )}
    >
      <div
        className={clsx(
          'flex gap-3 min-h-10 items-center rounded-t-md rounded-b-md hover:bg-[#F2F2F2] py-3 transition-all duration-300',
          expand && 'bg-[#F2F2F2] !rounded-b-none',
        )}
      >
        {COLUMNS.map((col) => (
          <div key={col.key} className={clsx(col.className, 'flex items-center gap-2')}>
            {col.key === ColKey.Identity && (
              <>
                <Image
                  alt=""
                  className="w-full h-full object-cover"
                  classNames={{
                    wrapper: 'bg-black/5 w-12 h-12',
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
            {col.key === ColKey.Expire && (
              <div>
                <p>{expireTime ? format(expireTime, 'yyyy-MM-dd HH:mm:ss') : '-'}</p>
                <p>{distance}</p>
              </div>
            )}
            {col.key === ColKey.Status && (
              <>
                <StatusDisplay status={data.tokenInfo.runpodStatus} />
                <Button
                  isIconOnly
                  className="ml-auto"
                  size="sm"
                  variant="light"
                  onClick={() => setExpand((pre) => !pre)}
                >
                  <IoIosArrowDown
                    className={clsx(
                      'transition-transform duration-300 text-[#888888]',
                      expand && 'rotate-180',
                    )}
                    size="30px"
                  />
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
      <AnimatePresence>
        {expand && (
          <motion.div
            animate="enter"
            className="overflow-hidden px-4"
            exit="exit"
            initial="exit"
            transition={{ duration: 0.3 }}
            variants={{
              exit: {
                opacity: 0,
                margin: '0px 0',
                height: 0,
              },
              enter: {
                opacity: 1,
                margin: '16px 0',
                height: 'auto',
              },
            }}
          >
            <ExpandItem data={data} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyTableRow;
