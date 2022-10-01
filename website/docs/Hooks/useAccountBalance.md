---
sidebar_position: 2
---

# useAccountBalance

You can get balance of the current account under selected network.

```ts
interface AccountBalanceResponse {
  error: Error; // an error object
  loading: boolean;
  balance: string; // balance of the current account, when loading or error, it will be 0
}

const { error, loading, balance } = useAccountBalance();
```
