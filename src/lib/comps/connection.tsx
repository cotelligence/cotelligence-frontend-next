'use client';
import {
  ButtonGroup,
  ButtonGroupProvider,
  Link,
  LinkIcon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { memo } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { create } from 'zustand';

import { formatNumber } from '../fns/format-number';
import { useSolBalance } from '../hooks/use-sol-balance';
import CopyBtn from './copy-btn';
import { MyButton } from './my-button';

export const useConnectModalVisibility = create(() => false);

const Connection = () => {
  const open = useConnectModalVisibility();

  const { connecting, connected, select, wallets, publicKey, disconnect, disconnecting } =
    useWallet();

  const walletAddress = publicKey?.toString();

  const handleSelect = (name: WalletName) => {
    select(name);
    useConnectModalVisibility.setState(false);
  };

  return (
    <div className="ml-auto h-10 flex items-center">
      {walletAddress ? (
        <ButtonGroup>
          <MyButton as={Link} className="pr-3" href="/profile">
            {walletAddress.slice(0, 8)}
          </MyButton>
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <MyButton isIconOnly className="p-0">
                <FaCaretDown />
              </MyButton>
            </PopoverTrigger>
            <PopoverContent className="gap-3 p-3">
              {/* Prevent Being Included In Group */}
              <Balance />
              <ButtonGroupProvider value={null as any}>
                <CopyBtn copyContent={walletAddress}>Copy Address</CopyBtn>
                <MyButton
                  className="w-full"
                  isLoading={disconnecting}
                  onPress={disconnect}
                >
                  Disconnect
                </MyButton>
              </ButtonGroupProvider>
            </PopoverContent>
          </Popover>
        </ButtonGroup>
      ) : (
        <MyButton
          className="text-large"
          isDisabled={disconnecting || connected}
          isLoading={connecting}
          onPress={() => useConnectModalVisibility.setState(true)}
        >
          Connect
        </MyButton>
      )}
      <Modal
        backdrop="blur"
        isOpen={open}
        scrollBehavior="inside"
        onClose={() => {
          useConnectModalVisibility.setState(false);
        }}
      >
        <ModalContent>
          <ModalHeader>Select Wallet</ModalHeader>
          <ModalBody className="py-5">
            {wallets.map(({ readyState, adapter: { name, icon, url } }, index) => {
              const notDetected = readyState === WalletReadyState.NotDetected;
              const ready =
                readyState === WalletReadyState.Installed ||
                readyState === WalletReadyState.Loadable;
              const isDisabled = !ready && !notDetected;

              return (
                <MyButton
                  key={name + index}
                  as={notDetected ? Link : undefined}
                  className="shrink-0"
                  href={url}
                  isDisabled={isDisabled}
                  isExternal={notDetected}
                  onPress={() => handleSelect(name)}
                >
                  <span className="flex gap-2 items-center">
                    {name}
                    {isDisabled && `(${readyState})`}
                    <img alt={name} className="w-5 h-5" src={icon} />
                    {notDetected && <LinkIcon />}
                  </span>
                </MyButton>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Connection;

const Balance = memo(() => {
  const { publicKey } = useWallet();
  const { data } = useSolBalance(publicKey);

  return (
    <p className="text-lg font-medium">{`${data ? formatNumber(data / LAMPORTS_PER_SOL) : '-'} SOL`}</p>
  );
});
