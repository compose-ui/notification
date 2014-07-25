var notify = require('../')
var assert = require('chai').assert

function assertMessage(type, message){
  var el = document.querySelector('.notification.'+type+' .notification-message')
  assert.isNotNull(el, 'Could not find '+'.notification.'+type+' .notification-message')
  assert.equal(el.innerHTML, message)
}

describe('notify', function() {
  describe('default', function(){
    before(function(){
      this.msg = notify('hello test world.')
    })
    it('shows the notification', function() {
      assertMessage('normal', 'hello test world.')
    })
    after(function(done){
      this.msg.dismiss(1)
      setTimeout(done, 300)
    })
  })
  describe('normal', function(){
    describe('long form', function(){
      before(function(){
        this.msg = notify('normal', 'hello normal test world.')
      })
      it('shows the notification', function() {
        assertMessage('normal', 'hello normal test world.')
      })
      after(function(done){
        this.msg.dismiss(1)
        setTimeout(done, 300)
      })
    })
    describe('with helper', function(){
      before(function(){
        this.msg = notify.normal('hello normal 2 test world.')
      })
      it('shows the notification', function() {
        assertMessage('normal', 'hello normal 2 test world.')
      })
      after(function(done){
        this.msg.dismiss(1)
        setTimeout(done, 300)
      })
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
      after(function(done){
        this.msg.dismiss(1)
        setTimeout(done, 300)
      })
    })
    describe('with helper', function(){
      before(function(){
        this.msg = notify.success('hello success 2 test world.')
      })
      it('shows the notification', function() {
        assertMessage('success', 'hello success 2 test world.')
      })
      after(function(done){
        this.msg.dismiss(1)
        setTimeout(done, 300)
      })
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
      after(function(done){
        this.msg.dismiss(1)
        setTimeout(done, 300)
      })
    })
    describe('with helper', function(){
      before(function(){
        this.msg = notify.progress('hello progress 2 test world.')
      })
      it('shows the notification', function() {
        assertMessage('progress', 'hello progress 2 test world.')
      })
      after(function(done){
        this.msg.dismiss(1)
        setTimeout(done, 300)
      })
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
    after(function(done){
      this.msg.dismiss(1)
      setTimeout(done, 300)
    })
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
