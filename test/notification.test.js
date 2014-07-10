var Notification = require('../')
  , assert = require('chai').assert

describe('Compose Notification', function() {
  before(function(){
    Notification.notify('sup')
  })
  it('shows the notification', function(done) {
    this.timeout(4000)
    assert.equal(document.querySelector('.notification .notification-message').innerHTML, 'sup')
    var classes = document.querySelector('.notification').classList

    assert(Array.prototype.indexOf.call(classes, 'hidden') === -1)

    setTimeout(function() {
      assert(Array.prototype.indexOf.call(classes, 'hidden') !== -1)
      done()
    }, 3000)
  })
})
