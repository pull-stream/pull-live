var pull = require('pull-stream/pull')
var Cat = require('pull-cat')
var Once = require('pull-stream/sources/once')

module.exports = function (createSource, createLive) {

  return function (opts) {
      opts = opts || {}
      var isOld = opts.old !== false
      var isLive = opts.live === true || opts.old === false

      if(!isLive && !isOld)
        throw new Error('ls with neither old or new is empty')

      var old = createSource(opts)

      if(!isLive) return old

      var live = createLive(opts)
      if(!isOld) return live

      //old & live
      return Cat([old, opts.sync === false ? null : Once({sync: true}), live])
  }
}




