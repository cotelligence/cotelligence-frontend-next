import clsx from 'clsx';
import React, { FC, memo } from 'react';

import { RunpodStatus } from '@/lib/types';

const configs: Record<RunpodStatus, { bg: string; content: string }> = {
  [RunpodStatus.Running]: {
    bg: 'bg-success',
    content: 'Running',
  },
  [RunpodStatus.NotStarted]: {
    bg: 'bg-warning',
    content: 'Inactivate',
  },
  [RunpodStatus.Stopped]: {
    bg: 'bg-danger',
    content: 'Expired',
  },
  [RunpodStatus.Error]: {
    bg: 'bg-danger',
    content: 'Error',
  },
  [RunpodStatus.Starting]: {
    bg: 'bg-blue-500',
    content: 'Activating',
  },
};

const StatusDisplay: FC<{ className?: string; status: RunpodStatus }> = ({
  status,
  className,
}) => {
  const config = configs[status];

  return (
    <div className={clsx(className, 'flex gap-2 items-center')}>
      <div className={clsx('w-3 h-3 rounded-full', config.bg)} />
      <div>{config.content}</div>
    </div>
  );
};

export default memo(StatusDisplay);
