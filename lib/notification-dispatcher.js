var Dispatcher = require('flux-dispatcher')
  , NotificationDispatcher = new Dispatcher()

module.exports = NotificationDispatcher

NotificationDispatcher.createNotification = function(notification) {
  this.dispatch({
    source: 'notification',
    notification: notification
  })
}
