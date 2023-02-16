import React from 'react';
import ReactDOM from 'react-dom/client';
import { WalletProvider, ConnectButton } from './components';
import {useWallet} from "./hooks";
import * as tweetnacl from 'tweetnacl';

function App() {
  const wallet = useWallet()
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
          data
        }
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
      const msg = 'Hello world!'
      const result = await wallet.signMessage({
        message: new TextEncoder().encode('Hello world')
      })
      if (!result) {
        alert('signMessage return null')
        return
      }
      console.log('send message to be signed', msg)
      const textDecoder = new TextDecoder()
      console.log('signMessage success', result)
      console.log('signMessage signature', result.signature)
      console.log('signMessage signedMessage', textDecoder.decode(result.signedMessage).toString())
      console.log('verify via tweetnacl', tweetnacl.sign.detached.verify(
        result.signedMessage,
        result.signature,
        wallet.account?.publicKey as Uint8Array,
      ))
      alert('signMessage succeeded (see response in the console)')
    } catch (e) {
      console.error('signMessage failed', e)
      alert('signMessage failed (see response in the console)')
    }
  }
  return (
    <div style={{
      height: '100vh',
      display: "flex",
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: 'center',
    }}>
      <ConnectButton
        onConnectSuccess={(name) => {console.log('connect success!', name)}}
        onConnectError={(err) => {console.warn('connect error!', err)}}
        onDisconnectSuccess={(name) => {console.log('disconnect success!', name)}}
        onDisconnectError={(err) => {console.log('disconnect error!', err)}}
      />

      {!wallet.connected ? (
        <p>Connect DApp with Suiet wallet from now!</p>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{textAlign: 'center'}}>
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
          </div>
          <div style={{ margin: '8px 0' }}>
            <button onClick={handleExecuteMoveCall}>executeMoveCall</button>
            <button style={{ marginLeft: '8px' }} onClick={handleSignMsg}>signMessage</button>
          </div>
        </div>
      )}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>
);
