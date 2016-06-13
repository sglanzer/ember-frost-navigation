import Ember from 'ember'
import layout from '../templates/components/nav-app-bar'
import transitions from 'ember-frost-navigation/transitions/frost-navigation'

const {
  getOwner
} = Ember

export default Ember.Component.extend({
  classNames: ['nav-app-bar'],
  layout,

  nav: Ember.inject.service('frost-navigation'),
  routingService: Ember.inject.service('-routing'),
  transitionService: Ember.inject.service('liquid-fire-transitions'),

  categories: Ember.computed.alias('nav.categories'),

  registerTransitions: Ember.on('init', function() {
    let navigationService = this.get('nav')
    // let routingService = this.get('routingService')
    let transitionService = this.get('transitionService')

    transitionService.map(transitions)

    // let currentRoute = routingService.get('currentRouteName')
    // currentRoute = currentRoute.slice(0, currentRoute.length - '.index'.length)

    let lookup = {
      navigation: navigationService,
      controller: this.get('targetObject'),
      // route: getOwner(this).lookup(`route:${currentRoute}`)
    }

    // lookup.route.setProperties({
    //   actions: {
    //     willTransition (transition) {
    //       lookup.navigation.set('activeCategory', null)
    //     }
    //   }
    // })

    lookup.navigation.addObserver(
      'activeCategory',
      lookup.navigation,
      function () {
        let active = lookup.navigation.get('activeCategory')
        if (active) {
          lookup.controller.set('activeCategory', active)
        }
      }
    )
  })
})
