'use client';
import { Image, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useQueryClient } from '@tanstack/react-query';
import base58 from 'bs58';
import NextImage from 'next/image';
import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { create } from 'zustand';

import { bondSuccess } from '@/lib/apis/bond-success';
import { getBondNftTransaction } from '@/lib/apis/get-bond-nft-transaction';
import { getMintNftTransaction } from '@/lib/apis/get-mint-nft-transaction';
import { mintSuccess } from '@/lib/apis/mint-success';
import { parseError } from '@/lib/fns/parse-error';
import { sendAandConfirSerializedTransaction } from '@/lib/fns/send-and-confir-serialized-transaction';
import { useBondAssets } from '@/lib/hooks/use-bond-assets';
import { useTokenAssets } from '@/lib/hooks/use-token-assets';
import { useUmi } from '@/lib/hooks/use-umi';

import { useConnectModalVisibility } from '../connection';
import { MyButton } from '../my-button';
import bondImg from './bond.jpeg';
import nftImg from './nft.jpeg';

export const useMintModal = create(() => ({
  open: false,
  bond: false,
}));

const NftMintModal: FC = () => {
  const { publicKey, connecting } = useWallet();

  const { open, bond } = useMintModal();

  const umi = useUmi();

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleMint = async () => {
    if (!publicKey) {
      return useConnectModalVisibility.setState(true);
    }

    try {
      setLoading(true);

      const { serializedTx, mint } = await getMintNftTransaction(publicKey);
      const { signature } = await sendAandConfirSerializedTransaction(serializedTx, umi);

      await mintSuccess(base58.encode(signature));
      await queryClient.invalidateQueries({
        queryKey: useTokenAssets.getKey(publicKey),
      });

      if (bond) {
        const { serializedTx: bondTx, mint: bondMint } = await getBondNftTransaction(
          publicKey,
          mint,
        );

        await sendAandConfirSerializedTransaction(bondTx, umi);
        await bondSuccess(publicKey.toBase58(), bondMint);

        await queryClient.invalidateQueries({
          queryKey: useBondAssets.getKey(publicKey),
        });
        toast.success('Mint and bond success');
      } else {
        toast.success('Mint success');
      }

      useMintModal.setState({ open: false });
    } catch (err: any) {
      console.error(err);
      toast.error(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      backdrop="blur"
      hideCloseButton={loading}
      isOpen={open}
      radius="sm"
      size="2xl"
      onOpenChange={
        loading ? undefined : (value) => useMintModal.setState({ open: value })
      }
    >
      <ModalContent>
        <ModalBody className="py-10 flex-row gap-7 max-w-[630px] mx-auto w-full">
          <Image
            alt="Nft Image"
            as={NextImage}
            className="object-cover w-full h-full"
            classNames={{
              wrapper: 'bg-[#D9D9D9] shrink-0 !max-w-none h-[145px] w-[145px]',
            }}
            height={145}
            radius="none"
            src={bond ? bondImg.src : nftImg.src}
            width={145}
          />
          <div className="flex-1">
            <div className="grid grid-cols-[100px,minmax(0,1fr)] content-around auto-rows-max h-[145px] [&>div:nth-of-type(odd)]:text-[#4D4D4D]">
              <p className="text-lg col-span-2">Mint</p>
              <i className="col-span-2 border-t border-divider" />
              <div>Price</div>
              <div>0.5 sol</div>
              <div>Quantity</div>
              <div>1</div>
              <i className="col-span-2 border-t border-divider" />
              <div>Total</div>
              <div>0.5 sol + gas</div>
            </div>
            <MyButton
              className="w-max mt-10"
              isDisabled={connecting}
              isLoading={loading}
              onPress={handleMint}
            >
              Mint
              {bond ? ' and Bond' : ''}
            </MyButton>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NftMintModal;
