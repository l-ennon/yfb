const _import = require('../_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/user/membership',
    component: _import('pages/User/Membership/Membership')
  },
  {
    path: '/user/joinMembership',
    component: _import('pages/User/Join/JoinMembership')
  },
  {
    path: '/user/joinEngineering',
    component: _import('pages/User/Join/JoinEngineering')
  },
  {
    path: '/user/myProfile',
    component: _import('pages/User/MyProfile')
  },
  {
    path: '/user/myfavorite',
    component: _import('pages/User/Myfavorite')
  },
  // {
  //   path: 'howToUse',
  //   component: _import('pages/User/HowToUse')
  // },
  {
    path: '/user/aboutUs',
    component: _import('pages/User/AboutUs')
  },
  {
    path: '/user/agreement',
    component: _import('pages/User/agreement')
  },
  {
    path: '/user/explain',
    component: _import('pages/User/explain')
  }
]
