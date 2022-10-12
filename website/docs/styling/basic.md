# Basic

## BEM Naming Rule

The BEM naming rule is used to name CSS classes.
It is a convention for naming CSS classes in a consistent and predictable way.
It helps to achieve reusable components and code sharing in front-end development.

```txt
.wkit-[block]__[element]--[modifier]
```

```jsx
<div className={"wkit-button"}>...</div>
```

## Import default CSS

You need to import the default CSS file to use the default styles.

:::tip
You may need a proper CSS loader to import CSS files. See [Webpack](https://webpack.js.org/loaders/css-loader/) or [Vite](https://vitejs.dev/guide/features.html#css) for more information.
:::

For example, import the default css file in the `src/index.jsx` file:

```jsx title="src/index.jsx"
import * as React from "react";
import "@suiet/wallet-kit/style.css"; // Add this line to your code

// Your Application code below
function App() {
  return <div>...</div>;
}
```
