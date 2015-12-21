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

```javascript
var React = require('react');
var ElementPan = require('react-element-pan');

// Want to use touch events?
React.initializeTouchEvents(true);

// Render the component
React.render(
    new ElementPan({
        onPanStart: function() { /* Pan started! */ },
        onPanStop: function() { /* Pan ended! */ },
        onPan: function() { /* Pan move! */ },
        width: 800, // Optional width for the ElementPan container
        height: 800, // Optional height for the ElementPan container
        startX: 771, // Optional X coordinate to start at
        startY: 360  // Optional Y coordinate to start at
    }, React.DOM.img({ src: 'some-large-image.jpg' })
), document.body);

// Or, with JSX:
React.render(
    <ElementPan>
        <img src="some-large-image.jpg" />
    </ElementPan>,
    document.body
);
```

Note that startX/startY only works if the content is large enough when the component is mounted. You might want to set a `min-width`/`min-height` in your CSS for this to work.

## License
Licensed under the MIT License, see LICENSE