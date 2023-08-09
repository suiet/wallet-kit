import
  React from 'react';
import ReactDOM from 'react-dom/client';
import {ConnectButton, WalletProvider} from './components';
import {useAccountBalance, useWallet} from "./hooks";
import {ErrorCode} from "./errors";
import {TransactionBlock} from "@mysten/sui.js";
import {SuiChainId} from "./chain";
import {formatSUI} from "@suiet/wallet-sdk";

const sampleNft = new Map([
  ['sui:devnet', '0xe146dbd6d33d7227700328a9421c58ed34546f998acdc42a1d05b4818b49faa2::nft::mint'],
  ['sui:testnet', '0x5ea6aafe995ce6506f07335a40942024106a57f6311cb341239abf2c3ac7b82f::nft::mint'],
  ['sui:mainnet', '0x5b45da03d42b064f5e051741b6fed3b29eb817c7923b83b92f37a1d2abf4fbab::nft::mint']
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

  async function handleSignMsg() {
    if (!wallet.account) return

    try {
      const msg = 'Hello world!'
      const result = await wallet.signMessage({
        message: new TextEncoder().encode(msg)
      })
      const isValid = await wallet.verifySignedMessage(result, wallet.account.publicKey)
      console.log('verify signedMessage', isValid)
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
        className={'aaa'}
        style={{marginTop: '16px'}}
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
