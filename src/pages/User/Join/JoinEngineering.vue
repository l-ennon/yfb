<template lang="pug">
  .join-engineering.column
    yfb-appbar(title="开通工程项目会员")
    .join-engineering-content
      .scroll-content
        .join-content
          .join-body
            .join-body-title
              .title
                yfb-title(title="选择会员地区")
                  span.t-blue(v-text="pickNum")
            pronice-box(
              :selectCitys="cityList",
              :addButton="true",
              :removeButton="true",
              @add="add",
              @remove="remove"
            )
          .join-body
            .join-body-title
              .title.row.main-between
                yfb-title(title="会员套餐")
                div(@click="agreement")
                  router-link(to="/user/agreement",tag="div")
                    span.agreement 服务协议
                      svg.icon(aria-hidden="true")
                        use(xlink:href="#icon-aright")
              .pick-type-list
                ul
                  li.row.pick-option(
                    v-for="(val, key) in pickList",
                    @click="pickOption(key)",
                    :class="{picked: currentIndex === key}"
                  )
                    .pick-explain
                      join-pick-btn(:picked="currentIndex === key")
                        p.month(v-text="`${val.month}个月`")
                    .pick-num
                      p.t-red(v-text="`￥${val.price}/省`")
                      p.number.t-gray(v-text="`${val.number}条项目/省`")
                    .pick-icon
                      icon(icon="icon-xuanzhong")
          //- .ps
          //-   router-link(to="/user/explain",tag="div")
          //-     span 价格说明?
          .join-footer.row
            .join-number(v-html="payText")
            .join-pay(
              @click="payStart",
              :class="{'can-pay': canPay}"
            ) 去支付
</template>

<script>
import {YfbAppbar, ProniceBox, YfbTitle} from 'yfb'
import {mapState, mapMutations, mapActions} from 'vuex'
import {Icon} from 'components'
import joinPickBtn from './child/joinPickBtn.vue'

export default {
  name: 'joinMembership',

  activated () {
  },

  deactivated () {
  },

  data () {
    return {
      currentIndex: 0,
      pickList: [
        {
          price: 280,
          month: 3,
          number: 50
        },
        {
          price: 480,
          month: 6,
          number: 100
        },
        {
          price: 680,
          month: 12,
          number: 200
        }
      ]
    }
  },

  computed: {
    payText () {
      let {selectedCity} = this.engineering
      let length = Object.keys(selectedCity).length
      if (selectedCity[2703]) {
        return `<span class="t-red">全国, 合计<span class="t-red number">${this.payPrice}</span>元`
      } else {
        return `<span class="t-red">${length}</span>个省, 合计<span class="t-red number">${this.payPrice}</span>元`
      }
    },
    cityList () {
      return this.engineering.selectedCity
    },
    payPrice () {
      let {pickList, currentIndex} = this
      let {selectedCity} = this.engineering
      let length = Object.keys(selectedCity).length
      let pickedMonthPrice = currentIndex === null ? 0 : pickList[currentIndex].price
      if (selectedCity[2703]) {
        return pickedMonthPrice * (this.area.length - 1)
      } else {
        return pickedMonthPrice * length
      }
    },
    pickNum () {
      let {selectedCity} = this.engineering
      let length = Object.keys(selectedCity).length
      if (selectedCity[2703]) {
        return `(全国)`
      } else if (length) {
        return `(${length}个省)`
      } else {
        return ''
      }
    },
    canPay () {
      let totfee = !!this.payPrice
      return totfee
    },
    ...mapState([
      'area', 'user', 'userInfo', 'subscription', 'search', 'engineering'
    ])
  },

  methods: {
    agreement () {
      this.behaviour({typed: 78})
    },
    payStart () {
      if (!this.payPrice) return
      this.behaviour({typed: 82})
      let monthsNumber = [3, 6, 12][this.currentIndex]
      let totfee = this.payPrice
      let vipLevel = this.currentIndex + 1
      let provinceId = Object.keys(this.engineering.selectedCity).join(',')
      this.start({monthsNumber, totfee, vipLevel, provinceId}).then(() => {
        this.$router.back()
      })
    },
    pickOption (i) {
      this.behaviour({typed: i + 79})
      let {currentIndex} = this
      this.currentIndex = currentIndex === i ? null : i
    },
    add () {
      this.behaviour({typed: 76})
      this.$router.push('/provincePicker')
    },
    /**
     * 删除已经添加的地区
     */
    remove ({provinceId}) {
      this.behaviour({typed: 77})
      this.$delete(this.engineering.selectedCity, provinceId)
      // let {areaId, cityId} = id
      // let list = this.user.selectedCity.cityList
      // this.$delete(list[areaId], cityId)
      // if (Object.values(list[areaId]).length === 0) {
      //   this.$delete(list, areaId)
      // }
      // /**
      //  * 删除省
      //  */
      // if (areaId === cityId) {
      //   this.user.selectedCity.areaCount--
      // } else {
      //   this.user.selectedCity.cityCount--
      // }
    },
    ...mapMutations([
      'setLoadingShow', 'searchArea'
    ]),
    ...mapActions([
      'start', 'behaviour'
    ])
  },

  watch: {
    'user.isPayOk': function (val) {
      if (val) {
        this.user.isPayOk = false
        this.$router.push('/user/membership')
      }
    }
  },

  components: {
    YfbAppbar, ProniceBox, YfbTitle, Icon, joinPickBtn
  }
}
</script>

<style lang="scss">
@import "../../../common/scss/mixin.scss";
.join-engineering {
  height: 100%;
  z-index: 1;
}
.join-engineering-content {
  position: relative;
  flex-grow: 1;
  .join-content {
    position: relative;
    min-height: 100%;
    padding-bottom: px2rem(80);
    .join-body {
      margin-top: 0
    }
  }
  .join-footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    flex-shrink: 0;
    height: px2rem(100);
    line-height: px2rem(100);
    background: #fff;
    overflow: hidden;
    .join-number {
      flex-grow: 1;
      font-size: 14px;
      padding-left: 12px;
      .number {
        font-size: 16px;
      }
      span {
        padding: 0 5px;
      }
    }
    .join-pay {
      width: px2rem(300);
      font-size: 16px;
      text-align: center;
      color: #fff;
      background: rgb(204, 204, 204);
      &.can-pay {
        color: #fff;
        background: rgb(246, 70, 62);
      }
    }
  }
  .join-body {
    background: #fff;
    .join-body-title {
      padding-left: 12px;
      .agreement {
        padding-right: 6px;
      }
      .title {
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 15px;
        border-bottom: 1px solid #d8d8d8;
      }
      .title-head {
        border-left: 4px solid #46a5fe;
      }
    }
  }
  .pick-type-list {
    font-size: 16px;
    li {
      border-bottom: 1px solid #d8d8d8;
      &:last-child {
        border: none;
      }
    }
    .pick-option {
      align-items: center;
      padding-top: 1em;
      padding-bottom: 1em;
      &.picked {
        .pick-icon {
          color: #0094fe
        }
      }
      .pick-explain {
        width: 20%;
        .month {
          font-weight: bold;
          font-size: px2rem(26);
        }
      }
      .pick-num {
        flex-grow: 1;
        text-align: center;
      }
      .pick-icon {
        width: 20%;
        padding-right: 12px;
        font-size: 30px;
        color: rgb(204, 204, 204);
        text-align: right;
      }
    }
    .pay {
      flex: 1;
      line-height: 30px;
      .icon {
        position: relative;
        top: 3px;
        vertical-align: top;
        font-size: 40px;
        line-height: 40px;
        margin-top: -10px;
        padding-left: 3px;
      }
    }
    .btn {
      line-height: 30px;
      padding-left: 20px;
      padding-right: 20px;
      font-size: 14px;
    }
  }
  .ps {
    padding: 12px;
    font-size: 14px;
    color: #444;
  }
}
</style>
