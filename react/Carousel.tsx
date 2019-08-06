import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Dots, Slide, Slider, SliderContainer } from 'vtex.slider'
import { Container } from 'vtex.store-components'
import { IconCaret } from 'vtex.store-icons'

import Banner, { Props as BannerProps } from './Banner'
import styles from './styles.css'

const GLOBAL_PAGES = global.__RUNTIME__ && [
  'Custom',
  ...Object.keys(global.__RUNTIME__.pages),
]

interface Props {
  /** Should change images automatically */
  autoplay?: boolean
  /** How long it should wait to change the banner in secs */
  autoplaySpeed: number | string
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

  public static propTypes = {
    /** Should change images automatically */
    autoplay: PropTypes.bool.isRequired,
    /** How long it should wait to change the banner in secs */
    autoplaySpeed: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
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
        /** The url where the image is pointing to, in case of internal route (optional) */
        customInternalURL: PropTypes.string,
      })
    ),
    /** Max height size of the banners */
    height: PropTypes.number.isRequired,
    /** Set visibility of arrows */
    showArrows: PropTypes.bool,
    /** Set visibility of dots */
    showDots: PropTypes.bool,
  }

  public static getSchema = () => {
    const internalRouteSchema = {
      page: {
        enum: GLOBAL_PAGES,
        isLayout: false,
        title: 'admin/editor.carousel.bannerLink.page.title',
        type: 'string',
      },
      params: {
        description: 'admin/editor.carousel.bannerLink.params.description',
        isLayout: false,
        title: 'admin/editor.carousel.bannerLink.params.title',
        type: 'string',
      },
      customInternalURL: {
        description:
          'admin/editor.carousel.bannerLink.custominternalurl.description',
        isLayout: false,
        title: 'admin/editor.carousel.bannerLink.custominternalurl.title',
        type: 'string',
      },
    }

    const externalRouteSchema = {
      url: {
        isLayout: false,
        title: 'admin/editor.carousel.bannerLink.url.title',
        type: 'string',
      },
    }

    // tslint:disable:object-literal-sort-keys
    return {
      description: 'admin/editor.carousel.description',
      dependencies: {
        autoplay: {
          oneOf: [
            {
              properties: {
                autoplay: {
                  enum: [true],
                },
                autoplaySpeed: {
                  enum: ['2', '3', '4', '5', '6', '7', '8'],
                  isLayout: false,
                  title: 'admin/editor.carousel.autoplaySpeed.title',
                  type: 'string',
                },
              },
            },
          ],
        },
      },
      properties: {
        banners: {
          items: {
            properties: {
              image: {
                default: '',
                title: 'admin/editor.carousel.banner.image.title',
                type: 'string',
                widget: {
                  'ui:widget': 'image-uploader',
                },
              },
              mobileImage: {
                default: '',
                title: 'admin/editor.carousel.banner.mobileImage.title',
                type: 'string',
                widget: {
                  'ui:widget': 'image-uploader',
                },
              },
              description: {
                default: '',
                title: 'admin/editor.carousel.banner.description.title',
                type: 'string',
              },
              externalRoute: {
                default: false,
                isLayout: false,
                title: 'admin/editor.carousel.banner.externalRoute.title',
                type: 'boolean',
              },
            },
            dependencies: {
              externalRoute: {
                oneOf: [
                  {
                    properties: {
                      externalRoute: {
                        enum: [false],
                      },
                      ...internalRouteSchema,
                    },
                  },
                  {
                    properties: {
                      externalRoute: {
                        enum: [true],
                      },
                      ...externalRouteSchema,
                    },
                  },
                ],
              },
            },
            title: 'admin/editor.carousel.banner.title',
            type: 'object',
          },
          minItems: 1,
          title: 'admin/editor.carousel.banners.title',
          type: 'array',
        },
        height: {
          default: 420,
          enum: [420, 440],
          isLayout: true,
          title: 'admin/editor.carousel.height.title',
          type: 'number',
        },
        showArrows: {
          default: true,
          isLayout: true,
          title: 'admin/editor.carousel.showArrows.title',
          type: 'boolean',
        },
        showDots: {
          default: true,
          isLayout: true,
          title: 'admin/editor.carousel.showDots.title',
          type: 'boolean',
        },
        autoplay: {
          default: true,
          isLayout: false,
          title: 'admin/editor.carousel.autoplay.title',
          type: 'boolean',
        },
      },
      title: 'admin/editor.carousel.title',
      type: 'object',
    }
    // tslint:enable
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
        <Container className={containerClasses}>{children}</Container>
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

    const autoplayInterval = autoplaySpeed
      ? typeof autoplaySpeed === 'string'
        ? parseFloat(autoplaySpeed)
        : autoplaySpeed
      : 0

    return (
      <SliderContainer
        autoplay={autoplay && autoplayInterval > 0}
        autoplayInterval={autoplayInterval * 1000}
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
