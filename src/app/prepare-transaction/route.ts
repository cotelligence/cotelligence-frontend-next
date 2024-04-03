import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';

export const POST = async (request: Request) => {
  console.log('\n\n--------------------\n');
  try {
    const { destPubKey58, userPubKey58, versioned } = (await request.json()) as {
      destPubKey58: string;
      userPubKey58: string;
      versioned?: boolean;
    };

    const destPubKey = new PublicKey(destPubKey58);

    const userPubKey = new PublicKey(userPubKey58);

    const keypair = Keypair.generate();

    const connection = new Connection(process.env.NEXT_PUBLIC_RPC_ENDPOINT, 'confirmed');

    await connection.requestAirdrop(keypair.publicKey, LAMPORTS_PER_SOL * 1.1);

    const {
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    const instructions: TransactionInstruction[] = [];

    instructions.push(
      SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: userPubKey,
        lamports: LAMPORTS_PER_SOL,
      }),
      SystemProgram.transfer({
        fromPubkey: userPubKey,
        toPubkey: destPubKey,
        lamports: LAMPORTS_PER_SOL / 2,
      }),
    );

    if (versioned) {
      const msgV0 = new TransactionMessage({
        payerKey: keypair.publicKey,
        recentBlockhash: blockhash,
        instructions,
      }).compileToV0Message();

      const transaction = new VersionedTransaction(msgV0);

      transaction.sign([keypair]);

      return new Response(transaction.serialize());
    } else {
      const transaction = new Transaction({
        // feePayer: userPubKey,
        feePayer: keypair.publicKey,
        blockhash,
        lastValidBlockHeight,
      }).add(...instructions);

      transaction.partialSign(keypair);

      return new Response(
        transaction.serialize({
          requireAllSignatures: false,
        }),
      );
    }
  } catch (err: any) {
    console.error(err);

    return Response.json(
      { error: err.message || err.msg || 'Somthing wrong' },
      { status: 400 },
    );
  }
};
