import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {
  WalletProvider,
  SuietWallet,
  SuiWallet,
  EthosWallet, IDefaultWallet,
  PresetWallet,
} from '@suiet/wallet-kit';

const CustomizeWallet: IDefaultWallet = {
  name: "myWallet",
  iconUrl: "external url or data url",
  downloadUrl: {
    browserExtension: 'chrome extension store url...'
  },
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WalletProvider defaultWallets={[
      // order defined by you
      SuietWallet,
      SuiWallet,
      EthosWallet,
      // ...
    ]}>
    {/* or just leave it as default which contains all preset wallets */}
    {/*<WalletProvider>*/}
      <App />
    </WalletProvider>
  </React.StrictMode>
)
