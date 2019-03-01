/* eslint-env jest */
import React from 'react'
import { render } from 'react-testing-library'

import Carousel from '../Carousel'

describe('Carousel component', () => {
  const renderComponent = () => {
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

    return render(<Carousel {...props} />)
  }

  it('should be rendered', () => {
    expect(renderComponent()).toBeDefined()
  })

  it('should match snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot()
  })

  it('should render items', () => {
    expect(
      renderComponent().container.querySelectorAll('.slider-container-mock')
        .length
    ).toBe(1)
    expect(
      renderComponent().container.querySelectorAll('.slide-mock').length
    ).toBe(3) // set to be infinite
  })
})
