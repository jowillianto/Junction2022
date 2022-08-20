import {
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing";
import {
  Coin,
  StargateClient,
  SigningStargateClient,
  DeliverTxResponse,
  IndexedTx,
} from "@cosmjs/stargate";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx";

const rpc = "https://rpc-test.osmosis.zone";

const getBalance = async (wallet: string): Promise<string> => {
  const client = await StargateClient.connect(rpc);
  var balance = await client.getAllBalances(wallet);
  console.log(balance);
  for (let i = 0; i < balance.length; i++) {
    console.log(balance[i]);
    if (balance[i].denom == "uosmo") {
      return balance[i].amount;
    }
  }
  return "0";
};

const getSignerFromMnemonic = async (
  mnemonic: string
): Promise<OfflineDirectSigner> => {
  return DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: "osmo",
  });
};

const sendCoin = async (
  mnemonic: string,
  targetWallet: string,
  amount: number
): Promise<DeliverTxResponse> => {
  const signer: OfflineDirectSigner = await getSignerFromMnemonic(mnemonic);
  const senderWallet = (await signer.getAccounts())[0].address;
  const signingClient = await SigningStargateClient.connectWithSigner(
    rpc,
    signer
  );

  const result = await signingClient.sendTokens(
    senderWallet,
    targetWallet,
    [{ denom: "uosmo", amount: String(amount) }],
    {
      amount: [{ denom: "uosmo", amount: "0" }],
      gas: "200000",
    }
  );

  return result;
};

interface Transaction {
  to: string;
  from: string;
  token: string;
}

const getTransactionFrom = async (
  targetWallet: string
): Promise<Array<Transaction>> => {
  const client = await StargateClient.connect(rpc);
  const transaction = await client.searchTx({
    sentFromOrTo: "osmo1ekjwn40e6kvhhpds454ycgj45m7aznn0tglphj",
  });
  var transactionRes = new Array<Transaction>();
  for (let i = 0; i < transaction.length; i++) {
    const decodedTx: Tx = Tx.decode(transaction[i].tx);
    const sendMessage: MsgSend = MsgSend.decode(
      decodedTx.body!.messages[0].value
    );
    var a: Transaction = {
      to: "",
      from: "",
      token: "",
    };
    if (sendMessage.amount.length == 0) {
      continue;
    } else if (sendMessage.fromAddress == targetWallet) {
      a.to = sendMessage.toAddress;
      a.from = sendMessage.fromAddress;
      a.token = sendMessage.amount[0].amount;
      transactionRes.push(a);
    }
  }

  return transactionRes;
};

const getTransactionTo = async (
  targetWallet: string
): Promise<Array<Transaction>> => {
  const client = await StargateClient.connect(rpc);
  const transaction = await client.searchTx({
    sentFromOrTo: "osmo1ekjwn40e6kvhhpds454ycgj45m7aznn0tglphj",
  });
  var transactionRes = new Array<Transaction>();
  for (let i = 0; i < transaction.length; i++) {
    const decodedTx: Tx = Tx.decode(transaction[i].tx);
    const sendMessage: MsgSend = MsgSend.decode(
      decodedTx.body!.messages[0].value
    );
    var a: Transaction = {
      to: "",
      from: "",
      token: "",
    };
    if (sendMessage.amount.length == 0) {
      continue;
    } else if (sendMessage.toAddress == targetWallet) {
      a.to = sendMessage.toAddress;
      a.from = sendMessage.fromAddress;
      a.token = sendMessage.amount[0].amount;
      transactionRes.push(a);
    }
  }

  return transactionRes;
};

const getTransactionAmount = (transactionList: Array<Transaction>): string => {
  var transactionAmount = 0;
  for (let i = 0; i < transactionList.length; i++) {
    transactionAmount = transactionAmount + parseInt(transactionList[i].token);
  }
  return transactionAmount.toString();
};

const top1Transaction = (
  transactionList: Array<Transaction>
): Array<Transaction> => {
  var transactionRes = new Array<Transaction>();
  transactionList.sort((a, b) => {
    return parseInt(a.token) - parseInt(b.token);
  });
  return transactionList.slice(0, 1);
};

const getWalletFromMnemonic = async (mnemonic: string): Promise<string> => {
  const signer: OfflineDirectSigner = await getSignerFromMnemonic(mnemonic);
  const senderWallet = (await signer.getAccounts())[0].address;
  return senderWallet;
};

const generateKey = async (): Promise<string> => {
  const wallet: DirectSecp256k1HdWallet =
    await DirectSecp256k1HdWallet.generate(24);
  return wallet.mnemonic;
};

export {
  getTransactionFrom,
  getTransactionTo,
  getTransactionAmount,
  sendCoin,
  getBalance,
  top1Transaction,
  getWalletFromMnemonic,
  generateKey,
};
