import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {
  WalletProvider,
  Chain,
  SuiDevnetChain,
  SuiTestnetChain,
  DefaultChains,
} from '@suiet/wallet-kit';

const customChain: Chain = {
  id: "",
  name: "",
  rpcUrl: ""
}

const SupportedChains: Chain[] = [
  // ...DefaultChains,
  SuiDevnetChain,
  SuiTestnetChain,
  // NOTE: you can add custom chain (network),
  // but make sure the connected wallet does support it
  // customChain,
]

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WalletProvider chains={SupportedChains}>
      {/* if you want to custiomize you wallet list, please check this doc
          https://kit.suiet.app/docs/components/WalletProvider#customize-your-wallet-list-on-modal
       */}
      <App/>
    </WalletProvider>
  </React.StrictMode>
)
