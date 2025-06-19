---
sidebar_position: 4
---

# AccountModal

## Description

AccountModal is a modal that displays connected wallet account information with actions to copy address and disconnect.

## Examples

Here is an example for you to use with your own account button.

```jsx
import { useWallet, AccountModal } from '@suiet/wallet-kit';

function App() {
  const {connected} = useWallet()
  const [showModal, setShowModal] = useState(false)

  return (
    // wrap your own button as the trigger of the modal
    <AccountModal
      open={showModal}
      onOpenChange={(open) => setShowModal(open)}
      onDisconnectSuccess={(walletName) => {
        console.log(`Disconnected from ${walletName}`)
      }}
      onDisconnectError={(error) => {
        console.error('Disconnect failed:', error)
      }}
    >
      <YourOwnAccountButton />
    </AccountModal>
  )
}
```

## API

### Props

| Properties          | Description                           | Type                         | Default |
| ------------------- | ------------------------------------- | ---------------------------- | ------- |
| children            | trigger element for the modal         | ReactNode                    | null    |
| open                | Indicator for opening the modal       | boolean                      | false   |
| onOpenChange        | visibility change event               | (open: boolean) => void      | --      |
| onDisconnectSuccess | Callback for successful disconnection | (walletName: string) => void |         |
| onDisconnectError   | Callback for failed disconnection     | (error: BaseError) => void   |         |
