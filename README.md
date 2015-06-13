# grunt-mxmlc-lite

[![npm](https://img.shields.io/npm/v/grunt-mxmlc-lite.svg)](https://www.npmjs.com/package/grunt-mxmlc-lite) [![Build Status](https://img.shields.io/travis/timdp/grunt-mxmlc-lite.svg)](https://travis-ci.org/timdp/grunt-mxmlc-lite) [![JavaScript Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

Runs the Flex SDK `mxmlc` compiler with a prebuilt configuration file.

## Usage

```js
grunt.initConfig({
  mxmlc_lite: {
    options: {
      version: '4.6.0'
    },
    build: 'path/to/flex-config.xml'
  }
})
```

You can use any `version`
[supported](https://github.com/timdp/flex-sdk-provider/blob/master/versions.json)
by flex-sdk-provider.

## Why Another Plugin?

This plugin differs from [grunt-mxmlc](https://www.npmjs.com/package/grunt-mxmlc)
(nothing wrong with that one, by the way) in that it only supports passing a
prebuilt configuration file rather than dynamically creating a configuration
object from the Gruntfile. Additionally, it relies on
[flex-sdk-provider](https://www.npmjs.com/package/flex-sdk-provider) rather than
[flex-sdk](https://www.npmjs.com/package/flex-sdk) to work around
[SemVer issues](https://github.com/mojombo/semver/issues/242).

## Author

[Tim De Pauw](https://tmdpw.eu/)

## License

MIT
