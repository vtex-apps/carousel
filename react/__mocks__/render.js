import React, { Component } from 'react'

/**
 * Link Mocked Component.
 */
export class Link extends Component {
  render() {
    return <a>{this.props.children}</a>
  }
}

/**
 * Link Mocked Component.
 */
export class NoSSR extends Component {
  render() {
    return this.props.children
  }
}
