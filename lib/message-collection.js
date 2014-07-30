var _ = require('lodash')
var Tetromino = require('compose-tetromino')
var Message = require('./message')
var MessageView = require('./message-view')
var debug = require('debug')('notifications:collection')

var queue = []
var currentId = 0

var MessageCollection = Tetromino.extend({
  initialize: function(){
    debug('initialize')
    this.setTimestamp()
  },
  addMessage: function(options){
    var id = ++currentId
    debug('addMessage (id #%d)', id)
    var message = new Message(_.merge(options, {id: id}))
      .once('remove', this.removeMessage.bind(this, id))
    queue.push(message)
    debug('pushed message to queue (id #%d)', id)
    this.setTimestamp()
    if (queue.length > 1)
      queue[0].destruct()
    else
      this.next()
    return message
  },

  removeMessage: function(id){
    debug('removeMessage (id #%d)', id)
    var i = _.findIndex(queue, function(message){ return message.id === id })
    debug('queue.length = %d', queue.length)
    if (i > -1)
      queue.splice(i, 1)
    debug('queue.length', queue.length)
    if (queue.length)
      this.next()
  },
  setTimestamp: function(){
    debug('setTimestamp')
    this.time = Date.now()
  },
  // delayMessage: function(options, wait){
  //   wait = !wait && wait !== 0 ? 500 : wait
  //   var time = this.time
  //   var self = this
  //   _.delay(function(){
  //     if (self.time > time)
  //       addMessage(options)
  //   }, wait)
  // },
  next: function(){
    debug('next (id #%d)', queue[0].id)
    new MessageView({message: queue[0]})
    queue[0].start()
  },
  clear: function(force){
    debug('clear force = %s', force)
    debug('queue = %j', queue)
    // Prevent delayed messages from loading
    this.setTimestamp()
    if (queue[0] && (!queue[0].keep || force)) {
      debug('dismissing message id = %d', queue[0])
      queue[0].dismiss()
    }
  }
})

module.exports = new MessageCollection()