import React, { Component } from "react";
import PropTypes from "prop-types";

class Banner extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    link: PropTypes.string
  };

  static schema = {
    title: "Banner",
    description: "A simple banner component with an image and an link",
    type: "object",
    properties: {
      image: {
        type: "string",
        title: "Image"
      },
      link: {
        type: "string",
        title: "Link"
      }
    }
  };

  render() {
    const { image, link, targetParams } = this.props;

    return (
      <div>
        <a href={link ? link : "#"}>
          <img src={image} />
        </a>
      </div>
    );
  }
}

export default Banner;
