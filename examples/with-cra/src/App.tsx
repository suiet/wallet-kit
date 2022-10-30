import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import logo from './logo.svg';
import logoSuiet from './suiet-logo.svg';
import {
  ConnectButton,
  getDefaultWallets,
  useWallet,
  WalletProvider,
} from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';

function App() {
  const { wallet, connected, connecting, getAccounts, executeMoveCall } =
    useWallet();

  const [accounts, setAccounts] = useState<string[]>([]);

  useEffect(() => {
    console.log(connected);
    if (!connected) return;
    (async function () {
      const result = await getAccounts();
      setAccounts(result);
    })();
  }, [connected]);

  async function handleExecuteMoveCall() {
    try {
      const data = {
        packageObjectId: '0x2',
        module: 'devnet_nft',
        function: 'mint',
        typeArguments: [],
        arguments: [
          'name',
          'capy',
          'https://cdn.britannica.com/94/194294-138-B2CF7780/overview-capybara.jpg?w=800&h=450&c=crop',
        ],
        gasBudget: 10000,
      };
      const resData = await executeMoveCall(data);
      console.log('executeMoveCall success', resData);
      alert('executeMoveCall succeeded (see response in the console)');
    } catch (e) {
      console.error('executeMoveCall failed', e);
      alert('executeMoveCall failed (see response in the console)');
    }
  }

  return (
    <div className="App">
      <header className="header">
        <img src={logoSuiet} className="logo-suiet" alt="suiet-logo" />
        <div className={'connect-button'}>
          <ConnectButton style={{ width: '100px' }} />
        </div>
      </header>
      <main className={'main'}>
        <img src={logo} className="App-logo" alt="logo" />
        {!connected ? (
          <p>Connect DApp with Suiet wallet from now!</p>
        ) : (
          <div>
            <div>
              <p>current wallet: {wallet ? wallet.adapter.name : 'null'}</p>
              <p>
                wallet status:{' '}
                {connecting
                  ? 'connecting'
                  : connected
                  ? 'connected'
                  : 'disconnected'}
              </p>
              <p>wallet accounts: {JSON.stringify(accounts)}</p>
            </div>
            <div style={{ margin: '8px 0' }}>
              <button onClick={handleExecuteMoveCall}>executeMoveCall</button>
            </div>
          </div>
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about Suiet Wallet
        </a>
      </main>
    </div>
  );
}

export default function withApp() {
  return (
    <WalletProvider supportedWallets={getDefaultWallets()}>
      <App />
    </WalletProvider>
  );
}
