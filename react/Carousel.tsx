import './global.css'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Slider } from 'vtex.store-components'

import Banner, { Props as BannerProps } from './Banner'

const GLOBAL_PAGES = global.__RUNTIME__ && Object.keys(global.__RUNTIME__.pages)

interface Props {
  /** Should change images automatically */
  autoplay?: boolean
  /** How long it should wait to change the banner in secs */
  autoplaySpeed: number
  /** Banners that will be displayed by the Carousel */
  banners: BannerProps[]
  /** Max height size of the banners */
  height: number
  /** Set visibility of arrows */
  showArrows: boolean
  /** Set visibility of dots */
  showDots: boolean
}

/**
 * Carousel component. Shows a serie of banners.
 */
export default class Carousel extends Component<Props> {
  public static defaultProps: Props = {
    autoplay: true,
    autoplaySpeed: 5,
    banners: [],
    height: 420,
    showArrows: true,
    showDots: true,
  }

  

  public static propTypes = {
    /** Should change images automatically */
    autoplay: PropTypes.bool.isRequired,
    /** How long it should wait to change the banner in secs */
    autoplaySpeed: PropTypes.number.isRequired,
    /** Banners that will be displayed by the Carousel */
    banners: PropTypes.arrayOf(
      PropTypes.shape({
        /** The description of the image */
        description: PropTypes.string,
        /** The image url of the banner */
        image: PropTypes.string,
        /** The page where the image is pointing to */
        page: PropTypes.string,
        /** Params of the url */
        params: PropTypes.object,
        /** Indicates if the route is external or internal */
        typeOfRoute: PropTypes.string,
        /** The url where the image is pointing to, in case of external route */
        url: PropTypes.string,
      })
    ),
    /** Max height size of the banners */
    height: PropTypes.number.isRequired,
    /** Set visibility of arrows */
    showArrows: PropTypes.bool,
    /** Set visibility of dots */
    showDots: PropTypes.bool,
  }

  public static getSchema = (props: Props) => {
    const autoplay = props.autoplay || false

    return {// tslint:disable:object-literal-sort-keys
      description: 'editor.carousel.description',
      title: 'editor.carousel.title',
      type: 'object',
      properties: { 
        autoplay: {
          default: true,
          isLayout: true,
          title: 'editor.carousel.autoplay.title',
          type: 'boolean',
        },
        autoplaySpeed: autoplay
          ? {
              default: 5,
              enum: [4, 5, 6],
              isLayout: true,
              title: 'editor.carousel.autoplaySpeed.title',
              type: 'number',
            }
          : {},
        banners: {
          minItems: 1,
          title: 'editor.carousel.banners.title',
          type: 'array',
          items: {
            title: 'editor.carousel.banner.title',
            type: 'object',
            properties: {
              banner: {
                title: 'editor.carousel.banners.banner.title',
                type: 'image',
                elements: {
                  description: {
                    default: 'oi oi oi',
                    title: 'editor.carousel.banners.banner.description.title',
                  },
                  hasLink: {
                    default: 'false',
                    title: 'editor.carousel.banners.banner.hasLink.title'
                  },
                  externalRoute: {
                    title: 'editor.carousel.banners.banner.externalRoute.title'
                  },
                  url: {
                    title: 'editor.carousel.banners.banner.url.title'
                  },
                  page: {
                    title: 'editor.carousel.banners.banner.page.title'
                  },
                  params: {
                    description: 'editor.carousel.banners.banner.params.description',
                    title: 'editor.carousel.banners.banner.params.title'
                  },
                  desktop: {
                    default: 'https://cdn-images-1.medium.com/max/2000/1*kt9otqHk14BZIMNruiG0BA.png',
                    maxWidth: 500,
                    title: 'editor.carousel.banners.banner.desktop.title',
                  },
                  mobile: {
                    title: 'editor.carousel.banners.banner.mobile.title'
                  },
                },
              },
            },
          },
        },
        height: {
          default: 420,
          enum: [420, 440],
          isLayout: true,
          title: 'editor.carousel.height.title',
          type: 'number',
        },
        showArrows: {
          default: true,
          isLayout: true,
          title: 'editor.carousel.showArrows.title',
          type: 'boolean',
        },
        showDots: {
          default: true,
          isLayout: true,
          title: 'editor.carousel.showDots.title',
          type: 'boolean',
        },
      },
    }
  }// tslint:enable:object-literal-sort-keys

  public render() {
    const { height, banners } = this.props
    const settings = this.configureSettings()

    if (!banners.length) {
      return null
    }

    return (
      <div className="vtex-carousel force-full-width">
        <Slider sliderSettings={settings} leftArrowClasses={'ml3 ml5-m ml8-l ml9-xl'}  rightArrowClasses={'mr3 mr5-m mr8-l mr9-xl'}>
          {banners.map(
            (banner, i) =>
              banner &&
              (banner.desktop|| banner.mobile) && (
                <div key={i} style={{ maxHeight: `${height}px` }}>
                  <Banner height={height} {...banner} />
                </div>
              )
          )}
        </Slider>
      </div>
    )
  }

  private configureSettings() {
    const { autoplay, autoplaySpeed, showDots, showArrows } = this.props

    return {
      adaptiveHeight: false,
      arrows: showArrows,
      autoplay,
      autoplaySpeed: autoplaySpeed * 1000,
      dots: showDots,
      infinite: true,
      pauseOnHover: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      speed: 500,
    }
  }
}
