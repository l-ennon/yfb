<template lang="pug">
  .my-subscriptions.absolute.column
    .sub-options.row(v-if="hasDy")
      .option(v-for="(option,i) in options",@click="subscription.type = i")
        p(:class="{pick: type === i}",v-text="option.title")
      .isPay.row.main-center(v-if="userInfo.dengji === 1")
        .box
          button.btn(@click="isPay",:class="{'pick-pay': subscription.isPayArea}") 付费地区
    .sub-block-list.scroll-content(v-if="!hasDy && !loading")
      .sub-img
        img(src="../../common/imgs/ban@2x.png")
      .sub-btn
        router-link(to="/index/subscription/setKeyWord", tag="div")
          button.btn.bg-blue.t-white 开始订阅
    .sub-block-list.scroll-content(v-else,ref="list")
      .has-none(v-if="!hasData && !loading")
        .has-none-img.row.main-center
          img(src="../../common/imgs/none.png")
        .has-none-txt
          p 近一个月内没有招标信息哦
          p <span>试试 多选地区</span> 或 <span>修改关键词</span>
        .sub-btn
          router-link(to="/index/subscription/setKeyWord", tag="div")
            button.btn.bg-blue.t-white 修改订阅
        .sub-content-img
          img(src="../../common/imgs/wuxinxi_peitu.png")
      .sub-list(v-else)
        transition-group(name="fade")
          .to-top(key="to-top",v-show="toTop",@click="toTopFn")
            icon(icon="icon-huidaodingbu")
        .scroll-content(ref="scroller")
          list(
            :content="curList",
            @toDatil="toDatil",
            @eventAction="eventAction"
          )
            infinite-scroll(
              slot="infiniteScroll",
              @load="loadMore",
              @scrollTop="scrollTop",
              :isShow="hasData",
              :scroller="scroller",
              :loading="loading"
            )
</template>

<script>
import toDatil from 'components/internal/toDatil'
import {InfiniteScroll, Icon} from 'components'
import {mapState, mapMutations, mapActions} from 'vuex'
import {SubscriptionList, ToPassDays} from 'yfb'

/**
 * 每一次请求有多少返回数据
 * @type { Number }
 */
const hasNextPageCount = 10

export default {
  name: 'mySubscriptions',

  mixins: [toDatil],

  data () {
    return {
      hasDy: false,
      options: [
        { title: '全部' },
        { title: '预告' },
        { title: '公告' },
        { title: '中标' }
      ],
      subContentList: {
        '0': {
          hasNextPage: true,
          contentList: {},
          currPage: 0,
          scrollTop: 0
        },
        '1': {
          hasNextPage: true,
          contentList: {},
          currPage: 0,
          scrollTop: 0
        },
        '2': {
          hasNextPage: true,
          contentList: {},
          currPage: 0,
          scrollTop: 0
        },
        '3': {
          hasNextPage: true,
          contentList: {},
          currPage: 0,
          scrollTop: 0
        }
      },
      loading: true,
      scroller: null,
      toTop: false
    }
  },

  mounted () {
    // let isDone = window.localStorage.getItem('advertisingZXCG')
    // if (!isDone) {
    //   window.localStorage.setItem('advertisingZXCG', true)
    // }
    // this.setAdvertisingShow({isShow: !isDone})
    try {
      this.scroller = this.$refs.scroller
    } catch (err) {
      console.log(err)
    }
  },

  activated () {
    this.changeScrollTop()
    let {myUpdata} = this.subscription
    if (myUpdata) {
      this.clear()
      this._mock()
    } else {
      try {
        let content = this.subContentList
        let type = this.type
        if (this.hasDy) {
          this.$refs.scroller.scrollTop = content[type].scrollTop
        }
      } catch (err) {
        console.log(err)
      }
    }
  },

  deactivated () {
    try {
      this.subContentList[this.type].scrollTop = this.$refs.scroller.scrollTop
    } catch (err) {
      console.log(err)
    }
  },

  watch: {
    type (n, o) {
      this.behaviour({typed: n + 37})
      this.pickType(n, o)
    }
  },

  computed: {
    type () {
      return this.subscription.type
    },
    curList () {
      return this.subContentList[this.type]['contentList']
    },
    hasData () {
      return Object.keys(this.curList).length !== 0
    },
    ...mapState([
      'subscription', 'userInfo', 'search', 'mobanid', 'checkedList', 'area'
    ])
  },

  methods: {
    eventAction () {
      this.behaviour({typed: 41})
    },
    changeScrollTop () {
      let content = this.subContentList
      try {
        this.$refs.scroller.scrollTop = content[this.type].scrollTop
      } catch (err) {
        console.log(err)
      }
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
    clear () {
      for (var i = 0; i < 4; i++) {
        this.$set(this.subContentList, i, {
          hasNextPage: true,
          contentList: {},
          currPage: 0,
          scrollTop: 0
        })
      }
    },
    isPay () {
      this.subscription.isPayArea = !this.subscription.isPayArea
      this.clear()
      this._mock()
    },
    loadMore () {
      let context = this.subContentList[this.type]
      let hasNextPage = context['hasNextPage']
      if (hasNextPage) {
        this._mock()
      }
    },
    pickType (n, o) {
      let context = this.subContentList[n]
      let contentList = context.contentList
      try {
        this.subContentList[o].scrollTop = this.$refs.scroller.scrollTop
        this.$nextTick(() => {
          this.$refs.scroller.scrollTop = context.scrollTop
        })
      } catch (err) {
        console.log(err)
      }

      if (Object.keys(contentList).length === 0) {
        this._mock()
      }
    },
    /**
     *
     */
    _mock () {
      this.loading = true
      let currPage = ++this.subContentList[this.type]['currPage']
      if (Object.keys(this.curList).length === 0) {
        this.setLoadingShow({isShow: true})
      }
      this.getDyInfoList({currPage}).then((res) => {
        this.subscription.myUpdata = false
        this.loading = false
        this.setLoadingShow()
        // TODO: 集成在 Fetch 内部
        this.hasDy = res.data.hasDy
        if (!res.data.hasDy) {
          return
        }
        let {type} = res.data.params

        let count = Object.values(res.data.zbList).reduce((p, n) => {
          return p + n.length
        }, 0)
        if (count < hasNextPageCount) {
          this.subContentList[type].hasNextPage = false
        }
        for (let date in res.data.zbList) {
          let context = this.subContentList[type]['contentList']
          if (context[date]) {
            let c = context[date].concat(res.data.zbList[date])
            this.$set(this.subContentList[type]['contentList'], date, c)
          } else {
            this.$set(this.subContentList[type]['contentList'], date, res.data.zbList[date])
            // context = Object.assign({}, context, res.data.zbList)
          }
        }

        // let count = 0
        // let objCount = 0
        // let obj = this.subContentList[type]['contentList']
        // for (let id in obj) {
        //   objCount++
        //   obj[id].forEach((val, i) => {
        //     count++
        //   })
        // }
        // console.log(objCount, count)
      }).catch((err) => {
        this.loading = false
        this.setLoadingShow()
        throw new Error(err)
      })
    },
    ...mapMutations([
      'setLoadingShow', 'delMobanId', 'setChecked', 'setAdvertisingShow'
    ]),
    ...mapActions([
      'getDyInfoList', 'checkZBDetail', 'behaviour'
    ])
  },

  components: {
    list: SubscriptionList, InfiniteScroll, Icon, ToPassDays
  }
}
</script>

<style lang="scss">
  @import "../../common/scss/mixin.scss";
  .my-subscriptions {
    flex: 1;
    .sub-block-list {
      position: relative;
      flex: 1;
      .sub-list {
        position: absolute;
        height: 100%;
        width: 100%;
        .list {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }
    .sub-options {
      flex-grow: 0;
      flex-shrink: 0;
      position: relative;
      z-index: 2;
      height: 45px;
      line-height: 45px;
      // border-top: 1px solid #d8d8d8;
      // border-bottom: 1px solid #d8d8d8;
      box-shadow: 0 1px 2px #d8d8d8;
      background: #fff;
      .option {
        flex: 1;
        color: #333;
        p {
          height: 45px;
          text-align: center;
          box-sizing: border-box;
          margin: 0 10px;
          font-size: 14px;
        }
      }
    }
    .isPay {
      flex: 1 0;
      color: #333;
      .box {
        padding: 0 15px;
        height: 30px;
        line-height: 30px;
        border-left: 1px solid #d8d8d8;
      }
      button {
        white-space: nowrap;
        height: 30px;
        padding: 0 6px;
        border: 1px solid #656565;
      }
    }
    .pick {
      color: #0094fe;
      border-bottom: 2px solid #0094fe;
    }
    .isPay .pick-pay {
      color: #0094fe;
      border: 1px solid #0094fe;
    }
  }
  .has-none-txt{
    span{
      color: #ff0000;
    }
  }
</style>
