# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.9.0] - 2019-04-24
### Changed
- Scope messages

## [2.8.0] - 2019-03-25
### Changed
- Use `loop` prop of `Slider` app.

## [2.7.6] - 2019-03-14
### Changed
- Change language files to most generic.

## [2.7.5] - 2019-03-13
### Fixed
- Arrows container not aligned.

### Changed
- Make arrows thinner.

## [2.7.4] - 2019-03-13

## [2.7.3] - 2019-03-08
### Fixed

- Missing namespaces in docs.
- The container of arrows not fitting properly on large screens.

### Removed

- Unused classes of `styles.css`.

## [2.7.2] - 2019-03-07

### Fixed

- Fix tests.
- External route not working on storefront.

## [2.7.1] - 2019-03-01

### Fixed

- Images of banner not fitting correctly when needs to be larger than really is.

## [2.7.0] - 2019-02-28

### Changed

- Use a new slider dependency.
- Use CSS Modules instead of global CSS.

## [2.6.4] - 2019-02-14

## [2.6.3] - 2019-02-14

## [2.6.2] - 2019-02-01

## [2.6.1] - 2019-01-29

### Fixed

- Remove `inheritComponent` from blocks.

## [2.6.0] - 2019-01-23

## [2.5.0] - 2019-01-18

### Changed

- Update React builder to 3.x.

### Fixed

- Typescript errors.

## [2.3.1] - 2019-01-14

### Fixed

- Change Slider CSS tokens.

## [2.3.0] - 2019-01-09

### Changed

- Bye `pages.json`! Welcome `store-builder`.

## [2.2.0] - 2018-12-20

### Added

- Support to messages builder.

## [2.1.1] - 2018-12-19

### Fixed

- Error when clicking in an image that doesn't have a url to go.

## [2.1.0] - 2018-12-04

### Added

- Support for mobile banners.

## [2.0.1] - 2018-11-30

### Changed

- Update `store-components` major.

## [2.0.0] - 2018-11-28

### Added

- Set element as full-width.
- New arrows positions that matches the global padding.
- Using tachyons classes to define arrows margins.

## [1.4.0] - 2018-10-09

### Changed

- Move app to typescript.

## [1.3.0] - 2018-08-31

### Changed

- Update the `store-components` version.

## [1.2.3] - 2018-08-08

### Added

- Verification of empty array of Banners.

## [1.2.2] - 2018-08-01

### Changed

- Set `Banner`'s `image` property UI widget to `image-uploader`.
- Set both routes properties into the `Banner`'s schema and add the flag `externalRoute`.

### Removed

- NoSSR.
- `mobileImage` and `mobileheight` from schema.

### Fixed

- Unit tests

## [1.1.0] - 2018-6-6

### Added

- Add `isLayout` to schema properties.

### Fixed

- Update Slider mock behavior to use destructure.

## [1.0.4] - 2018-6-6

### Changed

- Update `Slider` dependency to use `vtex.store-components` instead of `vtex.storecomponents`.

## [1.0.3] - 2018-05-24

### Fixed

- Fix the banner image size.
- Fix bug of changing properties on edit mode.

## [1.0.2] - 2018-05-21

### Changed

- Update vtex.storecomponents version to 1.x

## [1.0.1] - 2018-05-19

### Changed

- **slick slider** Integrate with vtex.storecomponents/Slider

### Fixed

- Fix banner link not working

## [1.0.0] - 2018-05-02

### Changed

- Launch stable version of the app.
- **Refactoring** Make carrousel use NoSSR.
- **UI Schema** Adapt the UI structure accordingly with the changes of `pages-editor.`

## [0.6.0] - 2018-04-30

### Added

- **Dynamic Schema** Make banner route type a dynamic property

## [0.5.0] - 2018-04-26

### Added

- **Billing Policy** Add a billing policy to the app being published at Extensions.
- **Metadata** Add the metadata of the app.
- **UI Schema** Define the a custom uischema for the props

### Changed

- **Dynamic Schema** Change the autoplay and autoplaySpeed structure behavior to be dynamic

## [0.4.0] - 2018-04-26

### Changed

- **Dynamic Schema** Change carousel to use dynamic schema instead of a static one.

## [0.3.0] - 2018-04-24

### Changed

- **CSS** Import global css instead of relying on theme

## [0.2.2] - 2018-04-24

### Changed

- **Import** Change carousel to use Arrow and Dots from @vtex/slick-components.

## [0.2.1] - 2018-04-19

### Added

- **CI** Add integration with Travis CI

## [0.2.0] - 2018-04-18

### Added

- **Mobile image attibute** Displays another image when the user is on a mobile device.
- **Image files** Save placeholder images in the github folder.
