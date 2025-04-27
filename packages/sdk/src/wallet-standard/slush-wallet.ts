import { getWallets } from "@mysten/wallet-standard";
import { SLUSH_WALLET_NAME, SlushWallet } from "@mysten/slush-wallet";
import {
  PresetWallet,
  PresetWalletId,
  RegisterWalletCallbackExternal,
  RegisterWalletCallbackInput,
  UnregisterWalletCallback,
} from "../wallet";

/**
 * Register Slush Web Wallet
 * TODO: support async registration
 * @param input 
 * @returns 
 */
export const registerSlushWebWallet: RegisterWalletCallbackExternal = (
  input: RegisterWalletCallbackInput
): UnregisterWalletCallback => {
  const wallets = getWallets();
  
  const { appName, origin, network = "mainnet" } = input;
  const wallet = new SlushWallet({
    name: appName,
    origin: origin,
    chain: `sui:${network}`,
    metadata: {
      id: PresetWalletId.SLUSH_WEB_WALLET,
      walletName: PresetWallet.SLUSH_WEB_WALLET,
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjNENBMkZGIi8+CjxwYXRoIGQ9Ik0xMi4zNDczIDM0LjcyNTRDMTMuNTU1MyAzOS4yMzM2IDE4LjA2NzMgNDMuMzE0OCAyNy40MDI1IDQwLjgxMzRDMzYuMzA5NyAzOC40MjY3IDQxLjg5MjEgMzEuMDk5MyA0MC40NDQ2IDI1LjY5NzJDMzkuOTQ0NyAyMy44MzE3IDM4LjQzOTEgMjIuNTY4OSAzNi4xMTc4IDIyLjc3NDRMMTUuMzYxNSAyNC41MDM4QzE0LjA1NDQgMjQuNjA0MSAxMy40NTUgMjQuMzg5OCAxMy4xMDkyIDIzLjU2NjFDMTIuNzczOCAyMi43ODEyIDEyLjk2NDkgMjEuOTM4NSAxNC41NDM3IDIxLjE0MDZMMzAuMzM5NiAxMy4wMzQyQzMxLjU1MDMgMTIuNDE4MiAzMi4zNTY3IDEyLjE2MDUgMzMuMDkzNiAxMi40MjEzQzMzLjU1NTUgMTIuNTg5MSAzMy44NTk2IDEzLjI1NzQgMzMuNTgwMyAxNC4wODJMMzIuNTU2MSAxNy4xMDU2QzMxLjI5OTIgMjAuODE2NCAzMy45ODk5IDIxLjY3ODQgMzUuNTA2OCAyMS4yNzE5QzM3LjgwMTcgMjAuNjU3IDM4LjM0MTYgMTguNDcxMiAzNy42MDIzIDE1LjcxMTlDMzUuNzI3OCA4LjcxNjI5IDI4LjMwNTkgNy42MjI1NCAyMS41NzY4IDkuNDI1NTlDMTQuNzMxMSAxMS4yNTk5IDguNzk2ODEgMTYuODA3MiAxMC42MDg4IDIzLjU2OTZDMTEuMDM1OCAyNS4xNjMgMTIuNTAyNSAyNi40MzYyIDE0LjIwMTQgMjYuMzk3NUwxNi43OTUgMjYuMzkxMkMxNy4zMjg0IDI2LjM3ODggMTcuMTM2MyAyNi40MjI3IDE4LjE2NTMgMjYuMzM3NEMxOS4xOTQ0IDI2LjI1MjIgMjEuOTQyNSAyNS45MTQgMjEuOTQyNSAyNS45MTRMMzUuNDI3NSAyNC4zODhMMzUuNzc1IDI0LjMzNzVDMzYuNTYzNyAyNC4yMDMgMzcuMTU5NyAyNC40MDc5IDM3LjY2MzYgMjUuMjc2QzM4LjQxNzcgMjYuNTc1IDM3LjI2NzIgMjcuNTU0NiAzNS44ODk5IDI4LjcyNzJDMzUuODUzIDI4Ljc1ODYgMzUuODE2IDI4Ljc5MDEgMzUuNzc4OSAyOC44MjE4TDIzLjkyNSAzOS4wMzc3QzIxLjg5MzMgNDAuNzkwMSAyMC40NjYgNDAuMTMxMSAxOS45NjYyIDM4LjI2NTZMMTguMTk1OCAzMS42NTg3QzE3Ljc1ODUgMzAuMDI2NCAxNi4xNjQ2IDI4Ljc0NTYgMTQuMjk3NiAyOS4yNDU5QzExLjk2MzggMjkuODcxMiAxMS43NzQ2IDMyLjU4NzggMTIuMzQ3MyAzNC43MjU0WiIgZmlsbD0iIzA2MEQxNCIvPgo8L3N2Zz4K',
      enabled: true
    }
  });

  const unregister = wallets.register(wallet);
  return unregister;
};
