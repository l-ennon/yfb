import Vue from 'vue'
import Vuex from 'vuex'

import API from '../API'
import {fetch} from './actions/fetch'
import AREA from 'common/json/area.json'

import {user, userInfo, commonUtil, search, engineering, advertising, subscription} from './modules'
import util from 'util'

Vue.use(Vuex)

let mobanid = util.getUrlParam('mobanid')

let isDev = process.env.NODE_ENV === 'development'
const store = new Vuex.Store({
  modules: {
    userInfo,
    commonUtil,
    user,
    search,
    engineering,
    advertising,
    subscription,
    home: {
      namespaced: true,
      state: {
        tabs: [
          {
            to: '/index',
            title: '首页',
            icon: 'icon-shouye',
            dot: false
          },
          {
            to: '/index/subscription/mySubscriptions',
            title: '招标订阅',
            icon: 'icon-dingyue01',
            dot: !util.getLocalStorage('subscriptionsDot')
          },
          {
            to: '/engineering',
            title: '工程订阅',
            icon: 'icon-gongjuxiang',
            dot: false
          },
          {
            to: '/user',
            title: '会员',
            icon: 'icon-wode',
            dot: false
          }
        ]
      }
    }
  },
  state: {
    /**
     * 地区选择器, 不要动
     * @type {[type]}
     */
    area: AREA,
    /**
     * 订阅
     * @type {Object}
     */
    mobanid,
    checkedList: {},
    welcome: {
      indexPageConetntList: null
    },
    /**
     * 企业
     * @type {Object}
     */
    monitor: {
    },
    /**
     * 活动
     * @type {Object}
     */
    exercise: {
      0: {
        text: '查看甲方中标企业'
      }
    }
  },

  getters: {
  },

  mutations: {
    toZXCG () {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdaf24f2e9517b2bc&redirect_uri=http%3a%2f%2fscyy.qianlima.com%2fcxt_wechat%2fbusiness%2fgetopenid%3fyfbOpenId%3d' + util.getUrlParam('openid') + '%26flag%3d1&response_type=code&scope=snsapi_base#wechat_redirect'
    },
    searchArea (state) {
      Vue.set(state.search, 'list', util._areaSetFn(state, {areaId: [state.search.areaId]}))
    },
    /**
     * @param areaId @type Array
     * @param isPayArea @type Boolean
     */
    areaSet (state, {areaId, isPayArea}) {
      let {list, cityCount, areaCount, countryCount} = util._areaSetFn(state, {areaId})
      let subscription = state.subscription
      let selectedCity = isPayArea ? subscription['payCityList'] : subscription['freeCityList']

      selectedCity.cityCount = cityCount
      selectedCity.areaCount = areaCount
      selectedCity.countryCount = countryCount
      Vue.set(selectedCity, 'cityList', list)
    },
    setChecked (state, {contentid}) {
      state.checkedList[contentid] = true
    },
    delMobanId (state) {
      state.mobanid = ''
    },
    getMobanId (state, {mobanid}) {
      state.mobanid = mobanid
    }
  },

  actions: {
    fetch,
    action ({state, commit, dispatch}, {logType}) {
      return dispatch('fetch', {
        url: API.action,
        data: {
          logType
        }
      })
    },
    valimage ({state, commit, dispatch}, {yzmCode}) {
      return dispatch('fetch', {
        url: API.valimage,
        data: {
          yzmCode
        }
      })
    },
    sendmsg ({state, commit, dispatch}, {phoneNum}) {
      return dispatch('fetch', {
        url: API.sendmsg,
        data: {
          phoneNum
        }
      })
    },
    savephone ({state, commit, dispatch}, {phoneNum, code}) {
      return dispatch('fetch', {
        url: API.savephone,
        data: {
          phoneNum,
          code
        }
      })
    },
    indexpageten ({state, commit, dispatch}) {
      return dispatch('fetch', {
        url: API.indexpageten,
        data: {
          dengji: state.userInfo.dengji
        }
      }).then((response) => {
        state.welcome.indexPageConetntList = response.data
        return response
      }).catch((err) => {
        console.log(err)
      })
    },
    updateSubscription ({state, commit, dispatch}, {keywords, freeArea}) {
      commit('setLoadingShow', {isShow: true})
      return dispatch('fetch', {
        url: API.updateSubscription,
        data: {
          keywords,
          freeArea
        }
      })
    },
    dySettingPage ({state, commit, dispatch}) {
      commit('setLoadingShow', {isShow: true})
      return dispatch('fetch', {
        url: API.dySettingPage
      }).then(response => {
        state.subscription.setUpdata = false
        let data = response.data
        /**
         * 设置 keyword
         */
        if (data.keywords !== '') {
          state.subscription.keywords = data.keywords.split(',')
        } else {
          state.user.setKeywordFirst = true
        }
        /**
         * 设置订阅地区
         */
        let freeList = data.freeArea.split(',')
        commit('areaSet', {areaId: freeList})
        /**
         * 设置会员地区
         */
        if (data.payArea !== undefined) {
          let payList = data.payArea.split(',')
          commit('areaSet', {areaId: payList, isPayArea: true})
        }
      })
    },
    // 隐藏右上角
    hide ({state, commit, dispatch}) {
      dispatch('fetch', {
        url: API.fxParam,
        data: {}
      }).then((res) => {
        let {appid, timestamp, nonceStr, configSign} = res.data
        window.wx.config({
          debug: false,
          appId: appid,
          timestamp,
          nonceStr,
          signature: configSign,
          jsApiList: ['hideOptionMenu', 'chooseWXPay']
        })
      }).then(() => {
        window.wx.ready(() => {
          window.wx.hideOptionMenu()
        })
      })
    },
    /**
     * TODO 函数分离
     */
    async wechatPayOrders ({state, commit, dispatch}, {totfee, totime, area}) {
      if (!area) {
        dispatch('setToast', {text: '请选择地区'})
        state.user.isPayOk = false
        return
      }
      commit('setLoadingShow', {isShow: true})
      let response = await dispatch('fetch', { url: API.wechatPayOrders, data: { totfee, totime, area } })
      let {appId, signature, timeStamp, nonceStr, signType, paySign, out_trade_no} = response.data
      let packagea = response.data.package
      window.wx.config({
        debug: isDev,
        appId,
        timestamp: timeStamp,
        nonceStr,
        signature,
        jsApiList: ['chooseWXPay']
      })
      await dispatch('chooseWXPay', {appId, timeStamp, nonceStr, packagea, signType, paySign})
      await dispatch('queryPayStats', {out_trade_no})
    },

    async start ({state, commit, dispatch}, {monthsNumber, totfee, vipLevel, provinceId}) {
      let response = await dispatch('fetch', {
        url: API.start, data: {monthsNumber, totfee, vipLevel, provinceId}
      })
      let {appId, configSign: signature, timeStamp, nonceStr, signType, paySign} = response.data
      let packagea = response.data.package
      window.wx.config({
        debug: isDev,
        appId,
        timeStamp,
        nonceStr,
        signature,
        jsApiList: ['chooseWXPay']
      })
      await dispatch('chooseWXPay', {appId, timeStamp, nonceStr, packagea, signType, paySign})
      await dispatch('getUserInfo')
    },

    async unifiedorder ({state, commit, dispatch}, {totalFee}) {
      let response = await dispatch('fetch', {
        url: API.unifiedorder, data: {totalFee}
      })
      let {appId, configSign: signature, timeStamp, nonceStr, signType, paySign} = response.data
      let packagea = response.data.package
      window.wx.config({
        debug: isDev,
        appId,
        timeStamp,
        nonceStr,
        signature,
        jsApiList: ['chooseWXPay']
      })
      await dispatch('chooseWXPay', {appId, timeStamp, nonceStr, packagea, signType, paySign})
    },
    chooseWXPay ({state, commit, dispatch}, {appId, timeStamp, nonceStr, packagea, signType, paySign}) {
      return new Promise((resolve, reject) => {
        window.wx.chooseWXPay({
          appId,
          timestamp: timeStamp,
          nonceStr,
          package: packagea,
          signType,
          paySign,
          success (response) {
            state.user.isPayOk = true
            resolve(response)
          }
        })
      })
    },
    queryPayStats ({state, commit, dispatch}, {out_trade_no}) {
      return dispatch('fetch', {
        url: API.queryPayStats,
        data: {
          out_trade_no
        }
      }).then(() => {
        dispatch('getMyMember')
        dispatch('getUserInfo').then(() => {
          this.subscription.setUpdata = true
        })
      })
    },
    /**
     *
     */
    getDyInfoList ({state, commit, dispatch}, {currPage}) {
      let mobanid = state.mobanid
      let {type, isPayArea} = state.subscription
      return dispatch('fetch', {
        url: API.getDyInfoList,
        data: {
          mobanid,
          type,
          currPage,
          isPayArea
        }
      })
    },
    checkZBDetail ({state, commit, dispatch}, {contentid, areaId}) {
      commit('setLoadingShow', {isShow: true})
      return dispatch('fetch', {
        url: API.checkZBDetail,
        data: {
          contentid,
          areaId
        }
      }).then((response) => {
        let {canView, isCeiling} = response.data
        /**
         * 填写电话
         */
        // if (needPhone) {
        //   return 0
        // }
        /**
         * 能否查看
         */
        if (canView) {
          return 1
        } else {
          if (isCeiling && state.userInfo.dengji === 1) {
            commit('setLog', {isShow: true})
          } else {
            return 2
          }
        }
      })
    },
    getZBDetail ({state, commit, dispatch}, {contentid, mobanid}) {
      let {dengji} = state.userInfo
      commit('setLoadingShow', {isShow: true})
      if (state.userInfo.dengji === undefined) {
        dispatch('getUserInfo').then(() => {
          dispatch('getZBDetailFn', {
            contentid,
            mobanid,
            dengji
          })
        })
      } else {
        dispatch('getZBDetailFn', {
          contentid,
          mobanid,
          dengji
        })
      }
    },
    getZBDetailFn ({state, commit, dispatch}, {contentid, mobanid}) {
      commit('setLoadingShow', {isShow: true})
      let {dengji} = state.userInfo
      dispatch('fetch', {
        url: API.getZBDetail,
        data: {
          mobanid,
          dengji,
          contentid
        }
      }).then(response => {
        commit('setLoadingShow', {isShow: false})
        state.search.info = response.data
      })
    },
    getMyMember ({state, commit, dispatch}) {
      dispatch('fetch', {
        url: API.getMyMember
      }).then((res) => {
        state.user.myMember = res.data
      })
    },
    /**
     *
     */
    changeSelectCity ({ state, commit }, idList) {
      let {curSelectedCityType, area} = state
      state.curSelectedCity = state[curSelectedCityType].selectedCity
      area.forEach((allArea) => {
        idList.forEach((idl) => {
          let area = allArea.id
          let id = allArea.id
          let name = allArea.name
          if (allArea.id === idl) {
            let type = 'area'
            commit('addSelectCity', {
              area, id, name, type
            })
            return
          }
        })
        allArea.hasCity.forEach((city) => {
          idList.forEach((idl) => {
            let area = allArea.id
            let id = city.id
            let name = city.name
            if (idl === city.id) {
              let type = 'city'
              commit('addSelectCity', {
                area, id, name, type
              })
            }
          })
        })
      })
    },
    clickSC ({ state, commit, dispatch }, {contentid}) {
      commit('setLoadingShow', {isShow: true})
      return dispatch('fetch', {
        url: API.clickSC,
        data: {
          contentid
        }
      })
    },
    clickDisSC ({ state, commit, dispatch }, {contentid}) {
      commit('setLoadingShow', {isShow: true})
      return dispatch('fetch', {
        url: API.clickDisSC,
        data: {
          contentid
        }
      })
    },
    scListFn ({ state, commit, dispatch }) {
      if (!state.user.updata) return
      commit('setLoadingShow', {isShow: true})
      let {currentpage} = state.user.scList
      return dispatch('fetch', {
        url: API.scList,
        data: {
          currentpage: ++currentpage
        }
      }).then(res => {
        let {count, currentpage} = res.data
        if (count === currentpage) {
          state.user.updata = false
        }
        state.user.scList = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    /*
     * 获取招标信息
     */
    GET_ZB_LIST ({ state, commit, dispatch }) {
      const { bidding } = state
      let { currentType, pickCity } = bidding
      /*
       * 如果 true 为第一次登陆
       * let constent = bidding.currentList ? bidding.currentList : bidding.all
       */
      if (!bidding[currentType].hasData) {
        if (bidding[currentType].first) {
          dispatch('setToast', {text: '没有新的信息了'})
        }
        return
      }

      // loding show
      commit('setLoadingShow', {isShow: true})
      return Vue.http.post(API.bidding, {
        openid: state.userInfo.openId,
        type: bidding[currentType].type,
        currentPage: ++bidding[currentType].currentPage
      }).then((response) => {
        // loding hide
        let content = response.data

        if (response.ok) {
          if (!bidding.key) bidding.key = content.key
          if (!content.zblist.length) {
            bidding[currentType].hasData = false
            bidding[currentType].first = false
            return
          }
            /*
             * 不能用 concat, 会改变内存指向
             */
          content.zblist.forEach(context => {
            bidding[currentType].list.push(context)
          })

          if (!pickCity.length) {
            bidding.pickCity = content.pickCity
          }
        }
      }).catch((err) => {
        throw new Error(err)
      })
    }
  }
})

export default store
