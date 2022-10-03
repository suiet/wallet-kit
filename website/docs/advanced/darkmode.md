# Dark Mode

With the help of CSS variables, you can easily customize the theme of the components to support dark mode.

In fact, we have already provided a dark mode theme for you, no additional configuration is required.

:::tip
We also defined our dark mode theme under the `[data-theme='dark']:root` selector, as it is a common practice in the web development community.
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

Like normal mode, you can override the CSS variables above to customize the look of the components in dark mode. For example, you can change the accent color to red in dark mode:

```scss
@media (prefers-color-scheme: dark) {
  :root {
    --wkit-accent-hs: 0, 100%;
  }
}
```
