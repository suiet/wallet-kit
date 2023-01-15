import {Chain} from "../types";

export enum SuiChainId {
  DEVNET = 'sui:devnet',
  TestNET = 'sui:testnet',
}

export const SuiDevnetChain: Chain = {
  id: SuiChainId.DEVNET,
  name: 'Sui Devnet',
  rpcUrl: 'https://fullnode.devnet.sui.io/',
}
export const SuiTestnetChain: Chain = {
  id: SuiChainId.TestNET,
  name: 'Sui Testnet',
  rpcUrl: 'https://fullnode.testnet.sui.io/',
}

export const UnknownChain: Chain = {
  id: 'unknown:unknown',
  name: 'Unknown Network',
  rpcUrl: '',
}

export const DefaultChains = [
  SuiDevnetChain,
  SuiTestnetChain,
]