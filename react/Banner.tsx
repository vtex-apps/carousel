import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link, withRuntimeContext } from 'vtex.render-runtime'

interface DefaultProps {
  /** Max height size of the banner */
  height: number
}

interface Image {
  desktop: string
  mobile: string
}

interface Brand {
  name: string
  id: string
}

interface Category {
  name: string
  id: string
}

interface Collection {
  name: string
  id: string
}

interface Department {
  name: string
  id: string
}

export interface Props extends DefaultProps {
  /** The image of the banner */
  image: Image
  brand: Brand
  collection: Collection
  category: Category
  department: Department
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
  /** Runtime injected deps */
  runtime: any
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
      desktop: PropTypes.string.isRequired,
      mobile: PropTypes.string
    }).isRequired,
    /** The page where the image is pointing to */
    page: PropTypes.string,
    /** Params of the url */
    params: PropTypes.string,
    /** The url where the image is pointing to, in case of external route */
    url: PropTypes.string
  }

  public static defaultProps: DefaultProps = {
    height: 420
  }

  public render() {
    const {
      height,
      image,
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
          style={{ maxHeight: height }}
        >
          <img
            className="w-100"
            src={isMobile && image.mobile ? image.mobile : image.desktop}
            alt={description}
          />
        </div>
      </div>
    )

    if (!externalRoute) {
      return page ? (
        <Link page={page} params={this.getParams(params)}>
          {content}
        </Link>
      ) : (
        content
      )
    }

    return (
      <a href={url} target="_blank">
        {content}
      </a>
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
    return null
  }
}

export default withRuntimeContext(Banner)
