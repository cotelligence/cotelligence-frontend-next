import { Image, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { useWallet } from '@solana/wallet-adapter-react';
import base58 from 'bs58';
import React, { FC, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { create } from 'zustand';

import { bondSuccess } from '@/lib/apis/bond-success';
import { getBondNftTransaction } from '@/lib/apis/get-bond-nft-transaction';
import { getRunpodStartMsg } from '@/lib/apis/get-runpod-start-msg';
import { startRunpod } from '@/lib/apis/start-pod';
import { parseError } from '@/lib/fns/parse-error';
import { sendAandConfirSerializedTransaction } from '@/lib/fns/send-and-confir-serialized-transaction';
import { useTokenAssets } from '@/lib/hooks/use-token-assets';
import { useUmi } from '@/lib/hooks/use-umi';
import { TokenAsset } from '@/lib/types';

import { MyButton } from '../../my-button';

export const useOperationModal = create<{
  open: boolean;
  payload?: {
    tokenId: number;
    type: 'bond' | 'activate';
  };
}>(() => ({
  open: false,
}));

const OperationModal: FC = () => {
  const { publicKey } = useWallet();
  const umi = useUmi();

  const { open, payload } = useOperationModal();

  const [loading, setLoading] = useState(false);

  const { data, refetch } = useTokenAssets(publicKey);

  const targetToken = useMemo(
    () =>
      payload?.tokenId === undefined
        ? undefined
        : data?.find((item) => item.tokenInfo.id === payload?.tokenId),
    [data, payload?.tokenId],
  );

  const confirmOperation = async () => {
    try {
      setLoading(true);

      if (!targetToken) return;

      if (payload?.type === 'bond') {
        await runBond(targetToken);
      } else {
        await runActivate(targetToken);
      }

      useOperationModal.setState({ open: false }, true);
    } catch (error) {
      console.error(error);
      toast.error(parseError(error));
    } finally {
      setLoading(false);
    }
  };

  const runBond = async (target: TokenAsset) => {
    const { serializedTx } = await getBondNftTransaction(
      target.tokenInfo.owner,
      target.tokenInfo.mint,
    );

    await sendAandConfirSerializedTransaction(serializedTx, umi);
    await bondSuccess(target.tokenInfo.owner, target.tokenInfo.mint);
    await refetch();

    toast.success('Bond success!');
  };

  const runActivate = async (target: TokenAsset) => {
    const msg = await getRunpodStartMsg(target.tokenInfo.mint);
    const sig = await umi.payer.signMessage(new TextEncoder().encode(msg));

    const startResult = await startRunpod({
      sig: base58.encode(sig),
      mint: target.tokenInfo.mint,
      signer: publicKey!.toString(),
    });

    console.log({ startResult });

    await refetch();

    toast.success('Activate success!');
  };

  return (
    <Modal
      backdrop="blur"
      hideCloseButton={loading}
      isOpen={open}
      size="3xl"
      onOpenChange={
        loading ? undefined : (value) => useOperationModal.setState({ open: value })
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
                src={targetToken?.metadata.image}
              />
              <div className="font-medium">
                <p className="capitalize h-11 border-b border-divider text-lg">
                  {payload?.type} Your NFT
                </p>
                <p className="text-[#4D4D4D] mt-7">
                  {payload?.type === 'bond'
                    ? 'By bonding your NFT, you contribute your GPU power to the Cotelligence Computing Power Pool. Your NFTs will be burned and you will receive a bond. GPU Bonds are matured with a 30-day linear release schedule. You can claim vested tokens at any time within the 30-day period.'
                    : 'After activating your NFT, you will be able to utilize the computing resources tied to it. However, once activated, the NFT cannot be bonded.'}
                </p>
                {payload?.type === 'bond' && (
                  <div className="grid [&>*:nth-child(odd)]:text-[#4D4D4D] mt-10 grid-cols-[max-content,minmax(0,1fr)] gap-x-7">
                    <div>You Will Get</div>
                    <div>225,000 CToken</div>
                    <div>ROI</div>
                    <div>25%</div>
                    <div>Vesting Term</div>
                    <div>30 days</div>
                  </div>
                )}
                <div className="flex gap-[50px] mt-[70px]">
                  <MyButton isLoading={loading} onPress={confirmOperation}>
                    Confirm
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

export default OperationModal;
