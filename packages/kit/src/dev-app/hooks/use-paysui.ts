import {useSuiProvider, useWallet} from "../../hooks";
import {useCallback} from "react";
import {Coin, getMoveObject, getObjectExistsResponse, SuiMoveObject, SuiObject} from "@mysten/sui.js";
import {isNonEmptyArray} from "../../utils";


export function usePaysuiDev() {
  const {signAndExecuteTransaction, chain} = useWallet()
  const sui = useSuiProvider(chain?.rpcUrl ?? '')

  const getOwnedObjects = useCallback(async (address: string) => {
    const objects = await sui.getObjectsOwnedByAddress(address);
    if (!isNonEmptyArray(objects)) return []
    const objectIds = objects.map(o => o.objectId)
    const res = await sui.getObjectBatch(objectIds);
    return res.filter(item => item.status === 'Exists')
      .map(item => (getObjectExistsResponse(item)) as SuiObject)
  }, [sui])

  const getOwnedCoins = useCallback(async (address: string) => {
    const objects = await getOwnedObjects(address);
    return objects.map(coin => ({
        id: coin.reference.objectId,
        object: getMoveObject(coin) as SuiMoveObject,
      }))
  }, [getOwnedObjects])

  const getOwnedCoinSui = useCallback(async (address: string) => {
    const coins = await getOwnedCoins(address)
    return coins.filter(coin => Coin.isSUI(coin.object))
      .map(coin => coin.object)
  }, [getOwnedCoins])

  const paysuiDev = useCallback(async (params: {
      address: string;
      recipients: string[];
      amounts: number[];
      gasBudget?: number,
  }) => {
    const {
      address,
      recipients,
      amounts,
      gasBudget = 100,
    } = params;
    const ownedSuiCoins = await getOwnedCoinSui(address);
    console.log('ownedSuiCoins=', ownedSuiCoins)
    // const ownedSuiData = ownedSui.map(o => o.)
    const totalAmount = amounts.reduce((pre, cur) => pre + cur, 0)
    console.log('totalAmount=', totalAmount)
    const inputCoins = Coin.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(ownedSuiCoins, BigInt(totalAmount));
    console.log('inputCoins=', inputCoins)
    const inputCoinIds = inputCoins.map(c => Coin.getID(c))
    console.log('inputCoinIds=', inputCoinIds)
    const data: any = {
      transaction: {
        kind: "paySui",
        data: {
          // The first SUI coin object input will be used for gas payment,
          // so the balance of this SUI coin has to be equal to or greater than the gas budget.
          inputCoins: inputCoinIds,
          recipients,
          amounts,
          gasBudget,
        }
      }
    }
    console.log('signAndExecuteTransaction data=', data)
    const res = await signAndExecuteTransaction(data)
    console.log('signAndExecuteTransaction res=', res)
    return res
  }, [signAndExecuteTransaction])

  const payAllSui = useCallback(async (params: {
    address: string;
    recipient: string;
    gasBudget?: number,
  }) => {
    const {
      address,
      recipient,
      gasBudget = 100,
    } = params;
    const ownedSuiCoins = await getOwnedCoinSui(address);
    console.log('ownedSuiCoins=', ownedSuiCoins)
    const inputCoins = ownedSuiCoins;
    console.log('inputCoins=', inputCoins)
    const inputCoinIds = inputCoins.map(c => Coin.getID(c))
    console.log('inputCoinIds=', inputCoinIds)
    const data: any = {
      transaction: {
        kind: "payAllSui",
        data: {
          inputCoins: inputCoinIds,
          recipient: recipient,
          gasBudget,
        }
      }
    }
    console.log('signAndExecuteTransaction data=', data)
    const res = await signAndExecuteTransaction(data)
    console.log('signAndExecuteTransaction res=', res)
    return res
  }, [signAndExecuteTransaction])

  return {
    paySui: paysuiDev,
    payAllSui
  }
}