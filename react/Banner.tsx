import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link, withRuntimeContext } from 'render'

interface DefaultProps {
  /** Max height size of the banner */
  height: number
}

interface Image {
  desktopImage: string,
  mobileImage: string
}

export interface Props extends DefaultProps {
  /** The image of the banner */
  image: Image
  /** Link for the mobile image of the banner */
  image2: Image,
  /** The description of the image */
  description: string
  /** The url where the image is pointing to, in case of external route */
  url: string
  /** The page where the image is pointing to */
  page: string
  /** Params of the url */
  params: string
  /** Indicates if the route is external or not */
  externalRoute: boolean
}

/**
 * Banner component. Shows an image with a description and one link.
 */
class Banner extends Component<Props> {
  public static propTypes = {
    /** The description of the image */
    description: PropTypes.string.isRequired,
    /** Indicates if the route is external or not */
    externalRoute: PropTypes.bool,
    /** Max height size of the banner */
    height: PropTypes.number.isRequired,
    /** The image of the banner */
    image: PropTypes.shape({
      desktopImage: PropTypes.string.isRequired,
      mobileImage: PropTypes.string
    }),
    /** The mobile image of the banner */
    image2: PropTypes.shape({
      desktopImage: PropTypes.string.isRequired,
      mobileImage: PropTypes.string
    }),
    /** The page where the image is pointing to */
    page: PropTypes.string,
    /** Params of the url */
    params: PropTypes.string,
    /** The url where the image is pointing to, in case of external route */
    url: PropTypes.string,
    /** The url for the mobile image */
  }

  public static defaultProps: DefaultProps = {
    height: 420,
  }

  public render() {
    const {
      height,
      image,
      image2,
      description,
      page,
      url,
      params,
      externalRoute,
      runtime
    } = this.props

    const isMobile = runtime.hints.mobile

    const content = (
      <div className="vtex-carousel__img-container">
        <div
          className="vtex-carousel__img-regular"
          style={{ maxHeight: `${height}px` }}
        >
          <img className="w-100" src={isMobile && image.mobileImage ? image.mobileImage: image.desktopImage} alt={description} />
        </div>
      </div>
    )

    return !externalRoute ? (
      <div>
        <Link page={page} params={this.getParams(params)}>
          {content}
        </Link>
      </div>
    ) : (
      <div>
        <a href={url} target="_blank">
          {content}
        </a>
      </div>
    )
  }

  private getParams = (params: string) => {
    const json: { [s: string]: string } = {}
    if (params) {
      const array = params.split(',')
      array.forEach(item => {
        const pair = item.split('=')
        json[pair[0]] = pair[1]
      })
      return json
    }
  }
}

export default withRuntimeContext(Banner)
