import {useState} from 'react'
import suietLogo from './assets/suiet-logo.svg'
import './App.css'
import {ConnectButton, useWallet} from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';
import * as tweetnacl from 'tweetnacl'

function App() {
  const {
    wallet,
    connected,
    connecting,
    account,
    signAndExecuteTransaction,
    signMessage,
  } = useWallet();

  function uint8arrayToHex(value: Uint8Array | undefined) {
    if (!value) return ''
    // @ts-ignore
    return value.toString('hex')
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
      const resData = await signAndExecuteTransaction({
        transaction: {
          kind: 'moveCall',
          data
        }
      });
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
      const result = await signMessage({
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
        account?.publicKey as Uint8Array,
      ))
      alert('signMessage succeeded (see response in the console)')
    } catch (e) {
      console.error('signMessage failed', e)
      alert('signMessage failed (see response in the console)')
    }
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo"/>
        </a>
        <a href="https://github.com/suiet/wallet-kit" target="_blank">
          <img src={suietLogo} className="logo" alt="Suiet logo"/>
        </a>
      </div>
      <h1>Vite + Suiet Kit</h1>
      <div className="card">
        <ConnectButton/>

        {!connected ? (
          <p>Connect DApp with Suiet wallet from now!</p>
        ) : (
          <div>
            <div>
              <p>current wallet: {wallet ? wallet.name : 'null'}</p>
              <p>
                wallet status:{' '}
                {connecting
                  ? 'connecting'
                  : connected
                    ? 'connected'
                    : 'disconnected'}
              </p>
              <p>wallet address: {account?.address}</p>
              <p>wallet publicKey: {uint8arrayToHex(account?.publicKey)}</p>
            </div>
            <div className={'btn-group'} style={{margin: '8px 0'}}>
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
  )
}

export default App
