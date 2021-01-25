const {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  AccountBalanceQuery,
  TransferTransaction,
  TokenCreateTransaction,
  treasuryAccountId,
  adminPublicKey,
  Hbar,
} = require('@hashgraph/sdk');
require('dotenv').config();

export function transaction() {
  new TokenCreateTransaction()
    .setTokenName('Hiraeth Token')
    .setTokenSymbol('HIRAE')
    .setTreasuryAccountId(treasuryAccountId)
    .setInitialSupply(5000)
    .setAdminKey(adminPublicKey)
    .setMaxTransactionFee(new Hbar(30)) //Change the default max transaction fee
    .freezeWith(Client);

    //Sign the transaction with the token adminKey and the token treasury account private key
const signTx = (transaction.sign(adminPublicKey)).sign(treasuryAccountId);
console.log(treasuryAccountId);

//Sign the transaction with the client operator private key and submit to a Hedera network
const txResponse = signTx.execute(Client);

//Get the receipt of the transaction
const receipt = txResponse.getReceipt(Client);
console.log(receipt);

//Get the token ID from the receipt
const tokenId = receipt.tokenId;

console.log("The new token ID is " + tokenId);

}

// Sign the transaction with the client operator private key and submit to a Hedera network
// const txResponse = transaction.execute(Client);

// //Request the receipt of the transaction
// const receipt = txResponse.getReceipt(Client);

// // Get the account ID
// const newAccountId = receipt.accountId;

// console.log("The new account ID is " +newAccountId);

console.log(transaction);

async function main() {
  // const myAccountId = process.env.MY_ACCOUNT_ID;
  // const myPrivateKey = process.env.MY_PRIVATE_KEY;

  const myAccountId = '0.0.253568';
  const myPrivateKey =
    '302e020100300506032b657004220420e594324c7ee5264501289c50bf41c4c3a413d71404581f06445cdbcd1d274574';

  if (myAccountId == null || myPrivateKey == null) {
    throw new Error(
      'Environment variables myAccountId and myPrivateKey must be present',
    );
  }

  const client = Client.forTestnet();

  client.setOperator(myAccountId, myPrivateKey);

  const newAccountPrivateKey = await PrivateKey.generate();
  const newAccountPublicKey = newAccountPrivateKey.publicKey;

  const newAccountTransactionResponse = await new AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(Hbar.fromTinybars(1000))
    .execute(client);

  const getReceipt = await newAccountTransactionResponse.getReceipt(client);
  const newAccountId = getReceipt.accountId;

  console.log('The new account ID is: ' + newAccountId);

  const accountBalance = await new AccountBalanceQuery()
    .setAccountId(newAccountId)
    .execute(client);

  console.log(
    'The new account balance is: ' +
      accountBalance.hbars.toTinybars() +
      ' tinybar.',
  );

  //Create the transfer transaction
  const transferTransactionResponse = await new TransferTransaction()
    .addHbarTransfer(myAccountId, Hbar.fromTinybars(-1000))
    .addHbarTransfer(newAccountId, Hbar.fromTinybars(1000))
    .execute(client);

  //Verify the transaction reached consensus
  const transactionReceipt = await transferTransactionResponse.getReceipt(
    client,
  );
  console.log(transactionReceipt);
  console.log(
    'The transfer transaction from my account to the new account was: ' +
      transactionReceipt.status.toString(),
  );


  //Check the new account's balance
  const getNewBalance = await new AccountBalanceQuery()
    .setAccountId(newAccountId)
    .execute(client);

  console.log(
    'The account balance after the transfer is: ' +
      getNewBalance.hbars.toTinybars() +
      ' tinybar.',
  );
}
main();
