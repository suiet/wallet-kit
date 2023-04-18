import suietLogo from './assets/suiet-logo.svg'
import './App.css'
import {
  ConnectButton,
  useAccountBalance,
  useWallet,
  SuiChainId,
  ErrorCode,
  formatSUI
} from "@suiet/wallet-kit";
import '@suiet/wallet-kit/style.css';
import * as tweetnacl from 'tweetnacl'
import {TransactionBlock, fromB64} from '@mysten/sui.js'

const sampleNft = new Map([
  ['sui:devnet', '0x37b32a726c348b9198ffc22f63a97cb36c01f257258af020cecea8a82575dd56::nft::mint'],
  ['sui:testnet', '0x57c53166c2b04c1f1fc93105b39b6266cb1eccbe654f5d2fc89d5b44524b11fd::nft::mint'],
])

function App() {
  const wallet = useWallet();
  const {balance} = useAccountBalance();

  function uint8arrayToHex(value: Uint8Array | undefined) {
    if (!value) return ''
    // @ts-ignore
    return value.toString('hex')
  }

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
    try {
      const msg = 'Hello world!'
      const msgBytes = new TextEncoder().encode(msg)
      const result = await wallet.signMessage({
        message: msgBytes
      })
      const verifyResult = wallet.verifySignedMessage(result)
      console.log('verify signedMessage', verifyResult)
      if (!verifyResult) {
        alert(`signMessage succeed, but verify signedMessage failed`)
      } else {
        alert(`signMessage succeed, and verify signedMessage succeed!`)
      }
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
        <ConnectButton
          onConnectError={(error) => {
            if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
              console.warn('user rejected the connection to ' + error.details?.wallet)
            } else {
              console.warn('unknown connect error: ', error)
            }
          }}
        />

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
              <p>wallet balance: {formatSUI(balance ?? 0, {
                withAbbr: false
              })} SUI</p>
              <p>wallet publicKey: {uint8arrayToHex(wallet.account?.publicKey)}</p>
            </div>
            <div className={'btn-group'} style={{margin: '8px 0'}}>
              {wallet.chain?.id === SuiChainId.TestNET ? (
                <button onClick={() => handleExecuteMoveCall(sampleNft.get('sui:testnet'))}>Testnet Mint NFT</button>
              ) : (
                <button onClick={() => handleExecuteMoveCall(sampleNft.get('sui:devnet'))}>Devnet Mint NFT</button>
              )}
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
