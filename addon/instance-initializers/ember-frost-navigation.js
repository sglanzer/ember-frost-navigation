import Ember from 'ember'
import transitions from 'ember-frost-navigation/transitions/frost-navigation'

export default {
  name: 'ember-frost-navigation',

  initialize (instance) {
    let navigation = instance.lookup('service:frost-navigation')

    Ember.RouterDSL.prototype.nav = function (componentName, opts = {}) {
      var temp = this.parent;
      return new Ember.RSVP.Promise((resolve, reject) => {
        opts.name = opts.name || componentName
        this[opts.type === 'engine' ? 'mount' : 'route'](componentName, opts)
        try {
          Ember.assert('opts.navType must be either \'category\' or \'app\'',
            opts.navType === 'category' || opts.navType === 'app')
          Ember.assert('opts.type must be either \'engine\' or \'route\'',
            opts.type === 'engine' || opts.type === 'route')
        } catch (e) {
          reject(e)
        }
        navigation.register(opts)
          .then((result) => {
            try {
              this.modal('nav-modal', {
                withParams: 'activeCategory',
                dialogClass: 'frost-navigation-modal',
                controller: temp
              })
            } catch (e) {
              reject(e)
            }
            resolve(result)
          })
          .catch(reject)
      }).catch(Ember.assert)
    }
  }
}
