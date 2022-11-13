export * from "./sui-wallet";
export * from "./suiet-wallet";
export * from "./ethos-wallet";

import {SuiWallet} from "./sui-wallet";
import {SuietWallet} from "./suiet-wallet";
import {EthosWallet} from "./ethos-wallet";

export const AllDefaultWallets = [SuietWallet, SuiWallet, EthosWallet];
