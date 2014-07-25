var _ = require('lodash')
var messages = require('./lib/message-collection')
// var debug = require('debug')('notifications')

var defaultsByType = {
  error: { keep: true },
  normal: { dismissAfter: 2.5 },
  success: { dismissAfter: 2.5 },
  progress: { safeFor: 1, delay: 500 }
}

module.exports = notify

function notify(type, message){
  if (!message) {
    message = type
    type = 'normal'
  }

  var options = _.isString(message)
    ? {message: message, type: type}
    : _.merge(message, {type: type})
  
  _.defaults(options, defaultsByType[type])

  return messages.addMessage(options)
}

notify.normal = notify.bind(null, 'normal')
notify.success = notify.bind(null, 'success')
notify.error = notify.bind(null, 'error')
notify.progress = notify.bind(null, 'progress')
notify.clear = messages.clear.bind(messages)