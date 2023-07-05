# react-data-grid

A React DataGrid.

# Available Scripts

## Dev build script

```js
    npm run build:dev
```

This script create the production minified files under the lib directory. and it also create a .tgz file which can use in another project.

### To install the `react-data-grid-<version>.tgz` into another project

```js
    npm i react-data-grid-0.1.0.tgz
```

You can run the above script if you copied the .tgz in to the root directory

also you can run

```js
    npm i <path-to-directory>/react-data-grid-0.1.0.tgz


    npm i ../react-data-grid/react-data-grid-0.1.0.tgz

    npm uninstall react-data-grid && npm i ../react-data-grid/react-data-grid-0.1.0.tgz

    yarn remove react-data-grid && yarn add ../react-data-grid/react-data-grid-0.1.0.tgz

```

## Production build and process

To create an production build and publish into npm registry

```js
    npm run publish
```

commit all the files including `lib directory` which is the production minified build and push into cloud.
