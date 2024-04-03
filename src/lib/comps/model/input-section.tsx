'use client';
import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';

import FormPanel from './form-panel';
import HttpPanel from './http-panel';

const InputSection = () => {
  return (
    <section className="pt-2 grid grid-cols-1 grid-rows-[max-content,max-content,minmax(0,1fr)] h-full border-r border-divider">
      <p className="text-xl mb-3">Input</p>
      <Tabs
        fullWidth
        classNames={{
          tabList:
            'after:border-b after:border-divider relative after:w-full after:absolute after:bottom-0 after:right-9 after:-z-10 gap-6 w-full p-0 pr-9',
          tab: 'w-max px-0 uppercase',
          panel: 'py-4 overflow-auto px-0',
          cursor: 'w-full',
        }}
        variant="underlined"
      >
        <Tab key="form" title="form">
          <FormPanel />
        </Tab>
        <Tab key="http" title="http">
          <HttpPanel />
        </Tab>
      </Tabs>
    </section>
  );
};

export default InputSection;
