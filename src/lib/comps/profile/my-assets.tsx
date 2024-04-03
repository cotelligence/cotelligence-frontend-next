'use client';
import { Tab, Tabs } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import MyBonds from './my-bonds';
import MyGpus from './my-gpus';

export type AssetTabType = 'my-bonds' | 'my-gpus';

const MyAssets = () => {
  const { tab } = useParams<{ tab: AssetTabType }>();

  const router = useRouter();

  return (
    <div className="pl-9 pr-[50px] h-full grid-cols-1 grid grid-rows-[max-content,minmax(0,1fr)]">
      <Tabs
        classNames={{
          tab: 'text-lg font-medium h-[54px] w-max px-0',
          cursor: 'h-0.5 w-full',
          base: 'w-full',
          panel: 'py-0 h-full relative z-0',
          tabList:
            'after:border-b after:border-divider py-0 relative after:w-full after:absolute after:bottom-0 after:-z-10 gap-[60px] w-full',
        }}
        selectedKey={tab}
        variant="underlined"
        onSelectionChange={(key) => router.push(`/profile/${key}`)}
      >
        <Tab key="my-gpus" title="MY GPUS">
          <MyGpus />
        </Tab>
        <Tab key="my-bonds" title="MY BONDS">
          <MyBonds />
        </Tab>
      </Tabs>
    </div>
  );
};

export default MyAssets;
