<template lang="pug">
.city-pick-area.column
  yfb-appbar
    .title(v-text="title")
    .confirm(slot="right", @click="confirmFn") 确定

  //- header.header.bg-white.row.main-center
  //-   .back.t-dgray(@click="back")
  //-     svg.icon(aria-hidden="true")
  //-       use(xlink:href="#icon-aleft")
  //-   .title.t-dgray(v-text="title")
  //-   .confirm.t-dgray(@click="confirmFn") 确定
  .city-pick-area-content
    Picker(
      @select="select",
      :nav="area[2703]",
      :content="area",
      :selected="selected"
    )
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import {Picker} from 'components'
import {YfbAppbar} from 'yfb'

const p = JSON.parse
const s = JSON.stringify

export default {
  name: 'area-selector',

  data () {
    return {
      hasCity: [],
      mount: false,
      /**
       * 当前地区选择器
       * @type {Object}
       */
      selected: {
        countryCount: 0,
        cityCount: 0,
        areaCount: 0,
        cityList: {}
      }
    }
  },

  deactivated () {
    this.mount = false
    this.user.isDy = false
  },

  activated () {
    /**
     * isDy 是否是从订阅进来的
     */
    let list = null
    if (this.user.isDy) {
      list = this.subscription.freeCityList
    } else {
      list = this.user.selectedCity
    }
    let {countryCount, cityCount, areaCount, cityList} = list
    this.selected.countryCount = countryCount
    this.selected.cityCount = cityCount
    this.selected.areaCount = areaCount
    this.selected.cityList = p(s(cityList))
    this.$nextTick(() => {
      this.mount = true
    })
  },

  watch: {
  },

  computed: {
    title () {
      let {cityCount, areaCount} = this.selected
      if (this.selected.countryCount) {
        return `已选: 全国`
      } else if (this.selected.areaCount || this.selected.cityCount) {
        return `已选: ${areaCount}个省 ${cityCount}个市`
      } else {
        return '请选择地区'
      }
    },
    ...mapState([
      'area', 'subscription', 'user'
    ])
  },

  methods: {
    confirmFn () {
      if (this.user.isDy) {
        this.$set(this.subscription, 'freeCityList', this.selected)
        this.$router.back()
      } else {
        this.user.isChange = true
        this.$set(this.user, 'selectedCity', this.selected)
        this.$router.push('/user/joinMembership')
        // if (this.$router.from)
      }
    },
    /**
     * 返回上一层, keep-alive 有坑
     */
    back () {
      this.$router.back()
    },
    /**
     * 选择器
     */
    select (val) {
      console.log(val)
      // let cityList = this.selected.cityList
      // /**
      // * 如果选择了全国
      // */
      // if (val[0] === 2703 && !cityList['2703']) {
      //   this.$set(this.selected, 'cityList', {
      //     [val[0]]: {
      //       [val[1].id]: val[1].name
      //     }
      //   })
      //   this.selected.countryCount = 1
      //   this.selected.cityCount = 0
      //   this.selected.areaCount = 0
      //   return
      // } else if (val[0] === 2703) {
      //   this.selected.cityList = {}
      //   this.selected.areaCount = 0
      //   this.selected.countryCount = 0
      //   return
      // } else {
      //   if (cityList['2703']) {
      //     this.selected.cityList = {}
      //     this.selected.areaCount = 0
      //     this.selected.countryCount = 0
      //   }
      // }
      // /**
      // * 如果对象有这个省
      // */
      // if (cityList[val[0]]) {
      //   /**
      //   * 如果点击了全省
      //   */
      //   if (val[0] === val[1].id) {
      //     /**
      //      * 如果没有有全省
      //      */
      //     if (!cityList[val[0]][val[0]]) {
      //       this.selected.cityCount -= Object.keys(cityList[val[0]]).length
      //       this.selected.areaCount++
      //       this.$set(cityList, [val[0]], {
      //         [val[1].id]: val[1].name
      //       })
      //     } else {
      //       this.selected.areaCount--
      //       this.$delete(cityList, val[0])
      //     }
      //   /**
      //   * 如果没点击全省
      //   */
      //   } else {
      //     if (cityList[val[0]][val[0]]) {
      //       this.$set(cityList, val[0], {
      //         [val[1].id]: val[1].name
      //       })
      //       this.selected.areaCount--
      //       this.selected.cityCount++
      //     } else {
      //       let t = cityList[val[0]][val[1].id]
      //       /**
      //        * 如果还没有这个市区
      //        */
      //       if (!t) {
      //         this.selected.cityCount++
      //         this.$set(cityList[val[0]], val[1].id, val[1].name)
      //       } else {
      //         this.selected.cityCount--
      //         this.$delete(cityList[val[0]], val[1].id)
      //         if (Object.keys(cityList[val[0]]).length === 0) {
      //           this.$delete(cityList, val[0])
      //         }
      //       }
      //     }
      //   }
      // /**
      // * 如果对象没有个省
      // */
      // } else {
      //   if (val[0] === val[1].id) {
      //     this.selected.areaCount++
      //   } else {
      //     this.selected.cityCount++
      //   }
      //   this.$set(this.selected.cityList, val[0], {
      //     [val[1].id]: val[1].name
      //   })
      // }
    },
    _clearArea () {
      this.selected.cityList = {}
      this.copySelected.cityList = {}
    },
    refresh () {
      this._clearArea()
    },
    ...mapMutations([
      'changeSelectType'
    ]),
    ...mapActions([
      'changeSelectCity'
    ])
  },

  components: {
    Picker, YfbAppbar
  }
}
</script>

<style lang="scss" >
.city-pick-area {
  height: 100vh;
  z-index: 1;
  .header {
    .title {
      flex: 1;
      text-align: center;
      font-size: 16px;
    }
    .confirm {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 16px;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
}
.area-pick-content {
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
}
.position {
  position: absolute;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.leftList, .rightList {
}
</style>
