import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConnectButton } from './components/ConnectButton';
import { WalletProvider } from './wallets/provider';
import { getDefaultWallets } from './adapter/getDefaultWallets';

const supportedWallets = getDefaultWallets();

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
