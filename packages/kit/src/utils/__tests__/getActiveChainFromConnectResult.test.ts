import getActiveChainFromConnectResult from "../getActiveChainFromConnectResult";

describe('get active chain from the connection result returned by wallets', function () {
  test('should return the active chain', function () {
    expect(getActiveChainFromConnectResult({
      accounts: [
        {chains: ['sui:devnet']}
      ]
    } as any)).toEqual('sui:devnet');
  })

  test('should return the first chain as the active chain', function () {
    expect(getActiveChainFromConnectResult({
      accounts: [
        {chains: ['sui:testnet', 'sui:devnet']}
      ]
    } as any)).toEqual('sui:testnet');
  })

  test('should return sui:unknown', function () {
    expect(getActiveChainFromConnectResult({
      accounts: [
        {chains: []}
      ]
    } as any)).toEqual('sui:unknown');
  })
});