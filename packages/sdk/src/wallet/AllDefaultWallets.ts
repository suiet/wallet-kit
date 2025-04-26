import * as presets from "./preset-wallets";

export const AllDefaultWallets = [
  presets.SuietWallet,
  presets.SlushWallet,
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
    presets.FrontierWallet,
    presets.PhantomWallet,
  ].sort((a, b) => (a.name < b.name ? -1 : 1)),
];
