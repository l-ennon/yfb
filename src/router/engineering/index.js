const _import = require('../_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/engineering/engineeringSearch',
    component: _import('pages/Engineering/EngineeringSearch')
  },
  {
    path: '/engineering/engineeringConfig',
    component: _import('pages/Engineering/EngineeringConfig')
  },
  {
    path: '/engineering/engineeringCollection',
    component: _import('pages/Engineering/EngineeringCollection')
  },
  /**
   * 工程项目详情
   * @type {String}
   */
  {
    name: 'engineeringInfo',
    path: '/engineering/engineeringInfo/:page',
    component: _import('pages/info/engineeringInfo')
  },
  {
    path: '/provincePicker',
    component: _import('pages/AreaSelector/provincePicker')
  }
]
