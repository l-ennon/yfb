<template lang="pug">
.membership.absolute.column
  yfb-appbar(title="会员中心")
  //- 这里是 user 基本信息
  .membership-content
    .scroll-content
      .user-info-content
        .user-info.row
          .user-icon
            img(:src="userInfo.imgUrl")
          .user-type.column.main-between
            p.user-name
              span(v-text="userInfo.nickName")
              template(v-if="userInfo.dengji === 1")
                svg.vipicon.icon(aria-hidden="true")
                  use(xlink:href="#icon-vipicon-copy1")
            p.user-membership.t-gray(v-html="membershipText")
        .continue-btn
          div(@click="joinMembership")
            button.bg-yellow.t-red(v-if="userInfo.dengji === 1",data-track="续费") 续费
            button.bg-yellow.t-red(v-else,data-track="开通会员")  开通会员
      //- 会员已选
      .membership-box(v-if="userInfo.dengji === 1")
        .membership-title
          span.t-blue 当前会员地区
          span(v-text="membershipAreaText")
        .membership-pick-list
          ul
            li(v-for="pickCity in user.myMember.areaMap").pick-item.row
              .pick-time.column.main-justify
                p 到期时间
                p.t-red(v-text="pickCity.date")
              .pick-city.column.main-justify
                .city-list.row
                  p.t-gray(v-text="pickCity.area")
        .continue-btn
          button.bg-blue.t-white(@click="addArea",data-track="增加会员地区") 增加会员地区
      //- 特权
      .membership-box
        .membership-border-title.row
          .left-star.row.main-end.t-blue
            .hr.bg-blue
            svg.vipicon.icon(aria-hidden="true")
              use(xlink:href="#icon-xingxing2")
          .content-title
            p.title-text.t-blue 会员特权说明
          .right-star.row.t-blue
            .hr.bg-blue
            svg.vipicon.icon(aria-hidden="true")
              use(xlink:href="#icon-xingxing2")
        table
          thead
            tr
              td(colspan="2") 特权名称
              td 普通用户
              td vip用户
          tbody
            tr
              td.t-blue(rowspan="2") 搜索
              td 搜索信息次数
              td 不限
              td 不限
            tr
              td 搜索信息数量
              td 不限
              td 不限
          tbody
            tr
              td.t-blue(rowspan="2") 订阅
              td 关键词数量
              td 5个
              td 5个
            tr
              td 推送商机数量信息
              td 不限
              td 不限
          tbody
            tr
              td.t-blue 查看信息
              td 查看信息详情
              td.t-red(v-text="`${userInfo.count || 2}条/天`")
              td.t-red 不限
          //- tbody
          //-   tr
          //-     td.t-blue(rowspan="2") 企业监测
          //-     td 监测企业数量
          //-     td 不限
          //-     td 不限
          //-   tr
          //-     td 查看监测企业信息数量
          //-     td 不限
          //-     td 不限
      .membership-box
        .membership-border-title.row
          .left-star.row.main-end.t-blue
            .hr.bg-blue
            svg.vipicon.icon(aria-hidden="true")
              use(xlink:href="#icon-xingxing2")
          .content-title
            p.title-text.t-blue 会员价格说明
          .right-star.row.t-blue
            .hr.bg-blue
            svg.vipicon.icon(aria-hidden="true")
              use(xlink:href="#icon-xingxing2")
        table
          thead
            tr
              td 特权名称
              td 特权价格
          tbody
            tr
              td 1个市
              td
                span.t-red(v-text="`${price.city}元`")
                span /月
            tr
              td 1个省
              td
                span.t-red(v-text="`${price.province}元`")
                span /月
            tr
              td(v-text="`${userInfo.price && userInfo.price.pNumber}个省以上`")
              td
                span.t-red(v-text="`${price.country}元`")
                span /月
            tr
              td 全国
              td
                span.t-red(v-text="`${price.country}元`")
                span /月
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {YfbAppbar} from 'yfb'
export default {
  data () {
    return {
    }
  },

  mounted () {
    this.getMyMember()
  },

  computed: {
    // TODO: 将此处放在 store getters 内
    price () {
      if (this.userInfo.price) {
        return this.userInfo.price
      } else {
        return {city: 0, province: 0, country: 0}
      }
    },
    membershipAreaText () {
      let map = this.user.myMember.countMap
      // return map && ('(' + map.province + '个省' + map.city + '个市)')
      if (map) {
        if (map.province >= 99) {
          return '全国'
        } else {
          return `(${map.province}个省${map.city}个市)`
        }
      }
      return ''
    },
    membershipText () {
      return this.userInfo.dengji === 1 ? `会员到期时间: <span class="t-red"> ${this.userInfo.limitDate} </span>` : '开通会员享用更多权限'
    },
    ...mapState([
      'userInfo', 'user', 'subscription', 'search'
    ])
  },

  methods: {
    joinMembership () {
      this.user.isChange = true
      this.search.toPage = false
      if (this.userInfo.dengji === 1) {
        this.user.selectedCity = this.subscription.payCityList
      } else {
        this.user.selectedCity = this.subscription.freeCityList
      }
      this.$router.push('/user/joinMembership')
    },
    addArea () {
      this.user.isChange = true
      this.search.toPage = false
      this.user.selectedCity = this.subscription.payCityList
      this.$router.push('/areaSelector')
    },
    ...mapActions([
      'getUserInfo', 'getMyMember'
    ])
  },

  components: {
    YfbAppbar
  }
}
</script>

<style lang="scss">
@import "../../../common/scss/mixin.scss";
.membership {
  z-index: 2;
  .membership-content {
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
  }
  .user-info-content {
    background: #fff;
    padding-bottom: 20px;
  }
  .continue-btn {
    padding-left: 1rem;
    padding-right: 1rem;
    button {
      height: 40px;
      width: 100%;
      border-radius: 5px;
      font-size: 16px;
    }
  }
  @at-root .membership-box {
    margin: 15px 0;
    padding-bottom: 15px;
    background: #fff;
    font-size: 16px;
    .membership-title {
      padding-top: 10px;
      text-align: center;
    }
    .membership-border-title {
      padding-top: 15px;
      padding-bottom: 15px;
      .content-title {
        padding: 3px 10px;
        border: 1px solid #46a5fe;
        border-radius: 5px;
        margin-left: 10px;
        margin-right: 10px;
      }
      .right-star, .left-star {
        position: relative;
        flex: 1;
        .hr {
          position: absolute;
          top: 50%;
          height: 1px;
          width: 55px;
        }
        svg {
          position: absolute;
          top: 50%;
          font-size: 10px;
          transform: translateY(-50%);
        }
      }
      .right-star {
        .hr {
          left: 5px;
        }
        svg {
          left: 0px;
        }
      }
      .left-star {
        .hr {
          right: 5px;
        }
        svg {
          right: 0px;
        }
      }
    }
    @at-root .membership-pick-list {
      padding: 9px 15px;
      p {
        padding-top: 3px;
        padding-bottom: 3px;
      }
      .pick-item {
        margin-top: 9px;
        margin-bottom: 18px;
        border: 1px solid #b2b2b2;
        box-shadow: 0 4px 4px rgba(#b3b3b3, 0.5);
        border-radius: 5px;
        overflow: hidden;
        .pick-time {
          padding: 14px 8px;
          border-right: 1px solid #b2b2b2;
          text-align: center;
          background: #f5f6f7;
        }
        .pick-city {
          position: relative;
          flex: 1;
          padding: 14px 8px;
          .city-list {
            flex-flow: row wrap;
            p {
              padding-right: .5em;
            }
          }
          .corner {
            position: absolute;
            top: 0;
            right: 0;
            width: 15px;
            height: 15px;
            background: #45a5fd;
            border-top-right-radius: 5px;
            &::after {
              position: absolute;
              bottom: 0;
              left: 0;
              content: '';
              display: block;
              border-left: 8px solid rgb(255, 255, 255);
              border-bottom: 8px solid rgb(255, 255, 255);
              border-top: 8px solid rgba(255, 255, 255, 0);
              border-right: 8px solid rgba(255, 255, 255, 0);
            }
          }
        }
      }
    }
  }
}
</style>
