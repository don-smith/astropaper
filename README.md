# Astropaper: An Astronomy Wallpaperer

An application that sets your desktop wallpaper to NASA's astronomy picture of the day.

This was originally built to illustrate using [Electron](https://github.com/atom/electron), [React](https://facebook.github.io/react/), and [ECMAScript 6](https://github.com/lukehoban/es6features) together.

Much gratitude to [Thom Nichols](https://github.com/thom-nic) and his [electron-demo](https://github.com/thom-nic/electron-demo) repository that was used as the starting point for this project.

## Usability Features

* Selecting an empty tile will download the photo for that day
* Selecting a photo tile will set that image as your wallpaper

## Technical Features

* ES6 support (via babel) + eslint & eslint-plugin-react
* React/JSX (and the Flux architecture)
* Less CSS (with Skeleton)
* NeDB

## Getting Started

```
nvm install
npm install
npm start
```
Changes will be rebuilt automatically, but you will still have to `Ctrl-R`
in the app window to reload changes.

## Reference

* [Electron Quick Start](https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md)
* [Electron docs](https://github.com/atom/electron/tree/master/docs)
