# WBL

```
WEB-COMPONENTS LIBRARY
‾ ‾            ‾
```

A library of [web-components](https://www.webcomponents.org/introduction).

These components have been tested as consumables by Vue, Lit.dev and Svelte.

## Safari

Safari doesn't yet support `document.adoptedStyleSheets` which is required to style the root element (which is only required for autofill on the login page);

For compatibility a polyfill must be included in the consuming code:

```js
<script
  async
  src="https://unpkg.com/construct-style-sheets-polyfill@3.1.0/dist/adoptedStyleSheets.js"
></script>
```

# Links

## Design Rules

- [Design Safe Rules](https://anthonyhobday.com/sideprojects/saferules/)

## Designs

- [Login](https://xd.adobe.com/view/dd169958-c008-4db8-a89e-1dab7d445c9e-8845/)
- [Home Screen](https://xd.adobe.com/view/dd169958-c008-4db8-a89e-1dab7d445c9e-8845)

## Other Storybooks

- [British Gas Lib](https://www.britishgas.co.uk/nucleus/demo/index.html)
- [Swiss Post Office](https://swisspost-web-frontend.netlify.app/#/bootstrap-samples/buttons)

## Animation

https://open-wc.org/blog/doing-a-flip-with-lit-html-2-0/
