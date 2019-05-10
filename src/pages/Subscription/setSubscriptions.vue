<template lang="pug">
  .set-subscriptions.scroll-content(v-cloak)
    .sub-block-list(v-if="!isListShow && !loading")
      .sub-img
        img(src="../../common/imgs/ban@2x.png")
      .sub-btn
        router-link(to="/index/subscription/setKeyWord", tag="div")
          button.btn.bg-blue.t-white 开始订阅
    .sub-block-list(v-if="isListShow && !loading")
      .sub-box
        p.sub-title 设置关键词
        ul.box.keywords-list.clear-float
          li.keywords-item(v-for="(keyword, i) in keywords")
            p.bg-gray(v-text="keyword")
      .sub-box
        p.sub-title 信息所在地
        ul.sub-pay.box(v-if="payCityListLength !== 0")
          city-pick(
            :selectCitys="subscription.payCityList.cityList",
            :isPay="true"
          )
        ul.box
          city-pick(
            :selectCitys="subscription.freeCityList.cityList"
          )
      .sub-btn(@click="eventAction")
        router-link(to="/index/subscription/setKeyWord", tag="div")
          button.btn.bg-blue.t-white(data-track="修改订阅") 修改订阅
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import {CityPick} from 'yfb'
import util from 'util'

export default {
  name: 'setSubscriptions',

  data () {
    return {
      data: {},
      loading: true
    }
  },

  computed: {
    isListShow () {
      return this.subscription.keywords.length !== 0
    },
    payCityListLength () {
      let list = this.subscription.payCityList.cityList
      return Object.keys(list).length
    },
    keywords () {
      return this.subscription.keywords
    },
    ...mapState([
      'subscription'
    ])
  },

  mounted () {
    this.isDotShow()
  },

  activated () {
    let {setUpdata} = this.subscription
    if (setUpdata) {
      this._mock()
      this.subscription.setUpdata = false
    } else {
      this.loading = false
    }
  },

  methods: {
    eventAction () {
      this.behaviour({typed: 42})
    },
    isDotShow () {
      util.setLocalStorage('setSubscriptionsDot', true)
      this.$parent.btns[1].dot = false
    },
    _mock () {
      this.loading = true
      this.dySettingPage().then((res) => {
        this.loading = false
      })
    },
    ...mapMutations([
      'setLoadingShow'
    ]),
    ...mapActions([
      'dySettingPage', 'behaviour'
    ])
  },

  components: {
    CityPick
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.set-subscriptions {
  .sub-btn {
    margin-bottom: px2rem(50);
  }
  .sub-box {
    padding: 15px 15px;
    margin-bottom: 10px;
    background: #fff;
    .sub-title {
      font-size: 16px;
    }
    .keywords-list {
      padding: 0;
    }
    .keywords-item {
      width: 33.33%;
      &:first-child {
        width: 33.34%;
      }
    }
  }
}
</style>
