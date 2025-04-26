import * as presets from "./preset-wallets";

export const AllDefaultWallets = [
  presets.SuietWallet,
  presets.SlushWallet,
  presets.PhantomWallet,
  // sorted by name alphabetically
  ...[
    presets.MartianWallet,
    presets.SurfWallet,
    presets.GlassWallet,
    presets.OneKeyWallet,
    presets.NightlyWallet,
    presets.TokenPocketWallet,
    presets.OkxWallet,
  ].sort((a, b) => (a.name < b.name ? -1 : 1)),
];
