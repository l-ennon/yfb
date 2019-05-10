import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import '../common/scss/nprogress.scss'

import subscription from './subscription'
import search from './search'
import user from './user'
import engineering from './engineering'

// let isDevelopment = process.env.NODE_ENV === 'development'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)
NProgress.configure({
  showSpinner: false
  // template: `
  // <div
  //  class=""
  //  role="bar"
  //  style="width: 100%; height: 2px; background: #00BF12;position: fixed; top: 0"
  // ></div>
  // `
})

let routers = new Router({
  linkActiveClass: 'active',
  // mode: 'history',
  // scrollBehavior: (to, from) => {
    // return { x: 0, y: 0 }
  // },
  /**
   * [routes description]
   * @type {Array}
   */
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: _import('pages/Home/Index'),
      children: [
        {
          path: 'index',
          component: _import('pages/Search/Home')
        },
        subscription,
        {
          path: '/engineering',
          component: _import('pages/Engineering/Engineering')
        },
        {
          path: '/user',
          component: _import('pages/User/User')
        }
      ]
    },
    ...search,
    ...engineering,
    /**
     * info
     */
    {
      name: 'info',
      path: '/info/:page',
      component: _import('pages/info/info')
    },
    /**
     * exercise
     */
    {
      name: 'exercise',
      path: '/info/:page/exercise',
      component: _import('pages/exercise/exercise')
    },
    {
      path: '/index/subscription/setKeyWord',
      component: _import('pages/SetKeyword/SetKeyword')
    },
    ...user,
    {
      path: '/areaSelector',
      component: _import('pages/AreaSelector/areaSelector')
    },
    {
      path: '/user/addPhoneNumber',
      component: _import('pages/addPhoneNumber/addPhoneNumber')
    },
    // /**
    //  * iframe
    //  */
    // {
    //   name: 'iframe',
    //   path: '/iframe',
    //   component: _import('pages/exercise/iframe')
    // },
    // {
    //   path: '/sign',
    //   component: _import('pages/sign/sign')
    // },
    {
      path: '/test',
      component: _import('pages/test/test')
    },
    // {
    //   path: '/CityPicker',
    //   component: _import('pages/CityPicker/CityPicker')
    // },
    { path: '*', redirect: '/index' }
  ]
})
routers.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
routers.afterEach((router) => {
  NProgress.done()
  window.scrollTo(0, 0)
})

export default routers
