const SUI_STORAGE_KEY = '__SUIET_WALLET_SK__';

function safeParseJsonArray<T>(string: string | null): T[] {
  try {
    const value = string ? JSON.parse(string) : [];
    return Array.isArray(value) ? value : [];
  } catch (err) {
    return [];
  }
}

function dedupe<T>(array: T[], name: T): T[] {
  const idx = array.indexOf(name);
  const newArray = array.slice();
  if (idx < 0) {
    newArray.push(name);
    return newArray;
  }
  newArray.splice(idx, 1);
  newArray.unshift(name);
  return newArray;
}

class LatestWalletStorage {
  wallets: string[] = [];
  size = 3;

  getLatestWalletNames(): string[] {
    const wallets =
      typeof localStorage !== 'undefined'
        ? safeParseJsonArray<string>(localStorage.getItem(SUI_STORAGE_KEY))
        : [];

    this.wallets = wallets;

    return wallets;
  }

  storeWalletName(name: string): void {
    if (this.wallets.length === 0) {
      this.getLatestWalletNames();
    }

    const newValue = dedupe(this.wallets, name);

    localStorage.setItem(SUI_STORAGE_KEY, JSON.stringify(newValue));
  }
}

export default new LatestWalletStorage();
