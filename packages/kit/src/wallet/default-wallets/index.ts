export * from "./sui-wallet";
export * from "./suiet-wallet";

import { SuiWallet } from "./sui-wallet";
import { SuietWallet } from "./suiet-wallet";

export const AllDefaultWallets = [SuietWallet, SuiWallet];
