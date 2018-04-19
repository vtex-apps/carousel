import React, { Component } from 'react'

/**
 * Link Mocked Component.
 */
export class Link extends Component {
  render() {
    return <a>{this.props.children}</a>
  }
}
