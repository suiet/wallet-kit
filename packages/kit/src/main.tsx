import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectButton } from './components/ConnectButton';
import { WalletProvider } from './wallets/provider';
import { getDefaultWallets } from './adapter/getter';
import { useWallet } from './hooks';

const supportedWallets = getDefaultWallets();

function App() {
  const { signAndExecuteTransaction, getPublicKey, signMessage } = useWallet();

  const handleClick = async () => {
    const publicKey = await getPublicKey();
    console.log(publicKey);
    // the following example comes from sui wallet official example.
    await signAndExecuteTransaction({
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
  };

  return (
    <div>
      <ConnectButton />
      <button onClick={handleClick}>send</button>
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
