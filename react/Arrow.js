import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Arrow component. It's an overrided component of react-slick that controls
 * the slide transition.
 */
class Arrow extends Component {
  render() {
    const { className, style, onClick, arrowClass } = this.props
    return (
      <div
        className={`${className} ${arrowClass}`}
        style={{ ...style }}
        onClick={onClick}
      />
    )
  }
}

Arrow.propTypes = {
  /** Css class of the element. */
  className: PropTypes.string,
  /** Custom style of the element. */
  style: PropTypes.object,
  /** Maximum number of items in the shelf. */
  onClick: PropTypes.func,
  /** Css class that specifies the arrow */
  arrowClass: PropTypes.string.isRequired,
}

export default Arrow
