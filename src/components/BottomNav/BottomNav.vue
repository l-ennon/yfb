<template lang="pug">
  .bottom-nav.row
    .nav.column.main-center(
      v-for="(tab, index) in tabs",
      :class="{active: curIndex === index}",
      @click="toggle(tab, index)"
    )
      //- svg.icon(
      //-   aria-hidden="true"
      //- )
      //-   use(:xlink:href="`#${tab.icon}`")
      .dot(v-if="tab.dot")
      icon(:icon="tab.icon")
      span(v-text="tab.title")
</template>

<script>
import Icon from '../Icon'
export default {
  name: 'bottom-nav',

  data () {
    return {
      index: 0
    }
  },

  props: {
    tabs: {
      type: Array,
      required: true
    }
  },

  methods: {
    toggle (tab, i) {
      this.$emit('direction', this.curIndex > i)
      this.$emit('index', i)
      this.$router.replace(tab.to)
    }
  },

  computed: {
    // 判断当前所在的页面
    curIndex () {
      const path = this.$route.path
      for (let i = 0, length = this.tabs.length; i < length; i++) {
        if (path.match(this.tabs[i].to)) {
          this.index = i
        }
      }
      return this.index
    }
  },

  components: {
    Icon
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.bottom-nav {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 5;
  color: #7d7f87;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.10);
  background: #fff;
  .active{
    flex: 1.5;
    color: #0894ec;
    transform: scale(1.1);
  }
}
.nav {
  position: relative;
  flex: 1;
  width: 30%;
  box-sizing: border-box;
  padding-top: 5px;
  padding-bottom: 2px;
  transition: all .2s;
  .icon {
    font-size: px2rem(36);
  }
  span {
    transform: scale(0.9);
  }
}
</style>
