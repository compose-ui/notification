//Phantomjs doesn't have bind WTF RAGGGGEEEEEEEEEEE
require('es5-micro-shim')

var Notification = require('notification')
  , assert = require('chai').assert

describe('Compose Notification', function() {
  this.timeout(4000)
  it('shows the notification', function(done) {
    Notification.notify('sup')
    assert.equal(document.querySelector('.notification .notification-message').innerHTML, 'sup')
    var classes = document.querySelector('.notification').classList

    assert(Array.prototype.indexOf.call(classes, 'hidden') === -1)

    setTimeout(function() {
      assert(Array.prototype.indexOf.call(classes, 'hidden') !== -1)
      done()
    }, 3000)
  })
})
