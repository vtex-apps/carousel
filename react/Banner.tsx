import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import styles from './styles.css'

const CSS_HANDLES = ['imgRegular', 'img', 'bannerLink'] as const

interface DefaultProps {
  /** Max height size of the banner */
  height: number
}

export interface Props extends DefaultProps {
  /** The image of the banner */
  image: string
  /** Link for the mobile image of the banner */
  mobileImage: string
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
  /** The url where the image is pointing to, in case of internal route (optional) */
  customInternalURL: string
  /** Runtime injected deps */
  runtime: any
}

function getParams(params: string) {
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

/**
 * Banner component. Shows an image with a description and one link.
 */
const Banner = (props: Props) => {
  const {
    height,
    image,
    mobileImage,
    description,
    page,
    url,
    params,
    externalRoute,
    customInternalURL,
  } = props

  const { isMobile } = useDevice()
  const handles = useCssHandles(CSS_HANDLES)

  const content = (
    <div className={classnames(styles.containerImg, 'w-100')}>
      <div
        className={classnames(
          handles.imgRegular,
          'flex items-center justify-center'
        )}
        style={{ maxHeight: height }}
      >
        <img
          className={classnames(handles.img, 'w-100 h-100')}
          src={isMobile && mobileImage ? mobileImage : image}
          alt={description}
        />
      </div>
    </div>
  )

  if (!externalRoute) {
    return page || customInternalURL ? (
      <Link
        className={classnames(handles.bannerLink, 'w-100')}
        page={customInternalURL ? undefined : page}
        params={getParams(params)}
        to={customInternalURL || undefined}
      >
        {content}
      </Link>
    ) : (
      content
    )
  }

  return (
    <a
      className={classnames(handles.bannerLink, 'w-100')}
      href={url}
      target="_blank"
    >
      {content}
    </a>
  )
}

Banner.propTypes = {
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
  /** Params of the url */
  params: PropTypes.string,
  /** The url where the image is pointing to, in case of external route */
  url: PropTypes.string,
  /** The url where the image is pointing to, in case of internal route */
  customInternalURL: PropTypes.string,
}

Banner.defaultProps = {
  height: 420,
  description: '',
}

export default Banner
