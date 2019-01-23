import React, { Component, cloneElement } from 'react'

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

export function withRuntimeContext(MyComponent) {
    return props => {
      return <MyComponent runtime={{ hints: {} }} {...props} />
    }
}
