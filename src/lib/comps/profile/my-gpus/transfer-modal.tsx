import { TokenStandard, transferV1 } from '@metaplex-foundation/mpl-token-metadata';
import { publicKey as umiPublicKey } from '@metaplex-foundation/umi';
import { Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { intersectionWith } from 'lodash';
import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { create } from 'zustand';

import { parseError } from '@/lib/fns/parse-error';
import { useTokenAssets } from '@/lib/hooks/use-token-assets';
import { useUmi } from '@/lib/hooks/use-umi';

import { MyButton } from '../../my-button';

export const useTransferModal = create<{
  onSuccess?: () => void;
  open: boolean;
  tokenIds: number[];
}>(() => ({
  open: false,
  tokenIds: [],
}));

const TransferModal: FC = () => {
  const umi = useUmi();

  const { publicKey } = useWallet();

  const { open, tokenIds } = useTransferModal();

  const [transferTarget, setTransferTarget] = useState('');
  const [transferLoading, setTransferLoading] = useState(false);

  const { data, refetch } = useTokenAssets(publicKey);

  const confirmTransfer = async () => {
    try {
      setTransferLoading(true);

      const selection = intersectionWith(
        data,
        tokenIds,
        (item, id) => item.tokenInfo.id === id,
      );

      if (!selection.length) return;
      // Type 1: Merge all transactions into one transaction
      // const result = await Promise.all(
      //   selection.map((item) =>
      //     transferV1(umi, {
      //       mint: umiPublicKey(item.tokenInfo.mint),
      //       destinationOwner: umiPublicKey(transferTarget),
      //       tokenStandard: TokenStandard.NonFungible,
      //     }).getInstructions(),
      //   ),
      // );

      // const latestBlockInfo = await umi.rpc.getLatestBlockhash();

      // const transaction = umi.transactions.create({
      //   version: 0,
      //   blockhash: latestBlockInfo.blockhash,
      //   instructions: result.flat(),
      //   payer: umi.payer.publicKey,
      // });

      // const signedTransaction = await umi.payer.signTransaction(transaction);

      // const signature = await umi.rpc.sendTransaction(signedTransaction);

      // const confirmResult = await umi.rpc.confirmTransaction(signature, {
      //   strategy: { type: 'blockhash', ...latestBlockInfo },
      // });

      // console.log({ confirmResult });

      // or
      // Type 2: Merge all transactions into one transaction, simpler form
      // const builders = await Promise.all(
      //   selection.map((item) =>
      //     transferV1(umi, {
      //       mint: umiPublicKey(item.tokenInfo.mint),
      //       destinationOwner: umiPublicKey(transferTarget),
      //       tokenStandard: TokenStandard.NonFungible,
      //     }),
      //   ),
      // );

      // const builder = builders.reduce((pre, cur) => pre.add(cur));

      // const result = await builder.sendAndConfirm(umi);

      // console.log({ result });

      // or
      // Type 3: Sign all transactions at once and send them together
      const block = await umi.rpc.getLatestBlockhash();
      const transactions = await Promise.all(
        selection.map(async (item) =>
          transferV1(umi, {
            mint: umiPublicKey(item.tokenInfo.mint),
            destinationOwner: umiPublicKey(transferTarget),
            tokenStandard: TokenStandard.NonFungible,
          })
            .setBlockhash(block)
            .build(umi),
        ),
      );

      console.log({ transactions });

      const sigendTransactions = await umi.payer.signAllTransactions(transactions);

      console.log({ sigendTransactions });

      const sigs = await Promise.all(
        sigendTransactions.map((tx) => umi.rpc.sendTransaction(tx)),
      );

      console.log(sigs);

      const confirms = await Promise.all(
        sigs.map((sig) =>
          umi.rpc.confirmTransaction(sig, {
            strategy: {
              type: 'blockhash',
              ...block,
            },
          }),
        ),
      );

      console.log({ confirms });

      await refetch();
      useTransferModal.setState({ open: false, tokenIds: [] }, true);
    } catch (error) {
      console.error(error);
      toast.error(parseError(error));
    } finally {
      setTransferLoading(false);
    }
  };

  return (
    <Modal
      backdrop="blur"
      hideCloseButton={transferLoading}
      isOpen={open}
      onOpenChange={
        transferLoading
          ? undefined
          : (value) => useTransferModal.setState({ open: value })
      }
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Transfer</ModalHeader>
            <ModalBody className="gap-5 pb-5">
              <Input
                isDisabled={transferLoading}
                label="Target"
                placeholder="Enter transfer targer address"
                size="lg"
                value={transferTarget}
                onValueChange={setTransferTarget}
              />
              <div className="flex gap-5 justify-end">
                <MyButton
                  isDisabled={!transferTarget}
                  isLoading={transferLoading}
                  onPress={confirmTransfer}
                >
                  Confirm
                </MyButton>
                <MyButton isDisabled={transferLoading} onPress={onClose}>
                  Cancel
                </MyButton>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TransferModal;
