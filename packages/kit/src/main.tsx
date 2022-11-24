import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { WalletProvider, ConnectButton } from './components';

function App() {
  return (
    <div style={{
      height: '100vh',
      display: "flex",
      justifyContent: "center",
      alignItems: 'center',
    }}>
      <ConnectButton />
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
