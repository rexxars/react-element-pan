# react-element-pan

React component for allowing panning of DOM-elements too large for their container, in a Google Maps-like way. Supports touch devices and should work on IE8+.

## Demos

See [the demos page](http://rexxars.github.io/react-element-pan/) for some demos.

## Installation

`react-element-pan` can be installed using [npm](https://npmjs.org/):

```
npm install react-element-pan
```

## Basic usage

```js
const React = require('react')
const ReactDOM = require('react-dom')
const ElementPan = require('react-element-pan')

// Or, with JSX:
ReactDOM.render(
  <ElementPan
    width={800} // Optional width for the ElementPan container
    height={800} // Optional height for the ElementPan container
    startX={771} // Optional X coordinate to start at
    startY={360} // Optional Y coordinate to start at
    onPanStart={() => {
      /* Pan started! */
    }}
    onPanStop={() => {
      /* Pan ended! */
    }}
    onPan={() => {
      /* Pan move! */
    }}
  >
    <img src="some-large-image.jpg" />
  </ElementPan>,
  document.body
)
```

Note that startX/startY only works if the content is large enough when the component is mounted. You might want to set a `min-width`/`min-height` in your CSS for this to work.

### Firefox

A quick note on the firefox browser. The default behavior on `mouseDown` in firefox on images is "drag to copy". If you wish to avoid the `ghost` image, prevent default on mousedown on your image:

```js
ReactDOM.render(
  <ElementPan>
    <img src="some-large-image.jpg" onMouseDown={evt => evt.preventDefault()} />
  </ElementPan>,
  document.body
)
```

## License

Licensed under the MIT License, see LICENSE
