import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {
  WalletProvider,
  getAllWallets,  // support all the wallets
  getDefaultWallets,  // if you only support Sui wallet
} from '@suiet/wallet-kit';

const supportedWallets = getAllWallets();  // let's say we support all the wallets

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WalletProvider supportedWallets={supportedWallets}>
      <App />
    </WalletProvider>
  </React.StrictMode>
)
