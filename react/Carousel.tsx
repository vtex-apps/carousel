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

  public static uiSchema = {
    banners: {
      items: {
        externalRoute: {
          'ui:options': {
            inline: true,
          },
          'ui:widget': 'radio',
        },
        image: {
          'ui:widget': 'image-uploader',
        },
        mobileImage: {
          'ui:widget': 'image-uploader',
        },
      },
    },
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
        /** Indicates if the route of the button is external or not */
        externalRouteButton: PropTypes.bool,
        /** The url where the button is pointing to, in case of external route */
        urlButton: PropTypes.string,
        /** The page where the button is pointing to */
        pageButton: PropTypes.string,
        /** Params of the button url */
        paramsButton: PropTypes.string,
        /** Indicates if the banner is a text banner or not */
        textImageMode: PropTypes.string,
        /** The title of the button on the image text mode */
        buttonTitle: PropTypes.string,
        /** The title of the text on the image text mode */
        textTitle: PropTypes.string,
        /** The description of the text on the image text mode */
        textDescription: PropTypes.bool,
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

    const internalRouteSchema = {
      page: {
        enum: GLOBAL_PAGES,
        isLayout: false,
        title: 'editor.carousel.bannerLink.page.title',
        type: 'string',
      },
      params: {
        description: 'editor.carousel.bannerLink.params.description',
        isLayout: false,
        title: 'editor.carousel.bannerLink.params.title',
        type: 'string',
      },
    }

    const buttonRouteSchema = {
      externalRouteButton: {
        title: 'editor.carousel.banner.textMode.button.externalRouteButton',
        type: 'boolean',
        default: false,
        isLayout: false,
      },
      pageButton: {
        enum: GLOBAL_PAGES,
        isLayout: false,
        title: 'editor.carousel.banner.textMode.button.pageButton',
        type: 'string',
      },
      paramsButton: {
        description: 'editor.carousel.bannerLink.params.description',
        isLayout: false,
        title: 'editor.carousel.banner.textMode.button.paramsButton',
        type: 'string',
      },
      urlButton: {
        isLayout: false,
        title: 'editor.carousel.banner.textMode.button.urlButton',
        type: 'string',
      },
    }

    const externalRouteSchema = {
      url: {
        isLayout: false,
        title: 'editor.carousel.bannerLink.url.title',
        type: 'string',
      },
    }

    const textModeSchema = {
      textTitle: {
        title: 'editor.carousel.banner.textMode.textTitle',
        type: 'string',
        isLayout: false,
      },
      textDescription: {
        title: 'editor.carousel.banner.textMode.textDescription',
        type: 'string',
        isLayout: false,
        widget: {
          'ui:widget': 'textarea',
        },
      },
      buttonTitle: {
        title: 'editor.carousel.banner.textMode.button.title',
        type: 'string',
        isLayout: false,
      },
    }

    return {
      description: 'editor.carousel.description',
      title: 'editor.carousel.title',
      type: 'object',
      properties: { // tslint:disable-line
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
            widget: {
              'ui:options': {
                inline: true,
              },
              'ui:widget': 'radio',
            },
          }
          : {},
        banners: {
          minItems: 1,
          title: 'editor.carousel.banners.title',
          type: 'array',
          items: { // tslint:disable-line
            title: 'editor.carousel.banner.title',
            type: 'object',
            properties: { // tslint:disable-line
              image: {
                default: '',
                title: 'editor.carousel.banner.image.title',
                type: 'string',
                widget: {
                  'ui:widget': 'image-uploader',
                },
              },
              mobileImage: {
                default: '',
                title: 'editor.carousel.banner.mobileImage.title',
                type: 'string',
                widget: {
                  'ui:widget': 'image-uploader',
                },
              },
              description: {
                default: '',
                title: 'editor.carousel.banner.description.title',
                type: 'string',
              },
              externalRoute: {
                title: 'editor.carousel.banner.externalRoute.title',
                type: 'boolean',
                isLayout: false,
              },
              ...externalRouteSchema,
              ...internalRouteSchema,
              textImageMode: {
                title: 'editor.carousel.banner.textMode.title',
                type: 'boolean',
                default: false,
              },
              ...textModeSchema,
              ...buttonRouteSchema,
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
  }

  public render() {
    const { height, banners } = this.props
    const settings = this.configureSettings()

    if (!banners.length) {
      return null
    }

    return (
      <div className="vtex-carousel">
        <Slider sliderSettings={settings} leftArrowClasses="ml3 ml5-m ml8-l ml9-xl" rightArrowClasses="mr3 mr5-m mr8-l mr9-xl">
          {banners.filter(banner => banner && (banner.mobileImage || banner.image)).map(
            (banner, i) => (
              <div key={i} style={{ maxHeight: height }}>
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
