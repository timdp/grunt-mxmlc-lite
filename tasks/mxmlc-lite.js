'use strict'

require('es6-promise').polyfill()

var flexProvider = require('flex-sdk-provider')
var promisify = require('es6-promisify')
var fs = require('fs')
var path = require('path')
var os = require('os')
var defaults = require('defaults')

var stat = promisify(fs.stat)

module.exports = function (grunt) {
  var gSpawn = promisify(grunt.util.spawn)

  var mxmlc = null

  var spawn = function (opt) {
    grunt.verbose.debug('Spawning ' + opt.cmd + ' with args: ' + opt.args)
    return gSpawn(opt)
      .then(function (result, code) {
        if (code) {
          throw new Error('Exit status: ' + code)
        }
        grunt.verbose.ok('mxmlc exited cleanly')
      })
  }

  var findFile = function (dir, candidates) {
    if (candidates.length === 0) {
      throw new Error('Failed to locate mxmlc')
    }
    var candidate = candidates.shift()
    var candidatePath = path.join(dir, candidate)
    return stat(candidatePath)
      .then(function (stats) {
        return candidate
      })
      .catch(function () {
        return findFile(dir, candidates)
      })
  }

  var determineMxmlcCommand = function (sdkPath) {
    if (mxmlc !== null) {
      return
    }
    grunt.verbose.writeln('Locating mxmlc')
    var binDir = path.join(sdkPath, 'bin')
    var candidates = /^win/.test(os.platform()) ?
      ['mxmlc.bat', 'mxmlc.cmd', 'mxmlc.exe'] :
      ['mxmlc']
    return findFile(binDir, candidates)
      .then(function (res) {
        mxmlc = res
        grunt.verbose.ok('Using mxmlc at ' + path.join(sdkPath, mxmlc))
      })
  }

  var build = function (file, opt) {
    grunt.verbose.writeln('Starting build for ' + file.src +
      ' with Flex SDK version ' + opt.version)
    var sdkPath
    return flexProvider.get(opt.version)
      .then(function (_sdkPath) {
        sdkPath = _sdkPath
      })
      .then(function () {
        return determineMxmlcCommand(sdkPath)
      })
      .then(function () {
        var cmd = path.join(sdkPath, 'bin', mxmlc)
        var args = ['-load-config+=' + file.src]
        Object.keys(opt.define).forEach(function (key) {
          var value = opt.define[key]
          args.push('-define=' + key + ',' + value)
        })
        grunt.verbose.writeln('Compiling ' + file.src + ' using ' + cmd)
        return spawn({cmd: cmd, args: args})
      })
      .then(function () {
        grunt.log.ok('Build completed for ' + file.src)
      })
  }

  grunt.registerMultiTask('mxmlc_lite', '', function () {
    var done = this.async()
    var options = defaults(this.options(), {
      version: null,
      define: {}
    })
    var compiling = this.files.reduce(function (prev, curr) {
      return prev.then(function () {
        return build(curr, options)
      })
    }, Promise.resolve())
    compiling.then(done, grunt.fail.fatal)
  })
}
