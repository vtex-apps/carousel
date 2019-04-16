import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { defineMessages } from 'react-intl'
import { Dots, Slide, Slider, SliderContainer } from 'vtex.slider'
import { Container } from 'vtex.store-components'
import { IconCaret } from 'vtex.store-icons'

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
  showDots?: boolean
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

const editorMessages = defineMessages({
  CarouselTitle: {
    id: 'editor.carousel.title',
    defaultMessage: ''
  },
  CarouselDescription: {
    id: 'editor.carousel.description',
    defaultMessage: ''
  },
  CarouselShowDotsTitle: {
    id: 'editor.carousel.showDots.title',
    defaultMessage: ''
  },
  CarouselShowArrowsTitle: {
    id: 'editor.carousel.showArrows.title',
    defaultMessage: ''
  },
  CarouselHeightTitle: {
    id: 'editor.carousel.height.title',
    defaultMessage: ''
  },
  CarouselAutoplayTitle: {
    id: 'editor.carousel.autoplay.title',
    defaultMessage: ''
  },
  CarouselAutoplaySpeedTitle: {
    id: 'editor.carousel.autoplaySpeed.title',
    defaultMessage: ''
  },
  CarouselBannerLinkPageTitle: {
    id: 'editor.carousel.bannerLink.page.title',
    defaultMessage: ''
  },
  CarouselBannerLinkParamsTitle: {
    id: 'editor.carousel.bannerLink.params.title',
    defaultMessage: ''
  },
  CarouselBannerLinkParamsDescription: {
    id: 'editor.carousel.bannerLink.params.description',
    defaultMessage: ''
  },
  CarouselBannerLinkUrlTitle: {
    id: 'editor.carousel.bannerLink.url.title',
    defaultMessage: ''
  },
  CarouselBannersTitle: {
    id: 'editor.carousel.banners.title',
    defaultMessage: ''
  },
  CarouselBannerTitle: {
    id: 'editor.carousel.banner.title',
    defaultMessage: ''
  },
  CarouselBannerDescriptionTitle: {
    id: 'editor.carousel.banner.description.title',
    defaultMessage: ''
  },
  CarouselBannerExternalRouteTitle: {
    id: 'editor.carousel.banner.externalRoute.title',
    defaultMessage: ''
  },
  CarouselBannerImageTitle: {
    id: 'editor.carousel.banner.image.title',
    defaultMessage: ''
  },
  CarouselBannerMobileImageTitle: {
    id: 'editor.carousel.banner.mobileImage.title',
    defaultMessage: ''
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
  }

  public static getSchema = (props: Props) => {
    const autoplay = props.autoplay || false

    const internalRouteSchema = {
      page: {
        enum: GLOBAL_PAGES,
        isLayout: false,
        title: editorMessages.CarouselBannerLinkPageTitle.id,
        type: 'string',
      },
      params: {
        description: editorMessages.CarouselBannerLinkParamsDescription.id,
        isLayout: false,
        title: editorMessages.CarouselBannerLinkParamsTitle.id,
        type: 'string',
      },
    }

    const externalRouteSchema = {
      url: {
        isLayout: false,
        title: editorMessages.CarouselBannerLinkUrlTitle.id,
        type: 'string',
      },
    }

    return {
      description: editorMessages.CarouselDescription.id,
      properties: {
        // tslint:disable-line
        autoplay: {
          default: true,
          isLayout: true,
          title: editorMessages.CarouselAutoplayTitle.id,
          type: 'boolean',
        },
        autoplaySpeed: autoplay
          ? {
              default: 5,
              enum: [4, 5, 6],
              isLayout: true,
              title: editorMessages.CarouselAutoplaySpeedTitle.id,
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
                title: editorMessages.CarouselBannerDescriptionTitle.id,
                type: 'string',
              },
              externalRoute: {
                default: false,
                isLayout: false,
                title: editorMessages.CarouselBannerExternalRouteTitle.id,
                type: 'boolean',
              },
              ...externalRouteSchema,
              ...internalRouteSchema,
              image: {
                default: '',
                title: editorMessages.CarouselBannerImageTitle.id,
                type: 'string',
                widget: {
                  'ui:widget': 'image-uploader',
                },
              },
              mobileImage: {
                default: '',
                title: editorMessages.CarouselBannerMobileImageTitle.id,
                type: 'string',
                widget: {
                  'ui:widget': 'image-uploader',
                },
              },
            },
            title: editorMessages.CarouselBannerTitle.id,
            type: 'object',
          },
          minItems: 1,
          title: editorMessages.CarouselBannersTitle.id,
          type: 'array',
        },
        height: {
          default: 420,
          enum: [420, 440],
          isLayout: true,
          title: editorMessages.CarouselHeightTitle.id,
          type: 'number',
        },
        showArrows: {
          default: true,
          isLayout: true,
          title: editorMessages.CarouselShowArrowsTitle.id,
          type: 'boolean',
        },
        showDots: {
          default: true,
          isLayout: true,
          title: editorMessages.CarouselShowDotsTitle.id,
          type: 'boolean',
        },
      },
      title: editorMessages.CarouselTitle.id,
      type: 'object',
    }
  }

  public state = {
    currentSlide: 0,
  }

  public perPage = 1

  public handleChangeSlide = (i: number): void => {
    this.setState({ currentSlide: i })
  }

  public handleNextSlide = (): void => {
    this.setState(({ currentSlide }) => {
      const bannersLength: number = this.props.banners.filter(
        banner => banner && (banner.mobileImage || banner.image)
      ).length
      const nextSlide: number =
        ((currentSlide + 1 - this.perPage) % bannersLength) + this.perPage

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
    const { height, showArrows, autoplay, autoplaySpeed, showDots } = this.props
    const { currentSlide } = this.state
    if (!this.props.banners.length) {
      return null
    }

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
          perPage={this.perPage}
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
            perPage={this.perPage}
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
