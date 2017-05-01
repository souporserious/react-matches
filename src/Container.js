import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import ResizeObserver from 'resize-observer-polyfill'
import resolveProps from './resolve-props'

function matchQueries(queries, { width, height }) {
  const matchedQueries = {}

  Object.keys(queries).forEach(key => {
    const {
      minWidth = 0,
      maxWidth = Infinity,
      minHeight = 0,
      maxHeight = Infinity,
    } = queries[key]

    matchedQueries[key] =
      minWidth <= width &&
      width <= maxWidth &&
      minHeight <= height &&
      height <= maxHeight
  })

  return matchedQueries
}

export class Container extends Component {
  static propTypes = {
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    queries: PropTypes.object,
    onUpdate: PropTypes.func,
  }

  static defaultProps = {
    tag: 'div',
    queries: {},
    onUpdate: () => null,
  }

  state = {
    matches: {},
  }

  componentDidMount() {
    if (typeof window !== 'object') return

    if (this._node) {
      this._resizeObserver = new ResizeObserver(this._updateMatches)
      this._resizeObserver.observe(this._node)
    } else {
      console.error(
        'No ref found, attach the `containerRef` prop passed back in the child function to the component you want to measure.'
      )
    }

    this._isMounted = true
  }

  componentWillUnmount() {
    if (this.resizeObserver && this._node) {
      this.resizeObserver.disconnect(this._node)
    }

    this._isMounted = false
  }

  _updateMatches = entries => {
    const rect = entries[0].contentRect
    const matches = matchQueries(this.props.queries, rect)

    if (
      this._isMounted &&
      JSON.stringify(matches) !== JSON.stringify(this.state.matches)
    ) {
      this.setState({ matches })
      this.props.onUpdate(rect)
    }
  }

  _setNode = component => {
    this._node = component
  }

  _resolve = propQueries => {
    return resolveProps(this.state.matches, propQueries)
  }

  render() {
    const { tag, queries, children, onUpdate, ...props } = this.props

    if (tag) {
      return createElement(
        tag,
        { ref: this._setNode, ...props },
        children({
          matches: this.state.matches,
          resolve: this._resolve,
        })
      )
    }

    return children({
      containerRef: this._setNode,
      matches: this.state.matches,
      resolve: this._resolve,
    })
  }
}

export default Container
