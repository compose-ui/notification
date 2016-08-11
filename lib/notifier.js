var Message = require('./message')
var Event = require('compose-event')

var queue = []
var currentId = 0

var Notifier = {
  addMessage: function(options) {
    options = options || {}
    options.id = ++currentId

    var message = Message.new(options)
    
    Event.one(message, 'remove', this.removeMessage.bind(this))
    queue.push(message)


    if (queue.length > 1)
      queue[0].dismiss()
    else
      this.next()

    return message
  },

  currentMessage: function() {
    return queue[0]
  },

  removeMessage: function(){
    queue.splice(0, 1)

    this.next()
  },

  next: function(){
    if (queue.length)
      queue[0].show()
  },

  clear: function(force){
    if (queue.length < 0)
      return

    // Remove all messages next up in the queue
    queue.splice(1, queue.length)

    // Remove current message, respecting keep setting unless forced
    if (!queue[0].keep || force)
      queue[0].destroy()
    else
      queue[0].dismiss()
  },

  queue: function() {
    return queue
  }
}

module.exports = Notifier
