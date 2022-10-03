import React, { useEffect } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';
import { ConnectButton, WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { getAllWallets, useWallet } from '@suiet/wallet-kit';
import KitBanner from '../../static/img/kit-banner.svg';
import useBaseUrl from '@docusaurus/useBaseUrl';
// import KitBanner2 from   '../../assets/img/kit-banner-2.png';
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { connected, getAccounts } = useWallet();

  useEffect(() => {
    if (!connected) return;
    (async function () {
      const accounts = await getAccounts();
      console.log('accounts', accounts);
    })();
  }, [connected, getAccounts]);

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        {/* <h1 className="hero__title">{siteConfig.title}</h1> */}
        <h1 className={styles['hero-title']}>
          {siteConfig.title}
        </h1>
        <p className={styles['hero-desc']}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <ConnectButton />
          <a className={styles['doc-button']} href="/docs/QuickStart" >View Docs</a>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <WalletProvider supportedWallets={getAllWallets()}>
        <HomepageHeader />
        <main style={{
          margin: "auto"
        }}>
          {/* <HomepageFeatures /> */}
          <div style={{
            width: "1280px",
            margin: "auto",
          }}><KitBanner /></div>
          <div style={{
            width: "1280px",
            margin: "auto",
          }}><img src={useBaseUrl('img/kit-banner-2.png')} /></div>
        </main>
      </WalletProvider>
    </Layout>
  );
}
