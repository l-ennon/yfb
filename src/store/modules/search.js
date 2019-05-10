import API from 'API'
/**
 * 搜索
 * @type {Object}
 * @param
 */
const state = {
  list: null,
  /**
   * 搜索 信息类型
   * @type {Number}
   */
  areaId: '',
  pageShow: false,
  /**
   * 非权限地址弹出
   * @type {Boolean}
   */
  toPage: false,
  keyCount: 0,
  type: null,
  hasNextPage: true,
  cityList: [],
  hasData: true,
  info: {},
  contentId: null,
  currPage: 1,
  isPayArea: false,
  keyword: null,
  /**
   * 新手导航
   * @type {Object}
   */
  isNeedNewbieGuider: false
}

const actions = {
  zjdyFn ({state, commit, dispatch}, {keywords}) {
    return dispatch('fetch', {
      url: API.zjdy,
      data: { keywords }
    })
  },
  /**
   * 搜索
   */
  indexSeach ({rootState, state, commit, dispatch}, {keywords, areaId, timeType}) {
    let {currPage, type, hasNextPage, isPayArea} = state
    let cType = 0
    if (type === 1) {
      cType = 4
    } else {
      cType = type || 0
    }
    if (hasNextPage) {
      return dispatch('fetch', {
        url: API.indexSeach,
        data: {
          isPayArea,
          currPage,
          timeType,
          type: cType,
          keywords,
          areaId
        }
      })
    }
  },
  /**
   * 行为统计
   * @param  {[type]} typed
   * 1: 点击弹窗去付款的人数
   * 4: 第一个页面点击的人数(removed)
   * 5: 点击`提交`的人数 选择地区
   * 6: 点击`填好了,去找业务`的人数 关键词
   * 7: 弹窗出现人数
   * 8: 从模板进入的人数
   * 9~16: AB测试, 已废弃
   * 17: 未知
   * 88: 首页弹出, 企业监控(司盛)
   * 18: 底部导航 / 首页
   * 19: 底部导航 / 招标订阅
   * 20: 底部导航 / 工程订阅
   * 21: 底部导航 / 会员
   *
   * 22: 首页 /index 顶部搜索
   * 23: 首页 /index 招标信息
   * 24: 首页 /index 工程信息
   * 25: 首页 /index 中标库
   * 26: 首页 /index 装修采购
   * 27: 首页 /index 招标采购
   * 28: 首页 /index 最新订阅详情
   *
   * 29: 招标搜索 /index/search 搜索
   * 30: 招标搜索 /index/search 购买地区
   * 31: 招标搜索 /index/search 选择地区
   * 32: 招标搜索 /index/search 时间段
   * 33: 招标搜索 /index/search 信息类型
   * 34: 招标搜索 /index/search 信息详情
   *
   * 35: 招标订阅 /index/subscription 我的订阅
   * 36: 招标订阅 /index/subscription 订阅设置
   *
   * 37: 我的订阅 /index/subscription/mySubscriptions 全部
   * 38: 我的订阅 /index/subscription/mySubscriptions 预告
   * 39: 我的订阅 /index/subscription/mySubscriptions 公告
   * 40: 我的订阅 /index/subscription/mySubscriptions 中标
   * 41: 我的订阅 /index/subscription/mySubscriptions 详情
   *
   * 42: 订阅设置 /index/subscription/setSubscriptions 修改订阅
   *
   * 43: 订阅关键词 /index/subscription/setKeyWord 添加关键词
   * 44: 订阅关键词 /index/subscription/setKeyWord 删除关键词
   * 45: 订阅关键词 /index/subscription/setKeyWord 添加地区
   * 46: 订阅关键词 /index/subscription/setKeyWord 删除地区
   * 47: 订阅关键词 /index/subscription/setKeyWord 开始订阅
   *
   * 48: 工程信息 /engineering 全部信息
   * 49: 工程信息 /engineering 订阅设置
   * 50: 工程信息 /engineering 我的收藏
   * 51: 工程信息 /engineering 详情
   *
   * 52: 工程搜索 /engineering/engineeringSearch 付费
   * 53: 工程搜索 /engineering/engineeringSearch 信息地区
   * 54: 工程搜索 /engineering/engineeringSearch 项目阶段
   * 55: 工程搜索 /engineering/engineeringSearch 项目类型
   * 56: 工程搜索 /engineering/engineeringSearch 立刻订阅
   * 57: 工程搜索 /engineering/engineeringSearch 详情
   *
   * 58: 我的 /user 续费
   * 59: 我的 /user 会员中心
   * 60: 我的 /user 我的收藏
   * 61: 我的 /user 关于我们
   * 85: 我的 /user 我的账户
   *
   * 62: 会员中心 /user/membership 我的会员
   * 63: 会员中心 /user/membership 会员特权
   * 64: 会员中心 /user/membership 我的会员 招标会员 开通会员
   * 65: 会员中心 /user/membership 我的会员 工程项目会员 开通会员
   * 66: 会员中心 /user/membership 会员特权 招标会员 开通会员
   * 67: 会员中心 /user/membership 会员特权 工程项目会员 开通会员
   *
   * 68: 开通招标采购会员 /user/joinMembership 添加地区
   * 69: 开通招标采购会员 /user/joinMembership 删除地区
   * 70: 开通招标采购会员 /user/joinMembership 服务协议
   *
   * 71: 开通招标采购会员 /user/joinMembership 选择 3 月
   * 72: 开通招标采购会员 /user/joinMembership 选择 6 月
   * 73: 开通招标采购会员 /user/joinMembership 选择 12 月
   * 74: 开通招标采购会员 /user/joinMembership 选择 1 月
   * 75: 开通招标采购会员 /user/joinMembership 去支付
   *
   * 76: 开通工程项目会员 /user/joinEngineering 添加
   * 77: 开通工程项目会员 /user/joinMembership 删除地区
   * 78: 开通工程项目会员 /user/joinEngineering 服务协议
   * 79: 开通工程项目会员 /user/joinEngineering 3 月
   * 80: 开通工程项目会员 /user/joinEngineering 6 月
   * 81: 开通工程项目会员 /user/joinEngineering 12 月
   * 82: 开通工程项目会员 /user/joinEngineering 去支付
   *
   * 83: 1元会员体验用户(司盛)
   *
   * 84: 去付费弹层 / 成为会员，获取商机
   */
  behaviour ({state, commit, dispatch}, {typed}) {
    return dispatch('fetch', {
      url: API.behaviour,
      data: { typed }
    })
  },
  association ({state, commit, dispatch}, {keywords}) {
    return dispatch('fetch', {
      url: API.keywords,
      data: { keywords }
    })
  },
  querykeycount ({state, commit, dispatch}, {keyword}) {
    return dispatch('fetch', {
      url: API.querykeycount,
      data: {
        keyword
      }
    })
  },
  clickpopup ({dispatch}) {
    return dispatch('fetch', {
      url: API.clickpopup
    })
  },
  associateClickCount ({dispatch}) {
    return dispatch('fetch', {
      url: API.associateClickCount
    })
  },
  getlxr ({dispatch}, {companyName}) {
    return dispatch('fetch', {
      url: API.getlxr,
      data: { companyName }
    })
  }
}

export default {state, actions}
