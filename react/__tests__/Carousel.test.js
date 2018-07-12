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
    banner0: {
      image:
        'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-01.png',
      mobileImage:
        'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-mobile-01.png',
      page: '/',
      description: 'banner',
    },
    banner1: {
      image:
        'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-02.png',
      mobileImage:
        'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-mobile-02.png',
      page: '/',
      description: 'banner',
    },
    banner2: {
      image:
        'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-03.png',
      mobileImage:
        'https://raw.githubusercontent.com/vtex-apps/carousel/master/images/banners-mobile-03.png',
      page: '/',
      description: 'banner',
    },
  }

  beforeEach(() => {
    wrapper = render(<Carousel {...props} />)
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
  })

  xit('should match snapshot', () => {
    expect(wrapper.container).toMatchSnapshot()
  })

  xit('should render items', () => {
    expect(wrapper.container.querySelectorAll('.vtex-carousel').length).toBe(1)
    expect(
      wrapper.container.querySelectorAll('.vtex-carousel__img-container').length
    ).toBe(3) // set to be infinite
  })
})
