<template lang="pug">
  aside.option-list
    section.filter-modal(
      :class="{isopen: isOpen}",
      @click="curIndex = null"
    )
    ul.filter-header.row
      slot(name="pay")
      li.option(
        v-for="(val, index) of options",
        @click="toggle(index)"
      )
        p(:class="{active: val.active || curIndex === index}")
          span(v-text="val.title")
          icon(:icon="curIndex === index ? 'icon-sanjiao2' : 'icon-sanjiao1'")
    //- transition-group(name="scale")
    slot(
      v-for="(v, i) of options",
      :name="`filter${i}`"
    )
</template>

<script>
import {Icon} from 'components'
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    isOpen: {
      type: Boolean
    }
  },

  data () {
    return {
      curIndex: null
    }
  },

  watch: {
    curIndex () {
      this.$emit('curIndex', this.curIndex)
    },
    isOpen (newValue) {
      if (!newValue) this.curIndex = null
    }
  },

  methods: {
    toggle (i) {
      this.curIndex = this.curIndex === i ? null : i
    }
  },

  components: {
    Icon
  }
}
</script>

<style lang="scss">
@import "../../../common/scss/base.scss";
@import "../../../common/scss/mixin.scss";
@import "../../../common/scss/mixin.scss";
@import "../../../common/scss/filter.scss";
.option-list {
  position: relative;
  z-index: 7;
  box-shadow: 0 1px 2px #d8d8d8;
  > ul {
    background: #fff;
  }
  .option {
    flex: 1 1;
    @extend .row;
    @extend .main-center;
    height: 40px;
    .active {
      color: $baseColor;
      .icon {
        color: $baseColor;
      }
    }
    > p {
      width: 100%;
      line-height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
      border-right: 1px solid #d8d8d8;
      font-size: px2rem(28);
      @extend .row;
      @extend .main-center;
      > span {
        max-width: 4em;
      }
      .icon {
        color: rgb(153, 153, 153);
        padding-left: 5px;
        font-size: 10px;
      }
    }
    &:last-child {
      >p {
        border-right: none
      }
    }
  }
}
.filter-modal {
  position: fixed;
  z-index: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  visibility: hidden;
  opacity: 0;
  transition: all .4s ease-in-out;
  &.isopen {
    visibility: visible;
    opacity: 1;
  }
}

</style>
