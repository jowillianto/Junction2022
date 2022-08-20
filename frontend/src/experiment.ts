// import { readFile } from "fs/promises"
import {
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing";
import {
  IndexedTx,
  SigningStargateClient,
  StargateClient,
} from "@cosmjs/stargate";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx";

const rpc = "https://rpc-test.osmosis.zone";

const getAliceSignerFromMnemonic = async (): Promise<OfflineDirectSigner> => {
  return DirectSecp256k1HdWallet.fromMnemonic(
    "twice harvest can cat brother proud thunder flee crisp leader seven local slender lend draw spring camera curious universe mobile spray arrange hero claw",
    {
      prefix: "osmo",
    }
  );
};

const runAll = async (): Promise<void> => {
  const client = await StargateClient.connect(rpc);
  console.log(
    "With client, chain id:",
    await client.getChainId(),
    ", height:",
    await client.getHeight()
  );
  console.log(
    "Alice balances:",
    await client.getAllBalances("osmo19uqaag7j6rvznnnxu8k7q7pwgnh9wvzxhwda3x")
  );

  const aliceSigner: OfflineDirectSigner = await getAliceSignerFromMnemonic();
  console.log(aliceSigner);
  const alice = (await aliceSigner.getAccounts())[0].address;
  console.log("Alice's address from signer", alice);
  const signingClient = await SigningStargateClient.connectWithSigner(
    rpc,
    aliceSigner
  );

  console.log(
    "With signing client, chain id:",
    await signingClient.getChainId(),
    ", height:",
    await signingClient.getHeight()
  );

  const renat = "osmo1c57fpptre0s4euk63vz6a8tch9htylczgl2j5k";
  const izaz = "osmo1ekjwn40e6kvhhpds454ycgj45m7aznn0tglphj";

  console.log("Alice balance before:", await client.getAllBalances(alice));
  const result = await signingClient.sendTokens(
    alice,
    izaz,
    [{ denom: "uosmo", amount: "2000000" }],
    {
      amount: [{ denom: "uosmo", amount: "0" }],
      gas: "200000",
    }
  );
  console.log("Transfer result:", result);
  console.log("Alice balance after:", await client.getAllBalances(alice));

  const transaction = await client.searchTx({ sentFromOrTo: izaz });
  //console.log(transaction)
  for (let i = 0; i < transaction.length; i++) {
    const decodedTx: Tx = Tx.decode(transaction[i].tx);
    const sendMessage: MsgSend = MsgSend.decode(
      decodedTx.body!.messages[0].value
    );
    console.log("Sent message:", sendMessage);
  }
};

export default runAll;
