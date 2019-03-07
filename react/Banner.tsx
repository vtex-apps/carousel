import PropTypes from 'prop-types'
import React from 'react'
import { Link, useRuntime } from 'vtex.render-runtime'
import styles from './styles.css'
import classnames from 'classnames'

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
  } = props

  const { mobile: isMobile } = useRuntime().hints

  const content = (
    <div className={classnames(styles.containerImg, 'w-100')}>
      <div
        className={classnames(
          styles.imgRegular,
          'flex items-center justify-center'
        )}
        style={{ maxHeight: height }}
      >
        <img
          className={classnames(styles.img, 'w-100 h-100')}
          src={isMobile && mobileImage ? mobileImage : image}
          alt={description}
        />
      </div>
    </div>
  )

  if (!externalRoute) {
    return page ? (
      <Link
        className={classnames(styles.bannerLink, 'w-100')}
        page={page}
        params={getParams(params)}
      >
        {content}
      </Link>
    ) : (
      content
    )
  }

  return (
    <a
      className={classnames(styles.bannerLink, 'w-100')}
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
}

Banner.defaultProps = {
  height: 420,
}

export default Banner
