# VTEX Carousel

## Description
The VTEX Carousel is an app that shows a collection of banners and it is used by the Dreamstore product.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

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
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To use this app, you need to add it in your `dependencies` in the `manifest.json` file.

```json
  dependencies: {
    "vtex.carousel": "2.x"
  }
```

Then, add the `carousel` block into our app theme, as we do in our [Dreamstore app](https://github.com/vtex-apps/dreamstore/blob/master/store/blocks.json). 

### Blocks API
:construction: :construction: :construction:

This app has an interface that describes what rules must be implemented by a block when you want to use the carousel app.

```json
{
  "carousel": {
    "component": "Carousel"
  }
}
```

#### Configuration 
Through the Storefront, you can change the behavior and interface of the carousel. However, you also can make in your theme app, as Dreamstore does.

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `autoplay`                  | `Boolean`      | Enable automatic banner transition                                 |
| `autoplaySpeed`             | `Number`       | Set the automatic banner transition interval                       |
| `showDots`                  | `Boolean`      | Shows the carousel dots                                            |
| `showArrows`                | `Boolean`      | Shows the carousel arrows                                          |
| `height`                    | `Number`       | Set banners height                                                 |
| `banners`                   | `Array(Banner)`| Array of banners the will be shown in the carousel                 |

Banner:

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `image`                     | `String`      | Link for the image of the banner                                   |
| `mobileImage`               | `String`      | Link for the mobile image of the banner                            |
| `description`               | `String`      | The image's description                                            |
| `url`                       | `String`      | The URL where the image is pointing to, in case of external route  |
| `page`                      | `String`      | The page where the image is pointing to                            |
| `params`                    | `String`      | Parameters of the URL                                              |
| `externalRoute`             | `Boolean`     | Indicates if the route is external or not                          |

### Styles API
:construction: :construction: :construction:

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/carousel/issues). Also feel free to [open issues](https://github.com/vtex-apps/carousel/issues/new) or contribute with pull requests.

## Tests
To run the test suit, type the following in the terminal, inside the folder `react`

```sh
$ npm t     # this
```