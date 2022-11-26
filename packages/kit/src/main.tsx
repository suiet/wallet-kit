import React from 'react';
import ReactDOM from 'react-dom/client';
import { WalletProvider, ConnectButton } from './components';
import {useWallet} from "./hooks";

function App() {
  const wallet = useWallet()

  return (
    <div style={{
      height: '100vh',
      display: "flex",
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: 'center',
    }}>
      <ConnectButton />

      {!wallet.connected ? (
        <p>Connect DApp with Suiet wallet from now!</p>
      ) : (
        <div>
          <div style={{textAlign: 'center'}}>
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
          </div>
        </div>
      )}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>
);
