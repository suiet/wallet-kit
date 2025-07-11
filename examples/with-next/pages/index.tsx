import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  AllDefaultWallets,
  defineSlushWallet,
  WalletProvider,
} from "@suiet/wallet-kit";
import App from "../components/App";

export default function Home() {
  return (
    <WalletProvider
      defaultWallets={[
        ...AllDefaultWallets,
        // defineSlushWallet({
        //   appName: "Suiet Kit Playground",
        // }),
      ]}
    >
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <App />
      </div>
    </WalletProvider>
  );
}
