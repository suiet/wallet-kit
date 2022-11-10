import { useState } from 'react'
import suietLogo from './assets/suiet-logo.svg'
import './App.css'
import {ConnectButton, useWallet} from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';
import * as tweetnacl from 'tweetnacl'

function App() {
  const {wallet, connected, connecting, address, signAndExecuteTransaction, signMessage, getPublicKey} =
    useWallet();

  const [publicKey, setPublicKey] = useState<Uint8Array>()

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
        kind: 'moveCall',
        data
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
        throw new Error('signMessage result is null')
      }
      console.log('send message to be signed', msg)
      const textDecoder = new TextDecoder()
      console.log('signMessage success', result)
      console.log('signMessage signature', result.signature)
      console.log('signMessage signedMessage', textDecoder.decode(result.signedMessage).toString())
      const publicKey = await getPublicKey();
      console.log('public key', publicKey)
      const isCorrect = tweetnacl.sign.detached.verify(
        result.signedMessage,
        result.signature,
        publicKey,
      )
      if (!isCorrect) {
        alert('signMessage succeeded, but verify failed (see response in the console)')
        return
      }
      alert('signMessage succeeded, verify passed (see response in the console)')
    } catch (e) {
      console.error('signMessage failed', e)
      alert('signMessage failed (see response in the console)')
    }
  }

  async function handleGetPublicKey() {
    try {
      const result = await getPublicKey()
      setPublicKey(result)
      alert('getPublicKey succeeded')
      console.log('getPublicKey success', result);
    } catch (e) {
      alert('getPublicKey failed')
      console.error(e)
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
              <p>wallet address: {address}</p>
              <p>wallet publicKey: {uint8arrayToHex(publicKey)}</p>
            </div>
            <div className={'btn-group'} style={{margin: '8px 0'}}>
              <button onClick={handleExecuteMoveCall}>executeMoveCall</button>
              <button onClick={handleGetPublicKey}>getPublicKey</button>
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
