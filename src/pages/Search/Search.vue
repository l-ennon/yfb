<template lang="pug">
  .search.column
    .search-header
      //- 输入框
      .search-box.row.main-center
        .back.column.main-center(@click="back")
          svg.icon(aria-hidden="true")
            use(xlink:href="#icon-aleft")
        label.input-group(@click="inputFocus")
          div.column.main-center
            svg.icon(aria-hidden="true")
              use(xlink:href="#icon-fangdajing")
          input(
            ref="searchInput",
            v-model.trim="searchText",
            @focus="cancelOptions",
            placeholder="搜索"
          )
        .search-btn(@click="searchBtnFn")
          button(class="bg-blue t-white",data-track="搜索按钮").btn 搜索
      //- 选项
      yfb-option(
        :options="options",
        :isOpen="isOpen",
        @curIndex="toggle"
      )
        li.option(
          v-if="userInfo.dengji !== 0",
          @click="changePayArea"
          slot="pay"
        )
          p(
            :class="{active: search.isPayArea}"
          )
            span 购买地区
        section.filter.filter-category(
          :class="{open: curIndex === 0}",
          slot="filter0",
          key="filter0"
        )
          .search-type(@click.self="cancelOptions")
            c-area-selector.search-area-content(
              :mount="mount",
              :selected="selected",
              @select="select",
              :area="area"
            )
            .search-area-option.row.main-center
              .search-area-btn
                button.btn.cancel(@click="refreshArea",type="button") 重置
              .search-area-btn
                button.btn.confirm(@click="confirm",type="button") 确定
        //- 信息时间段选择
        section.filter.filter-category(
          :class="{open: curIndex === 1}",
          slot="filter1",
          key="filter1"
        )
          .search-type(@click.self="cancelOptions")
            ul.option-pick.bg-white
              li.option-name(v-for="(type, index) in optionMonthList",
                @click="pickMonth(index)",
                :class="{'bg-gray t-blue': pickMonthIndex === index}",
                v-text="type"
              )
        section.filter.filter-category(
          :class="{open: curIndex === 2}",
          slot="filter2",
          key="filter2"
        )
          //- 信息类型选择器
          .search-type(@click.self="cancelOptions")
            ul.option-pick.bg-white
              li.option-name(v-for="(type, index) in optionTypeList",
                @click="pickType(index)",
                :class="{'bg-gray t-blue': search.type === index}",
                v-text="type"
              )
    .search-content
      transition-group(name="fade")
        .to-top(v-show="toTop",@click="toTopFn",key="to-top")
          icon(icon="icon-huidaodingbu")
      .scroll-content(ref="scroller")
        list(
          :content="searchContentList",
          @toDatil="toDatil",
          @eventAction="eventAction"
        )
          .has-none(v-if="searchContentList.length === 0 && !loading")
            .has-none-img.row.main-center
              img(src="../../common/imgs/none-search.png")
          .search-zjdy(v-if="zjdyShow && !loading")
            p(v-text="'共找到'+zjdyCount+'条信息'")
            p 如对以下结果满意可以
              button.btn.bg-blue.t-white(@click="zjdy",data-track="直接订阅") 直接订阅
          infinite-scroll(
            slot="infiniteScroll",
            @load="loadMore",
            @scrollTop="scrollTop",
            :scroller="scroller",
            :loading="loading"
          )
</template>

<script>
// import BS from 'better-scroll'
import { mapState, mapMutations, mapActions } from 'vuex'
import {SubscriptionList, Option} from 'yfb'
import toDatil from 'components/internal/toDatil'
import {InfiniteScroll, Icon} from 'components'

import cAreaSelector from 'components/cAreaSelector'

export default {
  name: 'search',

  mixins: [toDatil],

  mounted () {
    this.scroller = this.$refs.scroller
  },

  destroyed () {
    this.curIndex = null
  },

  activated () {
    this.inputFocus()
    if (this.informationType !== this.search.type) {
      this.search.currPage = 1
      this.searchContentList = []
      this.informationType = this.search.type
      this.loading = true
      this._mock().then(() => {
        this.loading = false
      })
    } else {
      this.$refs.scroller.scrollTop = this.scrollTo
    }
  },

  deactivated () {
    this.scrollTo = this.$refs.scroller.scrollTop
  },

  data () {
    return {
      scroller: null,
      toPage: false,
      zjdyCount: 0,
      zjdyShow: false,
      loading: false,
      scrollTo: 0,
      toTop: false,
      /**
       * 搜索文字描述
       * @type {String}
       */
      searchText: '',
      /**
       * 搜索结果列表
       * @type {Array}
       */
      searchContentList: [],
      /**
       * option 选择, 0为付费地区, 1为选择地区, 2为信息类型
       * @type {Number}
       */
      curIndex: null,
      /**
       * 当前地区选择器
       * @type {Object}
       */
      selected: {
        cityList: {}
      },
      // /**
      //  * 上一步地区选择器, 深拷贝
      //  * @type {Object}
      //  */
      // copySelected: {
      //   cityList: {}
      // },
      /**
       * 招标结果 由于 search.type 控制
       * @type {Array}
       */
      optionTypeList: ['全部', '采购信息', '招标公告', '中标库'],
      pickMonthIndex: 0,
      optionMonthList: ['近一个月', '近三个月', '近半年', '近一年', '全部'],
      pickMemberIndex: 0,
      optionMemberList: ['全部地区', '购买地区'],
      /**
       * 记录上次已经选择的信息类型
       * @type {[type]}
       */
      informationType: null
    }
  },

  computed: {
    options () {
      // this.curIndex
      return [
        // { title: this.pickOptionMemberText, active: true },
        { title: this.pickOptionCityText, active: this.pickCity.length !== 0 },
        { title: this.pickOptionMonthText, active: true },
        { title: this.pickOptionTypeText, active: this.search.type !== null }
      ]
    },
    isOpen () {
      return this.curIndex !== null
    },
    mount () {
      return this.curIndex === 0
    },
    pickOptionMonthText () {
      let {pickMonthIndex, optionMonthList} = this
      return optionMonthList[pickMonthIndex]
    },
    pickOptionMemberText () {
      let {pickMemberIndex, optionMemberList} = this
      return optionMemberList[pickMemberIndex]
    },
    pickOptionTypeText () {
      switch (this.search.type) {
        case null:
          return '信息类型'
        case 0:
          return '全部'
        case 1:
          return '采购信息'
        case 2:
          return '招标公告'
        case 3:
          return '中标库'
      }
    },
    /**
     * 地区选择器转换 Array
     */
    pickCity () {
      // let selected = this.copySelected.cityList
      let selected = this.selected.cityList
      let list = []
      for (let area in selected) {
        for (let city in selected[area]) {
          list.push({name: selected[area][city], id: city})
        }
      }
      return list
    },
    /**
     * 当前地区选择显示城市
     */
    pickOptionCityText () {
      return this.pickCity.length !== 0 ? this.pickCity[0].name : '全国'
    },
    ...mapState([
      'area', 'userInfo', 'search', 'subscription'
    ])
  },

  methods: {
    eventAction () {
      this.behaviour({typed: 34})
    },
    toggle (i) {
      this.curIndex = i
      !isNaN(parseInt(i)) && this.behaviour({typed: i + 31})
    },
    inputFocus () {
      this.$refs.searchInput.focus()
    },
    scrollTop (scrollTop) {
      this.toTop = scrollTop
    },
    toTopFn () {
      let t = setInterval(() => {
        let top = this.scroller.scrollTop
        if (top <= 0) {
          clearInterval(t)
        } else {
          let f = Math.floor
          this.scroller.scrollTop = f(top - top / 10)
        }
      }, 10)
    },
    searchBtnFn () {
      this.behaviour({typed: 29})
      this.getSearchContent()
    },
    getSearchContent () {
      this.cancelOptions()
      if (this.searchText) {
        this.zjdyShow = true
      }
      this.search.hasNextPage = true
      this.search.currPage = 1
      this.searchContentList = []
      this.loading = true
      this._mock()
        .then(() => {
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changePayArea () {
      this.behaviour({typed: 30})
      this.search.isPayArea = !this.search.isPayArea
      this.refreshArea()
      this.getSearchContent()
    },
    /**
     * 选择月份
     * @return {[type]} [description]
     */
    pickMonth (i) {
      this.pickMonthIndex = i
      this.getSearchContent()
    },
    /**
     * 切换 type 信息类型
     */
    pickType (i) {
      this.search.type = i
      this.getSearchContent()
    },
    /**
     * 选择器
     */
    select (val) {
      let {cityList} = this.selected
      /**
      * 如果选择了全国
      */
      if (val[0] === 2703 && !cityList['2703']) {
        this.$set(this.selected, 'cityList', {
          [val[0]]: {
            [val[1].id]: val[1].name
          }
        })
        return false
      } else {
        this.$delete(cityList, '2703')
      }
      /**
      * 如果对象有这个省
      */
      if (cityList[val[0]]) {
        /**
        * 如果点击了全省
        */
        if (val[0] === val[1].id) {
          if (!cityList[val[0]][val[0]]) {
            this.$set(cityList, [val[0]], {
              [val[1].id]: val[1].name
            })
          } else {
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
          } else {
            let t = cityList[val[0]][val[1].id]
            if (!t) {
              this.$set(cityList[val[0]], val[1].id, val[1].name)
            } else {
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
        this.$set(this.selected.cityList, val[0], {
          [val[1].id]: val[1].name
        })
      }
    },
    refreshArea () {
      this.selected.cityList = {}
    },
    /**
     * 取消选择
     */
    cancelOptions () {
      this.curIndex = null
    },
    /**
     * 确定选择地区
     */
    confirm () {
      this.search.isPayArea = false
      // this.copySelected = JSON.parse(JSON.stringify(this.selected))
      this.getSearchContent()
    },
    /**
     * 回到上一页
     */
    back () {
      this.curIndex = null
      this.$router.back()
    },
    /**
     * 加载更多
     */
    async loadMore () {
      this.loading = true
      if (this.search.hasNextPage) {
        await this._mock()
      }
      this.loading = false
    },
    _mock () {
      if (this.searchContentList.length === 0) {
        this.setLoadingShow({isShow: true})
      }
      let {searchText, pickCity, pickMonthIndex, optionMonthList} = this
      let keywords = searchText
      let areaId = pickCity.map(city => city.id).join(',')
      let timeType = pickMonthIndex === optionMonthList.length - 1 ? 0 : pickMonthIndex + 1

      return this.indexSeach({keywords, areaId, timeType})
        .then((res) => {
          this.setLoadingShow()
          this.zjdyCount = res.data.resultCount
          if (res.data.resultList.length !== 0) {
            this.searchContentList = this.searchContentList.concat(res.data.resultList)
            this.search.currPage++
          }
          if (!res.data.hasNextPage) {
            this.search.hasNextPage = res.data.hasNextPage
          }
        })
    },
    zjdy () {
      let keywords = this.searchText
      this.zjdyFn({keywords})
        .then(res => {
          if (!res.data.hasDy) {
            let keyCount = res.data.keyCount
            this.search.keyCount = keyCount
            if (keyCount === 0) {
              this.$router.push('/index/subscription/setKeyWord')
              this.search.keyword = this.searchText
            } else if (keyCount < 5) {
              this.setToast({text: '订阅成功'})
              this.subscription.myUpdata = true
              this.subscription.setUpdata = true
            } else {
              this.setToast({text: '您的订阅已经到达上限'})
            }
          } else {
            this.setToast({text: '您已经订阅过这条关键词'})
          }
        })
    },
    ...mapMutations([
      'setLoadingShow'
    ]),
    ...mapActions([
      'checkZBDetail', 'indexSeach', 'setToast', 'zjdyFn', 'updateSubscription', 'behaviour'
    ])
  },

  watch: {
  },

  components: {
    yfbOption: Option, list: SubscriptionList, cAreaSelector, InfiniteScroll, Icon
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.search {
  position: relative;
  z-index: 2;
  height: 100%;
  background: #f5f5f5;
  .has-none-img {
    img {
      width: 100%;
    }
  }
}
.search-header {
  flex-grow: 0;
  flex-shrink: 0;
  @at-root .search-box {
    height: 50px;
    font-size: 14px;
    box-sizing: border-box;
    background: #fff;
    color: #666;
    @include border1px(#d8d8d8);
    .back {
      width: 32px;
    }
    .icon {
      font-size: 18px;
    }
    .input-group {
      flex: 1;
      height: 32px;
      line-height: 32px;
      background: #f5f5f5;
      border-radius: 5px;
      overflow: hidden;
      .icon {
        padding-left: 3px;
        padding-right: 3px;
      }
      input {
        flex: 1;
        font-size: 14px;
        line-height: 32px;
        vertical-align: top;
        background: #f5f5f5;
        color: #666;
      }
    }
    @at-root .search-btn {
      padding-left: 12px;
      padding-right: 12px;
      .btn {
        height: 32px;
        line-height: 32px;
        padding-left: 15px;
        padding-right: 15px;
      }
    }
  }
  .search-option-list {
    flex: 1;
    box-sizing: border-box;
    background: #fff;
    @include border1px(#d8d8d8);
    .search-option {
      flex: 1;
      height: 40px;
      text-align: center;
      font-size: 14px;
      &:last-child {
        p {
          border: none;
        }
      }
      p {
        display: block;
        width: 100%;
        line-height: 20px;
        border-right: 1px solid #d8d8d8;
      }
      .icon {
        font-size: 10px;
        padding-left: 5px;
      }
    }
    .cur-option {
      color: #46a5fe;
    }
  }
}
.search-type {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 2.5rem;
  left: 0;
  .search-area-content {
    height: 100%;
    overflow: hidden;
    background: #fff;
    @include border1px(#d8d8d8);
  }
  .search-area-option {
    background: #fff;
    height: px2rem(90);
    padding: 0 px2rem(75);
    .search-area-btn {
      flex: 1;
      button {
        display: block;
        height: px2rem(60);
        width: px2rem(230);
        margin: auto;
        font-size: 14px;
      }
      .confirm {
        background: #0094fe;
        color: #fff;
      }
      .cancel {
        box-sizing: border-box;
        border: 1px solid #666;
      }
    }
  }
  .option-pick {
    li:not(:last-child){
      @include border1px(#d8d8d8);
    }
  }
}

.search-content {
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  .yfb-list {
    padding-top: px2rem(20);
  }
  .search-zjdy {
    text-align: center;
    margin: 1em 0;
    color: #5d5d5d;
    button {
      padding: 2px 5px;
      margin-left: 5px;
    }
  }
}
</style>
