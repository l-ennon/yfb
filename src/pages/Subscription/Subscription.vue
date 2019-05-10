<template lang="pug">
  .subscription.absolute.column
    newbie-guide
    btnGroup.sub-nav(
      :btns="btns",
      :type="type",
      @toggle="toggle",
      @index="index"
    )
    .sub-content.column
      transition(
        :name="transition"
      )
        keep-alive
          router-view
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import {BtnGroup} from 'components'
import NewbieGuide from './NewbieGuide.vue'
import util from 'util'
export default {
  name: 'subscription',

  data () {
    return {
      first: true,
      btns: [
        {
          title: '我的订阅',
          to: '/index/subscription/mySubscriptions'
        },
        {
          title: '订阅设置',
          to: '/index/subscription/setSubscriptions',
          dot: !util.getLocalStorage('setSubscriptionsDot')
        }
      ],
      transition: 'slide-right'
    }
  },

  activated () {
    if (this.subscription.toMySubscriptions) {
      this.$router.push('/index/subscription/mySubscriptions')
      this.setToMySubscriptions(false)
    }
  },

  mounted () {
    this.isDotShow()
  },

  deactivated () {
    if (this.first && this.mobanid) {
      this.subscription.updata = true
    }
  },

  computed: {
    type () {
      for (var i = 0; i < this.btns.length; i++) {
        let targetHref = this.btns[i].to
        if (this.$route.path.match(targetHref)) {
          this.tabs[1].to = targetHref
          return i
        }
      }
    },
    ...mapState([
      'subscription', 'mobanid'
    ]),
    ...mapState('home', ['tabs'])
  },

  methods: {
    index (i) {
      this.behaviour({typed: i + 35})
    },
    toggle (direction) {
      this.transition = direction ? 'slide-left' : 'slide-right'
    },
    isDotShow () {
      util.setLocalStorage('subscriptionsDot', true)
      this.tabs[1].dot = false
    },
    ...mapMutations('subscription', ['setToMySubscriptions']),
    ...mapActions(['behaviour'])
  },

  watch: {
  },

  components: {
    BtnGroup, NewbieGuide
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.subscription{
  height: 100%;
}
.sub-nav {
  flex-shrink: 0;
  flex-grow: 0;
  width: px2rem(460);
  height: px2rem(135);
  padding-top: px2rem(30);
  padding-bottom: px2rem(30);
  margin: 0 auto;
  font-size: 14px;
}
.sub-content {
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
}
.sub-img {
  width: 80%;
  margin: auto;
  img {
    display: block;
    width: 100%;
  }
}
.sub-btn {
  margin-top: px2rem(60);
  button {
    display: block;
    width: 90%;
    height: px2rem(90);
    font-size: 16px;
    margin: auto;
    background: #0094fe;
  }
}
</style>
