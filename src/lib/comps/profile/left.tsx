'use client';
import { Listbox, ListboxItem } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import React from 'react';

import { AssetTabType } from '@/lib/comps/profile/my-assets';
import { RunpodStatus } from '@/lib/types';

import StatusDisplay from './my-gpus/status-display';

const ProfileLeft = () => {
  const { tab } = useParams<{ tab: AssetTabType }>();

  return (
    tab === 'my-gpus' && (
      <>
        <p className="text-large mb-3 font-medium">Status</p>
        <Listbox
          aria-label="Status filter"
          className="font-medium p-0"
          itemClasses={{
            base: 'gap-3 px-0',
            title: 'text-base',
          }}
          variant="light"
        >
          {[
            RunpodStatus.NotStarted,
            RunpodStatus.Starting,
            RunpodStatus.Running,
            RunpodStatus.Stopped,
            RunpodStatus.Error,
          ].map((status) => (
            <ListboxItem key={status} aria-label={status}>
              <StatusDisplay status={status} />
            </ListboxItem>
          ))}
        </Listbox>
      </>
    )
  );
};

export default ProfileLeft;
