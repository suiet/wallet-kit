import { useEffect } from 'react';
import {
  ConnectButton,
  useAccountBalance,
  useWallet,
  useCoinBalance,
  useChain,
  SuiChainId
} from '@suiet/wallet-kit';
import suietLogo from './assets/suiet-logo.svg';
import * as tweetnacl from 'tweetnacl';

function App() {
  const wallet = useWallet();
  const { balance } = useAccountBalance();

  const {data: coinBalance} = useCoinBalance();
  const chain = useChain(SuiChainId.DEVNET);

  useEffect(() => {
    console.log('chain config', chain)
    console.log('coin balance', coinBalance)
  }, [chain, coinBalance])

  useEffect(() => {
    if (!wallet.connected) return;
    console.log('listen to all change event');
    const off = wallet.on('change', (...args) => {
      console.log('wallet changed', ...args);
    });
    return () => {
      off();
    };
  }, [wallet.connected]);

  useEffect(() => {
    if (!wallet.connected) return;
    console.log('listen to chainChange event only');
    const off = wallet.on('chainChange', ({ chain }) => {
      console.log('chainChange', chain);
    });
    return () => {
      off();
    };
  }, [wallet.connected]);

  function uint8arrayToHex(value: Uint8Array | undefined) {
    if (!value) return '';
    // @ts-ignore
    return value.toString('hex');
  }

  async function handleExecuteMoveCall() {
    try {
      const data = {
        packageObjectId: '0x2',
        module: 'devnet_nft',
        function: 'mint',
        typeArguments: [],
        arguments: [
          'name',
          'capy',
          'https://cdn.britannica.com/94/194294-138-B2CF7780/overview-capybara.jpg?w=800&h=450&c=crop',
        ],
        gasBudget: 10000,
      };
      const resData = await wallet.signAndExecuteTransaction({
        transaction: {
          kind: 'moveCall',
          data,
        },
      });
      // const resData = await executeMoveCall(data);
      console.log('executeMoveCall success', resData);
      alert('executeMoveCall succeeded (see response in the console)');
    } catch (e) {
      console.error('executeMoveCall failed', e);
      alert('executeMoveCall failed (see response in the console)');
    }
  }

  async function handleSignMsg() {
    try {
      const msg = 'Hello world!';
      const result = await wallet.signMessage({
        message: new TextEncoder().encode('Hello world'),
      });
      if (!result) {
        alert('signMessage return null');
        return;
      }
      console.log('send message to be signed', msg);
      const textDecoder = new TextDecoder();
      console.log('signMessage success', result);
      console.log('signMessage signature', result.signature);
      console.log(
        'signMessage signedMessage',
        textDecoder.decode(result.signedMessage).toString()
      );
      console.log(
        'verify via tweetnacl',
        tweetnacl.sign.detached.verify(
          result.signedMessage,
          result.signature,
          wallet.account?.publicKey as Uint8Array
        )
      );
      alert('signMessage succeeded (see response in the console)');
    } catch (e) {
      console.error('signMessage failed', e);
      alert('signMessage failed (see response in the console)');
    }
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://github.com/suiet/wallet-kit" target="_blank">
          <img src={suietLogo} className="logo" alt="Suiet logo" />
        </a>
      </div>
      <h1>Vite + Suiet Kit</h1>
      <div className="card">
        <ConnectButton />

        {!wallet.connected ? (
          <p>Connect DApp with Suiet wallet from now!</p>
        ) : (
          <div>
            <div>
              <p>current wallet: {wallet.adapter?.name}</p>
              <p>
                wallet status:{' '}
                {wallet.connecting
                  ? 'connecting'
                  : wallet.connected
                  ? 'connected'
                  : 'disconnected'}
              </p>
              <p>wallet address: {wallet.account?.address}</p>
              <p>current network: {wallet.chain?.name}</p>
              <p>wallet balance: {String(balance)} SUI</p>
              <p>
                wallet publicKey: {uint8arrayToHex(wallet.account?.publicKey)}
              </p>
            </div>
            <div className={'btn-group'} style={{ margin: '8px 0' }}>
              <button onClick={handleExecuteMoveCall}>executeMoveCall</button>
              <button onClick={handleSignMsg}>signMessage</button>
            </div>
          </div>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and Suiet logos to learn more
      </p>
    </div>
  );
}

export default App;
