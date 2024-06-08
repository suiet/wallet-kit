import React, { useEffect } from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import styles from "./index.module.css";
import {
  ConnectButton,
  WalletProvider,
  defineStashedWallet,
  AllDefaultWallets,
  SuietWallet,
} from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import KitBanner from "../../static/img/kit-banner.svg";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { CustomFields } from "@site/types/customFields";

const Badge = (props: {
  href: string;
  subject: string;
  status: string;
  color: string;
  icon?: string;
  className?: string;
}) => {
  const { color = "green" } = props;
  const encode = encodeURIComponent;
  const link = `https://badgen.net/badge/${encode(props.subject)}/${encode(
    props.status
  )}/${encode(color)}`;
  return (
    <a href={props.href} className={props.className}>
      <img src={link} />
    </a>
  );
};

const WalletStandardBadge = (props: {
  version: string;
  className?: string;
}) => {
  return (
    <Badge
      href={"https://www.npmjs.com/package/@mysten/wallet-standard"}
      subject={"wallet-standard"}
      status={props.version}
      color={"green"}
    />
  );
};

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { walletStandardVersion } =
    siteConfig.customFields as unknown as CustomFields;
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        {/* <h1 className="hero__title">{siteConfig.title}</h1> */}
        <h1 className={styles["hero-title"]}>{siteConfig.title}</h1>
        <p className={styles["hero-desc"]}>{siteConfig.tagline}</p>
        <div className={styles["hero-badges"]}>
          <WalletStandardBadge version={walletStandardVersion} />
        </div>
        <div className={styles.buttons}>
          <a className={styles["doc-button"]} href="/docs/QuickStart">
            View Docs
          </a>
          <ConnectButton>Try Connect Wallet</ConnectButton>
        </div>
      </div>
    </header>
  );
}

const stashedWalletConfig = defineStashedWallet({
  appName: "Suiet Wallet Kit Doc Site",
});

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Suiet wallet kit is the best way to connect all Sui wallets."
    >
      <WalletProvider
        autoConnect={false}
        defaultWallets={[SuietWallet, stashedWalletConfig]}
      >
        <HomepageHeader />
        <main
          style={{
            margin: "auto",
          }}
        >
          {/* <HomepageFeatures /> */}
          <div
            style={{
              width: "100%",
              maxWidth: "1280px",
              margin: "auto",
            }}
          >
            <KitBanner />
          </div>
          <div
            style={{
              width: "100%",
              maxWidth: "1280px",
              margin: "auto",
            }}
          >
            <img src={useBaseUrl("img/kit-banner-2.png")} />
          </div>
          <div
            style={{
              width: "100%",
              maxWidth: "1280px",
              margin: "auto",
            }}
          >
            <img src={useBaseUrl("img/trustedby.png")} />
          </div>
        </main>
      </WalletProvider>
    </Layout>
  );
}
