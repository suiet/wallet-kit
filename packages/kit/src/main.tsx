import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectButton } from './components/ConnectButton';
import { WalletProvider } from './wallets/provider';
import { getDefaultWallets } from './adapter/getter';

const supportedWallets = getDefaultWallets();

ReactDOM.render(
  <React.StrictMode>
    <WalletProvider supportedWallets={supportedWallets}>
      <ConnectButton />
    </WalletProvider>
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);
