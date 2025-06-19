---
sidebar_position: 2
---

# useSuinsName

## Description

`useSuinsName` is a React Hook that resolves wallet addresses to their corresponding [SuiNS (Sui Name Service)](https://suins.io/) names. It provides an easy way to fetch and display human-readable names for Sui wallet addresses, with built-in caching and loading states.

SuiNS names are like domain names for Sui addresses - instead of showing a long cryptographic address like `0x123abc...`, you can display a readable name like `alice.sui`.

:::tip

Make sure it runs in a React component under `WalletProvider`, and you've enabled `enableSuiNS` at WalletProvider

:::

## Examples

### Basic Usage

Here's how to resolve a wallet address to its SuiNS name:

```jsx
import { useSuinsName } from '@suiet/wallet-kit';

function AddressDisplay({ address }) {
  const { chain } = useWallet()
  const { defaultName, names, loading, error } = useSuinsName({
    address,
    chain, // or specify your chain
  });

  if (loading) return <div>Loading name...</div>;
  if (error) return <div>Error loading name</div>;

  return (
    <div>
      <p>Address: {address}</p>
      {defaultName && <p>SuiNS Name: {defaultName}</p>}
      {names.length > 1 && (
        <p>Other names: {names.slice(1).join(', ')}</p>
      )}
    </div>
  );
}
```

### Multiple Names Handling

Handle addresses that have multiple SuiNS names:

```jsx
import { useSuinsName, useWallet } from '@suiet/wallet-kit';

function MultipleNamesDisplay({ address }) {
  const { chain } = useWallet();
  const { defaultName, names, loading, error } = useSuinsName({
    address,
    chain,
  });

  if (loading) return <div>Loading names...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (names.length === 0) return <div>No SuiNS names found</div>;

  return (
    <div>
      <h4>SuiNS Names for {address.slice(0, 8)}...</h4>
      <ul>
        {names.map((name, index) => (
          <li key={index}>
            {name} {index === 0 && <em>(primary)</em>}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## API References

### Parameters

The hook accepts an optional parameters object:

| Parameter      | Type               | Default        | Description                                    |
|----------------|--------------------|----------------|------------------------------------------------|
| `address`      | string \| undefined | undefined      | The wallet address to resolve                  |
| `chain`        | Chain \| undefined  | undefined      | The chain/network to query on                  |
| `enabled`      | boolean            | true           | Whether to enable the query                    |
| `cacheDuration`| number             | 300000 (5 min) | Cache duration in milliseconds                 |

```ts
interface UseSuinsNameParams {
  address: string | undefined;
  chain: Chain | undefined;
  enabled?: boolean;
  cacheDuration?: number;
}
```

### Return Values

The hook returns an object with the following properties:

| Property      | Type           | Description                                    |
|---------------|----------------|------------------------------------------------|
| `defaultName` | string \| null | The primary SuiNS name, or null if none found |
| `names`       | string[]       | Array of all SuiNS names for the address      |
| `loading`     | boolean        | Whether the query is currently loading         |
| `error`       | any            | Error object if the query failed               |

```ts
interface UseSuinsNameResult {
  defaultName: string | null;
  names: string[];
  loading: boolean;
  error: any;
}
```

### defaultName

The primary SuiNS name for the address. This is the first name in the `names` array, or `null` if no names are found.

| Type             | Default |
|------------------|---------|
| string \| null   | null    |

```tsx
const { defaultName } = useSuinsName({ address, chain });

// Display primary name or fallback to address
const displayName = defaultName || `${address.slice(0, 8)}...`;
```

### names

An array containing all SuiNS names associated with the address. The first item is the primary name.

| Type      | Default |
|-----------|---------|
| string[]  | []      |

```tsx
const { names } = useSuinsName({ address, chain });

// Check if address has multiple names
if (names.length > 1) {
  console.log('This address has multiple SuiNS names:', names);
}
```

### loading

Indicates whether the SuiNS name resolution is currently in progress.

| Type    | Default |
|---------|---------|
| boolean | false   |

```tsx
const { loading, defaultName } = useSuinsName({ address, chain });

return (
  <div>
    {loading ? (
      <span>Loading...</span>
    ) : (
      <span>{defaultName || 'No name found'}</span>
    )}
  </div>
);
```

### error

Contains error information if the SuiNS name resolution failed.

| Type | Default   |
|------|-----------|
| any  | undefined |

```tsx
const { error, defaultName } = useSuinsName({ address, chain });

if (error) {
  // Log error for debugging but show user-friendly message
  console.error('SuiNS resolution failed:', error);
  return <span>Name unavailable</span>;
}
```

## Best Practices

### Caching

The hook uses React Query for caching. You can customize the cache duration:

```tsx
// Cache for 10 minutes instead of default 5 minutes
const { defaultName } = useSuinsName({
  address,
  chain,
  cacheDuration: 10 * 60 * 1000,
});
```

### Conditional Queries

Use the `enabled` parameter to control when queries run:

```tsx
// Only query when we have both address and chain
const { defaultName } = useSuinsName({
  address,
  chain,
  enabled: !!address && !!chain,
});
```

### Error Handling

Always handle the error state appropriately:

```tsx
const { defaultName, loading, error } = useSuinsName({ address, chain });

if (error) {
  // Log error for debugging but show user-friendly message
  console.error('SuiNS resolution failed:', error);
  return <span>Name unavailable</span>;
}
```

## Notes

:::info Chain Dependency

The hook requires a valid `chain` parameter to make RPC calls. Make sure to pass the current chain from `useWallet()` or specify the chain explicitly.

:::

:::tip Performance

The hook automatically caches results using React Query. Multiple components requesting the same address will share the cached result, improving performance.

:::

:::caution Network Calls

Each unique address will trigger a network call to resolve SuiNS names. Consider the performance implications when displaying many addresses simultaneously.

:::
