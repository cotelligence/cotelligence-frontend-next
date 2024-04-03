'use client';
import { Image, Tab, Tabs } from '@nextui-org/react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { create } from 'zustand';

import { PredictByUuidResponse } from '@/lib/apis/predicte-by-uuid';
import { ModelType } from '@/lib/types';

import { useModelInfo } from '.';
import TextTyper from './text-typer';

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
});

const defaultValue: {
  data: null | PredictByUuidResponse;
  loading: boolean;
  text?: string;
} = {
  loading: false,
  data: null,
};

export const useOutputState = create(() => defaultValue);

const OutputSection = () => {
  const { data } = useOutputState();

  const { type } = useModelInfo();

  useEffect(
    () => () => {
      useOutputState.setState(defaultValue, true);
    },
    [],
  );

  return (
    <section className="pl-9 pt-2 grid grid-cols-1 grid-rows-[max-content,max-content,minmax(256px,max-content)] h-full">
      <p className="text-xl mb-3">Output</p>
      <Tabs
        fullWidth
        classNames={{
          tabList:
            'after:border-b after:border-divider relative after:w-full after:absolute after:bottom-0 after:-z-10 gap-6 w-full p-0',
          tab: 'w-max px-0 uppercase',
          panel: clsx('overflow-auto px-0 p-5 bg-[#F4F4F4] my-4'),
          cursor: 'w-full',
        }}
        variant="underlined"
      >
        <Tab key="preview" title="Preview">
          <div>
            <>
              {data && type === ModelType.Text2Img && (
                <Image
                  alt=""
                  classNames={{
                    wrapper: 'leading-[0px]',
                  }}
                  radius="none"
                  src={data?.output?.[0]}
                />
              )}
              {type === ModelType.Text2Text && <TextTyper key={data?.id} />}
            </>
          </div>
        </Tab>
        <Tab key="json" title="Json">
          {data ? <ReactJson collapseStringsAfterLength={50} src={data} /> : <i />}
        </Tab>
      </Tabs>
    </section>
  );
};

export default OutputSection;
