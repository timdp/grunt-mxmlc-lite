'use strict'

var flexProvider = require('flex-sdk-provider')
var Promise = require('es6-promise').Promise
var promisify = require('es6-promisify')
var os = require('os')
var path = require('path')

module.exports = function (grunt) {
  var isWindows = /^win/.test(os.platform())
  var mxmlc = 'mxmlc' + (isWindows ? '.exe' : '')

  var gSpawn = promisify(grunt.util.spawn)

  var spawn = function (opt) {
    return gSpawn(opt)
      .then(function (result, code) {
        if (code) {
          throw new Error('Exit status: ' + code)
        }
      })
  }

  var build = function (file, opt) {
    return flexProvider.get(opt.version)
      .then(function (sdkPath) {
        var cmd = path.join(sdkPath, 'bin', mxmlc)
        var args = ['-load-config+=' + file.src]
        grunt.verbose.writeln('Compiling ' + file.src + ' using ' + cmd)
        return spawn({cmd: cmd, args: args})
      })
  }

  grunt.registerMultiTask('mxmlc_lite', '', function () {
    var done = this.async()
    var options = this.options()
    var compiling = this.files.reduce(function (prev, curr) {
      return prev.then(function () {
        return build(curr, options)
      })
    }, Promise.resolve())
    compiling.then(done, grunt.fail.fatal)
  })
}
