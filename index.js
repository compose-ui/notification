var fs = require('fs')
var tpl = fs.readFileSync(__dirname + '/index.html', 'utf8')

var domify = require('domify')
var bean = require('bean')
var classie = require('classie')

var NotificationStore = require('./lib/notification-store')
var store = new NotificationStore()
var dispatcher = require('./lib/notification-dispatcher')
var displayTimeout = null

var el, notificationMessage

module.exports = {
  notify: notify
}

//Register Notification Store with our Notification Dispatcher
dispatcher.register(store.createNotification.bind(store))

//Kick off notification listening
fetchNotification()

function dismiss() {
  clearTimeout(displayTimeout)

  classie.remove(el, 'error')
  classie.remove(el, 'success')
  classie.remove(el, 'progress')
  classie.add(el, 'hidden')
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
    document.body.insertBefore(domify(tpl), document.body.firstChild)
    el = document.querySelector('.notification')
    bean.on(el.querySelector('a.notification-close'), 'click', dismiss)
    notificationMessage = el.querySelector('.notification-message')
  }

  notificationMessage.innerHTML = notification.message

  if (notification.type)
    classie.add(el, notification.type)

  classie.remove(el, 'hidden')
  el.setAttribute('aria-hidden', false)

  displayTimeout = setTimeout(dismiss, 3000)
}

function notify(message, type) {
  dispatcher.createNotification({
    type: type,
    message: message
  })
}
