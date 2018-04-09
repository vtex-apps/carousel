import PropTypes from 'prop-types'

/**
 * Dots container. Shows the nav dots of the carousel component;
 */
const Dots = (dots, color) => (
  <ul className="ma0 pa0" style={{ color: color || '#000' }}>
    {dots}
  </ul>
)

Dots.propTypes = {
  /** Dots that will be displayed */
  dots: PropTypes.node.isRequired,
  /** Dots color */
  color: PropTypes.string.isRequired,
}

export default Dots
