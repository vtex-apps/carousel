/* eslint-env jest */
import React from 'react'
import { range, map, forEach, pluck } from 'ramda'
import { render } from '@vtex/test-tools/react'

import Carousel from '../Carousel'

describe('Carousel component', () => {
  const renderComponent = customProps => {
    const props = {
      height: 440,
      mobileHeight: 339,
      showArrows: true,
      showDots: true,
      autoplay: true,
      autoplaySpeed: 4,
      numberOfBanners: 3,
      banners: [
        {
          image:
            'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-01.png',
          externalRoute: true,
          description: 'banner1',
          url: 'banner1-url',
        },
        {
          image:
            'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-02.png',
          externalRoute: true,
          description: 'banner2',
          url: 'banner2-url',
        },
        {
          image:
            'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-03.png',
          externalRoute: true,
          description: 'banner3',
          url: 'banner3-url',
        },
      ],
      ...customProps,
    }

    return render(<Carousel {...props} />)
  }

  it('should be rendered', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toBeDefined()
  })

  it('should match snapshot', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render items', () => {
    const banner = id => ({
      image: `image${id}`,
      externalRoute: true,
      description: `description${id}`,
      url: `url${id}`,
    })
    const banners = map(banner, range(0, 10))

    const { container, getByAltText } = renderComponent({
      numberOfBanners: banners.length,
      banners,
    })

    const itensContainer = container.querySelectorAll('.slider-container-mock')
    expect(itensContainer).toHaveLength(1)

    const items = container.querySelectorAll('.slide-mock')
    expect(items).toHaveLength(banners.length)

    // The URLs rendered should be the ones in the banners
    const urls = [...container.querySelectorAll('a')].map(a =>
      a.getAttribute('href')
    )
    expect(urls).toEqual(pluck('url', banners))

    // The Images URLs rendered should be the ones in the banners
    const images = [...container.querySelectorAll('img')].map(img =>
      img.getAttribute('src')
    )
    expect(images).toEqual(pluck('image', banners))

    // The alts rendered should be the ones in the banners
    const descriptions = pluck('description', banners)
    forEach(description => {
      getByAltText(description)
    }, descriptions)
  })

  it('should resize images that are served by vtex file manager', () => {
    const image = '/vtex.file-manager-graphql/url.jpg'
    const banner = {
      description: 'description',
      image,
    }

    const { container } = renderComponent({
      numberOfBanners: 1,
      banners: [banner],
    })

    const img = container.querySelector('img')
    const src = img.getAttribute('src')
    expect(src).toEqual(image)
    const srcSet = img.getAttribute('srcSet')
    expect(srcSet).toEqual(
      '/vtex.file-manager-graphql/url.jpg?width=600&aspect=true 600w,/vtex.file-manager-graphql/url.jpg?width=800&aspect=true 800w,/vtex.file-manager-graphql/url.jpg?width=1200&aspect=true 1200w,/vtex.file-manager-graphql/url.jpg?width=1400&aspect=true 1400w,/vtex.file-manager-graphql/url.jpg?width=1800&aspect=true 1800w'
    )
  })
})
