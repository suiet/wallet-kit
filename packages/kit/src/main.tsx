import React, {useCallback} from 'react';
import ReactDOM from 'react-dom/client';
import { WalletProvider, ConnectButton } from './components';
import {useWallet} from "./hooks";
import {usePaysuiDev} from "./dev-app/hooks/use-paysui";

function App() {
  const wallet = useWallet()
  const {paySui} = usePaysuiDev()

  const handlePaySui = useCallback(async () => {
    if (!wallet.address) return

    await paySui({
      address: wallet.address,
      recipients: ['0xdd54b1b033df2ee7acf15924eed369e5405af406'],
      amounts: [1000],
    })
  }, [wallet, paySui])

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
          <div>
            <button onClick={handlePaySui}>PaySui</button>
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
