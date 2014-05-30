require('./lib/polymer-platform.js')

var NotificationPrototype = Object.create(HTMLElement.prototype)
  , tpl = require('./index.html')
  , NotificationStore = require('./lib/notification-store')
  , dispatcher = require('./lib/notification-dispatcher')
  , store = new NotificationStore()

module.exports = {
  notify: notify
}

dispatcher.register(store.createNotification.bind(store))

NotificationPrototype.createdCallback = function() {
  this.innerHTML = tpl
  this.notificationContainer = this.querySelector('.notification')
  this.notificationMessage = this.querySelector('.notification-message')
  this.notificationQueue = []

  this.querySelector('a.notification-close')
      .addEventListener('click', this.dismiss.bind(this))

  this.fetchNotification()
}

NotificationPrototype.dismiss = function() {
  clearTimeout(this.displayTimeout)

  this.notificationContainer.classList.remove('error')
  this.notificationContainer.classList.remove('success') 
  this.notificationContainer.classList.remove('progress') 
  this.notificationContainer.classList.add('hidden') 
  this.notificationContainer.setAttribute('aria-hidden', true)

  this.notificationMessage.innerHTML = ''

  //Allow some breathing room in between notifications
  setTimeout(this.fetchNotification.bind(this), 300)
}

NotificationPrototype.fetchNotification = function() {
  store.getNotification(this.display.bind(this))
}

NotificationPrototype.display = function(notification) {
  this.notificationMessage.innerHTML = notification.message

  if (notification.type)
    this.notificationContainer.classList.add(notification.type)

  this.notificationContainer.classList.remove('hidden')
  this.notificationContainer.setAttribute('aria-hidden', false)

  this.displayTimeout = setTimeout(this.dismiss.bind(this), 3000)
}

document.registerElement('compose-notification', {
  prototype: NotificationPrototype
})

function notify(message, type) {
  dispatcher.createNotification({
    type: type,
    message: message
  })
}
