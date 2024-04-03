import { Umi } from '@metaplex-foundation/umi';
import base58 from 'bs58';

export const sendAandConfirSerializedTransaction = async (
  serializedTx: string,
  umi: Umi,
) => {
  const transaction = umi.transactions.deserialize(base58.decode(serializedTx));

  console.log({ transaction });

  const signedTransaction = await umi.identity.signTransaction(transaction);

  console.log({ signedTransaction });

  const signature = await umi.rpc.sendTransaction(signedTransaction);

  console.log({ signature });

  // better get blockhash and lastValidBlockHeight from server (which is used to construct the transaction)
  const confirmResult = await umi.rpc.confirmTransaction(signature, {
    strategy: { type: 'blockhash', ...(await umi.rpc.getLatestBlockhash()) },
  });

  console.log({ confirmResult });

  return {
    signature,
    confirmResult,
  };
};
