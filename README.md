# Fuzzy Foundry Lib (Dig Down variant)

![Latest Release Download Count](https://img.shields.io/github/downloads/p4535992/foundryvtt-choices-plus/latest/module.zip?color=2b82fc&label=DOWNLOADS&style=for-the-badge)

[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fchoices-plus&colorB=006400&style=for-the-badge)](https://forge-vtt.com/bazaar#package=choices-plus)

![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fp4535992%2Ffoundryvtt-choices-plus%2Fmaster%2Fsrc%2Fmodule.json&label=Foundry%20Version&query=$.compatibility.verified&colorB=orange&style=for-the-badge)

![Latest Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fp4535992%2Ffoundryvtt-choices-plus%2Fmaster%2Fsrc%2Fmodule.json&label=Latest%20Release&prefix=v&query=$.version&colorB=red&style=for-the-badge)

[![Foundry Hub Endorsements](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Fchoices-plus%2Fshield%2Fendorsements&style=for-the-badge)](https://www.foundryvtt-hub.com/package/choices-plus/)

![GitHub all releases](https://img.shields.io/github/downloads/p4535992/foundryvtt-choices-plus/total?style=for-the-badge)

[![Translation status](https://weblate.foundryvtt-hub.com/widgets/choices-plus/-/287x66-black.png)](https://weblate.foundryvtt-hub.com/engage/choices-plus/)

Module for creating small scenes with multiple choices novel game style, with a powerful [api](./wiki/api.md) you can create a chain of choice for your players.

**Note: This is module is inspired from the  wonderful work done by [theRipper93](https://theripper93.com/) with its [Dig Down](https://github.com/theripper93/fuzzy-foundry) module.
If you want to support more modules of this kind, I invite you to go and support his patreon**

[![alt-text](https://img.shields.io/badge/-Patreon-%23ff424d?style=for-the-badge)](https://www.patreon.com/theripper93) [![alt-text](https://img.shields.io/badge/-Discord-%235662f6?style=for-the-badge)](https://discord.gg/F53gBjR97G)

### and if you feel generous you can to buy me a coffee [![alt-text](https://img.shields.io/badge/-Patreon-%23ff424d?style=for-the-badge)](https://www.patreon.com/p4535992)

## NOTE: This module is **under maintenance**, I have no plans to update or add features. However, I will try to fix any bugs as possible. Any contribution is welcome.

## Features

Perform deep searches inside folder stuctures, on sidebars and fuzzy searches on compendiums/sidebars and more.

### You can find the documentation on the [WIKI](https://api.theripper93.com/modulewiki/fuzzy-foundry/free)

## Api

All informations about the api can be found here [API](./wiki/api.md)


# Build

## Install all packages

```bash
npm install
```

### dev

`dev` will let you develop you own code with hot reloading on the browser

```bash
npm run dev
```

## npm build scripts

### build

`build` will build and set up a symlink between `dist` and your `dataPath`.

```bash
npm run build
```

### build-watch

`build-watch` will build and watch for changes, rebuilding automatically.

```bash
npm run build-watch
```

### prettier-format

`prettier-format` launch the prettier plugin based on the configuration [here](./.prettierrc)

```bash
npm run-script prettier-format
```

## [Changelog](./CHANGELOG.md)

## Issues

Any issues, bugs, or feature requests are always welcome to be reported directly to the [Issue Tracker](https://github.com/p4535992/foundryvtt-choices-plus/issues ), or using the [Bug Reporter Module](https://foundryvtt.com/packages/bug-reporter/).

## License

- **[Dig Down](https://github.com/theripper93/fuzzy-foundry)** : [GPL-3.0 license](https://github.com/theripper93/fuzzy-foundry/blob/master/LICENSE)

All the images used in this module are generated with [bing create](https://www.bing.com/create) under these [term of use](https://www.bing.com/new/termsofuse?FORM=GENTOS)

This package is under an [GPL-3.0 license](LICENSE) and the [Foundry Virtual Tabletop Limited License Agreement for module development](https://foundryvtt.com/article/license/).

## Credit

A special ty to the original authors [theRipper93](https://theripper93.com/), for the idea , the inspiration and the initial template.

- [theRipper93](https://theripper93.com/) and the module [Dig Down](https://github.com/theripper93/fuzzy-foundry)
