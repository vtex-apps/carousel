/* eslint-env jest */
import React from 'react'
import { render } from 'react-testing-library'

import Carousel from '../Carousel'

describe('Carousel component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = render(<Carousel />)
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
  })

  it('should match snapshot', () => {
    expect(wrapper.container).toMatchSnapshot()
  })

  it('should render items', () => {
    expect(wrapper.container.querySelectorAll('.vtex-carousel').length).toBe(1)
    expect(
      wrapper.container.querySelectorAll('.vtex-carousel__arrow-right').length
    ).toBe(1)
    expect(
      wrapper.container.querySelectorAll('.vtex-carousel__arrow-left').length
    ).toBe(1)
    expect(
      wrapper.container.querySelectorAll('.vtex-carousel__dots').length
    ).toBe(1)
  })
})
