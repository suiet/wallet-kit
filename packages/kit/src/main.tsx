import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ConnectButton } from './components/ConnectButton';
import { WalletProvider } from './wallets/provider';
import { getDefaultWallets } from './adapter/getter';
import { useWallet } from './hooks';

const supportedWallets = getDefaultWallets();

function App() {
  const [pbk, setpbk] = useState<Uint8Array>();
  const {
    signAndExecuteTransaction,
    getPublicKey,
    wallet,
    status,
    connected,
    getAccounts,
    signMessage,
  } = useWallet();

  useEffect(() => {
    if (!connected) return;
    (async function () {
      const accounts = await getAccounts();
      console.log('accounts', accounts);
    })();
  }, [connected, getAccounts]);
  const publicKey = async () => {
    const k = await getPublicKey();
    console.log(k);
    setpbk(k);
  };

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
      alert('signMessage succeeded (see response in the console)')
    } catch (e) {
      console.error('signMessage failed', e)
      alert('signMessage failed (see response in the console)')
    }
  }

  const handleClick = async () => {
    // the following example comes from sui wallet official example.
    const res = await signAndExecuteTransaction({
      kind: 'moveCall',
      data: {
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
      },
    });
    console.log(res);
  };

  return (
    <div>
      <ConnectButton />
      <div>connectStatus: {status}</div>
      <p>publickKey: {pbk}</p>
      <br />
      <button
        style={{
          marginTop: 10,
        }}
        onClick={handleClick}
      >
        mint nft
      </button>
      <br />
      <button
        style={{
          marginTop: 10,
        }}
        onClick={publicKey}
      >
        get public key
      </button>
      <br/>
      <button
        style={{
          marginTop: 10,
        }}
        onClick={handleSignMsg}>
        handleSignMsg
      </button>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <WalletProvider supportedWallets={supportedWallets}>
      <App />
    </WalletProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);
