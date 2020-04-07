# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.49](https://github.com/konst8/Bodiless-JS/compare/v0.0.48...v0.0.49) (2020-04-07)

**Note:** Version bump only for package @dewen_li/backend





## [0.0.48](https://github.com/dewen/Bodiless-JS/compare/v0.0.47...v0.0.48) (2020-04-07)

**Note:** Version bump only for package @dewen_li/backend





## [0.0.47](https://github.com/dewen/Bodiless-JS/compare/v0.0.46...v0.0.47) (2020-04-06)

**Note:** Version bump only for package @dewen_li/backend





## [0.0.46](https://github.com/dewen/Bodiless-JS/compare/v0.0.45...v0.0.46) (2020-04-06)

**Note:** Version bump only for package @dewen_li/backend





## [0.0.44](https://github.com/johnsonandjohnson/Bodiless-JS/compare/v0.0.43...v0.0.44) (2020-03-26)


### Features

* **gatsby-theme, backend, core, richtext, components, organisms:** Deleted Data Should Not be Retained ([#144](https://github.com/johnsonandjohnson/Bodiless-JS/issues/144)) ([0821c89](https://github.com/johnsonandjohnson/Bodiless-JS/commit/0821c897b1e6894c418ec78bac58fccdb969caa7)), closes [#14](https://github.com/johnsonandjohnson/Bodiless-JS/issues/14)


### BREAKING CHANGES

* **gatsby-theme, backend, core, richtext, components, organisms:** 1. Submenu data model changed. The first reason is to make menu/submenu data model similar to list/sublist data models, so that menu/submenu can leverage api provided by list component. The second reason is to solve a submenu bug in which one json file stores data from multiple nodes. Particularly, submenu item stores toggle and a list sublist items. One, who has a submenu on a site, will have to either update existing submenu json files or recreate submenu. Example how to update submenu json files of existing site is demonstrated on the demo site. pr 41.
2. Accordion changes. Node is removed from SingleAccordionClean. The reason is to provide consumers more control over how the node is added to accordion. Particularly, this change was needed for burgermenu, which leverages accordions, so that burgermenu can read submenu data from accurate node. One, who uses SingleAccordionClean to compose custom accordions, should inject node to the custom accordions. Example can be found in test-site/src/components/SingleAccordion/index.tsx. withNode has been added to asSingleAccordion.





## [0.0.43](https://github.com/johnsonandjohnson/Bodiless-JS/compare/v0.0.42...v0.0.43) (2020-03-11)

**Note:** Version bump only for package @bodiless/backend





## [0.0.42](https://github.com/johnsonandjohnson/Bodiless-JS/compare/v0.0.41...v0.0.42) (2020-02-28)

**Note:** Version bump only for package @bodiless/backend






## [0.0.41](https://github.com/johnsonandjohnson/Bodiless-JS/compare/v0.0.40...v0.0.41) (2020-02-28)


### Bug Fixes

* **bodiless-backend:** do not require morgan when it is disabled ([#159](https://github.com/johnsonandjohnson/Bodiless-JS/issues/159)) ([35a6756](https://github.com/johnsonandjohnson/Bodiless-JS/commit/35a6756bf3cef23b05790bb3746ee388d8ef4e32))





## [0.0.40](https://github.com/johnsonandjohnson/Bodiless-JS/compare/v0.0.39...v0.0.40) (2020-02-21)


### Bug Fixes

* **gatsby-theme-bodiless:** Typed chars disappear sporadically ([#52](https://github.com/johnsonandjohnson/Bodiless-JS/issues/52)) ([4829496](https://github.com/johnsonandjohnson/Bodiless-JS/commit/48294967948c75707b668f90c76c0ad5d18e6a4d)), closes [#14](https://github.com/johnsonandjohnson/Bodiless-JS/issues/14) [#14](https://github.com/johnsonandjohnson/Bodiless-JS/issues/14) [#14](https://github.com/johnsonandjohnson/Bodiless-JS/issues/14)





## 0.0.38 (2020-01-29)


### Features

* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/Bodiless-JS/issues/12)) ([f5d8d2a](https://github.com/johnsonandjohnson/Bodiless-JS/commit/f5d8d2af25096d5785203cb600af378a5160b33d)), closes [#7](https://github.com/johnsonandjohnson/Bodiless-JS/issues/7)





## [0.0.37](https://github.com/wodenx/Bodiless-JS/compare/v0.0.36...v0.0.37) (2020-01-17)


### Features

* **gatsby-theme-bodiless:** GH-26 Add author to commits if possible. ([#25](https://github.com/wodenx/Bodiless-JS/issues/25)) ([3297c96](https://github.com/wodenx/Bodiless-JS/commit/3297c96c11b14e38106201176396be59cab19a92)), closes [#26](https://github.com/wodenx/Bodiless-JS/issues/26)
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/wodenx/Bodiless-JS/issues/12)) ([242a8a4](https://github.com/wodenx/Bodiless-JS/commit/242a8a420fc57bdfd3a6e0c6e99bedf672143a53)), closes [#7](https://github.com/wodenx/Bodiless-JS/issues/7)
