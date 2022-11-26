import {Chain} from "../types/chain";

export const SuiDevnetChain: Chain = {
  id: 'sui:devnet',
  name: 'Sui Devnet',
  rpcUrl: 'https://fullnode.devnet.sui.io/',
}
export const SuiTestnetChain: Chain = {
  id: 'sui:testnet',
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