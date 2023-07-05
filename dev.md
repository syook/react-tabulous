# syook-react-tabulous

A React Tabulous.

# Available Scripts

## Dev build script

```js
    npm run build:dev
```

This script create the production minified files under the lib directory. and it also create a .tgz file which can use in another project.

### To install the `syook-react-tabulous-<version>.tgz` into another project

```js
    npm i syook-react-tabulous-0.1.0.tgz
```

You can run the above script if you copied the .tgz in to the root directory

also you can run

```js
    npm i <path-to-directory>/syook-react-tabulous-0.1.0.tgz


    npm i ../syook-react-tabulous/syook-react-tabulous-0.1.0.tgz

    npm uninstall syook-react-tabulous && npm i ../syook-react-tabulous/syook-react-tabulous-0.1.0.tgz

    yarn remove syook-react-tabulous && yarn add ../syook-react-tabulous/syook-react-tabulous-0.1.0.tgz

```

## Production build and process

To create an production build and publish into npm registry

```js
    npm run publish
```

commit all the files including `lib directory` which is the production minified build and push into cloud.
