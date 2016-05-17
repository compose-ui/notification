// Support for Object.assign
require('./lib/_object.assign')

var Notifier = require('./lib/notifier')

var defaultsByType = {
  error: { keep: true },
  normal: { dismissAfter: 2.5 },
  success: { dismissAfter: 2.5 },
  action: { safeFor: 1 },
}

function notify(type, message){
  // If no type is set, default to normal
  if (!message) {
    message = type
    type = 'normal'
  }
  
  // Add an alias
  if (type == 'progress') {
    type = 'action'
  }

  if (typeof message == 'string')
    message = { message: message }

  // Merge options and defaults
  options = Object.assign({}, defaultsByType[type], message, {type: type})

  return Notifier.addMessage(options)
}

// Add some helper functions for triggering message types
//
notify.normal = notify.bind(null, 'normal')
notify.success = notify.bind(null, 'success')
notify.error = notify.bind(null, 'error')
notify.action = notify.bind(null, 'action')
notify.progress = notify.bind(null, 'action')
notify.clear = Notifier.clear
notify.queue = Notifier.queue

module.exports = notify
