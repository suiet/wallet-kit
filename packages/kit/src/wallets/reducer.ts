import { WalletInstance } from '../adapter/KitAdapter';
import { AccountStatus } from '../types/account';

export interface WalletState {
  status: AccountStatus;
  address: string;
  wallet: WalletInstance | null;
}

export const initialWalletState = {
  status: AccountStatus.disconnected,
  wallet: null,
  address: '',
};

export const ActionType = {
  Update: 'update',
};

export function walletReducer(
  state: WalletState,
  action: {
    payload?: any;
    type: string;
  }
): WalletState {
  switch (action.type) {
    case ActionType.Update: {
      return { ...state, ...action.payload };
    }
    default:
      return initialWalletState;
  }
}
