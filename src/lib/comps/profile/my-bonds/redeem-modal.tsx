import { Image, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { formatDistanceToNow, isPast } from 'date-fns';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { create } from 'zustand';

import { formatNumber } from '@/lib/fns/format-number';
import { parseError } from '@/lib/fns/parse-error';
import { useBondAssets } from '@/lib/hooks/use-bond-assets';

import { MyButton } from '../../my-button';

export const useRedeemModal = create<{
  mint?: string;
  open: boolean;
}>(() => ({
  open: false,
}));

const RedeemModal: FC = () => {
  const { publicKey } = useWallet();

  const { open, mint } = useRedeemModal();

  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);

  const { data, refetch } = useBondAssets(publicKey);

  const targetAsset = useMemo(
    () =>
      mint === undefined ? undefined : data?.find((item) => item.bondInfo.mint === mint),
    [data, mint],
  );

  const expireTime = targetAsset?.bondInfo.expireTime;

  const confirmClaim = async () => {
    try {
      setLoading(true);

      if (!targetAsset) return;

      await refetch();
      toast.success('Redeem WIP');
      useRedeemModal.setState({ open: false }, true);
    } catch (error) {
      console.error(error);
      toast.error(parseError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!expireTime) return;

    let timer: ReturnType<typeof setTimeout>;

    const checkExpired = () => {
      if (isPast(expireTime)) {
        setExpired(true);
      } else {
        timer = setTimeout(checkExpired, 1000);
      }
    };

    checkExpired();

    return () => {
      clearTimeout(timer);
    };
  }, [expireTime]);

  return (
    <Modal
      backdrop="blur"
      hideCloseButton={loading}
      isOpen={open}
      size="3xl"
      onOpenChange={
        loading ? undefined : (value) => useRedeemModal.setState({ open: value })
      }
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="py-10 flex-row gap-7">
              <Image
                alt="Nft Image"
                classNames={{
                  wrapper: 'h-[145px] w-[145px] shrink-0 !max-w-none',
                }}
                radius="none"
                src={targetAsset?.metadata.image}
              />
              <div className="font-medium">
                <p className="capitalize h-11 border-b border-divider text-lg">
                  Redeem Your Bond
                </p>
                <p className="text-[#4D4D4D] mt-7">
                  By bonding your NFT, you contribute your GPU power to the Cotelligence
                  Computing Power Pool. Your NFTs will be burned and you will receive a
                  bond. GPU Bonds are matured with a 30-day linear release schedule. You
                  can claim vested tokens after the 30-day period.
                </p>
                <div className="grid [&>*:nth-child(odd)]:text-[#4D4D4D] mt-10 grid-cols-[max-content,minmax(0,1fr)] gap-x-7">
                  <div>Rewards</div>
                  <div>{formatNumber(targetAsset!.bondInfo.rewards)} CToken</div>
                  <div>Time until fully vested</div>
                  <div>
                    {formatDistanceToNow(expireTime!, {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
                  </div>
                </div>
                <div className="flex gap-[50px] mt-[70px]">
                  <MyButton
                    isDisabled={!expired}
                    isLoading={loading}
                    onPress={confirmClaim}
                  >
                    Claim
                  </MyButton>
                  <MyButton isDisabled={loading} onPress={onClose}>
                    Cancel
                  </MyButton>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RedeemModal;
