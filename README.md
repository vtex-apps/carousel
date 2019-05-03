# VTEX Carousel

## Description

The VTEX Carousel app is a store component that shows a collection of banners, and this app is used by store theme.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Release schedule

| Release |       Status        | Initial Release | Maintenance LTS Start | End-of-life | Store Compatibility |
| :-----: | :-----------------: | :-------------: | :-------------------: | :---------: | :-----------------: |
|  [2.x]  | **Current Release** |   2018-11-28    |                       |             |         2.x         |
|  [1.x]  | **Maintenance LTS** |   2018-05-02    |      2018-11-28       | March 2019  |         1.x         |

See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Table of Contents

- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS namespaces](#css-namespaces)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

We add the carousel as a block in our [Store](https://github.com/vtex-apps/store/blob/master/store/interfaces.json).

To configure or customize this app, you need to import it in your dependencies in `manifest.json`.

```json
  dependencies: {
    "vtex.carousel": "2.x"
  }
```

Then, add `carousel` block into your app theme as we do in our [Store theme app](https://github.com/vtex-apps/store-theme/blob/master/store/blocks.json).

Now, you can change the behavior of the carousel block that is in the store header. See an example of how to configure:

```json
"carousel#home": {
    "props": {
      "autoplay": true,
      "autoplaySpeed": 4,
      "banners": [],
      "height": 440,
      "showArrows": true,
      "showDots": true
    }
  }
```

### Blocks API

When implementing this app as a block, various inner blocks may be available. The following interface lists the available blocks within carousel and describes if they are required or optional.

```json
"carousel": {
  "component": "Carousel"
}
```

For now this block does not have any required or optional blocks.

#### Configuration

Through the Storefront, you can change the carousel's behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name       | Type            | Description                                        | Default value |
| --------------- | --------------- | -------------------------------------------------- | ------------- |
| `autoplay`      | `Boolean`       | Enable automatic banner transition                 | true          |
| `autoplaySpeed` | `Number`        | Set the automatic banner transition interval       | 5             |
| `showDots`      | `Boolean`       | Shows the carousel dots                            | true          |
| `showArrows`    | `Boolean`       | Shows the carousel arrows                          | true          |
| `height`        | `Number`        | Set banners height                                 | 420           |
| `banners`       | `Array(Banner)` | Array of banners the will be shown in the carousel | []            |

Banner:

| Prop name       | Type      | Description                                                       | Default value |
| --------------- | --------- | ----------------------------------------------------------------- | ------------- |
| `image`         | `String`  | Link for the image of the banner                                  | N/A           |
| `mobileImage`   | `String`  | Link for the mobile image of the banner                           | N/A           |
| `description`   | `String`  | The image's description                                           | N/A           |
| `url`           | `String`  | The URL where the image is pointing to, in case of external route | N/A           |
| `page`          | `String`  | The page where the image is pointing to                           | N/A           |
| `params`        | `String`  | Parameters of the URL                                             | N/A           |
| `externalRoute` | `Boolean` | Indicates if the route is external or not                         | false         |

### Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
  "builders": {
    "styles": "1.x"
  }
```

2. Create a file called `vtex.carousel.css` inside the `styles/css` folder. Add your custom styles:

```css
.container {
  margin-top: 10px;
}
```

#### CSS namespaces

Below, we describe the namespaces that are defined in the `Carousel`.

| Class name | Description | Component Source |
| --- | --- | --- |
| `container` | The main container of the `Carousel` | [Carousel](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Carousel.tsx) |
| `sliderRoot` | The main container of the `Slider` | [Carousel](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Carousel.tsx) |
| `sliderFrame` | The element that contains the Slides | [Carousel](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Carousel.tsx) |
| `slide` | The container of the `Banner` component | [Carousel](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Carousel.tsx) |
| `arrow` | The container of the arrow svg (this namespace is applied to both arrows) | [Carousel](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Carousel.tsx) |
| `arrowLeft` | The container of the left arrow svg | [Carousel](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Carousel.tsx) |
| `arrowRight` | The container of the right arrow svg | [Carousel](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Carousel.tsx) |
| `arrowsContainerWrapper` | The wrapper of the container of the arrows | [Carousel](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Carousel.tsx) |
| `arrowsContainer` | The container of the arrows | [Carousel](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Carousel.tsx) |
| `containerDots` | The main container of the dots | [Carousel](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Carousel.tsx) |
| `notActiveDot` | The element of the dots that are not actives | [Carousel](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Carousel.tsx) |
| `dot` | The element of the dot | [Carousel](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Carousel.tsx) |
| `activeDot` | The current active dot | [Carousel](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Carousel.tsx) |
| `containerImg` | The container of the image | [Banner](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Banner.tsx) |
| `imgRegular` | The wrapper of the `img` element used to center the image inside the container | [Banner](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Banner.tsx) |
| `img` | The `img` element | [Banner](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Banner.tsx) |
| `bannerLink` | The `a` element that wraps the whole `Banner` component | [Banner](https://github.com/vtex-apps/carousel/blob/feature/new-slider/react/Banner.tsx) |

## Troubleshooting

You can check if others are passing through similar issues [here](https://github.com/vtex-apps/carousel/issues). Also feel free to [open issues](https://github.com/vtex-apps/carousel/issues/new) or contribute with pull requests.

## Contributing

Check it out [how to contribute](https://github.com/vtex-apps/awesome-io#contributing) with this project. 

## Tests

To execute our tests go to `react/` folder and run `npm test`

### Travis CI

[![Build Status](https://travis-ci.org/vtex-apps/carousel.svg?branch=master)](https://travis-ci.org/vtex-apps/carousel)
[![Coverage Status](https://coveralls.io/repos/github/vtex-apps/carousel/badge.svg?branch=master)](https://coveralls.io/github/vtex-apps/carousel?branch=master)
