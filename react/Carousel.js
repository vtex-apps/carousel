import React, { Component, Children } from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { NoSSR } from 'render'

import Banner from './Banner'

function NextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, color: 'red', fontSize: '310%' }}
      onClick={onClick}
    />
  )
}

function PrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, color: 'green', fontSize: '50px' }}
      onClick={onClick}
    />
  )
}

/**
 * Carousel component. Shows a serie of banners;
 */
class Carousel extends Component {
  configureSettings() {
    const { autoplay, autoplaySpeed, showDots, arrowColor } = this.props

    return {
      speed: 500,
      slidesToShow: 1,
      autoplaySpeed: autoplaySpeed ? autoplaySpeed * 1000 : 4000,
      slidesToScroll: 1,
      dots: showDots ? showDots : false,
      arrows: true,
      autoplay: autoplay ? autoplay : false,
      infinite: true,
      pauseOnHover: true,
      adaptiveHeight: false,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    }
  }

  render() {
    const { banner1, banner2, banner3, banner4 } = this.props
    const settings = this.configureSettings()

    const banners = [banner1, banner2, banner3, banner4]

    return (
      <div className="pa7">
        <Slider {...settings}>
          {banners.map(function(banner, i) {
            if (banner && banner.image) {
              return (
                <div key={i}>
                  <Banner
                    image={banner.image}
                    page={banner.page}
                    description={banner.description}
                    targetParams={banner.targetParams}
                  />
                </div>
              )
            }
          })}
        </Slider>
      </div>
    )
  }
}

Carousel.schema = {
  title: 'Carousel',
  description:
    'A simple carousel component that shows a serie of banners with images and links',
  type: 'object',
  properties: {
    autoplay: {
      type: 'boolean',
      title: 'Autoplay',
      default: true,
    },
    showDots: {
      type: 'boolean',
      title: 'Show dots',
      default: true,
    },
    arrowColor: {
      type: 'string',
      title: 'Arrows colors (hex):',
      default: '000000',
    },
    showArrows: {
      type: 'boolean',
      title: 'Show arrows',
      default: true,
    },
    autoplaySpeed: {
      type: 'number',
      title: 'Autoplay speed(sec):',
      default: 5,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    banner1: {
      type: 'object',
      title: 'Banner 1',
      properties: {
        image: {
          type: 'string',
          title: 'Banner 1 image',
        },
        page: {
          type: 'string',
          title: 'Banner 1 link',
        },
        description: {
          type: 'string',
          title: 'Banner 1 description',
        },
        targetParams: {
          type: 'object',
          title: 'Banner 1 target params',
          properties: {
            params: {
              type: 'string',
              title: 'Params',
            },
          },
        },
      },
    },
    banner2: {
      type: 'object',
      title: 'Banner 2',
      properties: {
        image: {
          type: 'string',
          title: 'Banner 2 image',
        },
        page: {
          type: 'string',
          title: 'Banner 2 link',
        },
        description: {
          type: 'string',
          title: 'Banner 2 description',
        },
        targetParams: {
          type: 'object',
          title: 'Banner 2 target params',
          properties: {
            params: {
              type: 'string',
              title: 'Params',
            },
          },
        },
      },
    },
    banner3: {
      type: 'object',
      title: 'Banner 3',
      properties: {
        image: {
          type: 'string',
          title: 'Banner 3 image',
        },
        page: {
          type: 'string',
          title: 'Banner 3 link',
        },
        description: {
          type: 'string',
          title: 'Banner 3 description',
        },
        targetParams: {
          type: 'object',
          title: 'Banner 3 target params',
          properties: {
            params: {
              type: 'string',
              title: 'Params',
            },
          },
        },
      },
    },
    banner4: {
      type: 'object',
      title: 'Banner 4',
      properties: {
        image: {
          type: 'string',
          title: 'Banner 4 image',
        },
        page: {
          type: 'string',
          title: 'Banner 4 link',
        },
        description: {
          type: 'string',
          title: 'Banner 4 description',
        },
        targetParams: {
          type: 'object',
          title: 'Banner 4 target params',
          properties: {
            params: {
              type: 'string',
              title: 'Params',
            },
          },
        },
      },
    },
  },
}

/**
 * @type {Object}
 * @property {!boolean} autoplay - Should change images automatically
 * @property {!number}  autoplaySpeed - How long it should wait to change the banner in secs
 * @property {?boolean} showDots - Should show the dots or not
 * @property {?boolean} showArrows - Should show the arrows or not
 * @property {?string}  arrowColor - The color of the arrows background
 * @property {Object}   banner[n] - Banners that will be displayed by the Carousel
 * @property {!string}   banner[n].image - The image url of the banner
 * @property {?string}   banner[n].page - The page that the banner will be liking to
 * @property {!string}   banner[n].description - The description of the image
 */
Carousel.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  autoplaySpeed: PropTypes.number,
  showDots: PropTypes.bool,
  showArrows: PropTypes.bool,
  arrowColor: PropTypes.string,
  banner1: PropTypes.shape({
    image: PropTypes.string.isRequired,
    page: PropTypes.string,
    description: PropTypes.string,
  }),
  banner2: PropTypes.shape({
    image: PropTypes.string.isRequired,
    page: PropTypes.string,
    description: PropTypes.string,
  }),
  banner3: PropTypes.shape({
    image: PropTypes.string.isRequired,
    page: PropTypes.string,
    description: PropTypes.string,
  }),
  banner4: PropTypes.shape({
    image: PropTypes.string.isRequired,
    page: PropTypes.string,
    description: PropTypes.string,
  }),
}

export default Carousel
