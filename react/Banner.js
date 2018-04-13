import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'render'

/**
 * Banner component. Shows an image with a description and one link.
 */
class Banner extends Component {
  render() {
    const { image, page, description, targetParams, mobileImage } = this.props

    return (
      <div>
        <Link page={page} params={targetParams}>
          <img className="img-regular" src={image} alt={description} />
          <img className="img-mobile" src={mobileImage} alt={description} />
        </Link>
      </div>
    )
  }
}

Banner.propTypes = {
  /** The image of the banner */
  image: PropTypes.string.isRequired,
  /** The image of the banner */
  mobileImage: PropTypes.string.isRequired,
  /** The description of the image */
  description: PropTypes.string.isRequired,
  /** The page where the image is pointing to */
  page: PropTypes.string,
  /** Params of the url */
  targetParams: PropTypes.object,
}

export default Banner
