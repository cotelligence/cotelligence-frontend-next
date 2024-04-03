'use client';
import React from 'react';

import NftMintModal, { useMintModal } from '@/lib/comps/cp-nft/nft-mint-modal';
import { MyButton } from '@/lib/comps/my-button';

const MintPage = () => {
  return (
    <div className="grid grid-cols-[1fr_1px_1fr] h-full max-w-screen-2xl mx-auto justify-between relative">
      <div className="py-5 flex flex-col justify-center mx-auto max-w-[603px] px-[50px]">
        <h2 className="text-[40px] mb-10 font-medium">CP-NFT</h2>
        <p className="mb-12">
          {`CP-NFT(Computing Power NFT). With CP-NFT, you can mint one-of-a-kind NFTs representing your GPU assets, revolutionizing the world of computing power ownership. Whether you're a gamer, developer, or crypto miner, CP-NFT allows you to tokenize your computing power like never before. With CP-NFT, your computing power becomes a valuable digital asset, ready to be utilized or traded at your discretion.`}
        </p>
        <MyButton
          className="w-max"
          onPress={() =>
            useMintModal.setState({
              open: true,
              bond: false,
            })
          }
        >
          Mint Now
        </MyButton>
      </div>
      <i className="h-full w-0 border-r border-divider" />
      <div className="py-5 flex flex-col justify-center mx-auto max-w-[603px] px-[50px]">
        <h2 className="text-[40px] mb-10 font-medium">CP-BOND</h2>
        <p className="mb-12">
          {`CP-BOND (Computing Power Bond). You can contribute your computing power to Cotelligence by bonding your CP-NFT. Cotelligence utilizes the computing power to build a model serving service. By bonding your NFT, you contribute your GPU power to the Cotelligence Computing Power Pool. Your NFTs will be burned and you will receive a bond. GPU Bonds are matured with a 30-day linear release schedule. You can claim vested tokens after the 30-day period.`}
        </p>

        <MyButton
          className="w-max"
          onPress={() =>
            useMintModal.setState({
              open: true,
              bond: true,
            })
          }
        >
          Mint and Bond
        </MyButton>
      </div>
      <NftMintModal />
    </div>
  );
};

export default MintPage;
