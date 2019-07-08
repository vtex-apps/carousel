import classnames from 'classnames'
import React, { Component } from 'react'
import { Dots, Slide, Slider, SliderContainer } from 'vtex.slider'
import { Container, InfoCard } from 'vtex.store-components'
import { IconCaret } from 'vtex.store-icons'

import Banner, { Props as BannerProps } from './Banner'
import styles from './styles.css'

interface Props {
  /** Should change images automatically */
  autoplay?: boolean
  /** How long it should wait to change the banner in secs */
  autoplaySpeed: number
  /** Banners that will be displayed by the Carousel */
  banners: SlideItem[]
  /** Max height size of the banners */
  height?: number
  /** Set visibility of arrows */
  showArrows?: boolean
  /** Set visibility of dots */
  showDots?: boolean
}

type SlideItem = BannerProps | InfoCardProps

interface InfoCardProps {
  contentType: 'image-text'
  infoCardFields: {
    imageUrl: string
    mobileImageUrl: string
  }
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

function filterSlideItemWithImage(slideItem: SlideItem) {
  if (slideItem && slideItem.contentType === 'image-text') {
    return slideItem.infoCardFields && slideItem.infoCardFields.imageUrl
  }
  return slideItem && (slideItem.mobileImage || slideItem.image)
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

  public static getSchema = (props: Props) => {
    const autoplay = props.autoplay || false

    return {
      title: 'admin/editor.carousel.title',
      description: 'admin/editor.carousel.description',
      type: 'object',
      properties: {
        autoplay: {
          default: true,
          isLayout: true,
          title: 'admin/editor.carousel.autoplay.title',
          type: 'boolean',
        },
        autoplaySpeed: autoplay
          ? {
              default: 5,
              enum: [4, 5, 6],
              isLayout: true,
              title: 'admin/editor.carousel.autoplaySpeed.title',
              type: 'number',
              widget: {
                'ui:options': {
                  inline: true,
                },
                'ui:widget': 'radio',
              },
            }
          : {},
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
      },
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
        filterSlideItemWithImage
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

    const banners: SlideItem[] = this.props.banners.filter(
      filterSlideItemWithImage
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
              {banner.contentType !== 'image-text' ? (
                <Banner height={height} {...banner} />
              ) : (
                <InfoCard {...banner.infoCardFields} />
              )}
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
