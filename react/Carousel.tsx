import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { defineMessages } from 'react-intl'
import { Dots, Slide, Slider, SliderContainer } from 'vtex.slider'
import { Container } from 'vtex.store-components'
import { IconCaret } from 'vtex.store-icons'
import { getItemsPerPage } from './utils/pageUtils'

import Banner, { Props as BannerProps } from './Banner'
import styles from './styles.css'

const GLOBAL_PAGES = global.__RUNTIME__ && Object.keys(global.__RUNTIME__.pages)

interface Props {
  /** Should change images automatically */
  autoplay?: boolean
  /** How long it should wait to change the banner in secs */
  autoplaySpeed: number
  /** Banners that will be displayed by the Carousel */
  banners: BannerProps[]
  /** Max height size of the banners */
  height?: number
  /** Set visibility of arrows */
  showArrows?: boolean
  /** Set visibility of dots */
  showDots?: boolean,
  /** Items per page */
  itemsPerPage: string,
}

interface State {
  currentSlide: number
}

interface ArrowProps {
  orientation: string
  onClick: (event: React.MouseEvent<HTMLElement>) => void
}

interface ArrowContainerProps {
  children: React.ReactNode
}

const messages = defineMessages({
  editorCarouselAutoplaySpeedTitle: {
    defaultMessage: 'Autoplay speed (sec)',
    id: 'admin/editor.carousel.autoplaySpeed.title',
  },
  editorCarouselAutoplayTitle: {
    defaultMessage: 'Autoplay',
    id: 'admin/editor.carousel.autoplay.title',
  },
  editorCarouselBannerDescriptionTitle: {
    defaultMessage: 'Banner description',
    id: 'admin/editor.carousel.banner.description.title',
  },
  editorCarouselBannerExternalRouteTitle: {
    defaultMessage: 'External route',
    id: 'admin/editor.carousel.banner.externalRoute.title',
  },
  editorCarouselBannerImageTitle: {
    defaultMessage: 'Banner image',
    id: 'admin/editor.carousel.banner.image.title',
  },
  editorCarouselBannerLinkPageTitle: {
    defaultMessage: 'Banner target page (internal)',
    id: 'admin/editor.carousel.bannerLink.page.title',
  },
  editorCarouselBannerLinkParamsDescription: {
    defaultMessage: 'Comma separated params, e.g.: key=value,department=Accessories',
    id: 'admin/editor.carousel.bannerLink.params.description',
  },
  editorCarouselBannerLinkParamsTitle: {
    defaultMessage: 'Params (internal)',
    id: 'admin/editor.carousel.bannerLink.params.title',
  },
  editorCarouselBannerLinkTitle: {
    defaultMessage: 'Banner link (should start with https or http)',
    id: 'admin/editor.carousel.bannerLink.title',
  },
  editorCarouselBannerLinkUrlTitle: {
    defaultMessage: 'URL (external)',
    id: 'admin/editor.carousel.bannerLink.url.title',
  },
  editorCarouselBannerMobileImageTitle: {
    defaultMessage: 'Banner mobile image',
    id: 'admin/editor.carousel.banner.mobileImage.title',
  },
  editorCarouselBannerTitle: {
    defaultMessage: 'Banner',
    id: 'admin/editor.carousel.banner.title',
  },
  editorCarouselBannersTitle: {
    defaultMessage: 'Banners',
    id: 'admin/editor.carousel.banners.title',
  },
  editorCarouselDescription: {
    defaultMessage: 'A simple carousel component that shows a serie of banners',
    id: 'admin/editor.carousel.description',
  },
  editorCarouselHeightTitle: {
    defaultMessage: 'Banner max height size (px)',
    id: 'admin/editor.carousel.height.title',
  },
  editorCarouselMobileHeightTitle: {
    defaultMessage: 'Banner max height size on mobile (px)',
    id: 'admin/editor.carousel.mobileHeight.title',
  },
  editorCarouselNumberOfBannersTitle: {
    defaultMessage: 'Number of banners',
    id: 'admin/editor.carousel.numberOfBanners.title',
  },
  editorCarouselShowArrowsTitle: {
    defaultMessage: 'Show arrows',
    id: 'admin/editor.carousel.showArrows.title',
  },
  editorCarouselShowDotsTitle: {
    defaultMessage: 'Show dots',
    id: 'admin/editor.carousel.showDots.title',
  },
  editorCarouselTitle: {
    defaultMessage: 'Carousel',
    id: 'admin/editor.carousel.title', 
  },
  editorCaroselItemsPerPageTitle: {
    defaultMessage: 'Items per page',
    id: 'admin/editor.carousel.itemsPerPage.title', 
  },
})

/**
 * Carousel component. Shows a serie of banners.
 */
export default class Carousel extends Component<Props, State> {
  public static defaultProps: Props = {
    autoplay: true,
    autoplaySpeed: 5,
    banners: [],
    height: 420,
    showArrows: true,
    showDots: true,
    itemsPerPage: '300:1'
  }

  public static uiSchema = {
    banners: {
      items: {
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
        params: PropTypes.string,
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
    /** Items per page */
    itemsPerPage: PropTypes.string
  }

  public static getSchema = (props: Props) => {
    const autoplay = props.autoplay || false

    const internalRouteSchema = {
      page: {
        enum: GLOBAL_PAGES,
        isLayout: false,
        title: messages.editorCarouselBannerLinkPageTitle,
        type: 'string',
      },
      params: {
        description: messages.editorCarouselBannerLinkParamsDescription,
        isLayout: false,
        title: messages.editorCarouselBannerLinkParamsTitle,
        type: 'string',
      },
    }

    const externalRouteSchema = {
      url: {
        isLayout: false,
        title: messages.editorCarouselBannerLinkUrlTitle,
        type: 'string',
      },
    }

    return {
      description: messages.editorCarouselDescription,
      properties: {
        // tslint:disable-line
        autoplay: {
          default: true,
          isLayout: true,
          title: messages.editorCarouselAutoplayTitle,
          type: 'boolean',
        },
        autoplaySpeed: autoplay
          ? {
              default: 5,
              enum: [4, 5, 6],
              isLayout: true,
              title: messages.editorCarouselAutoplaySpeedTitle,
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
          items: {
            // tslint:disable-line
            properties: {
              // tslint:disable-line
              description: {
                default: '',
                title: messages.editorCarouselBannerDescriptionTitle,
                type: 'string',
              },
              externalRoute: {
                default: false,
                isLayout: false,
                title: messages.editorCarouselBannerExternalRouteTitle,
                type: 'boolean',
              },
              ...externalRouteSchema,
              ...internalRouteSchema,
              image: {
                default: '',
                title: messages.editorCarouselBannerImageTitle,
                type: 'string',
                widget: {
                  'ui:widget': 'image-uploader',
                },
              },
              mobileImage: {
                default: '',
                title: messages.editorCarouselBannerMobileImageTitle,
                type: 'string',
                widget: {
                  'ui:widget': 'image-uploader',
                },
              },
            },
            title: messages.editorCarouselBannerTitle,
            type: 'object',
          },
          minItems: 1,
          title: messages.editorCarouselBannersTitle,
          type: 'array',
        },
        height: {
          default: 420,
          enum: [420, 440],
          isLayout: true,
          title: messages.editorCarouselHeightTitle,
          type: 'number',
        },
        showArrows: {
          default: true,
          isLayout: true,
          title: messages.editorCarouselShowArrowsTitle,
          type: 'boolean',
        },
        showDots: {
          default: true,
          isLayout: true,
          title: messages.editorCarouselShowDotsTitle,
          type: 'boolean',
        },
        itemsPerPage: {
          default: '',
          title: messages.editorCaroselItemsPerPageTitle,
          type: 'string',
        },
      },
      title: messages.editorCarouselTitle,
      type: 'object',
    }
  }

  public state = {
    currentSlide: 0,
  }


  public handleChangeSlide = (i: number): void => {
    this.setState({ currentSlide: i })
  }

  public handleNextSlide = (): void => {
    const perPage = 1
    this.setState(({ currentSlide }) => {
      const bannersLength: number = this.props.banners.filter(
        banner => banner && (banner.mobileImage || banner.image)
      ).length
      const nextSlide: number =
        ((currentSlide + 1 - perPage) % bannersLength) + perPage

      return {
        currentSlide: nextSlide,
      }
    })
  }

  public ArrowRender: React.StatelessComponent<ArrowProps> = ({
    orientation,
    onClick,
  }: ArrowProps) => {
    const containerClasses = classnames(styles.arrow, 'pointer z-1 flex', {
      [styles.arrowLeft]: orientation === 'left',
      [styles.arrowRight]: orientation === 'right',
    })
    return (
      <div className={containerClasses} onClick={onClick}>
        <IconCaret orientation={orientation} thin size={20} />
      </div>
    )
  }

  public ArrowContainerRender: React.StatelessComponent<
    ArrowContainerProps
  > = ({ children }: ArrowContainerProps) => {
    const wrapperClasses = classnames(
      styles.arrowsContainerWrapper,
      'w-100 h-100 absolute left-0 top-0 flex justify-center'
    )
    const containerClasses = classnames(
      styles.arrowsContainer,
      'w-100 h-100 mw9 flex-ns justify-between items-center dn-s'
    )

    return (
      <div className={wrapperClasses}>
        <Container className={containerClasses}>
          {children}
        </Container>
      </div>
    )
  }


  public render() {
    const { height, showArrows, autoplay, autoplaySpeed, showDots, itemsPerPage } = this.props
    const { currentSlide } = this.state

    const perPage = getItemsPerPage(itemsPerPage)

    if (!this.props.banners.length) {
      return null
    }
debugger;
    const banners: BannerProps[] = this.props.banners.filter(
      banner => banner && (banner.mobileImage || banner.image)
    )

    return (
      <SliderContainer
        autoplay={autoplay}
        autoplayInterval={autoplaySpeed * 1000}
        pauseOnHover
        onNextSlide={this.handleNextSlide}
        className={styles.container}
      >
        <Slider
          loop
          classes={{
            root: styles.sliderRoot,
            sliderFrame: styles.sliderFrame,
          }}
          perPage={perPage}
          arrowRender={showArrows && this.ArrowRender}
          currentSlide={currentSlide}
          onChangeSlide={this.handleChangeSlide}
          arrowsContainerComponent={showArrows && this.ArrowContainerRender}
          duration={500}
        >
          {banners.map((banner, i) => (
            <Slide
              className={styles.slide}
              key={i}
              style={{ maxHeight: height }}
              sliderTransitionDuration={500}
            >
              <Banner height={height} {...banner} />
            </Slide>
          ))}
        </Slider>
        {showDots && (
          <Dots
            loop
            perPage={perPage}
            currentSlide={currentSlide}
            totalSlides={banners.length}
            onChangeSlide={this.handleChangeSlide}
            classes={{
              activeDot: classnames(styles.activeDot, 'bg-emphasis'),
              dot: classnames(styles.dot, 'mh2 mv0 pointer br-100'),
              notActiveDot: classnames(styles.notActiveDot, 'bg-muted-3'),
              root: classnames(styles.containerDots, 'bottom-0 pb4'),
            }}
          />
        )}
      </SliderContainer>
    )
  }
}
