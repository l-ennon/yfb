<template lang="pug">
  .subscription-model(
    v-if="isShow"
  )
    //- banner
    //- .subscription-main.scroll-content.column(
    //-   v-show="currentIndex === 0",
    //-   @click="modelStart"
    //- )
    //-   .subscription-main-img
    //-     img(src="../../../common/imgs/newbie-guide.png")
    //-   .subscription-banner-btn.column.center
    //-     button.subscription-btn.btn.bg-blue.t-white 立即寻找商机

    //- area-pick
    .subscription-main.column(v-if="currentIndex === 0")
      .subscription-main-img
        img.area-pick-img(src="../../../common/imgs/newbie-guide-banner.png")
      .subscription-title
        span 您想看到
        span.t-orange 哪些城市
        span 的招标采购信息
        p.t-orange （滑动选择业务地区）
      .pick-city-content.bg-blue.t-white(v-html="title")
      .subscription-main-area-selector
        c-area-selector.absolute(
          @select="select",
          :area="area",
          :selected="selected"
        )
      .subscription-area-selector-btn
        button.subscription-btn.btn.bg-blue.t-white(@click="modelSetArea") 提交
    //- keywords
    .subscription-main.scroll-content(v-if="currentIndex === 1")
      .subscription-main-img
        img(src="../../../common/imgs/newbie-guide-banner.png")
      .subscription-title
        span 您想看到
        span.t-orange 哪个产品或行业
        span 的招标采购信息
      .set-input
        transition-group(name="fade",mode="out-in",tag="div")
          .set-input-list(v-for="(key, i) in keywords", :key="i")
            input-group(
              :keywords="keywords",
              :index="i",
              v-model="keywords[i]",
              :deleteIconShow="keywords.length <= 1",
              @delete="delInput(i)"
            )
        .set-input-hint(v-if="hint")
          span.t-red 请填写关键词
        transition(name="fade",mode="out-in",tag="div")
          .set-add-input-btn(
            v-show="keywords.length < 5",
            :key="6"
          )
            button.btn.bg-blue(
              @click="addInput"
            )
              icon(icon="icon-jiahao")
              span 添加关键词
      .subscription-keywords-btn
        button.subscription-btn.btn.bg-blue.t-white(@click="modelDone") 填好了 去找业务
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import {Icon, cAreaSelector} from 'components'
import YfbAppbar from '../YfbAppbar/YfbAppbar.vue'
import inputGroup from '../../SetKeyword/child/InputGroup.vue'

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      keywords: ['', ''],
      selected: {
        countryCount: 0,
        cityCount: 0,
        areaCount: 0,
        cityList: {}
      },
      currentIndex: 0,
      freeArea: null
    }
  },

  methods: {
    modelSetArea () {
      let {selected} = this
      if (Object.keys(selected.cityList).length === 0) {
        this.setToast({text: '请选择地区'})
        return
      }
      let list = []
      let arr = Object.values(selected.cityList)
      for (let city of arr) {
        list = list.concat(Object.keys(city))
      }
      this.freeArea = list.join(',')
      this.currentIndex++
      this.behaviour({typed: 5})
    },
    modelDone () {
      let {freeArea, unVoidKeywords} = this
      if (this.unVoidKeywords.length === 0) {
        this.setToast({text: '请输入有效关键词'})
        return
      }
      this.behaviour({typed: 6})
      this.updateSubscription({keywords: unVoidKeywords, freeArea}).then(res => {
        this.search.isNeedNewbieGuider = true
        this.subscription.setUpdata = true
        this.setLoadingShow()
        this.$emit('done', true)
        this.$router.push('/index/subscription/mySubscriptions')
      })
    },
    addInput () {
      if (this.keywords.length < 5) {
        this.keywords.push('')
      }
    },
    delInput (i) {
      if (this.keywords.length === 1) return
      this.keywords.splice(i, 1)
    },
    select (val) {
      let cityList = this.selected.cityList
      /**
      * 如果选择了全国
      */
      if (val[0] === 2703 && !cityList['2703']) {
        this.$set(this.selected, 'cityList', {
          [val[0]]: {
            [val[1].id]: val[1].name
          }
        })
        this.selected.countryCount = 1
        this.selected.cityCount = 0
        this.selected.areaCount = 0
        return
      } else if (val[0] === 2703) {
        this.selected.cityList = {}
        this.selected.areaCount = 0
        this.selected.countryCount = 0
        return
      } else {
        if (cityList['2703']) {
          this.selected.cityList = {}
          this.selected.areaCount = 0
          this.selected.countryCount = 0
        }
      }
      /**
      * 如果对象有这个省
      */
      if (cityList[val[0]]) {
        /**
        * 如果点击了全省
        */
        if (val[0] === val[1].id) {
          /**
           * 如果没有有全省
           */
          if (!cityList[val[0]][val[0]]) {
            this.selected.cityCount -= Object.keys(cityList[val[0]]).length
            this.selected.areaCount++
            this.$set(cityList, [val[0]], {
              [val[1].id]: val[1].name
            })
          } else {
            this.selected.areaCount--
            this.$delete(cityList, val[0])
          }
        /**
        * 如果没点击全省
        */
        } else {
          if (cityList[val[0]][val[0]]) {
            this.$set(cityList, val[0], {
              [val[1].id]: val[1].name
            })
            this.selected.areaCount--
            this.selected.cityCount++
          } else {
            let t = cityList[val[0]][val[1].id]
            /**
             * 如果还没有这个市区
             */
            if (!t) {
              this.selected.cityCount++
              this.$set(cityList[val[0]], val[1].id, val[1].name)
            } else {
              this.selected.cityCount--
              this.$delete(cityList[val[0]], val[1].id)
              if (Object.keys(cityList[val[0]]).length === 0) {
                this.$delete(cityList, val[0])
              }
            }
          }
        }
      /**
      * 如果对象没有个省
      */
      } else {
        if (val[0] === val[1].id) {
          this.selected.areaCount++
        } else {
          this.selected.cityCount++
        }
        this.$set(this.selected.cityList, val[0], {
          [val[1].id]: val[1].name
        })
      }
    },
    ...mapActions(['setToast', 'updateSubscription', 'behaviour']),
    ...mapMutations(['setLoadingShow'])
  },

  computed: {
    unVoidKeywords () {
      return this.keywords.filter(word => word)
    },
    hint () {
      let a = this.keywords.filter(word => {
        return word !== ''
      })
      return a.length === 0
    },
    title () {
      let {cityCount, areaCount} = this.selected
      if (this.selected.countryCount) {
        return `已选: 全国`
      } else {
        return `已选: ${areaCount}个省 ${cityCount}个市 <span class="t-yellow">(请多选)</span>`
      }
    },
    ...mapState(['area', 'subscription', 'search'])
  },

  components: {
    cAreaSelector, YfbAppbar, inputGroup, Icon
  }
}
</script>

<style lang="scss">
  @import "../../../common/scss/mixin.scss";
  .subscription-model {
    position: absolute;
    z-index: 98;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    .subscription-main {
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 50%;
      width: 90%;
      height: 90%;
      border-radius: 5px;
      overflow: hidden;
      transform: translate(-50%, -50%);
      background: #f6f6f6;
    }
    .set-input {
      padding-top: 1px;
    }
    .subscription-title {
      text-align: center;
      margin-top: 15px;
      margin-bottom: 15px;
      font-size: px2rem(32);
    }
    .subscription-main-area-selector {
      position: relative;
      flex-grow: 1;
      overflow: hidden;
    }
    .subscription-main-img {
      .area-pick-img {
        height: 3rem;
      }
      img {
        display: block;
        width: 100%;
      }
    }
    .subscription-btn {
      display: block;
      width: 90%;
      font-size: 16px;
      margin: auto;
      line-height: 2.5em;
      height: 2.5em;
      flex-shrink: 0;
    }
    .subscription-banner-btn {
      flex-grow: 1;
      flex-shrink: 0;
    }
    .subscription-keywords-btn {
      padding-top: 15px;
      padding-bottom: 15px;
    }
    .subscription-area-selector-btn {
      position: relative;
      z-index: 2;
      flex-shrink: 0;
      padding-top: 10px;
      padding-bottom: 10px;
      box-shadow: 0 -1px 2px rgba(#000000, 0.1);
    }
    .pick-city-content {
      position: relative;
      z-index: 2;
      font-size: px2rem(32);
      line-height: 2.5em;
      text-align: center;
      background: #fff;
      box-shadow: 0 -1px 2px rgba(#000000, 0.1), 0 1px 2px rgba(#000000, 0.1);
    }
    .set-input, .set-area {
      padding-left: 12px;
      padding-bottom: 15px;
      margin-top: 15px;
      font-size: 16px;
      background: #fff;
    }
    .set-input-hint {
      text-align: center;
      font-size: 14px;
    }
    .set-input-list {
    }
    .set-add-input-btn {
      padding-top: 10px;
      button {
        height: 26px;
        width: 95px;
        font-size: 12px;
        color: #fff;
        span {
          padding-left: 3px;
        }
      }
    }
  }
</style>
