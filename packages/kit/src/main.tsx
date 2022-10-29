import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ConnectButton } from './components/ConnectButton';
import { WalletProvider } from './wallets/provider';
import { getDefaultWallets } from './adapter/getter';
import { useWallet } from './hooks';

const supportedWallets = getDefaultWallets();

function App() {
  const [pbk, setpbk] = useState('');
  const { signAndExecuteTransaction, getPublicKey, wallet, status } =
    useWallet();
  const publicKey = async () => {
    const k = await getPublicKey();
    console.log(k);
    setpbk(k);
  };
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
        public key: {pbk}
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
