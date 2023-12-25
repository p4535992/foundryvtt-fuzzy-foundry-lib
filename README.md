# Fuzzy Foundry Lib (Dig Down variant)

![Latest Release Download Count](https://img.shields.io/github/downloads/p4535992/foundryvtt-fuzzy-foundry-lib/latest/module.zip?color=2b82fc&label=DOWNLOADS&style=for-the-badge)

[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Ffuzzy-foundry-lib&colorB=006400&style=for-the-badge)](https://forge-vtt.com/bazaar#package=fuzzy-foundry-lib)

![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fp4535992%2Ffoundryvtt-fuzzy-foundry-lib%2Fmaster%2Fsrc%2Fmodule.json&label=Foundry%20Version&query=$.compatibility.verified&colorB=orange&style=for-the-badge)

![Latest Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fp4535992%2Ffoundryvtt-fuzzy-foundry-lib%2Fmaster%2Fsrc%2Fmodule.json&label=Latest%20Release&prefix=v&query=$.version&colorB=red&style=for-the-badge)

[![Foundry Hub Endorsements](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Ffuzzy-foundry-lib%2Fshield%2Fendorsements&style=for-the-badge)](https://www.foundryvtt-hub.com/package/fuzzy-foundry-lib/)

![GitHub all releases](https://img.shields.io/github/downloads/p4535992/foundryvtt-fuzzy-foundry-lib/total?style=for-the-badge)

[![Translation status](https://weblate.foundryvtt-hub.com/widgets/fuzzy-foundry-lib/-/287x66-black.png)](https://weblate.foundryvtt-hub.com/engage/fuzzy-foundry-lib/)

**Note: This is module is inspired from the  wonderful work done by [theRipper93](https://theripper93.com/) with its [Dig Down](https://github.com/theripper93/fuzzy-foundry) module.
If you want to support more modules of this kind, I invite you to go and support his patreon**

[![alt-text](https://img.shields.io/badge/-Patreon-%23ff424d?style=for-the-badge)](https://www.patreon.com/theripper93) [![alt-text](https://img.shields.io/badge/-Discord-%235662f6?style=for-the-badge)](https://discord.gg/F53gBjR97G)

### and if you feel generous you can to buy me a coffee [![alt-text](https://img.shields.io/badge/-Patreon-%23ff424d?style=for-the-badge)](https://www.patreon.com/p4535992)


## Features

Perform deep searches inside folder structures and sidebars and fuzzy searches on compendiums and sidebars. The text in this journals contains the word

_Basically it is the extended "Dig Down" module to **search by tags (or otherwise keywords)** that can be integrated by hand or by other modules and **with an api that can be used with macros or with other modules**. Being theripper93 super busy with larger and more complex projects I created this module. It can replace dig down in its entirety, or work together as you wish._

You can find the original documentation on the [WIKI](https://api.theripper93.com/modulewiki/fuzzy-foundry/free), but i will put a copy and paste here.

### Searches

#### Deep Folder Search

Journal containing the word "Tips"Journal containing the word "Tips"
If enabled, it will allow you to search in subfolders while using the file picker.

For this feature to work you must enable Deep File Search in the module settings then click the Rebuild Cache button in the settings sidebar

If a directory contains a file called noscan.txt, then that directory will be excluded from the deep folder search. This can be useful if you have a very large collection of files, and including all of them would use too much memory for the cache.

#### Fuzzy Search

Fuzzy Searches are done automatically. It will find the closest matches to your search (e.g. searching for accolite will show Acolyte in the results). They are enabled by default and will work for compendiums and the actor sidebar.

#### Deep Search

Search CR with deep searchSearch CR with deep search
The deep search starts with &. It will look into the items to find a property or value that matches the search. For example: Searching for the name of an image will filter for any entity that is using that image.

Note that this feature works on all sidebar directories and will search inside the JSON itself. If you are looking for a scene with zombies you can search in your scene sidebar for &zombie.

#### Prop Search

Prop Search may be slow for huge directories.

Starting a search with ! will search in the properties defined in the settings.

If data.details.cr is a property defined in the settings, searching for !1 will filter for creatures with a cr of 1.

### Other Features

Advanced search for `compendiumAdvanced`` search for compendium

#### Cache Rebuilding

To rebuild the cache (needed if you move\add files) use this button:

#### Excavating Tokens

This option will find the closest match image based on the token name.

To use it, simply click the excavation button to the right of the token image field.


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

Any issues, bugs, or feature requests are always welcome to be reported directly to the [Issue Tracker](https://github.com/p4535992/foundryvtt-fuzzy-foundry-lib/issues ), or using the [Bug Reporter Module](https://foundryvtt.com/packages/bug-reporter/).

## License

- **[Dig Down](https://github.com/theripper93/fuzzy-foundry)** : [GPL-3.0 license](https://github.com/theripper93/fuzzy-foundry/blob/master/LICENSE)
- **[LZ-String](https://github.com/pieroxy/lz-string)**: [MIT](https://github.com/pieroxy/lz-string/blob/master/LICENSE)
- **[fuzzyset.js](https://github.com/Glench/fuzzyset.js)**: [GPL-3.0 license](https://github.com/Glench/fuzzyset.js/blob/master/LICENSE.md)

This package is under an [GPL-3.0 license](LICENSE) and the [Foundry Virtual Tabletop Limited License Agreement for module development](https://foundryvtt.com/article/license/).

## Credit

A special ty to the original authors [theRipper93](https://theripper93.com/), for the idea , the inspiration and the initial template.

- [theRipper93](https://theripper93.com/) and the module [Dig Down](https://github.com/theripper93/fuzzy-foundry)
- [pieroxy](https://github.com/pieroxy/) and the project [LZ-String](https://github.com/pieroxy/lz-string)
- [Glench](https://github.com/Glench/) and the project [fuzzyset.js](https://github.com/Glench/fuzzyset.js)