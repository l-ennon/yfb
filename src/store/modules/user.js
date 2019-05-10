import util from 'util'
import API from 'API'
/**
 * 我的信息
 * @type {Object}
 */
let firstcom = util.getUrlParam('firstcom') || 0
const state = {
  firstcom,
  setKeywordFirst: false,
  // 是否从订阅进入
  isDy: false,
  updata: true,
  isPayOk: false,
  myMember: [],
  flag: false,
  /**
   * 是否在地区选择器里做了选择
   */
  isChange: false,
  scList: {
    count: 0,
    zblist: [],
    currentpage: 0
  },
  selectedCity: {
    countryCount: 0,
    cityCount: 0,
    areaCount: 0,
    cityList: {}
  }
}

const actions = {
  selMemSource ({state, commit, dispatch}) {
    return dispatch('fetch', {
      url: API.selMemSource
    })
  },
  upMemSource ({state, commit, dispatch}, {name, companyName, phone, code}) {
    return dispatch('fetch', {
      url: API.upMemSource,
      data: {name, companyName, phone, code}
    })
  }
}

export default {state, actions}
