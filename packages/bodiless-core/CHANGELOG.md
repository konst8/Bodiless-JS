# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.50](https://github.com/dewen/bodiless-js/compare/v0.0.49...v0.0.50) (2020-04-07)

**Note:** Version bump only for package @dewen_li/core





## [0.0.49](https://github.com/dewen/bodiless-js/compare/v0.0.48...v0.0.49) (2020-04-07)

**Note:** Version bump only for package @dewen_li/core





## [0.0.48](https://github.com/dewen/bodiless-js/compare/v0.0.47...v0.0.48) (2020-04-07)

**Note:** Version bump only for package @dewen_li/core





## [0.0.47](https://github.com/dewen/bodiless-js/compare/v0.0.46...v0.0.47) (2020-04-06)

**Note:** Version bump only for package @dewen_li/core





## [0.0.46](https://github.com/dewen/bodiless-js/compare/v0.0.45...v0.0.46) (2020-04-06)

**Note:** Version bump only for package @dewen_li/core





## [0.0.44](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.43...v0.0.44) (2020-03-26)


### Features

* **gatsby-theme, backend, core, richtext, components, organisms:** Deleted Data Should Not be Retained ([#144](https://github.com/johnsonandjohnson/bodiless-js/issues/144)) ([0821c89](https://github.com/johnsonandjohnson/bodiless-js/commit/0821c897b1e6894c418ec78bac58fccdb969caa7)), closes [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14)


### BREAKING CHANGES

* **gatsby-theme, backend, core, richtext, components, organisms:** 1. Submenu data model changed. The first reason is to make menu/submenu data model similar to list/sublist data models, so that menu/submenu can leverage api provided by list component. The second reason is to solve a submenu bug in which one json file stores data from multiple nodes. Particularly, submenu item stores toggle and a list sublist items. One, who has a submenu on a site, will have to either update existing submenu json files or recreate submenu. Example how to update submenu json files of existing site is demonstrated on the demo site. pr 41.
2. Accordion changes. Node is removed from SingleAccordionClean. The reason is to provide consumers more control over how the node is added to accordion. Particularly, this change was needed for burgermenu, which leverages accordions, so that burgermenu can read submenu data from accurate node. One, who uses SingleAccordionClean to compose custom accordions, should inject node to the custom accordions. Example can be found in test-site/src/components/SingleAccordion/index.tsx. withNode has been added to asSingleAccordion.





## [0.0.43](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.42...v0.0.43) (2020-03-11)


### Bug Fixes

* **components, core:** Fix withEditPlaceholder components order ([3c1f99b](https://github.com/johnsonandjohnson/bodiless-js/commit/3c1f99b38bf437d97d4ffc2e062fd91d295184ca))





## [0.0.42](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.4...v0.0.42) (2020-02-28)

**Note:** Version bump only for package @bodiless/core






## [0.0.41](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.40...v0.0.41) (2020-02-28)


### Features

* **bodiless-core:** edit ui should start in preview mode ([#170](https://github.com/johnsonandjohnson/bodiless-js/issues/170)) ([22b4f4c](https://github.com/johnsonandjohnson/bodiless-js/commit/22b4f4c74cf0ce9ab2e30cb87bffe428bddd7fb9))





## [0.0.40](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.39...v0.0.40) (2020-02-21)


### Features

* **core:** Alter the Main Menu in Preview Mode ([#132](https://github.com/johnsonandjohnson/bodiless-js/issues/132)) ([abebb43](https://github.com/johnsonandjohnson/bodiless-js/commit/abebb43c48668d8f147cb43c7c4f042b06abd48e))
* **core:** Preview Mode Session ([#117](https://github.com/johnsonandjohnson/bodiless-js/issues/117)) ([4246986](https://github.com/johnsonandjohnson/bodiless-js/commit/4246986e449101a9c63a8043f9a1e2d1b73d0986))
* **layout:** Create a location Switcher for the Edit Admin UI Menu ([#149](https://github.com/johnsonandjohnson/bodiless-js/issues/149)) ([943e960](https://github.com/johnsonandjohnson/bodiless-js/commit/943e960016718b022bcb95471977ea43b6d9afac))





## 0.0.38 (2020-01-29)


### Features

* **@bodiless/core:** Initial Commit. ([097812f](https://github.com/johnsonandjohnson/bodiless-js/commit/097812f0db2f501306fa25aa9b1612528c5cd6aa))
* **organisms:** Burger Menu ([#20](https://github.com/johnsonandjohnson/bodiless-js/issues/20)) ([05f5833](https://github.com/johnsonandjohnson/bodiless-js/commit/05f58331a05e7625ad01d5a261ad76b05427ae23))





## [0.0.37](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.36...v0.0.37) (2020-01-17)


### Features

* **layouts:** Remove checkmark icon from component picker ([#33](https://github.com/johnsonandjohnson/bodiless-js/issues/33)) ([ab6ce73](https://github.com/johnsonandjohnson/bodiless-js/commit/ab6ce7385d0d0e5122219fa81892263d086dfb7d))
