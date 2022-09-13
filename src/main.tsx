import React from 'react';
import ReactDOM from 'react-dom/client';
import ConnectButton from './components/ConnectButton';
import { WalletProvider } from './wallets/provider';
import { SuiWalletAdapter } from '@mysten/wallet-adapter-all-wallets';

const supportedWallets = [
  {
    adapter: new SuiWalletAdapter(),
  },
];

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div
      style={{
        width: '100%',
        height: '100vh',
      }}
    >
      <WalletProvider supportedWallets={supportedWallets}>
        <ConnectButton />
      </WalletProvider>
    </div>
  </React.StrictMode>
);
