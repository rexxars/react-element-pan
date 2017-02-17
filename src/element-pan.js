'use strict';

var React = require('react');
var eventListener = require('eventlistener');

var PropTypes = React.PropTypes;

var ElementPan = React.createClass({
    displayName: 'ElementPan',

    propTypes: {
        className: PropTypes.string,
        onPanStart: PropTypes.func,
        onPan: PropTypes.func,
        onPanStop: PropTypes.func,
        startX: PropTypes.number,
        startY: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
        style: PropTypes.object
    },

    getDefaultProps: function() {
        return {
            className: 'element-pan'
        };
    },

    getInitialState: function() {
        return {
            dragging: false
        };
    },

    onDragStart: function(e) {
        // We want to be able to pan around inside the container even when the
        // mouse is on the outside of the element (as long as the mouse button
        // is still being pressed) - this is why we're attaching to the window
        eventListener.add(window, 'mousemove', this.onDragMove);
        eventListener.add(window, 'touchmove', this.onDragMove);
        eventListener.add(window, 'mouseup', this.onDragStop);
        eventListener.add(window, 'touchend', this.onDragStop);

        // If we have multiple child nodes, use the scroll[Height/Width]
        // If we have no child-nodes, use bounds to find size of inner content
        var bounds, target = e.currentTarget || e.target;
        if (target.childNodes.length > 1) {
            bounds = { width: target.scrollWidth, height: target.scrollHeight };
        } else {
            bounds = e.target.getBoundingClientRect();
        }

        // Find start position of drag based on touch/mouse coordinates
        var startX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX,
            startY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

        var state = {
            dragging: true,

            elHeight: this.el.clientHeight,
            elWidth: this.el.clientWidth,

            startX: startX,
            startY: startY,

            scrollX: this.el.scrollLeft,
            scrollY: this.el.scrollTop,

            maxX: bounds.width,
            maxY: bounds.height
        };

        this.setState(state);

        if (this.props.onPanStart) {
            this.props.onPanStart(state);
        }
    },

    onDragMove: function(e) {
        e.preventDefault();

        if (!this.state.dragging) {
            return;
        }

        var x = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX,
            y = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

        // Letting the browser automatically stop on scrollHeight
        // gives weird bugs where some extra pixels are showing.
        // Substracting the height/width of the container from the
        // inner content seems to do the trick.
        this.el.scrollLeft = Math.min(
            this.state.maxX - this.state.elWidth,
            this.state.scrollX - (x - this.state.startX)
        );

        this.el.scrollTop = Math.min(
            this.state.maxY - this.state.elHeight,
            this.state.scrollY - (y - this.state.startY)
        );

        if (this.props.onPan) {
            this.props.onPan({ x: this.el.scrollLeft, y: this.el.scrollTop });
        }
    },

    onDragStop: function() {
        this.setState({ dragging: false });

        eventListener.remove(window, 'mousemove', this.onDragMove);
        eventListener.remove(window, 'touchmove', this.onDragMove);
        eventListener.remove(window, 'mouseup', this.onDragStop);
        eventListener.remove(window, 'touchend', this.onDragStop);

        if (this.props.onPanStop) {
            this.props.onPanStop({ x: this.el.scrollLeft, y: this.el.scrollTop });
        }
    },

    componentDidMount: function() {
        // Cached for faster lookup
        this.el = this.refs.container;

        // Old versions of React doesn't return the raw DOM node
        if (!(this.el instanceof window.Node)) {
            this.el = this.el.getDOMNode();
        }

        if (this.props.startX) {
            this.el.scrollLeft = this.props.startX;
        }

        if (this.props.startY) {
            this.el.scrollTop = this.props.startY;
        }
    },

    getContainerStyles: function() {
        var style = {
            overflow: 'hidden',
            cursor: 'move'
        };

        if (this.props.width) {
            style.width = this.props.width;
        }

        if (this.props.height) {
            style.height = this.props.height;
        }

        if (this.props.style) {
            style = Object.assign({}, style, this.props.style);
        }

        return style;
    },

    render: function() {
        return (
            React.DOM.div({
                ref: 'container',
                className: this.props.className,
                style: this.getContainerStyles(),
                onMouseDown: this.onDragStart,
                onTouchStart: this.onDragStart
            }, this.props.children)
        );
    }
});

module.exports = ElementPan;
