<template lang="pug">
  #app
    transition(name="fade")
      subscription-model(
        key="subscription-model",
        :isShow="isNotPicked",
        @done="done"
      )
    transition(name="fade")
      to-page(key="to-page")
    transition(name="fade")
      advertising(key="advertising")
    transition(name="bounce-in-up")
      enterprise-ctrl(
        :isShow="canPicked",
        @done="enterprisePayed"
      )
    log(
      key="log",
      :isShow="commonUtil.isLogShow",
      :text="['账号异常,请联系工作人员', '电话: 010-59421907', '微信: ld222499']",
      @logClose="logClose",
      @logClick="logClose"
    )
    first-log(key="first-log")
    loading(:loading="commonUtil.isLoadingShow", key="loading")
    toast(:toast="commonUtil.toast", key="toast")
    transition(name="fade", mode="out-in")
      keep-alive
        router-view
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import beforeMount from 'util/beforeMount'
import {Loading, Toast, ToPage, FirstLog, Log, Advertising} from 'components'
import {SubscriptionModel, EnterpriseCtrl} from 'yfb'

export default {
  name: 'app',

  beforeMount () {
    beforeMount()
    this.hide()
  },

  // readyState DOMContentLoaded onreadystatechange
  mounted (state) {
    this.$el.style.height = `${window.innerHeight}px`
    this.init()
  },

  data () {
    return {
      show: true,
      isNotPicked: false,
      canPicked: false
    }
  },

  computed: {
    ...mapState([
      'subscription', 'commonUtil', 'openid', 'area', 'userInfo', 'firstLog', 'user'
    ])
  },

  watch: {
    $route (to, from) {
      window.wx.hideOptionMenu()
      this.setLoadingShow({isShow: false})
    }
  },

  methods: {
    enterprisePayed () {
      this.canPicked = false
      window.location.href = `http://rmt.qianlima.com/relation_controller/relation/isSkip?openid=${this.userInfo.openId}`
    },
    done () {
      this.isNotPicked = false
    },
    async init () {
      this.setLoadingShow({isShow: true})
      await this.getUserInfo()
      let {isNew} = this.userInfo
      if (!localStorage.getItem('enterpriseCtrl') && isNew && /index$/.test(this.$route.path)) {
        this.behaviour({typed: 88})
        this.canPicked = true
        isNew = 0
        localStorage.setItem('enterpriseCtrl', true)
      } else {
        this.hasModel()
      }
      this.setLoadingShow({isShow: true})
      await this.indexpageten()
      this.setLoadingShow({isShow: false})
    },
    hasModel () {
      if (!localStorage.getItem('subscriptionModel') && !this.$route.path.includes('mySubscriptions')) {
        if (this.$route.path.includes('setSubscriptions')) {
          this.behaviour({typed: 8})
        }
        let type = this.userInfo.pickCity.length === 0
        this.isNotPicked = type
        type && this.behaviour({typed: 7})
        localStorage.setItem('subscriptionModel', true)
      }
    },
    logClose () {
      this.setLog()
      this.commonUtil.isLogShow = false
    },
    ...mapMutations([
      'setLog', 'setLoadingShow', 'getMobanId'
    ]),
    ...mapActions([
      'jserror', 'getUserInfo', 'hide', 'indexpageten', 'behaviour'
    ])
  },

  components: {
    EnterpriseCtrl, SubscriptionModel, Loading, Toast, ToPage, FirstLog, Log, Advertising
  }
}
</script>

<style lang="scss">
@import "./common/scss/reset.css";
@import "./common/scss/base.scss";
@import "./common/scss/mixin.scss";

#app {
  position: relative;
  max-width: 750px;
  height: 100vh;
  margin: auto;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  color: #212121;
  background: #f6f6f6;
}
.slide-left-enter-active, .slide-left-leave {
  opacity: 1;
  transition: all .4s;
  transform: translate3d(0%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-left-leave-active {
  transition: all .4s;
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-right-enter-active, .slide-right-leave {
  transition: all .4s;
  opacity: 1;
  transform: translate3d(0%, 0, 0);
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-right-leave-active {
  transition: all .4s;
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.fade-enter-active, .fade-leave {
  transition: opacity .2s;
  opacity: 1;
}
.fade-enter, .fade-leave-active {
  transition: opacity .2s;
  opacity: 0;
}
.bounce-in-up-enter-active, .bounce-in-up-leave {
  transition: all .5s;
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.bounce-in-up-enter, .bounce-in-up-leave-active {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.scale-enter-active, .scale-leave {
  transition: all .2s;
  transform-origin: top;
  transform: scaleY(1);
  opacity: 1;
}
.scale-enter, .scale-leave-active {
  transition: all .2s;
  transform-origin: top;
  transform: scaleY(0);
  opacity: 0;
}

.user-info {
  padding: px2rem(36);
  align-items: center;
}
.user-info-bg {
  background-image: -webkit-linear-gradient(left, #18c0eb, #6492e6);
  background-image: linear-gradient(to left, #18c0eb, #6492e6);
}
.user-icon {
  flex-grow: 0;
  flex-shrink: 0;
  box-flex: 0;
  height: px2rem(115);
  width: px2rem(115);
  border-radius: 50%;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.user-type {
  flex: 1;
  padding-left: px2rem(15);
  padding-right: px2rem(15);
  p {
    padding: 0 5px;
  }
  .user-membership {
    font-size: px2rem(24);
    white-space: nowrap;
  }
  .user-name {
    font-size: 16px;
    padding-bottom: 5px;
  }
  .vip-icon {
    font-size: 24px;
    padding-left: 8px;
    vertical-align: middle;
  }
}

.scroll-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;
}

.has-none-img {
  img {
    width: px2rem(160);
    margin: 40px 0 10px;
    display: block;
  }
}
.has-none-txt {
  text-align: center;
  font-size: 16px;
}
.sub-content-img {
  img {
    display: block;
    width: 100%;
    padding: 20px 0;
  }
}
table{
  width: 100%;
  border-top: 1px solid #cfcfcf;
  text-align: center;
  vertical-align: middle;
  line-height: 2em;
  font-size: 14px;
  thead {
    line-height: 3em;
    background: #ddefff;
  }
  tr {
    border-bottom: 1px solid #cfcfcf;
  }
  td {
    border-right: 1px solid #cfcfcf;
    &:last-child {
      border: none;
    }
  }
}
[v-cloak] {
  display: none !important;
}

.pick-city-box, .keywords-list {
  padding: .5em;
  background: #fff;
  .city-item, .city-item-add, .keywords-item {
    position: relative;
    width: 25%;
    height: 2em;
    line-height: 2em;
    margin-top: .5em;
    margin-bottom: .5em;
    border-radius: 4px;
    text-align: center;
    box-sizing: border-box;
    font-size: 14px;
    float: left;
    .delete-icon {
      position: absolute;
      top: -10%;
      right: 0;
      border-radius: 50%;
      width: .9rem;
      height: .9rem;
      background: #46a5fe;
      z-index: 2;
      .row {
        height: 100%;
        width: 100%;
      }
      .icon {
        display: block;
        font-size: .4rem;
        color: #fff;
        line-height: .8rem;
      }
    }
    .join-city, .keywords-item-text, p {
      width: 90%;
      height: 2em;
      line-height: 2em;
      margin: auto;
      border-radius: 4px;
      overflow: hidden;
    }
  }
}
.keywords-list {
  padding-left: 0;
}
.btn {
  border-radius: 3px;
}
.clear-float {
  &::after {
    content: '';
    display: block;
    clear: both;
  }
}
.dot {
  position: absolute;
  right: px2rem(20);
  top: px2rem(10);
  width: px2rem(15);
  height: px2rem(15);
  border-radius: 50%;
  @extend .bg-red;
}
</style>
