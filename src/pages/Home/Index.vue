<template lang="pug">
  .yfb-content
    .yfb-content-router-view
      transition(
        :name="transition"
      )
        keep-alive
          router-view
    .yfb-bottom-nav
      bottom-nav(:tabs="tabs",@direction="direction",@index="navIndex")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {BottomNav} from 'components'

export default {
  name: 'home',

  data () {
    return {
      /**
       * 这里写页脚二级导航
       * to 为 hash, title 为标题
       * icon 为 iconfont class
       */
      transition: 'slide-left'
    }
  },

  mounted () {
  },

  computed: {
    ...mapState([
      'subscription'
    ]),
    ...mapState('home', ['tabs'])
  },

  methods: {
    navIndex (i) {
      this.behaviour({typed: i + 18})
    },
    /**
     * [direction description]
     * @method direction
     * @param  {Booleans}  direction : 方向
     * @return {String}    方向若为真，则点击项大于当前项，从右向左滑动
     */
    direction (direction) {
      this.transition = direction ? 'slide-left' : 'slide-right'
    },
    ...mapActions(['behaviour'])
  },

  components: {
    BottomNav
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.yfb-content {
  height: 100%;
  width: 100%;
  .yfb-content-router-view {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: px2rem(100);
  }
  .yfb-bottom-nav {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: px2rem(100);
  }
}


.home-content {
  height: 100vh;
  box-sizing: border-box;
}

.unshow {
  opacity: 0;
}

.show {
  opacity: 1;
}
</style>
