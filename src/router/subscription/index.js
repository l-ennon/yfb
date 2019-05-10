const _import = require('../_import_' + process.env.NODE_ENV)

export default {
  path: '/index/subscription',
  component: _import('pages/Subscription/Subscription'),
  children: [
    {
      path: 'mySubscriptions',
      component: _import('pages/Subscription/mySubscriptions')
    },
    {
      path: 'setSubscriptions',
      component: _import('pages/Subscription/setSubscriptions')
    }
  ]
}
