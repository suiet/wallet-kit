# Hooks

## useWallet

```ts
const {
  supportedWallets,
  select,
  connecting,
  connected,
  getAccounts,
  executeMoveCall,
  executeSerializedMoveCall,
  status = 'disconnected' | 'connected' | 'connecting',
  address, // active account address
} = useWallet();
```

## useSuiProvider

```ts
const {
  getOwnedObjectRefs,
  getTransaction,
  getEventsByTransaction,
  getEventsBySender,
} = useSuiProvider();
```

## useAccountBalance

get balance of the current account under selected network.

```ts
interface AccountBalanceResponse {
  error: Error; // an error object
  loading: boolean;
  balance: string;
}

const { error, loading, balance } = useAccountBalance((token = 'SUI'));
```
