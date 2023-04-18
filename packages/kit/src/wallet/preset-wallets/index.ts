export * from "./presets";

import * as presets from "./presets";

export const AllDefaultWallets = [
  presets.SuietWallet,
  presets.SuiWallet,
  ...[
    presets.EthosWallet,
    presets.MartianWallet,
    presets.SurfWallet,
    presets.MorphisWallet,
    presets.GlassWallet,
    presets.OneKeyWallet,
    presets.BitKeepWallet,
    presets.SpacecyWallet,
    presets.NightlyWallet,
    presets.ElliWallet,
  ].sort((a, b) => a.name < b.name ? -1 : 1),
];