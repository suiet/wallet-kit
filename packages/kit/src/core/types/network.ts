export type Network = {
  id: string;
  name: string;
  queryRpcUrl: string;
  gatewayRpcUrl: string;
};

export interface INetworkApi {
  getNetworks: (enabledOnly: boolean) => Promise<Network[]>;
  getNetwork: (networkId: string) => Network | undefined;
  // addCustomNetwork: (network: Network) => Promise<void>;
}

export enum NetworkType {
  devnet = 'devnet',
  local = 'local',
}
