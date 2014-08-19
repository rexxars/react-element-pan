'use strict';

var React = window.React || require('react');
var ElementPan = window.reactElementPan || require('react-element-pan');

// Simple image demo
React.renderComponent(
    new ElementPan({
        startX: 771,
        startY: 360
    }, React.DOM.img({ src: 'img/beer.jpg' })
), document.getElementById('image-demo'));

// Slightly more complicated DOM-element demo
var i = 20, themDivs = [];
while (--i) {
    themDivs.push(React.DOM.div({
        key: i,
        style: {
            width:  i * 30,
            lineHeight: (i * 10) + 'px'
        }
    }, 'Smaller...'));
}

React.renderComponent(new ElementPan(null, themDivs), document.getElementById('html-demo'));
