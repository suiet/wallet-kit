import { INetworkApi, Network, NetworkType } from './types/network';

const DEFAULT_NETWORKS = new Map([
  [
    'devnet',
    {
      id: 'devnet',
      name: 'devnet',
      queryRpcUrl: 'https://fullnode.devnet.sui.io/',
      gatewayRpcUrl: 'https://gateway.devnet.sui.io:443',
    },
  ],
  [
    'local',
    {
      id: 'local',
      name: 'local',
      queryRpcUrl: 'http://localhost:5001',
      gatewayRpcUrl: 'http://localhost:5001',
    },
  ],
]);

class NetworkApi implements INetworkApi {
  async getNetworks(enabledOnly: boolean): Promise<Network[]> {
    return Array.from(DEFAULT_NETWORKS.values());
  }

  getNetwork(networkId: string): Network {
    let network = DEFAULT_NETWORKS.get(networkId);
    if (!network) {
      network = DEFAULT_NETWORKS.get(NetworkType.devnet);
    }
    return network!;
  }
}

export const network = new NetworkApi();
