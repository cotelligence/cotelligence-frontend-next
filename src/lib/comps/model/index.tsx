'use client';
import React, { createContext, FC, useContext } from 'react';

import { ModelInfo } from '@/lib/types';

import InputSection from './input-section';
import OutputSection from './output-section';

// @ts-expect-error must have value
const Context = createContext<ModelInfo>();

export const ModelProvider = Context.Provider;

export const useModelInfo = () => useContext(Context);

const Model: FC<{ info: ModelInfo }> = ({ info }) => {
  console.log('model', info);

  return (
    <ModelProvider value={info}>
      <div className="px-[50px] grid grid-cols-2 font-medium grid-rows-1">
        <InputSection />
        <OutputSection />
      </div>
    </ModelProvider>
  );
};

export default Model;
