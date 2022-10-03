# Dark Mode

With the help of CSS variables, you can easily customize the theme of the components to support dark mode.

You can override color-related CSS variables under the `@media (prefers-color-scheme: dark)` media query to support dark mode like below:

<!-- :::tip
You may also defined dark mode theme under the `[data-theme='dark']:root` selector, as it is a common practice in the web development community.
::: -->

:::caution
Rules about dark mode must be imported / declared **AFTER** the default CSS file.
:::

```scss
@media (prefers-color-scheme: dark) {
  :root {
    --wkit-accent-hs: 166, 91%;
    --wkit-on-accent-rgb: 255, 255, 255;
    --wkit-bg-rgb: 40, 40, 40;
    --wkit-on-bg-rgb: 241, 241, 241;
  }
}
```
