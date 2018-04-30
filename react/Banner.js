import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'render'

/**
 * Banner component. Shows an image with a description and one link.
 */
class Banner extends Component {
  render() {
    const {
      image,
      mobileImage,
      description,
      page,
      params,
      mobileHeight,
    } = this.props

    return (
      <div>
        <Link page={page} params={params}>
          <div className="img-container">
            <img className="img-regular w-100" src={image} alt={description} />
            <div
              className="img-mobile"
              style={{ maxHeight: `${mobileHeight}px` }}
            >
              <img className="w-100" src={mobileImage} alt={description} />
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

Banner.propTypes = {
  /** The image of the banner */
  image: PropTypes.string.isRequired,
  /** The image of the banner on mobile*/
  mobileImage: PropTypes.string.isRequired,
  /** Max height size of the banner on mobile  */
  mobileHeight: PropTypes.number.isRequired,
  /** The description of the image */
  description: PropTypes.string.isRequired,
  /** The page where the image is pointing to */
  page: PropTypes.string,
  /** Params of the url */
  params: PropTypes.object,
}

export default Banner
