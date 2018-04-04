import React, { Component, Children } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

class Carousel extends Component {
  configureSettings() {
    return {
      speed: 500,
      slidesToShow: 1,
      autoplaySpeed: 5000,
      slidesToScroll: 1,
      dots: true,
      arrows: true,
      autoplay: false,
      infinite: true,
      pauseOnHover: true,
      adaptiveHeight: false,
    };
  }

  render() {
    const { children } = this.props;
    const settings = this.configureSettings();

    return (
      <Slider {...settings}>
        {Children.map(children, (child, index) => {
          return <div>{child}</div>;
        })}
      </Slider>
    );
  }
}

export default Carousel;
