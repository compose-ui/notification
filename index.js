var domify = require('domify')
  , tpl = require('./index.html')
  , el
  , notificationMessage
  , NotificationStore = require('./lib/notification-store')
  , store = new NotificationStore()
  , dispatcher = require('./lib/notification-dispatcher')
  , displayTimeout = null

module.exports = {
  notify: notify
}

//Register Notification Store with our Notification Dispatcher
dispatcher.register(store.createNotification.bind(store))

//Kick off notification listening
fetchNotification()

function dismiss() {
  clearTimeout(displayTimeout)

  el.classList.remove('error')
  el.classList.remove('success')
  el.classList.remove('progress')
  el.classList.add('hidden')
  el.setAttribute('aria-hidden', true)

  notificationMessage.innerHTML = ''

  //Allow some breathing room in between notifications
  setTimeout(fetchNotification, 300)
}

function fetchNotification() {
  store.getNotification(display)
}

function display(notification) {
  //Add notification
  if (!el) {
    var body = document.querySelector('body')
    body.insertBefore(domify(tpl), body.firstChild)
    el = body.querySelector('.notification')
    el.querySelector('a.notification-close').addEventListener('click', dismiss)
    notificationMessage = el.querySelector('.notification-message')

  }

  notificationMessage.innerHTML = notification.message

  if (notification.type)
    el.classList.add(notification.type)

  el.classList.remove('hidden')
  el.setAttribute('aria-hidden', false)

  displayTimeout = setTimeout(dismiss, 3000)
}

function notify(message, type) {
  dispatcher.createNotification({
    type: type,
    message: message
  })
}
