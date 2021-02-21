import {getAccountDetails} from '../utils';

const {Client} = require('@hashgraph/sdk');

export function hederaClientForUser(user) {
  const account = getAccountDetails(user);
  return hederaClientLocal(account.accountId, account.privateKey);
}

function checkProvided(environmentVariable) {
  if (environmentVariable === null) {
    return false;
  }
  if (typeof environmentVariable === 'undefined') {
    return false;
  }
  return true;
}

export function hederaClient() {
  const operatorPrivateKey = process.env.REACT_APP_OPERATOR_KEY;
  const operatorAccount = process.env.REACT_APP_OPERATOR_ID;

  if (!checkProvided(operatorPrivateKey) || !checkProvided(operatorAccount)) {
    throw new Error(
      'environment variables REACT_APP_OPERATOR_KEY and REACT_APP_OPERATOR_ID must be present',
    );
  }
  return hederaClientLocal(operatorAccount, operatorPrivateKey);
}

function hederaClientLocal(operatorAccount, operatorPrivateKey) {
  if (!checkProvided(process.env.REACT_APP_NETWORK)) {
    throw new Error('VUE_APP_NETWORK must be set in environment');
  }

  let client;
  switch (process.env.REACT_APP_NETWORK.toUpperCase()) {
    case 'TESTNET':
      client = Client.forTestnet();
      break;
    case 'MAINNET':
      client = Client.forMainnet();
      break;
    default:
      throw new Error('REACT_APP_NETWORK must be "testnet" or "mainnet"');
  }
  client.setOperator(operatorAccount, operatorPrivateKey);
  return client;
}
