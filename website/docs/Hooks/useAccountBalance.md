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
import {useEffect} from "react";

interface
AccountBalanceResponse
{
  error: Error | null;
  loading: boolean;
  balance: string;
}

import {useAccountBalance} from '@suiet/wallet';

function App() {
  const {error, loading, balance} = useAccountBalance();

  useEffect(() => {
    // if you want to do comparison or calculation with balance, 
    // use Number or BigInt to convert the balance string
    if (Number(balance) > 1000000) {
      console.log('You are a millionare!')
    }
  }, [balance])

  return <div>account balance: {balance}</div>;
}
```

## API

| Properties | Description                                           | Type    | Default |
| ---------- |-------------------------------------------------------| ------- | ------- |
| error      | error or null                                         | boolean | false   |
| loading    | fetch status                                          | string  | ''      |
| balance    | the balance of current account, converted from BigInt | string  | '0'     |
