import { Chain } from "./types";

export enum SuiChainId {
  DEV_NET = "sui:devnet",
  TEST_NET = "sui:testnet",
  MAIN_NET = "sui:mainnet",

  // deprecated fields
  DEVNET = "sui:devnet",
  TestNET = "sui:testnet",
}

export const SuiDevnetChain: Chain = {
  id: SuiChainId.DEV_NET,
  name: "Sui Devnet",
  rpcUrl: "https://fullnode.devnet.sui.io/",
};
export const SuiTestnetChain: Chain = {
  id: SuiChainId.TEST_NET,
  name: "Sui Testnet",
  rpcUrl: "https://fullnode.testnet.sui.io/",
};

export const SuiMainnetChain: Chain = {
  id: SuiChainId.MAIN_NET,
  name: "Sui Mainnet",
  rpcUrl: "https://rpc.mainnet.sui.io/",
};

export const UnknownChain: Chain = {
  id: "unknown:unknown",
  name: "Unknown Network",
  rpcUrl: "",
};

export const DefaultChains = [SuiDevnetChain, SuiTestnetChain, SuiMainnetChain];
