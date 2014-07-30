var notify = require('../')
var assert = require('chai').assert
var animevent = require('compose-animevent')
var sinon = require('sinon')

function assertMessage(type, message){
  var el = document.querySelector('.notification.'+type+' .notification-message')
  assert.isNotNull(el, 'Could not find '+'.notification.'+type+' .notification-message')
  assert.equal(el.innerHTML, message)
}

describe('notify', function() {
  before(function(){
    sinon.stub(animevent, 'one', function(el, eventType, callback){
      // setTimeout(callback, 1)
      callback()
    })
  })
  describe('default', function(){
    before(function(){
      this.msg = notify('hello test world.')
    })
    it('shows the notification', function() {
      assertMessage('normal', 'hello test world.')
    })
    after(clearNotification)
  })
  describe('normal', function(){
    describe('long form', function(){
      before(function(){
        this.msg = notify('normal', 'hello normal test world.')
      })
      it('shows the notification', function() {
        assertMessage('normal', 'hello normal test world.')
      })
      after(clearNotification)
    })
    describe('with helper', function(){
      before(function(){
        this.msg = notify.normal('hello normal 2 test world.')
      })
      it('shows the notification', function() {
        assertMessage('normal', 'hello normal 2 test world.')
      })
      after(clearNotification)
    })
  })

  describe('success', function(){
    describe('long form', function(){
      before(function(){
        this.msg = notify('success', 'hello success test world.')
      })
      it('shows the notification', function() {
        assertMessage('success', 'hello success test world.')
      })
      after(clearNotification)
    })
    describe('with helper', function(){
      before(function(){
        this.msg = notify.success('hello success 2 test world.')
      })
      it('shows the notification', function() {
        assertMessage('success', 'hello success 2 test world.')
      })
      after(clearNotification)
    })
  })

  describe('progress', function(){
    describe('long form', function(){
      before(function(){
        this.msg = notify('progress', 'hello progress test world.')
      })
      it('shows the notification', function() {
        assertMessage('progress', 'hello progress test world.')
      })
      after(clearNotification)
    })
    describe('with helper', function(){
      before(function(){
        this.msg = notify.progress('hello progress 2 test world.')
      })
      it('shows the notification', function() {
        assertMessage('progress', 'hello progress 2 test world.')
      })
      after(clearNotification)
    })
  })

  describe('with options object', function(){
    before(function(){
      this.msg = notify.progress({message: 'hello progress with options', dismissAfter: 2})
    })
    it('shows the notification', function() {
      assertMessage('progress', 'hello progress with options')
    })
    it('has the right options set', function(){
      assert.equal(this.msg.dismissAfter, 2)
    })
    after(clearNotification)
  })

  describe('clear', function(){
    before(function(done){
      this.msg = notify.progress("test progress")
      notify.clear()
      this.msg.once('remove', done)
    })
    it('removes notifications', function(){
      assert.isNull(document.querySelector('.notification'))
    })
  })
})

function clearNotification(done){
  this.msg.dismiss()
  setTimeout(done, 300)
}