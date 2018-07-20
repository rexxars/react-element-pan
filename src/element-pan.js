const React = require('react')
const PropTypes = require('prop-types')
const eventListener = require('eventlistener')

class ElementPan extends React.Component {
  constructor(props) {
    super(props)

    this.onDragStart = this.onDragStart.bind(this)
    this.onDragMove = this.onDragMove.bind(this)
    this.onDragStop = this.onDragStop.bind(this)
    this.onDragStart = this.onDragStart.bind(this)

    this.state = {dragging: false}
  }

  onDragStart(evt) {
    // We want to be able to pan around inside the container even when the
    // mouse is on the outside of the element (as long as the mouse button
    // is still being pressed) - this is why we're attaching to the window
    eventListener.add(window, 'mousemove', this.onDragMove)
    eventListener.add(window, 'touchmove', this.onDragMove)
    eventListener.add(window, 'mouseup', this.onDragStop)
    eventListener.add(window, 'touchend', this.onDragStop)

    // If we have multiple child nodes, use the scroll[Height/Width]
    // If we have no child-nodes, use bounds to find size of inner content
    const target = evt.currentTarget || evt.target
    let bounds

    if (target.childNodes.length > 1) {
      bounds = {width: target.scrollWidth, height: target.scrollHeight}
    } else {
      bounds = evt.target.getBoundingClientRect()
    }

    // Find start position of drag based on touch/mouse coordinates
    const startX = typeof evt.clientX === 'undefined' ? evt.changedTouches[0].clientX : evt.clientX
    const startY = typeof evt.clientY === 'undefined' ? evt.changedTouches[0].clientY : evt.clientY

    const state = {
      dragging: true,

      elHeight: this.el.clientHeight,
      elWidth: this.el.clientWidth,

      startX: startX,
      startY: startY,

      scrollX: this.el.scrollLeft,
      scrollY: this.el.scrollTop,

      maxX: bounds.width,
      maxY: bounds.height
    }

    this.setState(state)

    if (this.props.onPanStart) {
      this.props.onPanStart(state)
    }
  }

  onDragMove(evt) {
    evt.preventDefault()

    if (!this.state.dragging) {
      return
    }

    const x = typeof evt.clientX === 'undefined' ? evt.changedTouches[0].clientX : evt.clientX
    const y = typeof evt.clientY === 'undefined' ? evt.changedTouches[0].clientY : evt.clientY

    // Letting the browser automatically stop on scrollHeight
    // gives weird bugs where some extra pixels are showing.
    // Substracting the height/width of the container from the
    // inner content seems to do the trick.
    this.el.scrollLeft = Math.min(
      this.state.maxX - this.state.elWidth,
      this.state.scrollX - (x - this.state.startX)
    )

    this.el.scrollTop = Math.min(
      this.state.maxY - this.state.elHeight,
      this.state.scrollY - (y - this.state.startY)
    )

    if (this.props.onPan) {
      this.props.onPan({x: this.el.scrollLeft, y: this.el.scrollTop})
    }
  }

  onDragStop() {
    this.setState({dragging: false})

    eventListener.remove(window, 'mousemove', this.onDragMove)
    eventListener.remove(window, 'touchmove', this.onDragMove)
    eventListener.remove(window, 'mouseup', this.onDragStop)
    eventListener.remove(window, 'touchend', this.onDragStop)

    if (this.props.onPanStop) {
      this.props.onPanStop({x: this.el.scrollLeft, y: this.el.scrollTop})
    }
  }

  getContainerStyles() {
    const style = {
      overflow: 'hidden',
      cursor: 'move'
    }

    if (this.props.width) {
      style.width = this.props.width
    }

    if (this.props.height) {
      style.height = this.props.height
    }

    if (this.props.style) {
      Object.assign(style, this.props.style)
    }

    return style
  }

  componentDidMount() {
    // Cached for faster lookup
    this.el = this.refs.container

    if (this.props.startX) {
      this.el.scrollLeft = this.props.startX
    }

    if (this.props.startY) {
      this.el.scrollTop = this.props.startY
    }
  }

  render() {
    const newProps = {
      ref: 'container',
      className: this.props.className ? this.props.className : 'element-pan',
      style: this.getContainerStyles(),
      onMouseDown: this.onDragStart,
      onTouchStart: this.onDragStart
    }

    return React.createElement(this.props.nodeName, newProps, this.props.children)
  }
}

ElementPan.propTypes = {
  className: PropTypes.string,
  onPanStart: PropTypes.func,
  onPan: PropTypes.func,
  onPanStop: PropTypes.func,
  startX: PropTypes.number,
  startY: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object
}

ElementPan.defaultProps = {
  className: 'element-pan',
  nodeName: 'div'
}

module.exports = ElementPan
