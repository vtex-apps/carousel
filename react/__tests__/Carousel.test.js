/* eslint-env jest */
import React from 'react'
import { render } from 'react-testing-library'

import Carousel from '../Carousel'

describe('Carousel component', () => {
  let wrapper

  const props = {
    height: 440,
    mobileHeight: 339,
    showArrows: true,
    showDots: true,
    autoplay: true,
    autoplaySpeed: 4,
    numberOfBanners: 3,
    runtime: {
      hints: {}
    },
    banners: [
      {
        image:
          'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-01.png',
        externalRoute: true,
        description: 'banner',
        url:
          'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-01.png',
      },
      {
        image:
          'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-02.png',
        externalRoute: true,
        description: 'david',
        url:
          'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-01.png',
      },
      {
        image:
          'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-03.png',
        externalRoute: true,
        description: 'banner',
        url:
          'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-01.png',
      },
    ],
  }

  beforeEach(() => {
    wrapper = render(<Carousel {...props} />)
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
  })

  it('should match snapshot', () => {
    expect(wrapper.container).toMatchSnapshot()
  })

  it('should render items', () => {
    expect(wrapper.container.querySelectorAll('.container').length).toBe(1)
    expect(
      wrapper.container.querySelectorAll('.imgContainer').length
    ).toBe(3) // set to be infinite
  })
})
