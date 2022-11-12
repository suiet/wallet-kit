import { Token } from '../constants/token';
import { NetworkType } from '../core/types/network';
import { useWallet } from './useWalletTemp';
import { useCoinBalance } from './useCoinBalance';
import {WalletAccount} from "@mysten/wallet-standard";

export enum CoinSymbol {
  SUI = 'SUI',
}

export function useAccountBalance(token = Token.SUI) {
  const { account, connected } = useWallet();
  console.log('connected', connected)
  const { error, loading, getBalance } = useCoinBalance({
    address: (account as WalletAccount).address,
    opts: {
      networkId: NetworkType.devnet,
      canFetch: connected,
    },
  });

  if (token === Token.SUI) {
    const balance = getBalance(CoinSymbol.SUI);
    return { error, loading, balance };
  }

  return { error: new Error('Unexpected Token'), loading: false, balance: '0' };
}
