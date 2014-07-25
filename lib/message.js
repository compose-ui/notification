var _ = require('lodash')
var Tetromino = require('compose-tetromino')
var debug = require('debug')('notifications:message')

var defaults = {
  message: 'Just what do you think you\'re doing, <strong>Dave</strong>.',
  safeFor: 2,
  keep: false
}

module.exports = Tetromino.extend({
  initialize: function(options){
    _.extend(this, options)
    _.defaults(this, defaults)
    debug('initialize (id #%d)', this.id)
  },

  start: function(){
    debug('start (id #%d)', this.id)
    if (this.dismissAfter) {
      this.timeout = setTimeout(this.dismiss.bind(this), this.dismissAfter * 1000)
    }
  },

  destruct: function(){
    debug('destruct (id #%d)', this.id)
    // minimum 0
    var safe = Math.max((this.renderedAt + this.safeFor * 1000) - Date.now(), 0)
    if (this.dismissAfter) {
      // minimum 0
      var remaining = Math.max((this.renderedAt + this.dismissAfter * 1000) - Date.now(), 0)
      if (safe < remaining) {
        clearTimeout(this.timeout)
        _.delay(this.dismiss.bind(this), safe)
      }
    } else {
      _.delay(this.dismiss.bind(this), safe)
    }
  },

  dismiss: function(time){
    time = !time && time !== 0 ? 300 : time
    debug('dismiss (id #%d), time = %d', this.id, time)
    this.emit('dismiss')
    debug('emitted \'dismiss\' event for message id = #%d', this.id)
    _.delay(function(){
      this.emit('remove')
      debug('emitted \'remove\' event for message id = #%d', this.id)
    }.bind(this), time)
  }
})