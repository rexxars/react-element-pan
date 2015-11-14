'use strict';

var require = typeof require === 'undefined' ? function() {} : require;

var React = window.React || require('react');
var ReactDom = window.ReactDOM || require('react-dom') || React;
var ElementPan = React.createFactory(window.reactElementPan || require('react-element-pan'));

// Simple image demo
ReactDom.render(
    new ElementPan({
        startX: 771,
        startY: 360
    }, React.DOM.img({ src: 'img/beer.jpg' })
), document.getElementById('image-demo'));

// Huge SVG demo
ReactDom.render(
    new ElementPan({
        startX: 1771,
        startY: 1360
    }, React.DOM.img({ src: 'img/metro.svg' })
), document.getElementById('map-demo'));

// Slightly more complicated DOM-element demo
var i = 20, themDivs = [];
while (--i) {
    themDivs.push(React.DOM.div({
        key: i,
        style: {
            width: i * 30,
            lineHeight: (i * 10) + 'px'
        }
    }, 'Smaller...'));
}

ReactDom.render(
    new ElementPan(null, themDivs),
    document.getElementById('html-demo')
);
