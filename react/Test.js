import React, { Component } from "react";
import PropTypes from "prop-types";
import Carousel from "./Carousel";
import Banner from "./Banner";

class Test extends Component {
  render() {
    const link =
      "https://boticario.vteximg.com.br/arquivos/ids/183602-1000-1000/25137-makeb-batom.jpg?v=635847405268300000";

    const banners = [];

    for (let i = 0; i < 5; i++) {
      banners.push(<Banner image={link} />);
    }

    return <Carousel>{banners}</Carousel>;
  }
}

export default Test;