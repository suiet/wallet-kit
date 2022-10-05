import {
  getObjectExistsResponse,
  JsonRpcProvider,
  RpcTxnDataSerializer,
  SuiMoveObject,
  SuiObject,
  getTransferObjectTransaction,
  getTransferSuiTransaction,
  getTransactionData,
  getExecutionStatusType,
  getMoveObject,
  getMoveCallTransaction,
} from '@mysten/sui.js';
import { Coin, CoinObject, Nft, NftObject } from './types/object';
import { TxnHistoryEntry, TxObject } from './types/storage';

export const SUI_SYSTEM_STATE_OBJECT_ID =
  '0x0000000000000000000000000000000000000005';

export class Provider {
  query: QueryProvider;

  constructor(queryEndpoint: string, gatewayEndpoint: string) {
    this.query = new QueryProvider(queryEndpoint);
  }
}

export class QueryProvider {
  provider: JsonRpcProvider;

  constructor(queryEndpoint: string) {
    this.provider = new JsonRpcProvider(queryEndpoint, true);
  }

  public async getActiveValidators(): Promise<SuiMoveObject[]> {
    const contents = await this.provider.getObject(SUI_SYSTEM_STATE_OBJECT_ID);
    const data = (contents.details as SuiObject).data;
    const validators = (data as SuiMoveObject).fields.validators;
    const activeValidators = (validators as SuiMoveObject).fields
      .active_validators;
    return activeValidators as SuiMoveObject[];
  }

  public async getOwnedObjects(address: string): Promise<SuiObject[]> {
    trySyncAccountState(this.provider, address);
    const objectInfos = await this.provider.getObjectsOwnedByAddress(address);
    const objectIds = objectInfos.map((obj) => obj.objectId);
    const resps = await this.provider.getObjectBatch(objectIds);
    return resps
      .filter((resp) => resp.status === 'Exists')
      .map((resp) => getObjectExistsResponse(resp) as SuiObject);
  }

  public async getOwnedCoins(address: string): Promise<CoinObject[]> {
    trySyncAccountState(this.provider, address);
    const objects = await this.getOwnedObjects(address);
    const res = objects
      .map((item) => ({
        id: item.reference.objectId,
        object: getMoveObject(item),
      }))
      .filter((item) => item.object && Coin.isCoin(item.object))
      .map((item) => Coin.getCoinObject(item.object as SuiMoveObject));
    return res;
  }

  public async getOwnedNfts(address: string): Promise<NftObject[]> {
    trySyncAccountState(this.provider, address);
    const objects = await this.getOwnedObjects(address);
    const res = objects
      .map((item) => ({
        id: item.reference.objectId,
        object: getMoveObject(item),
        previousTransaction: item.previousTransaction,
      }))
      .filter((item) => item.object && Nft.isNft(item.object))
      .map((item) => {
        const obj = item.object as SuiMoveObject;
        return Nft.getNftObject(obj, item.previousTransaction);
      });
    return res;
  }

  public async getTransactionsForAddress(
    address: string
  ): Promise<TxnHistoryEntry[]> {
    trySyncAccountState(this.provider, address);
    const txs = await this.provider.getTransactionsForAddress(address);
    if (txs.length === 0 || !txs[0]) {
      return [];
    }
    const digests = txs
      .map((tx) => tx[1])
      .filter((value, index, self) => self.indexOf(value) === index);

    const effects = await this.provider.getTransactionWithEffectsBatch(digests);
    const results = [];
    for (const effect of effects) {
      const data = getTransactionData(effect.certificate);
      for (const tx of data.transactions) {
        const transferSui = getTransferSuiTransaction(tx);
        const transferObject = getTransferObjectTransaction(tx);
        const moveCall = getMoveCallTransaction(tx);
        if (transferSui) {
          results.push({
            timestamp_ms: effect.timestamp_ms,
            txStatus: getExecutionStatusType(effect),
            transactionDigest: effect.certificate.transactionDigest,
            gasFee:
              effect.effects.gasUsed.computationCost +
              effect.effects.gasUsed.storageCost -
              effect.effects.gasUsed.storageRebate,
            from: data.sender,
            to: transferSui.recipient,
            object: {
              type: 'coin' as 'coin',
              balance: transferSui.amount
                ? BigInt(transferSui.amount)
                : BigInt(0),
              symbol: 'SUI',
            },
          });
        } else if (transferObject) {
          const resp = await this.provider.getObject(
            transferObject.objectRef.objectId
          );
          const obj = getMoveObject(resp);
          let txObj: TxObject | undefined;
          // TODO: for now provider does not support to get histrorical object data,
          // so the record here may not be accurate.
          if (obj && Coin.isCoin(obj)) {
            const coinObject = Coin.getCoinObject(obj);
            txObj = {
              type: 'coin' as 'coin',
              ...coinObject,
            };
          } else if (obj && Nft.isNft(obj)) {
            const nftObject = Nft.getNftObject(obj, undefined);
            txObj = {
              type: 'nft' as 'nft',
              ...nftObject,
            };
          }
          // TODO: handle more object types
          if (txObj) {
            results.push({
              timestamp_ms: effect.timestamp_ms,
              txStatus: getExecutionStatusType(effect),
              transactionDigest: effect.certificate.transactionDigest,
              gasFee:
                effect.effects.gasUsed.computationCost +
                effect.effects.gasUsed.storageCost -
                effect.effects.gasUsed.storageRebate,
              from: data.sender,
              to: transferObject.recipient,
              object: txObj,
            });
          }
        } else if (moveCall) {
          results.push({
            timestamp_ms: effect.timestamp_ms,
            txStatus: getExecutionStatusType(effect),
            transactionDigest: effect.certificate.transactionDigest,
            gasFee:
              effect.effects.gasUsed.computationCost +
              effect.effects.gasUsed.storageCost -
              effect.effects.gasUsed.storageRebate,
            from: data.sender,
            to: moveCall.package.objectId,
            object: {
              type: 'move_call' as 'move_call',
              packageObjectId: moveCall.package.objectId,
              module: moveCall.module,
              function: moveCall.function,
              arguments: moveCall.arguments?.map((arg) => JSON.stringify(arg)),
            },
          });
        }
      }
    }
    return results;
  }

  public async getNormalizedMoveFunction(
    objectId: string,
    moduleName: string,
    functionName: string
  ) {
    return await this.provider.getNormalizedMoveFunction(
      objectId,
      moduleName,
      functionName
    );
  }
}

export const DEFAULT_GAS_BUDGET_FOR_SPLIT = 1000;
export const DEFAULT_GAS_BUDGET_FOR_MERGE = 500;
export const DEFAULT_GAS_BUDGET_FOR_TRANSFER = 100;
export const DEFAULT_GAS_BUDGET_FOR_TRANSFER_SUI = 100;
export const DEFAULT_GAS_BUDGET_FOR_STAKE = 1000;
export const GAS_TYPE_ARG = '0x2::sui::SUI';
export const GAS_SYMBOL = 'SUI';
export const DEFAULT_NFT_TRANSFER_GAS_FEE = 450;
export const MINT_EXAMPLE_NFT_MOVE_CALL = {
  packageObjectId: '0x2',
  module: 'devnet_nft',
  function: 'mint',
  typeArguments: [],
  arguments: [
    'Suiet NFT',
    'An NFT created by Suiet',
    'https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4',
  ],
  gasBudget: 10000,
};

async function trySyncAccountState(provider: JsonRpcProvider, address: string) {
  try {
    await provider.syncAccountState(address);
  } catch (err) {
    console.log('sync account state failed', err);
  }
}
