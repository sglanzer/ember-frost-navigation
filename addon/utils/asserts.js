let b = '[ember-frost-navigation] - '
export default {
  environment: `${b}config/environment must have field frostNavigation.controller defined as the path to your controller (see dummy app for ember-frost-navigation)`,
  navType: `${b}opts.navType must be either 'category' or 'app'`,
  type: `${b}opts.type must be either 'engine' or 'route'`,
  categoryName: `${b}Property 'name' was not defined.`,
  categoryNotFound: `${b}Category does not exist!`
}