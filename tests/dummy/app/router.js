import Ember from 'ember'
import config from './config/environment'

var Router = Ember.Router.extend({
  location: config.locationType
})
Router.map(function () {
  let routerConfig = config.APP.routingConfig

  this.nav('demo', {
    model: routerConfig.categories
  }, function () {
    this.category('category1', {}, function () {
      this.column('column1', {
        color: 'green'
      }, function () {
        this.app('app1', {
          description: 'description1',
          icon: 'sample'
        })
        this.section('section1', function () {
          this.action('action1', {
            action: 'doThis'
          })
          this.app('app2')
        })
      })
      this.column('column2')
    })
  })

  this.route('demo', { path: '/' }, function () {
    this.route('go')
  })
})

export default Router
