import React, { Component, useState } from 'react'

/**
 * Link Mocked Component.
 */
export function Link({ children }) {
  return <a href="#foo">{children}</a>
}

/**
 * Link Mocked Component.
 */
export class NoSSR extends Component {
  render() {
    return this.props.children
  }
}

export const useRuntime = () => {
  const [hints] = useState({ mobile: false, desktop: true })
  return { hints }
}
