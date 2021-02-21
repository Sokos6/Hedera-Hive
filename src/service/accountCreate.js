import {hederaClient} from './client';
import {notifyError} from '@/utils';

const {PrivateKey, AccountCreateTransaction, Hbar} = require('@hashgraph/sdk');

class _EventBus {
  constructor() {
    this.bus = {};
  }

  $off(id) {
    delete this.bus[id];
  }

  $on(id, callback) {
    this.bus[id] = callback;
  }

  $emit(id, ...params) {
    if (this.bus[id]) this.bus[id](...params);
  }
}

export const EventBus = new _EventBus();

export async function accountCreate(wallet) {
  const client = hederaClient();

  try {
    const privateKey = await PrivateKey.generate();

    const response = await new AccountCreateTransaction()
      .setKey(privateKey.publicKey)
      .setInitialBalance(new Hbar(process.env.REACT_APP_INITIAL_BALANCE))
      .execute(client);

    const transactionReceipt = await response.getReceipt(client);
    const newAccountId = transactionReceipt.accountId;

    const transaction = {
      id: response.transactionId.toString(),
      type: 'cryptoCreate',
      inputs: 'initialBalance=' + process.env.REACT_APP_INITIAL_BALANCE,
      outputs: 'accountId=' + newAccountId.toString(),
    };
    EventBus.$emit('addTransaction', transaction);

    return {
      accountId: newAccountId.toString(),
      account: {
        wallet: wallet,
        privateKey: privateKey.toString(),
        tokenRelationships: {},
      },
    };
  } catch (err) {
    notifyError(err.message);
    console.error(err);
    return {};
  }
}
