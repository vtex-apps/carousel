# Carousel

Carousel is a canonical component that any VTEX store can install.

## Usage

Add "vtex.carousel" as your app dependency.

## Schema Properties

```javascript
     autoplay: {
      type: 'boolean',
      title: 'Autoplay',
      default: true,
    },
    showDots: {
      type: 'boolean',
      title: 'Show dots',
      default: true,
    },
    iconsColor: {
      type: 'string',
      title: 'Icons color',
      default: '#ffff00',
    },
    showArrows: {
      type: 'boolean',
      title: 'Show arrows',
      default: true,
    },
    autoplaySpeed: {
      type: 'number',
      title: 'Autoplay speed(sec):',
      default: 5,
      enum: [4, 5, 6],
    },
    banner: {
      type: 'object',
      title: 'Banner ',
      properties: {
        image: {
          type: 'string',
          title: 'Banner image',
        },
        mobileImage: {
          type: 'string',
          title: 'Banner mobile image',
        },
        page: {
          type: 'string',
          title: 'Banner link',
        },
        description: {
          type: 'string',
          title: 'Banner description',
        },
        targetParams: {
          type: 'object',
          title: 'Banner target params',
          properties: {
            params: {
              type: 'string',
              title: 'Params',
            },
          },
        },
      },
    }
```

## Troubleshooting

You can check if others are experiencing similar issues [here](https://github.com/vtex-apps/carousel/issues). Also feel free to [open issues](https://github.com/vtex-apps/carousel/issues/new).

## Contributing

TODO
