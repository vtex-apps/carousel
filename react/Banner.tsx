import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link, withRuntimeContext } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'

interface DefaultProps {
  /** Max height size of the banner */
  height: number
}

export interface Props extends DefaultProps {
  /** The image of the banner */
  image: string
  /** Link for the mobile image of the banner */
  mobileImage: string,
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
  runtime: any,
  /** Indicates if the route of the button is external or not */
  externalRouteButton: boolean,
  /** The url where the button is pointing to, in case of external route */
  urlButton: string,
  /** The page where the button is pointing to */
  pageButton: string,
  /** Params of the button url */
  paramsButton: string,
  /** Indicates if the banner is a text banner or not */
  textImageMode: boolean,
  /** The title of the button on the image text mode */
  buttonTitle: string,
  /** The title of the text on the image text mode */
  textTitle: string,
  /** The description of the button on the image text mode */
  textDescription: string,
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
    image: PropTypes.string.isRequired,
    /** The mobile image of the banner */
    mobileImage: PropTypes.string,
    /** The page where the image is pointing to */
    page: PropTypes.string,
    /** Params of the image url */
    params: PropTypes.string,
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
    textImageMode: PropTypes.bool,
    /** The title of the button on the image text mode */
    buttonTitle: PropTypes.string,
    /** The title of the text on the image text mode */
    textTitle: PropTypes.string,
    /** The description of the button on the image text mode */
    textDescription: PropTypes.string,
  }

  public static defaultProps: DefaultProps = {
    height: 420,
  }

  public displayButton() {
    const {    
      externalRouteButton,  
      urlButton,
      pageButton,
      paramsButton,
      buttonTitle,
    } = this.props
    return (
      <div>
        {!externalRouteButton ? (
          <Link page={pageButton} params={this.getParams(paramsButton)}>
            <Button primary>
              {buttonTitle}
            </Button>
          </Link>) : (
          <a href={urlButton} target="_blank">
            <Button primary>
              {buttonTitle}
            </Button>
          </a>
        )}
      </div>
    )
  }

  public render() {
    const {
      height,
      image,
      mobileImage,
      description,
      page,
      url,
      params,
      externalRoute,
      textImageMode,
      textTitle,
      textDescription,
      runtime
    } = this.props

    const isMobile = runtime.hints.mobile

    let containerInlineClasses = {}
    if (textImageMode) {
      containerInlineClasses = {
        minHeight: height,
        objectFit: "cover",
      }
    } else {
      containerInlineClasses = {
        maxHeight: height,
      }
    }

    const content = (
      <div  className="vtex-carousel__img-container flex">
        <div className="vtex-carousel__img-regular">
          <img style={containerInlineClasses} className="w-100" src={isMobile && mobileImage ? mobileImage : image} alt={description} />
        </div>
        {textImageMode && (
          <div className="w-50-ns absolute pt8-l pb4-l pt5-m pb3-m pv6-s pl6">
            <div>
              <h1>{textTitle}</h1>
            </div>
            <div className="pb6 pt5-ns lh-title black">
              {textDescription}
            </div>
            <div>
              {this.displayButton()}
            </div>
          </div>
        )}
      </div>
    )

    if (!externalRoute) {
      return page ? (
        <Link page={page} params={this.getParams(params)}>
          {content}
        </Link>
      ) : content
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
