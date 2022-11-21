import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConnectButton, WalletProvider } from './components';

function App() {
  return (
    <div>
      <ConnectButton />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>
);
