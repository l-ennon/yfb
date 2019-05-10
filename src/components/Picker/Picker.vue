<template lang="pug">
.picker
  .picker-content.row
    .picker-scroller
      ul.scroll-content.bg-gray
        li(v-for="(value, key) in nav")
          .picker-item(
            @click.prevent="navSelect(value, key)",
            :class="{'picked': navKey === key}"
          )
            span(v-text="value")
    .picker-scroller(v-show="targetList")
      ul.scroll-content.bg-white
        li(v-for="(value, key) in targetList")
          .picker-item(@click="select(value, key)")
            span(v-text="value")
</template>

<script>
export default {
  name: 'picker',

  props: {
    nav: {
      type: Object,
      required: true
    },
    content: {
      type: Object,
      required: true
    },
    selected: {
      type: Object,
      default () {
        return {
          cityList: {}
        }
      },
      required: false
    }
  },

  data () {
    return {
      navKey: null
    }
  },

  computed: {
    targetList () {
      return this.content[this.navKey] || null
    }
  },

  beforeMount () {
  },

  mounted () {
    console.log(this.selected)
  },

  methods: {
    navSelect (value, key) {
      this.navKey = key
      if (!this.content[key]) {
        this.$emit('select', {
          [key]: {
            [key]: value
          }
        })
      }
    },
    select (value, key) {
      this.$emit('select', {
        [this.navKey]: {
          [key]: value
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "../../common/scss/base.scss";
@import "../../common/scss/mixin.scss";
.picker {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .picker-content {
    height: 100%;
    width: 100%;
  }
  .picked {
    background: #fff;
    span {
      @extend .t-blue;
    }
  }
  .picker-scroller {
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    text-indent: 2em;
    white-space: nowrap;
    li {
      line-height: 45px;
      height: 45px;
      color: #333;
      font-size: 14px;
      box-sizing: border-box;
    }
  }
}

</style>
