# Styling

## BEM Naming Rule

The BEM naming rule is used to name CSS classes. It is a convention for naming CSS classes in a consistent and predictable way. It helps to achieve reusable components and code sharing in front-end development.

```txt
.wkit-[block]__[element]--[modifier]
```

```jsx
<div className={'wkit-button'}>
  ...
</div>
```

## CSS Variables

We use CSS variables to define colors, and other styles like below:

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

Below is a list of all CSS variables that you can use as public API to customize the look of the components.

| Variable | Description | Default |
| --- | --- | --- |
| --wkit-button-bg | connect button background color | #3ea2f8 |
| --wkit-button-bg-hover | connect button background color on hover | #0073E5 |
| --wkit-button-bg-active | connect button background color on active | #0059BF |
| --wkit-button-bg-connected | connected button background color | rgba(10, 14, 34, 0.05) |
| --wkit-button-bg-connected-hover | connected button background color on hover | rgba(10, 14, 34, 0.07) |
| --wkit-button-bg-connected-active | connected button background color on active | rgba(10, 14, 34, 0.10) |
| --wkit-button-border-radius | connect button border radius | 16px |
| --wkit-button-width | connect button width | 254px |

## Import default css

You need to import the default css file to use the default styles.

```js
import '@suiet/wallet-kit/default.css';
```

## Customize css

When CSS variables are not enough, you can customize the styles by importing the css file and overriding the styles.

```js
import '@suiet/wallet-kit/default.css';
import './suiet-wallet-kit-custom.css'; // You css file here
```

Example:

```scss
// Content of file: ./suiet-wallet-kit-custom.css

:root {
  --wkit-button-bg: $COLOR_YOUR_THEME;

  ... // other css variables
}
```
