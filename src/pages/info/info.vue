<template lang="pug">
  .detail.column(:class="{'is-collet': isColletShow}")
    info-to-page(
      :isShow="infoToPageShow",
      @close="infoToPageShow = false"
    )
    win-bidding(
      :isShow="isWinBiddingShow",
      @close="winBiddingClose",
      :data="winBiddingData"
    )
    collect(
      :isShow="isColletShow",
      :path="path"
    )
    yfb-appbar(title="信息详情")
      div(@click="saveFn", slot="right")
        svg.icon.t-white(aria-hidden="true")
          use(:xlink:href="search.info.saved ? '#icon-xingxing2' : '#icon-xingxing'")
    .detail-content
      .scroll-content
        .detail-addition(v-if="search.info.endtime")
          .detail-group.row
            .detail-group-title.t-gray 截止时间:
            .detail-group-value(v-text="search.info.endtime")
          .detail-group.row
            .detail-group-title.t-gray 招标单位:
            .detail-group-value(v-text="search.info.zbdw")
          .detail-group.row
            .detail-group-title.t-gray 代理机构:
            .detail-group-value(v-text="search.info.dljg")
          .detail-group.row
            .detail-group-title.t-gray 招标编号:
            .detail-group-value(v-text="search.info.zbbh")
        detail-header(:content="search")
        //- .detail-content-text
        //-   .win_bidding 点击出现
        //-   a(href="tel:15011357611") 拨打电话
        .detail-content-text(v-html="contentText")
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import {YfbAppbar} from 'yfb'
import util from 'util'
import detailHeader from './infoHeader'
import collect from './collect/collect'
import {InfoToPage} from 'components'
import WinBidding from './child/WinBidding'

export default {

  mounted () {
    let detailContent = document.querySelector('.detail-content-text')
    detailContent.addEventListener('click', (e) => {
      switch (e.target.className) {
        case 'phone_call_num':
          this.infoToPageShow = true
          break
        case 'win_bidding':
          let companyName = e.target.innerText
          this.isWinBiddingShow = true
          this.winBiddingData = {}
          this.getlxr({companyName}).then(res => {
            this.winBiddingData = res.data
          }).catch(err => {
            console.log(err)
            this.winBiddingData = {}
            this.isWinBiddingShow = false
          })
          break
      }
    })
  },

  activated () {
    this._init()
  },

  data () {
    return {
      infoToPageShow: false,
      contentid: null,
      isColletShow: true,
      isWinBiddingShow: false,
      winBiddingData: {}
    }
  },

  computed: {
    path () {
      let openid = util.getUrlParam('openid')
      let url = 'http://rmt.qianlima.com/relation_controller/relation/project/company/index'
      return `${url}?projectId=${this.contentid}&openid=${openid}&channel=1`
    },
    contentText () {
      let x = this.search.info.content
      if (!x) return
      return x.replace(/href=[^>]+/g, '')
    },
    ...mapState([
      'search', 'user'
    ])
  },

  methods: {
    async _init () {
      this.isWinBiddingShow = false
      this.infoToPageShow = false
      this.isColletShow = false
      await this.getDetailData()
      await this.getCollet()
    },
    getCollet () {
      let url = 'http://rmt.qianlima.com/relation_controller/relation/project/company/show'
      return this.fetch({
        url,
        logError: false,
        method: 'get',
        params: {
          projectId: this.contentid,
          channel: 1
        }
      }).then(res => {
        if (res && res.data === 1) {
          this.isColletShow = true
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getDetailData () {
      // let reg = new RegExp(this.$route.params.page)
      // if (!reg.test(this.contentid)) {
      this.search.info = {}
      this.contentid = this.$route.params.page
      this.getZBDetail({contentid: this.contentid})
      // }
    },
    async saveFn () {
      let {saved} = this.search.info
      if (saved) {
        await this.disScFn()
      } else {
        await this.scFn()
      }
      this.search.info.saved = !saved
      this.user.updata = true
      this.setToast({text: saved ? '已取消收藏' : '收藏成功'})
    },
    scFn () {
      let {contentid} = this.search.info
      return this.clickSC({contentid})
    },
    disScFn () {
      let {contentid} = this.search.info
      return this.clickDisSC({contentid})
    },
    winBiddingClose () {
      this.isWinBiddingShow = false
    },
    ...mapMutations([
      'setLoadingShow'
    ]),
    ...mapActions([
      'getZBDetail', 'clickSC', 'clickDisSC', 'setToast', 'action', 'fetch', 'getlxr'
    ])
  },

  components: {
    YfbAppbar, detailHeader, collect, InfoToPage, WinBidding
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.detail {
  height: 100%;
  background: #efeff4;
  .detail-content {
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
  }
}
.detail-header {
  background: #fff;
  padding: px2rem(25);
  font-size: px2rem(32);
}
.detail-title {
  font-size: 16px;
}
.detail-addition {
  margin: 20px 0;
  font-size: 14px;
  background: #fff;
  padding-bottom: 10px;
  .detail-group {
    padding-top: 10px;
  }
  .detail-group-title {
    flex: 0 0 105px;
    padding-left: 5%;
  }
  .detail-group-value {
    flex: 1;
    padding-right: 5%;
  }
}
.detail-content-text {
  font-size: 16px;
  padding: 20px 10px;
  overflow-x: auto;
  .phone_call_num, .win_bidding {
    color: rgb(0, 148, 254)
  }
  .win_bidding {
    text-decoration: underline;
  }
}
</style>
