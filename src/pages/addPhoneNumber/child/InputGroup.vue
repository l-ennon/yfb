<template lang="pug">
.add-input-group.row
  label.row
    span(v-text="label")
    input.t-dgray(
      ref="input",
      :type="type",
      @input.trim="update($event.target.value)",
      :value="value",
      :placeholder="placeholder",
      :maxlength="maxlength",
      @blur="blur",
      @focus="focus",
    )
    .confirm(v-if="confirm === true")
      Icon.t-green(icon="icon-xuanzhong")
    .disable(v-else-if="confirm === false")
      span.t-red(v-text="disableTxt")
  slot
</template>

<script>
import {Icon} from 'components'
export default {
  props: {
    filter: Function,
    label: String,
    disableTxt: String,
    value: null,
    placeholder: String,
    maxlength: Number,
    confirm: null,
    type: {
      type: String,
      default: 'text'
    }
  },

  methods: {
    update (value) {
      this.$emit('input', value)
    },
    blur () {
      this.$emit('blur', true)
    },
    focus () {
      this.$emit('focus', true)
    }
  },

  components: {Icon}
}
</script>

<style lang="scss">
@import "../../../common/scss/mixin.scss";
.add-input-group {
  position: relative;
  justify-content: space-between;
  -webkit-box-pack: justify;
  flex-wrap: nowrap;
  line-height: px2rem(90);
  height: px2rem(90);
  font-size: px2rem(26);
  border-bottom: 1px solid #d8d8d8;
  box-sizing: border-box;
  background: #fff;
  .disable, .confirm {
    position: absolute;
    top: 0;
    bottom: 0;
    right: px2rem(30);
  }
  .confirm {
    font-size: px2rem(46);
  }
  &:last-child {
    border: none;
  }
  label {
    flex-grow: 1;
    align-items: center;
    span {
      display: inline-block;
      min-width: px2rem(30 * 6);
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: px2rem(30 * 6);
      padding-left: px2rem(30);
      box-sizing: border-box;
    }
    input {
      flex-grow: 1;
      height: px2rem(60);
      line-height: px2rem(60);
      border: none;
      background: none;
      margin-left: 0;
      text-indent: 1em;
    }
  }
}
</style>
