<template lang="pug">
  .first-log.row.main-center(
    v-if="firstLogShow",
    @click.self="Close",
    v-cloak
  )
    .first-log-box
      .close(@click="Close")
        svg.icon(aria-hidden="true")
          use(xlink:href="#icon-close")
      .first-log-title(v-html="logText")
      .first-log-title 为了不影响使用, 请及时续费
      button.btn.bg-blue.t-white(@click="toJoin") 立刻续费
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'first-log',

  data () {
    return {
    }
  },

  beforeMount () {
  },

  mounted () {
  },

  beforeDestroy () {
  },

  computed: {
    firstLogShow () {
      return this.$route.path !== '/index/subscription/setKeyWord' && !this.userInfo.hasEjected
    },
    logText () {
      let text = ''
      if (this.userInfo.toPassDays > 0) {
        text = `您的会员还有<span class="t-red">${this.userInfo.toPassDays}</span>天到期`
      } else if (this.userInfo.toPassDays < 0) {
        text = `您的会员已过期<span class="t-red">${this.userInfo.toPassDays}</span>天`
      } else {
        text = `您的会员今天到期`
      }
      return text
    },
    ...mapState([
      'userInfo', 'user', 'search', 'subscription'
    ])
  },

  methods: {
    Close () {
      this.userInfo.hasEjected = !this.userInfo.hasEjected
    },
    toJoin () {
      this.Close()
      this.user.isChange = true
      this.search.toPage = false
      if (this.userInfo.dengji === 1) {
        this.user.selectedCity = this.subscription.payCityList
      } else {
        this.user.selectedCity = this.subscription.freeCityList
      }
      this.$router.push('/user/joinMembership')
    }
  },

  components: {
  }
}
</script>

<style lang="scss">
.first-log {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 90;
  background: rgba(#000000, 0.5);
  .first-log-box {
    position: relative;
    width: 75%;
    padding: 1.5em 1em 1.2em;
    box-sizing: border-box;
    border-radius: 10px;
    background: #fff;
    text-align: center;
    font-size: 16px;
    .close {
      position: absolute;
      z-index: 9;
      right: 7px;
      top: 7px;
      color: #999;
    }
    .btn {
      width: 100%;
      line-height: 2em;
      margin-top: 1em;
    }
  }
  .first-log-title {
    line-height: 1.8em;
    span.t-red {
      padding: 2px;
      font-size: 1.2em;
    }
  }
}
</style>
