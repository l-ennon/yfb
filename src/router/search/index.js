const _import = require('../_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/index/search',
    component: _import('pages/Search/Search')
  }
]
