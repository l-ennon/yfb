<template lang="pug">
  .join-membership.column
    yfb-appbar(title="开通招标采购会员")
    .join-membership-content
      .scroll-content
        .join-content
          .join-header.row
            .price-item.column.main-center
              p.t-dgray 一个市
              p.price(v-text="`￥${price.city}/月`")
            .price-item.column.main-center
              p.t-dgray 一个省
              p.price(v-text="`￥${price.province}/月`")
            .price-item.column.main-center
              p.t-dgray.column
                span 全国
                span 及6省以上
              p.price(v-text="`￥${price.country}/月`")
          .join-body
            .join-body-title
              .title
                yfb-title(title="选择业务地区范围")
                  span.t-blue(v-text="vTitle")
            city-pick(
              :selectCitys="cityList",
              :addButton="true",
              :removeButton="true",
              addBtnStyle="background: #f6463e",
              @add="add",
              @remove="remove"
            )
          .join-body
            .join-body-title
              .title.row.main-between
                yfb-title(title="选择开通会员时长")
                //- div(@click="agreement")
                //-   router-link(to="/user/agreement",tag="div")
                //-     span 服务协议
                //-       svg.icon(aria-hidden="true")
                //-         use(xlink:href="#icon-aright")
            .pick-month.row
              .month-btn(
                v-for="(item, index) in months",
                @click="pickMonth(item.month, index)"
              )
                join-pick-btn(
                  :picked="pickedMonth === item.month"
                )
                  .discount.t-white(
                    v-if="item.month !== 1",
                    v-text="`${item.discount}折`"
                  )
                  span(v-text="`${item.month}个月`")
                .discount-price(
                  v-if="item.month !== 1"
                  v-text="`￥${payPrice.discount[item.month]}`"
                )
                .origin-price(
                  :class="item.month === 1 ? 't-dgray' : 'line-through t-gray'"
                  v-text="item.month === 1 ? `￥${payPrice.origin[item.month]}` : `原价￥${payPrice.origin[item.month]}`"
                )
          //- .ps
          //-   router-link(to="/user/explain",tag="span")
          //-     span 价格说明?
          .join-footer.row
            .join-number.colu
              .join-price
                span.join-number-text.t-gray(v-text="'已优惠'")
                span.price.t-gray(v-text="oraginPriceText")
            .join-number.colu    
              .join-price
                span.join-number-text.t-red(v-text="'实付:'")
                span.price.t-red.bigger(v-text="parPriceText")
              //- .join-picked-area
              //-   span.join-number-text.t-gray 已选:
              //-   span(v-text="parAreaText")
            .join-pay(
              @click="payStart",
              :class="{'can-pay': canPay}"
            ) 去支付
</template>

<script>
import {YfbAppbar, CityPick, YfbTitle} from 'yfb'
import {mapState, mapMutations, mapActions} from 'vuex'
import joinPickBtn from './child/joinPickBtn.vue'

export default {
  name: 'joinMembership',

  beforeMount () {
  },

  mounted () {
    if (this.subscription.setUpdata) {
      this._mock()
    }
  },

  activated () {
    console.log(this)
  },

  deactivated () {
    let {path} = this.$route
    if (path !== '/user/agreement' && path !== '/areaSelector' && path !== '/user/explain') {
      this.search.toPage = false
      this.user.isChange = false
    }
  },

  data () {
    return {
      loading: true,
      selectedCity: null,
      months: [
        {month: 3, discount: 7},
        {month: 6, discount: 5},
        {month: 12, discount: 5},
        {month: 1, discount: 10}
      ],
      pickedMonth: 3
    }
  },

  computed: {
    canPay () {
      let {payPrice, pickedMonth} = this
      return payPrice['origin'][pickedMonth]
    },
    pickTypeList () {
      let {city, province, country} = this.price
      let {cityCount, areaCount, countryCount} = this.user.selectedCity
      return [
        {title: '一个市', price: city, count: cityCount},
        {title: '一个省', price: province, count: areaCount},
        {title: '全国', price: country, count: countryCount}
      ]
    },
    cityList () {
      if (!this.user.isChange) {
        let freeCity = this.subscription.freeCityList
        let freeCityList = freeCity.cityList
        this.user.selectedCity = freeCity
        if (this.search.toPage) {
          this.searchArea()
          if ((freeCity.countryCount === 0) &&
          !(this.search.areaId in freeCityList)) {
            this.subscription.freeCityList.cityList = Object.assign({}, freeCityList, this.search.list.list)
            this.subscription.freeCityList.areaCount++
          }
        }
      }
      return this.user.selectedCity.cityList
    },
    parAreaText () {
      let {areaCount, cityCount, countryCount} = this.user.selectedCity
      if (countryCount) {
        return `全国`
      } else if (areaCount && cityCount) {
        return `${areaCount}个省${cityCount}个市`
      } else if (areaCount) {
        return `${areaCount}个省`
      } else if (cityCount) {
        return `${cityCount}个市`
      }
    },
    parPriceText () {
      let {payPrice, pickedMonth} = this
      if (pickedMonth) {
        return `￥${payPrice.discount[pickedMonth]}`
      } else {
        return 0
      }
    },
    oraginPriceText () {
      let {payPrice, pickedMonth} = this
      if (pickedMonth) {
        let origin = payPrice.origin[pickedMonth]
        let discount = payPrice.discount[pickedMonth]
        let yhNum = origin - discount
        return `￥${yhNum}`
      } else {
        return 0
      }
    },
    payPrice () {
      let {city, province, country} = this.price
      let {areaCount, cityCount, countryCount} = this.user.selectedCity
      let all = city * cityCount + province * areaCount
      let result = (areaCount >= 6 || countryCount) ? country : all
      let f = Math.floor
      let origin = {
        1: result,
        3: result * 3,
        6: result * 6,
        12: result * 12
      }
      let discount = {
        1: origin[1],
        3: f(origin[3] * 0.7),
        6: origin[6] * 0.5,
        12: origin[12] * 0.5
      }
      return {
        origin,
        discount
      }
    },
    // TODO: 将此处放在 store getters 内
    price () {
      if (this.userInfo.price) {
        return this.userInfo.price
      } else {
        return {city: 0, province: 0, country: 0}
      }
    },
    vTitle () {
      let {cityCount, areaCount, countryCount} = this.user.selectedCity
      if (countryCount) {
        return `(全国)`
      } else if (cityCount || areaCount) {
        if ((areaCount === 1 && cityCount !== 1) || (areaCount !== 1 && cityCount === 1)) {
          this.pickedMonth = 12
          this.months = [
            {month: 12, discount: 5},
            {month: 6, discount: 5},
            {month: 3, discount: 7},
            {month: 1, discount: 10}
          ]
        } else if (areaCount !== 1 && cityCount === 1) {
          this.pickedMonth = 12
          this.months = [
            {month: 12, discount: 5},
            {month: 6, discount: 5},
            {month: 3, discount: 7},
            {month: 1, discount: 10}
          ]
        } else {
          this.pickedMonth = 3
          this.months = [
            {month: 3, discount: 7},
            {month: 6, discount: 5},
            {month: 12, discount: 5},
            {month: 1, discount: 10}
          ]
        }
        return `(${areaCount}个省 ${cityCount}个市)`
      }
    },
    ...mapState([
      'area', 'user', 'userInfo', 'subscription', 'search'
    ])
  },
  methods: {
    agreement () {
      this.behaviour({typed: 70})
    },
    _mock () {
      this.loading = true
      this.dySettingPage().then((res) => {
        this.loading = false
      })
    },
    async payStart () {
      if (!this.canPay) return
      this.behaviour({typed: 75})
      let {payPrice, pickedMonth, cityList} = this
      let list = []
      Object.values(cityList).forEach(areaObj => {
        Object.keys(areaObj).forEach(areaId => {
          list.push(areaId)
        })
      })
      await this.wechatPayOrders({
        totfee: payPrice.discount[pickedMonth],
        totime: this.pickedMonth,
        area: list
      })
      this.$router.push('/user/addPhoneNumber')
    },
    pickMonth (val, i) {
      this.behaviour({typed: i + 71})
      this.pickedMonth = ~~val
    },
    add () {
      this.behaviour({typed: 68})
      this.$router.push('/areaSelector')
    },
    /**
     * 删除已经添加的地区
     */
    remove (id) {
      this.behaviour({typed: 69})
      let {areaId, cityId} = id
      let list = this.user.selectedCity.cityList
      this.$delete(list[areaId], cityId)
      if (Object.values(list[areaId]).length === 0) {
        this.$delete(list, areaId)
      }
      /**
       * 删除全国
       */
      if (areaId === '2703' && cityId === '2703') {
        this.user.selectedCity.countryCount--
        return
      }
      /**
       * 删除省
       */
      if (areaId === cityId) {
        this.user.selectedCity.areaCount--
      } else {
        this.user.selectedCity.cityCount--
      }
    },
    ...mapMutations([
      'setLoadingShow', 'searchArea'
    ]),
    ...mapActions([
      'wechatPayOrders', 'dySettingPage', 'behaviour'
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
    YfbAppbar, CityPick, YfbTitle, joinPickBtn
  }
}
</script>

<style lang="scss">
@import "../../../common/scss/mixin.scss";
@import "../../../common/scss/base.scss";
.join-membership {
  height: 100%;
  z-index: 1;
  .join-membership-content {
    position: relative;
    flex-grow: 1;
  }
  .join-pick-city-box {
    flex-wrap: wrap;
    .city-item {
      flex: 0 0 25%;
      height: 2em;
      line-height: 2em;
      margin: .5em 0;
      text-align: center;
      font-size: 14px;
    }
    .join-city, .add {
      width: 90%;
      margin: auto;
      overflow: hidden;
    }
  }
  .join-content {
    position: relative;
    min-height: 100%;
    padding-bottom: px2rem(80);
    .pick-month {
      padding: 15px 0 15px 12px;
      .month-btn {
        position: relative;
        flex: 1;
        margin-right: 5px;
        span {
          font-size: px2rem(28);
        }
        .discount-price{
          color: #f6463e;
          font-size: px2rem(28);
          text-align: center;
        }
        .origin-price{
          text-align: center;
          font-size: px2rem(28);
        }
        .line-through {
          text-decoration: line-through;
          font-size: 12px;
        }
        .discount {
          $height: 30;
          position: absolute;
          top: px2rem(-$height/2);
          left: -1px;
          width: px2rem($height * 1.5);
          height: px2rem($height);
          line-height: px2rem($height);
          white-space: nowrap;
          z-index: 1;
          font-size: px2rem(20);
          font-weight: bold;
          padding: 0 2px;
          background: rgb(246, 70, 62);
        }
      }
    }
    .join-header {
      padding-top: 12px;
      padding-bottom: 6px;
      background: #fff;
      .price-item {
        flex: 1;
        align-items: stretch;
        .t-dgray {
          font-size: 14px;
        }
        .price {
          line-height: 2em;
          font-size: 16px;
        }
        p {
          line-height: 1.2em;
          text-align: center;
          border-right: 1px solid #d8d8d8;
        }
        &:last-child {
          p {
            border: none;
          }
        }
      }
    }
    .join-body {
      padding-right: 0;
      background: #fff;
      &:not(:first-child) {
        margin-top: 15px;
      }
      .join-body-title {
        padding-left: 12px;
        .title {
          padding-top: 15px;
          padding-bottom: 15px;
          font-size: 15px;
          border-bottom: 1px solid #d8d8d8;
        }
        .title-head {
          border-left: 4px solid #46a5fe;
        }
        span {
          padding-left: .5em;
        }
      }
      .pick-type-item {
        flex: 1;
        text-align: center;
      }
      .item-pick {
        @extend .t-blue;
      }
      .pick-month .row{
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
        padding-left: 8px;
        font-size: px2rem(30);
        width: px2rem(50);
        .join-number-text {
          font-size: px2rem(24);
        }
        .join-price {
          span {
            float: left;
            font-weight: 500;
          }
          .price {
            font-size: px2rem(34);
          }
          .bigger {
            font-size: px2rem(34);
          }
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
    // .pick-type-list {
    //   padding-right: 12px;
    //   font-size: 16px;
    //   li {
    //     border-bottom: 1px solid #d8d8d8;
    //     &:last-child {
    //       border: none;
    //     }
    //   }
    //   .pick-option {
    //     padding-top: 1em;
    //     padding-bottom: 1em;
    //     p{
    //       min-width: 3.5em;
    //     }
    //   }
    //   .pay {
    //     flex: 1;
    //     line-height: 30px;
    //     padding-left: 20px;
    //     .icon {
    //       position: relative;
    //       top: 3px;
    //       vertical-align: top;
    //       font-size: 40px;
    //       line-height: 40px;
    //       margin-top: -10px;
    //       padding-left: 3px;
    //     }
    //   }
    //   .btn {
    //     line-height: 30px;
    //     padding-left: 20px;
    //     padding-right: 20px;
    //     font-size: 14px;
    //   }
    // }
    .ps {
      padding: 12px;
      font-size: 14px;
      color: #444;
    }
  }
}
</style>
