---
sidebar_position: 3
---

# ConnectModal

## Description

ConnectModal is a nicely designed wallet-select modal for wallet selection.

:::tip

Usually you won't need to import it because we hide it inside our ConnectButton. Unless you want to customize your own ConnectButton along with our connect modal.

:::

## Examples

Here is an example for you to use with your own connect button.

```jsx
import { useWallet, ConnectModal } from '@suiet/wallet-kit';

function App() {
  const {connected} = useWallet()
  const [showModal, setShowModal] = useState(false)

  if (connected) {
    return <YourComponent />
  }
  return (
    // wrap your own button as the trigger of the modal
    <ConnectModal
      open={showModal}
      onOpenChange={(open) => setShowModal(open)}
    >
      <YourOwnButton />
    </ConnectModal>;
  )
}

```

## API

### Props

| Properties   | Description                     | Type                    | Default |
| ------------ | ------------------------------- | ----------------------- | ------- |
| children     | trigger element for the modal   | ReactNode               | null    |
| open         | Indicator for opening the modal | boolean                 | false   |
| onOpenChange | visibility change event         | (open: boolean) => void | --      |
