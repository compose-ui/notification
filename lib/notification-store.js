module.exports = NotificationStore

function NotificationStore() {
  this.notificationQueue = []
  this.hooks = []
}

NotificationStore.prototype.createNotification = function(payload) {
  if (payload.source !== 'notification')
    return null

  this.notificationQueue.push(payload.notification)
  this.releaseHooks()
}

NotificationStore.prototype.getNotification = function(cb) {
  if (this.notificationQueue.length > 0)
    cb(this.notificationQueue.shift())
  else
    this.hooks.push(cb)
}

NotificationStore.prototype.releaseHooks = function() {
  while (this.hooks.length > 0 && this.notificationQueue.length > 0) {
    var hook = this.hooks.shift()
      , notification = this.notificationQueue.shift()

    hook.call(hook, notification)
  }
}
