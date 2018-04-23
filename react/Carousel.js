import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import shortid from 'shortid'
import Spinner from '@vtex/styleguide/lib/Spinner'

import Banner from './Banner'
import { Arrow, Dots } from '@vtex/slick-components'

/**
 * Carousel component. Shows a serie of banners;
 */
class Carousel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
    }
  }

  configureSettings() {
    const { autoplay, autoplaySpeed, showDots, showArrows } = this.props

    return {
      speed: 500,
      infinite: true,
      pauseOnHover: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: false,
      autoplaySpeed: autoplaySpeed * 1000,
      dots: showDots,
      arrows: showArrows,
      autoplay,
      nextArrow: <Arrow cssClass="vtex-carousel__arrow-right" />,
      prevArrow: <Arrow cssClass="vtex-carousel__arrow-left" />,
      appendDots: dots => <Dots dots={dots} cssClass="vtex-carousel__dots" />,
    }
  }

  componentDidMount() {
    this.setState({ loading: false })
  }

  render() {
    const {
      height,
      mobileHeight,
      banner1,
      banner2,
      banner3,
      banner4,
      banner5,
      banner6,
    } = this.props
    const { loading } = this.state
    const settings = this.configureSettings()

    const banners = [banner1, banner2, banner3, banner4, banner5, banner6]

    return (
      <div className="vtex-carousel">
        {!loading && (
          <Slider {...settings}>
            {banners.map(function(banner, i) {
              if (banner && banner.image) {
                return (
                  <div
                    key={shortid.generate()}
                    style={{ maxHeight: `${height}px` }}
                  >
                    <Banner
                      image={banner.image}
                      mobileImage={banner.mobileImage}
                      mobileHeight={mobileHeight}
                      page={banner.page}
                      description={banner.description}
                      targetParams={banner.targetParams}
                    />
                  </div>
                )
              }
            })}
          </Slider>
        )}

        {loading && (
          <div className="flex justify-around pa7">
            <div className="w3">
              <Spinner />
            </div>
          </div>
        )}
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
    showArrows: {
      type: 'boolean',
      title: 'Show arrows',
      default: true,
    },
    height: {
      type: 'number',
      title: 'Banner max height size (px)',
      default: 420,
      enum: [420, 440],
    },
    mobileHeight: {
      type: 'number',
      title: 'Banner max height size on mobile (px)',
      default: 339,
      enum: [339, 159],
    },
    autoplaySpeed: {
      type: 'number',
      title: 'Autoplay speed(sec):',
      default: 5,
      enum: [4, 5, 6],
    },
    banner1: {
      type: 'object',
      title: 'Banner 1',
      properties: {
        image: {
          type: 'string',
          title: 'Banner 1 image',
        },
        mobileImage: {
          type: 'string',
          title: 'Banner 1 mobile image',
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
        mobileImage: {
          type: 'string',
          title: 'Banner 2 mobile image',
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
        mobileImage: {
          type: 'string',
          title: 'Banner 3 mobile image',
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
        mobileImage: {
          type: 'string',
          title: 'Banner 4 mobile image',
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
    banner5: {
      type: 'object',
      title: 'Banner 5',
      properties: {
        image: {
          type: 'string',
          title: 'Banner 5 image',
        },
        mobileImage: {
          type: 'string',
          title: 'Banner 5 mobile image',
        },
        page: {
          type: 'string',
          title: 'Banner 5 link',
        },
        description: {
          type: 'string',
          title: 'Banner 5 description',
        },
        targetParams: {
          type: 'object',
          title: 'Banner 5 target params',
          properties: {
            params: {
              type: 'string',
              title: 'Params',
            },
          },
        },
      },
    },
    banner6: {
      type: 'object',
      title: 'Banner 6',
      properties: {
        image: {
          type: 'string',
          title: 'Banner 6 image',
        },
        mobileImage: {
          type: 'string',
          title: 'Banner 6 mobile image',
        },
        page: {
          type: 'string',
          title: 'Banner 6 link',
        },
        description: {
          type: 'string',
          title: 'Banner 6 description',
        },
        targetParams: {
          type: 'object',
          title: 'Banner 6 target params',
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

const bannerProptype = PropTypes.shape({
  image: PropTypes.string,
  mobileImage: PropTypes.string,
  page: PropTypes.string,
  description: PropTypes.string,
  targetParams: PropTypes.shape({
    params: PropTypes.string,
  }),
})

Carousel.propTypes = {
  /** Should change images automatically */
  autoplay: PropTypes.bool.isRequired,
  /** How long it should wait to change the banner in secs */
  autoplaySpeed: PropTypes.number,
  /** Max height size of the banners */
  height: PropTypes.number.isRequired,
  /** Max height size of the banners on mobile */
  mobileHeight: PropTypes.number.isRequired,
  /** Set visibility of dots */
  showDots: PropTypes.bool,
  /** Set visibility of arrows */
  showArrows: PropTypes.bool,
  /** Banners that will be displayed by the Carousel
   *    image - The image url of the banner
   *    page - The page that the banner will be linking to
   *    description - The description of the image
   */
  banner1: bannerProptype,
  banner2: bannerProptype,
  banner3: bannerProptype,
  banner4: bannerProptype,
  banner5: bannerProptype,
  banner6: bannerProptype,
}

export default Carousel
