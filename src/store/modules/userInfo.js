import util from 'util'
import API from '../../API'

// console.log(process.env.NODE_ENV)
let openid = util.getUrlParam('openid')
/**
 * 用户信息都在这里 非会员
 * @type {Object}
 * @param openid: String = 用户 id
 * @param nickName: String = 用户姓名
 * @param userIcon: String = 用户头像
 */
let state = {
  openId: openid,
  /**
   * 会员过期及到期每天第一次弹框
   * @type {Boolean}
   */
  hasEjected: true,
  dengji: 0,
  informationMemberVipLevel: 4,
  /**
   * 每天可以免费查看的条数
   * @type Number
   */
  count: 2
}

const actions = {
  getUserInfo ({rootState, state, commit, dispatch}) {
    return dispatch('fetch', {
      url: API.getUserInfo
    }).then((response) => {
      rootState.userInfo = response.data
      return response
    })
  }
}

export default { state, actions }
