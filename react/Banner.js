import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Banner extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    link: PropTypes.string,
  }

  static schema = {
    title: 'Banner',
    description: 'A simple banner component with an image and an link',
    type: 'object',
    properties: {
      image: {
        type: 'string',
        title: 'Image',
      },
      heading: {
        type: 'string',
        title: 'Título',
      },
      link: {
        type: 'string',
        title: 'Link',
      },
    },
  }

  render() {
    const { image, link, heading } = this.props

    return (
      <div className="flex justify-around" style={{ marginTop: '20px' }}>
        <a className="w-90" href={link ? link : '#'}>
          <img width="100%" src={image} />
        </a>
      </div>
    );
  }
}

export default Banner
