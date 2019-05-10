import baseUrl from './baseUrl.js'
import dataApi from './dataApi'

const API = {
  // 用户信息
  getUserInfo: `${baseUrl}/yfb/getUserInfo.do`,
  // 模板 id
  getMyMember: `${baseUrl}/yfb/getMyMember.do`,
  // 详情信息
  getZBDetail: `${baseUrl}/yfb/getZBDetail.do`,
  // 是否可以查看详情
  checkZBDetail: `${baseUrl}/yfb/checkZBDetail.do`,
  // 搜索
  indexSeach: `${baseUrl}/yfb_new/indexSeach.do`,
  // 直接订阅
  zjdy: `${baseUrl}/yfb_new/zjdy.do`,
  // 订阅 list
  getDyInfoList: `${baseUrl}/yfb_new/getDyInfoList.do`,
  // 查看订阅信息
  dySettingPage: `${baseUrl}/yfb_new/dySettingPage.do`,
  // 更新订阅地区
  updateSubscription: `${baseUrl}/yfb_new/updateSubscription_Settings.do`,
  // 微信支付
  wechatPayOrders: `${baseUrl}/yfb/wechatPayOrders.do`,
  queryPayStats: `${baseUrl}/yfb/queryPayStats.do`,
  // 收藏文章
  clickSC: `${baseUrl}/yfb/clickSC.do`,
  // 取消收藏文章
  clickDisSC: `${baseUrl}/yfb/clickDisSC.do`,
  // 收藏列表
  scList: `${baseUrl}/yfb/scList.do`,
  // 微信验证
  fxParam: `${baseUrl}/yfb/fxParam.do`,
  // 验证图片验证码
  valimage: `${baseUrl}/bind/valimage.do`,
  // 发送短信验证码
  sendmsg: `${baseUrl}/bind/sendmsg.do`,
  // 保存手机号
  savephone: `${baseUrl}/bind/savephone.do`,
  // 首页十条信息
  indexpageten: `${baseUrl}/yfb_new/indexpageten.do`,
  action: `${baseUrl}/mvp/action.do`,
  /**
   * 3.0 新接口
   */
  // 获取订阅
  getsub: `${baseUrl}/wechat/member/subscription/getsub`,
  // 工程搜索
  indexsearch: `${baseUrl}/project/indexsearch`,
  // 详情
  projectdetail: `${baseUrl}/project/projectdetail`,
  // 修改订阅
  modify: `${baseUrl}/wechat/member/subscription/modify`,
  // 订阅工程项目
  mysubproject: `${baseUrl}/project/mysubproject`,
  // 会员工程信息
  getInformationMemberInfo: `${baseUrl}/members/getInformationMemberInfo`,
  // 工程信息付款
  start: `${baseUrl}/pay/information/member/start`,
  // 工程收藏列表
  projectsclist: `${baseUrl}/project/projectsclist`,
  // 详情收藏
  projectsc: `${baseUrl}/project/projectsc`,
  // 扣款
  consume: `${baseUrl}/members/consume`,
  // 工程会员地区合计
  projectVipArea: `${baseUrl}/members/getInformationMemberInfo/area`,
  // 查看剩余权限条数
  getConsumeInformationNumberMessage: `${baseUrl}/members/getConsumeInformationNumberMessage`,
  // 关键词联想
  keywords: `${baseUrl}/association/keywords`,
  // 关键词数量
  querykeycount: `${baseUrl}/yfb_new/querykeycount`,
  // 企业监控 支付
  unifiedorder: `http://rmt.qianlima.com/relation_pay/pay/relation/unifiedorder`,
  // companyName
  getlxr: `${baseUrl}/zbk/getlxr`,
  // 拉取用户填写信息
  selMemSource: `${baseUrl}/yfb/selMemSource`,
  // 上传用户信息
  upMemSource: `${baseUrl}/yfb/upMemSource`
}

export default Object.assign(API, dataApi)
