# Styling

## BEM Naming Rule

.wkit-[block]__[element]--[modifier]

className={'wkit-button'}

## CSS Variables

You can use CSS variables to customize the look of the components.

```css
:root {
  --wkit-button-bg: #3ea2f8; /* connect button background color */
  --wkit-button-bg-hover: #0073E5; /* connect button background color on hover */
  --wkit-button-bg-active: #0059BF; /* connect button background color on active */

  --wkit-border-radius: 16px; /* default border radius for all */
  --wkit-button-border-radius: 16px; /* connect button border radius */

  /* etc. */
}
```

## Import default css

You need to import the default css file to use the default styles.

```js
import '@suiet/wallet-kit/default.css';
```

## Customize css

```js
import '@suiet/wallet-kit/default.css';
import './suiet-wallet-kit-custom.css';
```

Example:

```scss
// Content of file: ./suiet-wallet-kit-custom.css

:root {
  --wkit-button-bg: $COLOR_YOUR_THEME;

  ... // other css variables
}
```
