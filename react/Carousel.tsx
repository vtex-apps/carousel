import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'
import { Container } from 'vtex.store-components'
import { Slider, Slide, Dots, SliderContainer } from 'vtex.slider'
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

    const externalRouteSchema = {
      url: {
        isLayout: false,
        title: 'editor.carousel.bannerLink.url.title',
        type: 'string',
      },
    }

    return {
      description: 'editor.carousel.description',
      title: 'editor.carousel.title',
      type: 'object',
      properties: {
        // tslint:disable-line
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
          items: {
            // tslint:disable-line
            title: 'editor.carousel.banner.title',
            type: 'object',
            properties: {
              // tslint:disable-line
              description: {
                default: '',
                title: 'editor.carousel.banner.description.title',
                type: 'string',
              },
              externalRoute: {
                default: false,
                isLayout: false,
                title: 'editor.carousel.banner.externalRoute.title',
                type: 'boolean',
              },
              ...externalRouteSchema,
              ...internalRouteSchema,
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

  public state = {
    currentSlide: 0,
  }

  public handleChangeSlide = (i: number): void => {
    this.setState({ currentSlide: i })
  }

  public handleNextSlide = (): void => {
    this.setState(({ currentSlide }) => {
      const bannersLength: number = this.props.banners.filter(
        banner => banner && (banner.mobileImage || banner.image)
      ).length
      const nextSlide: number = (currentSlide + 1) % bannersLength

      return {
        currentSlide: nextSlide,
      }
    })
  }

  public ArrowRender: React.StatelessComponent<ArrowProps> = ({
    orientation,
    onClick,
  }: ArrowProps) => {
    const containerClasses = classnames(styles.arrow, 'pointer z-1', {
      [styles.leftArrow]: orientation === 'left',
      [styles.rightArrow]: orientation === 'right',
    })
    return (
      <div className={containerClasses} onClick={onClick}>
        <IconCaret orientation={orientation} size={32} />
      </div>
    )
  }

  public ArrowContainerRender: React.StatelessComponent<
    ArrowContainerProps
  > = ({ children }: ArrowContainerProps) => {
    const containerClasses = classnames(
      styles.arrowContainer,
      'w-100 h-100 absolute flex-ns justify-between left-0',
      'top-0 items-center dn-s'
    )

    return <Container className={containerClasses}>{children}</Container>
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

    console.log('tst', banners)

    return (
      <SliderContainer
        autoplay={autoplay}
        autoplayInterval={autoplaySpeed * 1000}
        pauseOnHover
        onNextSlide={this.handleNextSlide}
        className={styles.container}
      >
        <Slider
          classes={{
            root: styles.sliderRoot,
            sliderFrame: styles.sliderFrame,
          }}
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
            currentSlide={currentSlide}
            totalSlides={banners.length}
            onChangeSlide={this.handleChangeSlide}
            classes={{
              root: classnames(styles.containerDots, 'bottom-0 pb4'),
              notActiveDot: classnames(styles.notActiveDot, 'bg-muted-3'),
              dot: classnames(styles.dot, 'mh2 mv0 pointer br-100'),
              activeDot: classnames(styles.activeDot, 'bg-emphasis'),
            }}
          />
        )}
      </SliderContainer>
    )
  }
}
