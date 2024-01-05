# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.0](https://github.com/ngneat/cashew/compare/v3.1.0...v4.0.0) (2024-01-05)


### ⚠ BREAKING CHANGES

* 🧨 The peer dependency is now Angular v17. See the docs to learn how to
provide the new provide functions in your bootstrapApplication
providers.

### Features

* 🎸 upgrade to ng17 ([3e92e8e](https://github.com/ngneat/cashew/commit/3e92e8e994e8919e5a4e013951d5a9e20ba6c75b))
* 🎸 upgrade to ng17 ([6fa3808](https://github.com/ngneat/cashew/commit/6fa38082412f5e9f8caf83f659dea9c27e411f14))
* **test:** add response headers tests ([77ee031](https://github.com/ngneat/cashew/commit/77ee031ce947489878ce689949d63dfa3839b640))


### Bug Fixes

* init must be called manually on headers when no getter is used ([34656f3](https://github.com/ngneat/cashew/commit/34656f343b96057f9e9a9c8845cd0cf71a4be105))
* **local-storage:** set http headers correctly ([f2571c5](https://github.com/ngneat/cashew/commit/f2571c5c8d35ca2cb37c73b5146b68b27e793edd))
* **test:** headers not correctly set in mock and saved in map storage ([fbc5840](https://github.com/ngneat/cashew/commit/fbc584026291c3cdacba2abbaf0617123f3fa4b4))

## [3.1.0](https://github.com/ngneat/cashew/compare/v3.0.0...v3.1.0) (2022-11-13)


### Features

* 🎸 upgarde to ng14 ([19f878f](https://github.com/ngneat/cashew/commit/19f878f4b2816b2d2b933d1916557682c8b435b2)), closes [#79](https://github.com/ngneat/cashew/issues/79)
* export cache storage ([735e1cb](https://github.com/ngneat/cashew/commit/735e1cb26f52a1a8f141ca1ef2b734d606e6d47c))


### Bug Fixes

* **http:** should allow undefined as type ([c31eff1](https://github.com/ngneat/cashew/commit/c31eff1349b5a9f48d67729023e944e0c1b30e01))
* **local-storage:** removes duplicate createKey calls ([f97baa3](https://github.com/ngneat/cashew/commit/f97baa3ba640bfefdc209885724608b54052c6a1))


### Tests

* 💍 fix specs run ([43c4789](https://github.com/ngneat/cashew/commit/43c47895643204fa3ccc14907060842a02bd4fa2))

## [3.0.0](https://github.com/ngneat/cashew/compare/v2.3.2...v3.0.0) (2021-11-24)


### ⚠ BREAKING CHANGES

* 🧨 Peer dep of Angular v13

### Features

* 🎸 upgrade to angular 13 ([b52d62e](https://github.com/ngneat/cashew/commit/b52d62ebb8f25554178013bc7134bb434e2e121b))

### [2.3.2](https://github.com/ngneat/cashew/compare/v2.3.1...v2.3.2) (2021-10-14)


### Bug Fixes

* empty observable returned when request repeated inside subscriber ([cfb2871](https://github.com/ngneat/cashew/commit/cfb287131824c2ec0739088a3f6b151375c4df03)), closes [#48](https://github.com/ngneat/cashew/issues/48)
* log completion of both observables ([50469b4](https://github.com/ngneat/cashew/commit/50469b4112fa5aa913a60d1bbe002adccadfb999))


### Tests

* empty observable returned when request repeated by subscriber ([382a726](https://github.com/ngneat/cashew/commit/382a726d62f1248d07b135c2033857f066dba142))

### [2.3.1](https://github.com/ngneat/cashew/compare/v2.3.0...v2.3.1) (2021-08-22)


### Bug Fixes

* 🐛 export interceptor ([42ca660](https://github.com/ngneat/cashew/commit/42ca66084e735a967d2453d7cc6b1274ab7579d8))

## [2.3.0](https://github.com/ngneat/cashew/compare/v2.2.1...v2.3.0) (2021-08-22)


### Features

* 🎸 add skipInterceptorDecleration ([ad46186](https://github.com/ngneat/cashew/commit/ad4618647150e29f15619fd9566b20428097b745))

### [2.2.1](https://github.com/ngneat/cashew/compare/v2.2.0...v2.2.1) (2021-07-18)


### Bug Fixes

* 🐛 remove logger ([d6672ff](https://github.com/ngneat/cashew/commit/d6672ffaf62371b817b4d02a9ddba9d71e154d91)), closes [#41](https://github.com/ngneat/cashew/issues/41)

## [2.2.0](https://github.com/ngneat/cashew/compare/v2.1.0...v2.2.0) (2021-07-12)


### Features

* 🎸 add stateManagement mode ([61c59f8](https://github.com/ngneat/cashew/commit/61c59f8288cb4d27996be5091ec12a2165ae025a))

## [2.1.0](https://github.com/ngneat/cashew/compare/v2.0.4...v2.1.0) (2021-07-11)


### Features

* add doc to readme ([bdfc4a1](https://github.com/ngneat/cashew/commit/bdfc4a1e03f8605cd3342d31e8641cc520ad595e))
* add new argument to withCache to allow passing an existing context ([0d92fe9](https://github.com/ngneat/cashew/commit/0d92fe9a21871df3b449bc0860cbaeb82dde8450))
* add unit test ([f4f2b1a](https://github.com/ngneat/cashew/commit/f4f2b1ad8a3660a2bdec1aea4bbc934d7fad36f2))


### Bug Fixes

* correct typo ([2c19d79](https://github.com/ngneat/cashew/commit/2c19d79e443d694167a234d1efd662f852e35912))

### [2.0.4](https://github.com/ngneat/cashew/compare/v2.0.3...v2.0.4) (2021-06-17)


### Bug Fixes

* 🐛 fix implicit regression ([28eb351](https://github.com/ngneat/cashew/commit/28eb351d4adfe2f52c19d3589fb4903f2c3a7c9c)), closes [#40](https://github.com/ngneat/cashew/issues/40)

### [2.0.3](https://github.com/ngneat/cashew/compare/v2.0.2...v2.0.3) (2021-06-16)


### Bug Fixes

* 🐛 fix default ttl ([991f078](https://github.com/ngneat/cashew/commit/991f0782fc321555a75c115f046ecbde747cbb9a))

### [2.0.2](https://github.com/ngneat/cashew/compare/v2.0.1...v2.0.2) (2021-06-16)


### Bug Fixes

* 🐛 support ssr ([f9b7134](https://github.com/ngneat/cashew/commit/f9b71340dc01155f1ef2f731996772db5a8ef7d2))

### [2.0.1](https://github.com/ngneat/cashew/compare/v2.0.0...v2.0.1) (2021-06-14)


### Bug Fixes

* 🐛 downgrade to viewengine build ([9a375c1](https://github.com/ngneat/cashew/commit/9a375c1402855605018642465584a1dbf8658426))

## [2.0.0](https://github.com/ngneat/cashew/compare/v1.3.2...v2.0.0) (2021-06-13)


### ⚠ BREAKING CHANGES

* **lib:** - Use `context` instead of `params`
- Remove `parameterCodec`
- Remove the `$` postfix
- Remove `RegExp` support
- Remove `localStorageKey`

### Features

* **lib:** migrate to angular v12 and use context ([3a5812a](https://github.com/ngneat/cashew/commit/3a5812ae75bed9a2c01fbc59ed680d1fb9f8570c))
* 🎸 add clearCachePredicate ([f1d3d02](https://github.com/ngneat/cashew/commit/f1d3d02791b26a19f47b6089d1b9b91ad5c6bbfe))
* 🎸 add utils ([7f5b898](https://github.com/ngneat/cashew/commit/7f5b898f1bba6d994470d7b46b3580e2d0ca6539))


### Tests

* 💍 refactor specs ([a602834](https://github.com/ngneat/cashew/commit/a6028348a39cfff4d44f1da196bb84e042729d75))

### [1.3.2](https://github.com/ngneat/cashew/compare/v1.3.1...v1.3.2) (2020-12-29)


### Bug Fixes

* angular 10 compatibility ([89bd9d6](https://github.com/ngneat/cashew/commit/89bd9d66e11261bdb444a3f5d05a47fb50179f61))

### [1.3.1](https://github.com/ngneat/cashew/compare/v1.3.0...v1.3.1) (2020-08-20)


### Bug Fixes

* 🐛 method for View Engine users to pass partial config ([7f7a934](https://github.com/ngneat/cashew/commit/7f7a934f851a2245cd5cb10a7601c9fb42738f1d))
* rename the HTTP_CACHE_CONFIG injection token desc ([c63ca48](https://github.com/ngneat/cashew/commit/c63ca484508153ad638af7e9fca58fb0e390155a))

## [1.3.0](https://github.com/ngneat/cashew/compare/v1.2.0...v1.3.0) (2020-06-18)


### Features

* add local parameter codec override ([80148d6](https://github.com/ngneat/cashew/commit/80148d63d9cf79536e21489365208e7dcddeac74))
* add tests for request parameter codec ([dbc17a6](https://github.com/ngneat/cashew/commit/dbc17a68088815d99f897a75a346d06d45ae3c76))
* update Params type to be more specific ([c44daf1](https://github.com/ngneat/cashew/commit/c44daf13bad7b8d52e3f8a57d973c5fadb686513))

## [1.2.0](https://github.com/ngneat/cashew/compare/v1.1.4...v1.2.0) (2020-05-28)


### Features

* add http parameter codec override ([a1f1a8d](https://github.com/ngneat/cashew/commit/a1f1a8d41b3cd03095aad1a2843428a3dd157d97))


### Bug Fixes

* 🐛 support array http parameters ([5ef58d0](https://github.com/ngneat/cashew/commit/5ef58d064f22171d0fb068d0830f0816424d0f3e))

### [1.1.5](https://github.com/ngneat/cashew/compare/v1.1.4...v1.1.5) (2020-05-04)


### Bug Fixes

* 🐛 support array http parameters ([5ef58d0](https://github.com/ngneat/cashew/commit/5ef58d064f22171d0fb068d0830f0816424d0f3e))

### [1.1.4](https://github.com/ngneat/cashew/compare/v1.1.3...v1.1.4) (2020-04-29)


### Bug Fixes

* remove requests that error from queue ([17b6b0b](https://github.com/ngneat/cashew/commit/17b6b0bd1c0da5d4c5cd2cc2a6b7a1596cda10a0))

### [1.1.3](https://github.com/ngneat/cashew/compare/v1.1.2...v1.1.3) (2020-02-12)


### Bug Fixes

* 🐛 aot build ([0ed2eba](https://github.com/ngneat/cashew/commit/0ed2ebac2f78ed15b6771e50fc4db6d54170c5e2))

### [1.1.2](https://github.com/ngneat/cashew/compare/v1.1.1...v1.1.2) (2020-02-12)


### Bug Fixes

* 🐛 fix aot build ([9425552](https://github.com/ngneat/cashew/commit/9425552ed57e0ceecc551309e9b6d2f9719886f6))

### [1.1.1](https://github.com/ngneat/cashew/compare/v1.1.0...v1.1.1) (2020-02-12)


### Bug Fixes

* 🐛 add type to wrapCache ([ff25b4f](https://github.com/ngneat/cashew/commit/ff25b4fce7ed2d4e7780070cfd9233b82e2b1f00))

## [1.1.0](https://github.com/ngneat/cashew/compare/v1.0.0...v1.1.0) (2020-02-11)


### Features

* 🎸 add http cache storage ([07bcb4b](https://github.com/ngneat/cashew/commit/07bcb4ba2f56b2b22877a2cb915f9ca8c030e19e))
* 🎸 Local Storage Option ([0c5f29a](https://github.com/ngneat/cashew/commit/0c5f29a56d189af9b8aca1641e595a847ecbece5))


### Tests

* 💍 Added local storage tests ([84ff419](https://github.com/ngneat/cashew/commit/84ff419277b3b282aa055c2f997ca634933b6513))
* 💍 Memory Use in Local Storage ([1df3852](https://github.com/ngneat/cashew/commit/1df3852803b1cf05c005cc46cf7f8b50c0d19351))

## 1.0.0 (2020-01-30)


### Features

* **lib:** add inline cache ([3f0935e](https://github.com/ngneat/cashew/commit/3f0935eaa2714064d4bbb96d8a756e7ccb2da0cb))
* **lib:** add inline cache ([d9b83b8](https://github.com/ngneat/cashew/commit/d9b83b8c6a6e54c81b102d4670ac21fe6ddd38fd))
* **lib:** allow custom key ([30087ca](https://github.com/ngneat/cashew/commit/30087ca3777c641a897308a0310d29fe18bfb72a))
* 🎸 add response serializer ([645c3a2](https://github.com/ngneat/cashew/commit/645c3a2d4851a59b37715c4a0c3739ebf7971398))


### Tests

* add tests to http-cache ([0753076](https://github.com/ngneat/cashew/commit/0753076f319760bc0b20c187e52f0f1544900a53))
