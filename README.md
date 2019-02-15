# VTEX Carousel

## Description

The VTEX Carousel app is a store component that shows a collection of banners, and this app is used by store theme.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Release schedule
| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Dreamstore Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [1.x]    | **Maintenance LTS** |  2018-05-02     | 2018-11-28            | March 2019  | 1.x
| [2.x]    | **Current Release** |  2018-11-28     |                       |             | 2.x

See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.


## Continuous Integrations 

### Travis CI 
[![Build Status](https://travis-ci.org/vtex-apps/carousel.svg?branch=master)](https://travis-ci.org/vtex-apps/carousel)

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS namespaces](#css-namespaces)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

We add the carousel as a block in our [Store](https://github.com/vtex-apps/store/blob/2462b6506cb2af86ba2e0931e08dca4783e66cfb/store/interfaces.json).

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
  {
  "carousel": {
    "component": "Carousel"
  }
}
```
The carousel has no required or allowed block. So, any carousel block implementation do not need any block inside of carousel.

#### Configuration 

Through the Storefront, you can change the carousel's behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name          | Type       | Description                                                                 | Default value |
| ------------------ | ---------- | --------------------------------------------------------------------------- | ---|
| `autoplay`                  | `Boolean`      | Enable automatic banner transition                                 | true |
| `autoplaySpeed`             | `Number`       | Set the automatic banner transition interval                       | 5 |
| `showDots`                  | `Boolean`      | Shows the carousel dots                                            | true |
| `showArrows`                | `Boolean`      | Shows the carousel arrows                                          | true |
| `height`                    | `Number`       | Set banners height                                                 | 420 |
| `banners`                   | `Array(Banner)`| Array of banners the will be shown in the carousel                 | [] |

Banner:

| Prop name          | Type       | Description                                                                 | Default value |
| ------------------ | ---------- | --------------------------------------------------------------------------- | --- |
| `image`                     | `String`      | Link for the image of the banner                                   | `undefined` |
| `mobileImage`               | `String`      | Link for the mobile image of the banner                            | `undefined` |
| `description`               | `String`      | The image's description                                            | `undefined` |
| `url`                       | `String`      | The URL where the image is pointing to, in case of external route  | `undefined` |
| `page`                      | `String`      | The page where the image is pointing to                            | `undefined` |
| `params`                    | `String`      | Parameters of the URL                                              | `undefined` |
| `externalRoute`             | `Boolean`     | Indicates if the route is external or not                          | false |
| `height`                    | `Number`       | Set banners height                                                 | 420 |

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
Below, we describe the namespaces that are defined in the minicart.

:construction: :construction: :construction:

## Troubleshooting

You can check if others are passing through similar issues [here](https://github.com/vtex-apps/carousel/issues). Also feel free to [open issues](https://github.com/vtex-apps/carousel/issues/new) or contribute with pull requests.

## Tests
To execute our tests go to `react/` folder and run `npm test` 