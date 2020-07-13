# hello-world-fra-iframe

[![Build status][ci-image]][ci-url]
[![Dependency Status][dependencies-image]][dependencies-url]

This is a simple "hello world" IFRAME-based free-range application.

## Building

Install dependencies via NPM:

```shell
npm install
```

Build application assets to the `dist` directory:

```shell
npm run build
```

## Running Locally

After building the application, you can run a local copy of it using the local-appresolver. First, make sure you have the [local-appresolver component](http://docs.dev.d2l/index.php/HOWTO_Create_a_free-range_application#Rapid_development_with_the_Local_App_Resolver) checked out in your instance.

Then, start the appresolver:

```shell
npm start
```

If you have the `testing-scaffolds` component checked out, you can visit `{instance}/d2l/tests/apps/hello-world-fra-iframe/` to see the app.

## Publishing

The application will automatically publish a "dev" version to the Brightspace CDN after each commit. To publish a numbered "release" version, set the version in the `package.json` file and tag the commit with the same version number.

[ci-url]: https://travis-ci.org/Brightspace/hello-world-fra-iframe
[ci-image]: https://img.shields.io/travis/Brightspace/hello-world-fra-iframe.svg
[dependencies-url]: https://david-dm.org/Brightspace/hello-world-fra-iframe
[dependencies-image]: https://img.shields.io/david/Brightspace/hello-world-fra-iframe.svg
