
/**
 * 订阅信息
 * @type {Object}
 */
const state = {
  namespaced: true,
  myUpdata: true,
  setUpdata: true,
  type: 0,
  toMySubscriptions: false,
  keywords: [],
  isPayArea: false,
  freeCityList: {
    countryCount: 0,
    cityCount: 0,
    areaCount: 0,
    cityList: {}
  },
  payCityList: {
    countryCount: 0,
    cityCount: 0,
    areaCount: 0,
    cityList: {}
  }
}
const mutations = {
  setToMySubscriptions (state, type) {
    state.toMySubscriptions = type
  }
}

export default {namespaced: true, state, mutations}
