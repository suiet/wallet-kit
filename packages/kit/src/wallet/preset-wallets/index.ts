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
    presets.SpacecyWallet,
    presets.SensuiWallet,
    presets.NightlyWallet,
    presets.ElliWallet,
    presets.TokenPocketWallet,
    presets.FrontierWallet
  ].sort((a, b) => (a.name < b.name ? -1 : 1)),
];