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

Copyright &copy; 2015 Tim De Pauw

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
