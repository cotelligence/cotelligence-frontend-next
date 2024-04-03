'use client';
import { ButtonProps } from '@nextui-org/react';
import { PressEvent } from '@react-types/shared';
import clsx from 'clsx';
import React, { FC, memo, useRef, useState } from 'react';
import { MdCheck, MdCopyAll } from 'react-icons/md';
import { useUnmount } from 'react-use';

import { MyButton } from './my-button';

const CopyBtn: FC<{ copyContent: string; showCopyIcon?: boolean } & ButtonProps> = ({
  copyContent,
  children,
  onPress,
  showCopyIcon = true,
  ...props
}) => {
  const [copied, setCopied] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleCopy = async (e: PressEvent) => {
    onPress?.(e);

    try {
      clearTimeout(timerRef.current);
      await navigator.clipboard.writeText(copyContent);
      setCopied(true);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  useUnmount(() => clearTimeout(timerRef.current));

  return (
    <MyButton {...props} onPress={handleCopy}>
      {showCopyIcon ? (
        <>
          {children && <span>{children}</span>}
          <span className="inline-grid w-[1em] h-[1em] grid-cols-1 grid-rows-1 [&>svg]:transition-all [&>svg]:transform [&>svg]:row-start-1 [&>svg]:col-start-1 place-items-center">
            <MdCheck className={clsx(copied || 'opacity-0 scale-50')} />
            <MdCopyAll className={clsx(copied && 'opacity-0 scale-50')} />
          </span>
        </>
      ) : (
        children
      )}
    </MyButton>
  );
};

export default memo(CopyBtn);
