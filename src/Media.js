import React, { Component } from 'react'
import PropTypes from 'prop-types'
import json2mq from 'json2mq'
import resolveProps from './resolve-props'

export class Media extends Component {
  static propTypes = {
    queries: PropTypes.object,
    onUpdate: PropTypes.func,
  }

  static defaultProps = {
    queries: {},
    onUpdate: () => null,
  }

  state = {
    matches: {},
  }

  componentWillMount() {
    if (typeof window !== 'object') return

    const { queries } = this.props

    this._queryLists = Object.keys(queries).reduce((queryLists, key) => {
      const queryList = window.matchMedia(json2mq(queries[key]))
      queryList.addListener(this._updateMatches)
      queryLists[key] = queryList
      return queryLists
    }, {})

    this._updateMatches()
  }

  componentWillUnmount() {
    Object.keys(this._queryLists).forEach(key =>
      this._queryLists[key].removeListener(this._updateMatches)
    )
  }

  _updateMatches = () => {
    const matches = Object.keys(this._queryLists).reduce((matches, key) => {
      const queryList = this._queryLists[key]
      return { ...matches, [key]: queryList.matches }
    }, {})
    this.setState({ matches })
  }

  _resolve = propQueries => {
    return resolveProps(this.state.matches, propQueries)
  }

  render() {
    return this.props.children({
      matches: this.state.matches,
      resolve: this._resolve,
    })
  }
}

export default Media
