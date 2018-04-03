import React, { Component } from "react"
import Slider from "react-slick"
import { NoSSR } from "render"

class Carousel extends Component {

  configureSettings() {
    return {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }

  render() {
    const settings = this.configureSettings()

    const fallback = (
      <div>
        <img src="https://boticario.vteximg.com.br/arquivos/ids/183602-1000-1000/25137-makeb-batom.jpg?v=635847405268300000" />
      </div>
    )

    return (
      <NoSSR onSSR={fallback}>
        <Slider {...settings}>
          <div>
            <img src="https://boticario.vteximg.com.br/arquivos/ids/183602-1000-1000/25137-makeb-batom.jpg?v=635847405268300000" />
          </div>
          <div>
            <img src="https://boticario.vteximg.com.br/arquivos/ids/183602-1000-1000/25137-makeb-batom.jpg?v=635847405268300000" />
          </div>
          <div>
            <img src="https://boticario.vteximg.com.br/arquivos/ids/183602-1000-1000/25137-makeb-batom.jpg?v=635847405268300000" />
          </div>
          <div>
            <img src="https://boticario.vteximg.com.br/arquivos/ids/183602-1000-1000/25137-makeb-batom.jpg?v=635847405268300000" />
          </div>
        </Slider>
      </NoSSR>
    );
  }
}

export default Carousel;
