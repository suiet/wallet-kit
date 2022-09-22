# Styling

## BEM Naming Rule

.wkit-[block]__[element]--[modifier]

className={'wkit-connect-btn'}

## CSS Variables

```css
--wkit-color-primary: #000;
--wkit-color-danger: #000;
--wkit-color-success: #000;
--wkit-color-warning: #000;
--wkit-color-info: #000;

--wkit-color-title: #000;
--wkit-color-subtitle: #000;
--wkit-color-desc: #000;
--wkit-font-family: Arial;

--wkit-bg-primary: #000;

--wkit-modal-bg: var(--wkit-bg-primary);
--wkit-button-bg: var(--wkit-bg-primary);

--wkit-border-radius: 8px;
--wkit-modal-border-radius: var(--wkit-border-radius);
--wkit-button-border-radius: var(--wkit-border-radius);
```

## Import default css

```
import '@suiet/wallet-kit/default.css';
```

```scss
.wkit-connect-btn {
  color: var(--wkit-color-primary);
}
```

## Customize css

```
import '@suiet/wallet-kit/default.css';
import './suiet-wallet-kit-custom.css';
```

simple
```
// ./suiet-wallet-kit-custom.css

--wkit-color-primary: #000;
--wkit-color-danger: #000;
--wkit-color-success: #000;
--wkit-color-warning: #000;
--wkit-color-info: #000;
```

full

synced from github link.

// TODO: component playground with docs
