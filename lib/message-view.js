var _ = require('lodash')
var domify = require('domify')
var fs = require('fs')
var Wagon = require('compose-wagon')
var bean = require('bean')
var classie = require('classie')
var animevent = require('compose-animevent')
var debug = require('debug')('notifications:view')

var tpl = fs.readFileSync(__dirname + '/template.html', 'utf8')

module.exports = Wagon.extend({
  events: {
    'click .notification-close': 'dismiss'
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
        self.dismiss.call(self, event)
    }
    bean.on(document, 'keyup', this.handleKeyUp)

    document.body.appendChild(el)
    this.el = el
    return this
  },

  dismiss: function(event){
    debug('dismiss (id #%d)', this.message.id)
    if (event) event.preventDefault()
    animevent.one(this.el, 'end', this.remove.bind(this))
    classie.add(this.el, 'dismiss')
  }
})