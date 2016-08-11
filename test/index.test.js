var assert = require('chai').assert

var notify = require('../')
var event = require('compose-event')
var $ = function(str) { return document.querySelector(str) }

function clear(done){
  this.msg.remove()
  setTimeout(done, 10)
}

function assertMessage(type, message){
  var el = $('.notification.'+type+' .notification-message')
  assert.isNotNull(el, 'Could not find '+'.notification.'+type+' .notification-message')
  assert.equal(el.innerHTML, message)
}

function testType(type) {
  describe(type, function() {
    it('shows a '+type+' message', function(){
      var content = 'test '+type+' message'
      if (type == 'default') {
        this.msg = notify(content)
        assertMessage('normal', content)
      } else {
        this.msg = notify[type](content)
        assertMessage(type, content)
      }
    })
    after(clear)
  })
}

describe('Notifier', function(){
  testType('default')
  testType('normal')
  testType('error')
  testType('action')
  testType('success')

  describe('queue', function() {
    it('queues messages', function() {
      notify('normal', '1')
      notify('normal', '2')
      notify('progress', '3')
      notify('success', '4')

      assert.equal(notify.queue().length, 4)
    })

    it('clears all queued messages', function(done) {
      notify.clear(true)
      setTimeout(function() {
        assert.equal(notify.queue().length, 0)
        done()
      }, 20)
    })

    it('removes messages when their time elapses', function(done) {
      var msg = notify('normal', { message: 'countdown test', safeFor: .02, dismissAfter: .03 })
      var remaining = msg.autoDismissIn()
      
      // Ensure that message is not removed before safeFor elapses
      setTimeout(function() {
        assert.equal(notify.queue().length, 1)
      }, remaining - 1)
      
      // Ensure that message is removed after safeFor time elapses
      setTimeout(function() {
        assert.equal(notify.queue().length, 0)
        done()
      }, remaining + 40)
    })
  })
})

