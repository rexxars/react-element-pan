const React = window.React
const ReactDom = window.ReactDOM
const ElementPan = window.ReactElementPan
const h = React.createElement

// Simple image demo
ReactDom.render(
  h(
    ElementPan,
    {
      startX: 771,
      startY: 360
    },
    h('img', {
      src: 'img/beer.jpg',
      onMouseDown: evt => {
        evt.preventDefault()
      }
    })
  ),
  document.getElementById('image-demo')
)

// Huge SVG demo
ReactDom.render(
  h(
    ElementPan,
    {
      startX: 1771,
      startY: 1360
    },
    h('img', {
      src: 'img/metro.svg',
      onMouseDown: evt => {
        evt.preventDefault()
      }
    })
  ),
  document.getElementById('map-demo')
)

// Slightly more complicated DOM-element demo
const themDivs = []
let i = 20

while (--i) {
  themDivs.push(
    h(
      'div',
      {
        key: i,
        style: {
          width: i * 30,
          lineHeight: `${i * 10}px`
        }
      },
      'Smaller...'
    )
  )
}

ReactDom.render(h(ElementPan, null, themDivs), document.getElementById('html-demo'))
