var Event = require('compose-event')
var domify = require('domify')

var template = '\
<div class="notification">\
  <div class="notification-content">\
    <div class="notification-message"></div>\
    <a class="notification-close" href="#" title="dismiss">\
      <span class="x_icon" aria-hidden="true"></span>\
      <span class="hidden_label">close</span>\
    </a>\
  </div>\
</div>\
'

var defaults = {
  message: 'Just what do you think you\'re doing, <strong>Dave</strong>.',
  safeFor: 2,
  keep: false
}

module.exports = {
  new: function(options) {
    return Object.assign({}, this, defaults, options)
  },

  show: function() {
    if (this.dismissAfter) {
      this.timeout = setTimeout(this.dismiss.bind(this), this.dismissAfter * 1000)
    }

    this.renderedAt = Date.now()
    var el = domify(template)

    el.querySelector('.notification-message').innerHTML = this.message

    if (this.type)
      el.classList.add(this.type)

    document.body.appendChild(el)
    this.el = el
    
    Event.keyOn('esc', this.remove.bind(this))
    Event.one(this.el, 'click', '.notification-close', this.remove.bind(this))

    return this
  },

  dismiss: function(){
    if (this.dismissAfter)
      clearTimeout(this.timeout)

    setTimeout(this.remove.bind(this), this.safeToRemoveIn())
  },

  remove: function(event) {
    Event.keyOff('esc')

    if (event) { event.preventDefault() }
    if(this.timeout) { clearTimeout(this.timeout) }

    // If classname causes animation, trigger destroy when animation completes
    Event.one(this.el, 'animationstart', function() { 
      Event.one(this.el, 'animationend', this.destroy.bind(this))
    }.bind(this))

    this.el.classList.add('dismiss')
  },

  destroy: function() {
    Event.off(this.el)
    this.el.parentNode.removeChild(this.el)

    Event.fire(this, 'remove')
  },

  // When is this allowed to be dismissed? (considers safeFor time)
  safeToRemoveIn: function() {
    return Math.max((this.renderedAt + this.safeFor * 1000) - Date.now(), 0)
  },

  // When will this be automatically dismissed?
  autoDismissIn: function() {
    if (this.dismissAfter)
      return Math.max((this.renderedAt + this.dismissAfter * 1000) - Date.now(), 0)
  },

  // A set of helpful properties for debugging
  info: function() {
    return {
      type: this.type,
      message: this.message,
      keep: this.keep,
      dismissAfter: this.dismissAfter,
      safeFor: this.safeFor,
      safeToRemoveIn: this.safeToRemoveIn(),
      autoDismissIn: (this.dismissAfter ? this.autoDismissIn() : 'not auto dismissed')
    }
  }
}
