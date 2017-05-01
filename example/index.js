import React, { Component, createElement } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Media, Container } from '../src/index'

const queries = {
  warm: { minWidth: 600 },
  hot: { minWidth: 900 },
}

class App extends Component {
  state = {
    mediaMounted: false,
    containerMounted: true,
  }
  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.setState(s => ({ mediaMounted: !s.mediaMounted }))}
        >
          Mount media
        </button>
        <button
          onClick={() =>
            this.setState(s => ({ containerMounted: !s.containerMounted }))}
        >
          Mount container
        </button>

        {this.state.mediaMounted &&
          <Media queries={queries}>
            {({ resolve }) => (
              <div style={{ fontSize: 100 }}>
                {resolve({ default: '❄️', warm: '☀️', hot: '🔥' })}
              </div>
            )}
          </Media>}

        {this.state.containerMounted &&
          <Container tag="div" queries={queries}>
            {({ resolve }) => (
              <div style={{ fontSize: 100 }}>
                {resolve({ default: '❄️', warm: '☀️', hot: '🔥' })}
              </div>
            )}
          </Container>}

        {this.state.containerMounted &&
          <Container tag={false} queries={queries}>
            {({ containerRef, resolve }) => (
              <div ref={containerRef} style={{ fontSize: 100 }}>
                {resolve({ default: '❄️', warm: '☀️', hot: '🔥' })}
              </div>
            )}
          </Container>}
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
