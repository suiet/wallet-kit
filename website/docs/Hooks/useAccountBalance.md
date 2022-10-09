---
sidebar_position: 2
---

# useAccountBalance

## Introduction

You can get the balance of the current account under the selected network. The useAccountBalance will return the current account's balance, loading status, error object. When fetching the banlance data, loading will set to true, otherwise false. If fetch failed, error will be an Error object instance and shows why fetch failed.

:::caution
If error is not null, it means fetch balance failed. In this case, the balance will set to be 0.
:::

The balance's type is string. If you want to use balance to calculate, you should convert it to bigint. If your project don't support Bigint(https://caniuse.com/?search=Bigint), you should get balance . For example:

```jsx
interface AccountBalanceResponse {
  error: Error | null;
  loading: boolean;
  balance: string;
}

import { useAccountBalance } from '@suiet/wallet';

function add(balance: string) {
  return BigInt(balance) + 1; // convert balance to bigint
}

function App() {
  const { error, loading, balance } = useAccountBalance();

  return <button onClick={() => add(balance)}>balance add 1</button>;
}
```

## API

| Properties | Description                    | Type    | Default |
| ---------- | ------------------------------ | ------- | ------- |
| error      | error or null                  | boolean | false   |
| loading    | fetch status                   | string  | ''      |
| balance    | the balance of current account | string(bigint)  | '0'     |
