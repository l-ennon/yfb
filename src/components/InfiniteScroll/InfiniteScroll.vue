<template lang="pug">
  .infinite-scroll.row.main-center(v-show="isShow")
    spinner(v-show="loading")
    span(v-show="loading", v-text="loadingText")
    //- span(v-show="!loading") 搜索查看更多信息
</template>

<script>
import Scroll from '../internal/scroll.js'
import Spinner from '../Spinner'

export default {
  name: 'infinite-scroll',

  mixins: [Scroll],

  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: true
    },
    loadingText: {
      type: String,
      default: '正在加载中...'
    }
  },

  data () {
    return {
      scrollTop: false
    }
  },

  watch: {
    scrollTop (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit('scrollTop', newValue)
      }
    }
  },

  methods: {
    onScroll () {
      if (this.loading) return
      const scroller = this.scroller
      const isWindow = scroller === window

      let scrollTop = isWindow ? scroller.scrollY : scroller.scrollTop
      let scrollHeight = isWindow ? document.documentElement.scrollHeight || document.body.scrollHeight : scroller.scrollHeight

      this.scrollTop = scroller.scrollTop >= 20
      let h = scrollHeight - scrollTop - 20
      let sh = scroller.offsetHeight || window.innerHeight
      if (h <= sh) {
        this.$emit('load')
      }
    }
  },

  components: {
    Spinner
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.infinite-scroll {
  height: 40px;
  line-height: 40px;
}

.to-top {
  position: absolute;
  bottom: 20px;
  right: 20px;
  height: px2rem(70);
  width: px2rem(70);
  line-height: px2rem(70);
  text-align: center;
  z-index: 2;
  border-radius: 50%;
  font-size: 20px;
  color: rgb(0, 127, 255);
  // color: #909090;
  border: 1px solid #f1f1f1;
  box-shadow: 0 0 5px 1px rgba(0, 127, 255, 0.1);
  background: #fff;
}
</style>
