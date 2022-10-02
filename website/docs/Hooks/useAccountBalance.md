---
sidebar_position: 2
---

# useAccountBalance

## Introduction

You can get balance of the current account under selected network.

```ts
interface AccountBalanceResponse {
  error: Error | null;
  loading: boolean;
  balance: string;
}

const { error, loading, balance } = useAccountBalance();
```

UseAccountBalance will return the current account's balance, loading status, error object. When fetch the banlance data, loading will set to true, otherwise false. If fetch failed, error will be an Error object instance and shows why fetch failed.

:::caution
If error is not null, it means fetch balance failed. In this case, the balance will set to be 0.
:::

## API

| Properties | Description                    | Type    | Default |
| ---------- | ------------------------------ | ------- | ------- |
| error      | error or null                  | boolean | false   |
| loading    | fetch status                   | string  | ''      |
| balance    | the balance of current account | string  | '0'     |
