# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.49](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.48...v0.0.49) (2020-04-07)

**Note:** Version bump only for package @dewen_li/test-site





## [0.0.48](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.47...v0.0.48) (2020-04-07)

**Note:** Version bump only for package @dewen_li/test-site





## [0.0.47](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.46...v0.0.47) (2020-04-06)

**Note:** Version bump only for package @dewen_li/test-site





## [0.0.46](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.45...v0.0.46) (2020-04-06)

**Note:** Version bump only for package @dewen_li/test-site





## [0.0.44](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.43...v0.0.44) (2020-03-26)


### Features

* **components:**  Add google tag manager &  datalayer. ([#207](https://github.com/johnsonandjohnson/bodiless-js/issues/207)) ([9ee52e3](https://github.com/johnsonandjohnson/bodiless-js/commit/9ee52e39741004d263a5c06055520b197947f942))
* **gatsby-theme-bodiless, starter, test-site:** purge unused css ([#195](https://github.com/johnsonandjohnson/bodiless-js/issues/195)) ([1b54d82](https://github.com/johnsonandjohnson/bodiless-js/commit/1b54d82e53d0d72291a2ed3273e5b853c182e299))
* **gatsby-theme, backend, core, richtext, components, organisms:** Deleted Data Should Not be Retained ([#144](https://github.com/johnsonandjohnson/bodiless-js/issues/144)) ([0821c89](https://github.com/johnsonandjohnson/bodiless-js/commit/0821c897b1e6894c418ec78bac58fccdb969caa7)), closes [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14)
* **layouts:** Define Design for the Flexbox ([#209](https://github.com/johnsonandjohnson/bodiless-js/issues/209)) ([cd9f6ca](https://github.com/johnsonandjohnson/bodiless-js/commit/cd9f6ca68d4f4f34d5526eec9dccbcee21b54e00))
* **organisms:** Element selector enhancement for Single Accordion ([#206](https://github.com/johnsonandjohnson/bodiless-js/issues/206)) ([6325670](https://github.com/johnsonandjohnson/bodiless-js/commit/6325670012d020d0807ee2304c156cb45dfab279))


### BREAKING CHANGES

* **gatsby-theme-bodiless, starter, test-site:** bodiless/components does not export Link component anymore. One, who consumes Link component, should replace Link with a site level link component.
* **gatsby-theme, backend, core, richtext, components, organisms:** 1. Submenu data model changed. The first reason is to make menu/submenu data model similar to list/sublist data models, so that menu/submenu can leverage api provided by list component. The second reason is to solve a submenu bug in which one json file stores data from multiple nodes. Particularly, submenu item stores toggle and a list sublist items. One, who has a submenu on a site, will have to either update existing submenu json files or recreate submenu. Example how to update submenu json files of existing site is demonstrated on the demo site. pr 41.
2. Accordion changes. Node is removed from SingleAccordionClean. The reason is to provide consumers more control over how the node is added to accordion. Particularly, this change was needed for burgermenu, which leverages accordions, so that burgermenu can read submenu data from accurate node. One, who uses SingleAccordionClean to compose custom accordions, should inject node to the custom accordions. Example can be found in test-site/src/components/SingleAccordion/index.tsx. withNode has been added to asSingleAccordion.





## [0.0.43](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.42...v0.0.43) (2020-03-11)

**Note:** Version bump only for package @bodiless/test-site



## [0.0.42](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.41...v0.0.42) (2020-02-28)

**Note:** Version bump only for package @bodiless/test-site





## [0.0.41](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.40...v0.0.41) (2020-02-28)


### Features

* **layouts:** Allow specifying default width for flexbox item. ([#164](https://github.com/johnsonandjohnson/bodiless-js/issues/164)) ([9a4bc2f](https://github.com/johnsonandjohnson/bodiless-js/commit/9a4bc2f3b842fe212d57c24efec55f7fd0fe3b43)), closes [#162](https://github.com/johnsonandjohnson/bodiless-js/issues/162)





## [0.0.40](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.39...v0.0.40) (2020-02-21)


### Bug Fixes

* **gatsby-theme-bodiless:** Fix revert does not refresh page ([#110](https://github.com/johnsonandjohnson/bodiless-js/issues/110)) ([629b3ef](https://github.com/johnsonandjohnson/bodiless-js/commit/629b3efebc28882932d3e136f385abaccd15b28d))
* **gatsby-theme-bodiless:** Typed chars disappear sporadically ([#52](https://github.com/johnsonandjohnson/bodiless-js/issues/52)) ([4829496](https://github.com/johnsonandjohnson/bodiless-js/commit/48294967948c75707b668f90c76c0ad5d18e6a4d)), closes [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14) [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14) [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14)
* **psh:** platform.sh files get created with lerna ([#108](https://github.com/johnsonandjohnson/bodiless-js/issues/108)) ([7192372](https://github.com/johnsonandjohnson/bodiless-js/commit/71923720b19a445a7ced190dc6c352f5ad324f0e))


### Features

* **core:** Alter the Main Menu in Preview Mode ([#132](https://github.com/johnsonandjohnson/bodiless-js/issues/132)) ([abebb43](https://github.com/johnsonandjohnson/bodiless-js/commit/abebb43c48668d8f147cb43c7c4f042b06abd48e))
* **documentation:** Support better control over IA ([#129](https://github.com/johnsonandjohnson/bodiless-js/issues/129)) ([05c94fd](https://github.com/johnsonandjohnson/bodiless-js/commit/05c94fdd3ccd860a29d6a81bb5abc3708d7a8157))
* **fclasses:** Change startWith so that it does not replace the whole item but instead just the starting Component ([#57](https://github.com/johnsonandjohnson/bodiless-js/issues/57)) ([71f0b60](https://github.com/johnsonandjohnson/bodiless-js/commit/71f0b60797f45055c58aea8bf8bbc72db2795e5a))
* **psh:** Improve psh-init with better logic for custom overrides. ([#135](https://github.com/johnsonandjohnson/bodiless-js/issues/135)) ([79bbfc5](https://github.com/johnsonandjohnson/bodiless-js/commit/79bbfc559e5ae22297191ca42bb6a2b71345a8b9))


### BREAKING CHANGES

* **fclasses:** startWith functionality will not replace any other HOC that has been previously applied





## 0.0.39 (2020-01-30)


### Bug Fixes

* **p.sh:** Fix env vars are not generated for p.sh. ([#89](https://github.com/johnsonandjohnson/bodiless-js/issues/89)) ([c3d9ed3](https://github.com/johnsonandjohnson/bodiless-js/commit/c3d9ed3f94fe8ba707a4c6e0811e745ded4d3676))





## 0.0.38 (2020-01-29)


### Bug Fixes

* **test-site, documentation:** Fixed a image location in documentation and make small change in test-site from demo prep ([#56](https://github.com/johnsonandjohnson/bodiless-js/issues/56)) ([4de737d](https://github.com/johnsonandjohnson/bodiless-js/commit/4de737d2f815669d93d75f90623b262233254065))


### Features

* **organisms:** Burger Menu ([#20](https://github.com/johnsonandjohnson/bodiless-js/issues/20)) ([05f5833](https://github.com/johnsonandjohnson/bodiless-js/commit/05f58331a05e7625ad01d5a261ad76b05427ae23))
* **richtext:** Refactor the RichText API ([#18](https://github.com/johnsonandjohnson/bodiless-js/issues/18)) ([a700a1a](https://github.com/johnsonandjohnson/bodiless-js/commit/a700a1ab3b473c509d5b6a10801c02caa1bc0ab3))
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([f5d8d2a](https://github.com/johnsonandjohnson/bodiless-js/commit/f5d8d2af25096d5785203cb600af378a5160b33d)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)
* **test-site:** Add Type to all of the items in the flexbox ([#46](https://github.com/johnsonandjohnson/bodiless-js/issues/46)) ([d40bcce](https://github.com/johnsonandjohnson/bodiless-js/commit/d40bcce63edbd9830f138ebbb0824e41a21f3f42)), closes [#45](https://github.com/johnsonandjohnson/bodiless-js/issues/45)





## [0.0.37](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.36...v0.0.37) (2020-01-17)


### Features

* **layouts, test-site:** Add product listing template, fix a few flexbox bugs ([#13](https://github.com/johnsonandjohnson/bodiless-js/issues/13)) ([1f7307e](https://github.com/johnsonandjohnson/bodiless-js/commit/1f7307ea139ed4587916900434b36a5f0b4d9778))
* **richtext:** Refactor the RichText API ([#18](https://github.com/johnsonandjohnson/bodiless-js/issues/18)) ([d4616c7](https://github.com/johnsonandjohnson/bodiless-js/commit/d4616c74e868cf0f5c4b6f879db10741a1433785))
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([242a8a4](https://github.com/johnsonandjohnson/bodiless-js/commit/242a8a420fc57bdfd3a6e0c6e99bedf672143a53)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)


### BREAKING CHANGES

* **richtext:** The API for injecting components was refactored to use the Design API.

Co-authored-by: Andrei Beliayeu <53858490+beliayeu@users.noreply.github.com>
