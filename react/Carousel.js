import React, { Component } from 'react'
import PropTypes from 'prop-types'

import keyBy from 'lodash/keyBy'
import map from 'lodash/map'
import range from 'lodash/range'
import property from 'lodash/property'

import { Slider } from 'vtex.store-components'
import Banner from './Banner'
import { NoSSR } from 'render'

import './global.css'

const GLOBAL_PAGES = global.__RUNTIME__ && Object.keys(global.__RUNTIME__.pages)

const DEFAULT_NUM_BANNERS = 3

const bannerProperties = {
  image: {
    type: 'string',
    title: 'editor.carousel.banner.image.title',
    default: '',
    isLayout: false,
    widget: {
      'ui:widget': 'image-uploader',
    },
  },
  mobileImage: {
    type: 'string',
    title: 'editor.carousel.banner.mobileImage.title',
    default: '',
    isLayout: false,
  },
  description: {
    type: 'string',
    title: 'editor.carousel.banner.description.title',
    default: '',
    isLayout: false,
  },
  typeOfRoute: {
    type: 'string',
    title: 'editor.carousel.banner.typeOfRoute.title',
    default: 'internal',
    enum: ['internal', 'external'],
    enumNames: [
      'editor.carousel.banner.typeOfRoute.internal',
      'editor.carousel.banner.typeOfRoute.external',
    ],
    widget: {
      'ui:widget': 'radio',
      'ui:options': {
        'inline': true,
      },
    },
    isLayout: false,
  },
}

const bannerProptype = PropTypes.shape({
  image: PropTypes.string,
  mobileImage: PropTypes.string,
  description: PropTypes.string,
  typeOfRoute: PropTypes.string,
  page: PropTypes.string,
  params: PropTypes.string,
})

const defaultBannerProps = index => ({
  image: `https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-0${index + 1}.png`,
  mobileImage: `https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-mobile-0${index + 1}.png`,
  page: 'store/home',
  description: 'banner',
})

/**
 * Carousel component. Shows a serie of banners.
 */
export default class Carousel extends Component {
  static defaultProps = {
    autoplay: true,
    showArrows: true,
    showDots: true,
    height: 420,
    mobileHeight: 339,
    autoplaySpeed: 5,
    banners: [],
    banner0: defaultBannerProps(0),
    banner1: defaultBannerProps(1),
    banner2: defaultBannerProps(2),
    numberOfBanners: DEFAULT_NUM_BANNERS,
  }

  static uiSchema = {
    banners: {
      'ui-widget': 'accordion-test',
      items: {
        image: {
          'ui:widget': 'image-uploader',
        },
        typeOfRoute: {
          'ui:widget': 'radio',
          'ui:options': {
            'inline': true,
          },
        }
      }
    }
  }

  static propTypes = {
    /** Should change images automatically */
    autoplay: PropTypes.bool.isRequired,
    /** How long it should wait to change the banner in secs */
    autoplaySpeed: PropTypes.number.isRequired,
    /** Max height size of the banners */
    height: PropTypes.number.isRequired,
    /** Max height size of the banners on mobile */
    mobileHeight: PropTypes.number.isRequired,
    /** Set visibility of dots */
    showDots: PropTypes.bool,
    /** Set visibility of arrows */
    showArrows: PropTypes.bool,
    /** Banner's quantity */
    numberOfBanners: PropTypes.number,
    /** Banners that will be displayed by the Carousel
     *    image - The image url of the banner
     *    page - The page that the banner will be linking to
     *    description - The description of the image
     */
    banners: PropTypes.array,

    banner0: bannerProptype,
    banner1: bannerProptype,
    banner2: bannerProptype,
    banner3: bannerProptype,
    banner4: bannerProptype,
    banner5: bannerProptype,
    banner6: bannerProptype,
    banner7: bannerProptype,
    banner8: bannerProptype,
    banner9: bannerProptype,
  }

  static getSchema = props => {
    const numberOfBanners = props.numberOfBanners || 3
    const autoplay = props.autoplay || false

    /** Defines an internal route or external link for the Banner */
    const bannerLink = typeOfRoute => {
      if (typeOfRoute === 'internal') {
        return {
          page: {
            type: 'string',
            enum: GLOBAL_PAGES,
            title: 'editor.carousel.bannerLink.page.title',
            isLayout: false,
          },
          params: {
            type: 'string',
            description: 'editor.carousel.bannerLink.params.description',
            title: 'editor.carousel.bannerLink.params.title',
            isLayout: false,
          },
        }
      }

      return {
        page: {
          type: 'string',
          title: 'editor.carousel.bannerLink.title',
        },
      }
    }

    // const getBannersSchema = repetition =>
    //   keyBy(
    //     map(range(0, repetition), index => {
    //       const typeOfRoute = props[`banner${index}`] && props[`banner${index}`].typeOfRoute
    //       return {
    //         title: { id: 'editor.carousel.banner.title', values: { id: index + 1 } },
    //         key: `banner${index}`,
    //         type: 'object',
    //         properties: {
    //           ...bannerProperties,
    //           ...bannerLink(typeOfRoute || 'internal'),
    //         },
    //       }
    //     }),
    //     property('key')
    //   )

    const getBannersSchema = repetition => ({
      banners: {
        type: 'array',
        title: 'editor.carousel.height.title',
        items: {
          type: 'object',
          title: 'Teste',
          properties: {
            ...bannerProperties,
          },
        }
      }
    })

    const generatedSchema =
      numberOfBanners && getBannersSchema(numberOfBanners)

    console.log({generatedSchema})

    // if (props.numberOfBanners === undefined && generatedSchema.banner0) {
    //   generatedSchema.banner0.properties.image.default = defaultBannerProps(0).image
    // }

    return {
      title: 'editor.carousel.title',
      description: 'editor.carousel.description',
      type: 'object',
      properties: {
        showDots: {
          type: 'boolean',
          title: 'editor.carousel.showDots.title',
          default: true,
          isLayout: true,
        },
        showArrows: {
          type: 'boolean',
          title: 'editor.carousel.showArrows.title',
          default: true,
          isLayout: true,
        },
        height: {
          type: 'number',
          title: 'editor.carousel.height.title',
          default: 420,
          enum: [420, 440],
          isLayout: true,
        },
        mobileHeight: {
          type: 'number',
          title: 'editor.carousel.mobileHeight.title',
          default: 339,
          enum: [339, 159],
          isLayout: true,
        },
        autoplay: {
          type: 'boolean',
          title: 'editor.carousel.autoplay.title',
          default: true,
          isLayout: true,
        },
        autoplaySpeed: autoplay ? {
          type: 'number',
          title: 'editor.carousel.autoplaySpeed.title',
          default: 5,
          enum: [4, 5, 6],
          widget: {
            'ui:widget': 'radio',
            'ui:options': {
              'inline': true,
            },
          },
          isLayout: true,
        } : {},
        numberOfBanners: {
          type: 'number',
          title: 'editor.carousel.numberOfBanners.title',
          default: 3,
          minimum: 1,
          maximum: 10,
          widget: {
            'ui:widget': 'range',
          },
          isLayout: false,
        },
        ...generatedSchema,
      },
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
    }
  }

  render() {
    const {
      height,
      mobileHeight,
      numberOfBanners,
    } = this.props
    const settings = this.configureSettings()

    const banners = []
    for (let i = 0; i < numberOfBanners; i++) {
      banners.push(this.props[`banner${i}`])
    }

    const banner = this.props.banner0

    const fallback = (
      <div style={{ maxHeight: `${height}px` }} className="overflow-y-hidden">
        <Banner
          height={height}
          image={banner.image}
          mobileImage={banner.mobileImage}
          description={banner.description}
          mobileHeight={mobileHeight}
          page={banner.page}
          params={banner.params}
          typeOfRoute={banner.typeOfRoute}
        />
      </div>
    )
    return (
      <div className="vtex-carousel">
        <NoSSR onSSR={fallback}>
          <Slider sliderSettings={settings} >
            {banners.map((banner, i) => banner && banner.image && (
              <div key={i} style={{ maxHeight: `${height}px` }}>
                <Banner
                  height={height}
                  image={banner.image}
                  mobileImage={banner.mobileImage}
                  description={banner.description}
                  mobileHeight={mobileHeight}
                  page={banner.page}
                  params={banner.params}
                  typeOfRoute={banner.typeOfRoute}
                />
              </div>
            ))}
          </Slider>
        </NoSSR>
      </div>
    )
  }
}
