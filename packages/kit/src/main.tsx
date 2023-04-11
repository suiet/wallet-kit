import
  React from 'react';
import ReactDOM from 'react-dom/client';
import {ConnectButton, WalletProvider} from './components';
import {useAccountBalance, useWallet} from "./hooks";
import * as tweetnacl from 'tweetnacl';
import {ErrorCode} from "./errors";
import {fromB64, TransactionBlock} from "@mysten/sui.js";
import {SuiChainId} from "./chain";
import {formatSUI} from "@suiet/wallet-sdk";

const sampleNft = new Map([
  ['sui:devnet', '0x37b32a726c348b9198ffc22f63a97cb36c01f257258af020cecea8a82575dd56::nft::mint'],
  ['sui:testnet', '0x57c53166c2b04c1f1fc93105b39b6266cb1eccbe654f5d2fc89d5b44524b11fd::nft::mint'],
])

function App() {
  const wallet = useWallet()
  const {balance} = useAccountBalance()


  async function handleExecuteMoveCall(target: string | undefined) {
    if (!target) return;
    try {
      const tx = new TransactionBlock()
      tx.moveCall({
        target: target as any,
        arguments: [
          tx.pure('Suiet NFT'),
          tx.pure('Suiet Sample NFT'),
          tx.pure('https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4')
        ]
      })
      const resData = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log('executeMoveCall success', resData);
      alert('executeMoveCall succeeded (see response in the console)');
    } catch (e) {
      console.error('executeMoveCall failed', e);
      alert('executeMoveCall failed (see response in the console)');
    }
  }

  // FIXME: signMessage output
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
      // console.log('signMessage msg', new TextEncoder().encode('Hello world'))
      // console.log('signMessage success', result)
      //
      // // console.log('send message to be signed', msg)
      // const textDecoder = new TextDecoder()
      // console.log('signMessage success', result)
      // console.log('signMessage signature', result.signature)
      // console.log('signMessage signedMessage', textDecoder.decode(fromB64(result.messageBytes)).toString())
      // // @ts-ignore
      // console.log('signMessage  wallet.account?.publicKey', getPublicKey())

      const pubkeyBase64 =
        'pQECAyYgASFYIJDNOGEC6CBEFLIqLopElCHZ1iG7aiJVBfLt/tqu7zD7Ilgg4aA2iiuPKvWWatWAKE+d0mZMZxG4MK3MQTiSUQaa5Tk=';
      const binaryString = atob(pubkeyBase64);
      const pubkeyBuffer = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));

      console.log('verify via tweetnacl', tweetnacl.sign.detached.verify(
        fromB64(result.messageBytes),
        fromB64(result.signature),
        pubkeyBuffer,
        // wallet.account?.publicKey as Uint8Array,
      ))
      alert('signMessage succeeded (see response in the console)')
    } catch (e) {
      console.error('signMessage failed', e)
      alert('signMessage failed (see response in the console)')
    }
  }

  function getPublicKey() {
    // @ts-ignore
    return wallet.account?.publicKey.toString('hex');
  }

// @ts-ignore
  return (
    <div style={{
      height: '100vh',
      display: "flex",
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: 'center',
    }}>
      <ConnectButton
        onConnectSuccess={(name) => {
          console.log('connect success: ', name)
        }}
        onConnectError={(err) => {
          if (err.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
            console.warn('user rejected the connection to ' + err.details?.wallet)
          } else {
            console.warn('unknown connect error: ', err)
          }
        }}
        onDisconnectSuccess={(name) => {
          console.log('disconnect success: ', name)
        }}
        onDisconnectError={(err) => {
          console.log('disconnect error: ', err)
        }}
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
            <p>account address: {wallet.account?.address}</p>
            <p>account publicKey: {getPublicKey() || 'not supported'}</p>
            <p>current chain: {wallet.chain?.name} (id: {wallet.chain?.id})</p>
            <p>SUI Balance: {formatSUI(balance ?? 0)} (id: {wallet.chain?.id})</p>
          </div>
          <div style={{margin: '8px 0'}}>
            {wallet.chain?.id === SuiChainId.TestNET ? (
              <button onClick={() => handleExecuteMoveCall(sampleNft.get('sui:testnet'))}>Testnet Mint NFT</button>
            ) : (
              <button onClick={() => handleExecuteMoveCall(sampleNft.get('sui:devnet'))}>Devnet Mint NFT</button>
            )}
            <button style={{marginLeft: '8px'}} onClick={handleSignMsg}>signMessage</button>
          </div>
        </div>
      )}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WalletProvider>
      <App/>
    </WalletProvider>
  </React.StrictMode>
);
