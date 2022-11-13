import {deprecatedWarn} from "./tips";

/** @deprecated if you want to customize wallet list, use defaultWallets instead */
export function getDefaultWallets() {
  deprecatedWarn({
    name: 'getDefaultWallets',
    message: 'If you want to customize wallet list, use defaultWallets instead',
    migrationDoc: 'https://kit.suiet.app/docs/migration/upgradeTo0.1.0'
  })
  return [];
}

/** @deprecated if you want to customize wallet list, use defaultWallets instead */
export function getAllWallets() {
  deprecatedWarn({
    name: 'getAllWallets',
    message: 'If you want to customize wallet list, use defaultWallets instead',
    migrationDoc: 'https://kit.suiet.app/docs/migration/upgradeTo0.1.0'
  })
  return []
}