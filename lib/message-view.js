var _ = require('lodash')
var domify = require('domify')
var multiline = require('multiline')
var Wagon = require('compose-wagon')
var bean = require('bean')
var classie = require('classie')
var debug = require('debug')('notifications:view')

var tpl = multiline(function(){/*
  <div class="notification">
    <div class="notification-content">
      <div class="notification-message"></div>
      <a class="notification-close" href="#" title="dismiss">
        <span class="x_icon" aria-hidden="true"></span>
        <span class="hidden_label">close</span>
      </a>
    </div>
  </div>
*/})

module.exports = Wagon.extend({
  events: {
    'click .notification-close': 'close'
  },

  initialize: function(options){
    debug('initialize (id #%d)', options.message.id)
    this.message = options.message
    this.message.once('dismiss', this.dismiss.bind(this))
    this.render()
  },

  render: function(){
    debug('render (id #%d)', this.message.id)
    this.message.renderedAt = Date.now()
    var el = domify(tpl)
    el.querySelector('.notification-message').innerHTML = this.message.message

    if (this.message.type)
      classie.add(el, this.message.type)

    var self = this
    this.handleKeyUp = function(event){
      if (event.keyCode === 27)
        self.close.call(self, event)
    }
    bean.on(document, 'keyup', this.handleKeyUp)
    document.body.appendChild(el)
    this.el = el
    return this
  },

  close: function(event){
    debug('close (id #%d)', this.message.id)
    event.preventDefault()
    this.message.dismiss()
  },

  dismiss: function(){
    debug('dismiss (id #%d)', this.message.id)
    _.delay(this.remove.bind(this), 300)
  },

  remove: function(event){
    debug('remove (id #%d)', this.message.id)
    bean.off(document, 'keyup', this.handleKeyUp)
    Wagon.prototype.remove.call(this)
    debug('removed (id #%d)', this.message.id)
  }
})