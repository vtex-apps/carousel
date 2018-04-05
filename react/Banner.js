import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'render'

/**
 * Banner component. Shows an image with an description and one link;
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

/**
 * @type {Object}
 * @property {!string} image - The image of the banner
 * @property {string} description - The description of the image
 * @property {string} page - The page where the image is pointing to
 * @property {Object} targetParams - Params of the url
 * @property {string} targetParams.params
 */
Banner.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  page: PropTypes.string,
  targetParams: PropTypes.object
}

export default Banner
