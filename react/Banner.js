import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'render'

/**
 * Banner component. Shows an image with a description and one link.
 */
class Banner extends Component {
  render() {
    const { image, page, description, targetParams } = this.props

    return (
      <div>
        <Link page={page} params={targetParams}>
          <img width="100%" src={image} alt={description}/>
        </Link>
      </div>
    )
  }
}

Banner.schema = {
  title: 'Banner',
  description: 'A simple banner component with an image and an link',
  type: 'object',
  properties: {
    image: {
      type: 'string',
      title: 'Image',
    },  
    description: {
      type: 'string',
      title: 'Description',
    },
    page: {
      type: 'string',
      title: 'Page',
    },
    targetParams: {
      type: 'object',
      title: 'Target params',
      properties: {
        params: {
          type: 'string',
          title: 'Params',
        },
      },
    },
  },
}

Banner.propTypes = {
  /** The image of the banner */
  image: PropTypes.string.isRequired,
  /** The description of the image */
  description: PropTypes.string.isRequired,
  /** The page where the image is pointing to */
  page: PropTypes.string,
  /** Params of the url */
  targetParams: PropTypes.object
}

export default Banner
