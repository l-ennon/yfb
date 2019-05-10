<template lang="pug">
  .join-pick-btn(
    :class="{'picked': picked}"
  )
    slot
</template>

<script>
export default {
  props: {
    picked: Boolean,
    required: true
  }
}
</script>

<style lang="scss">
@import "../../../../common/scss/base.scss";
@import "../../../../common/scss/mixin.scss";
.join-pick-btn {
  position: relative;
  height: px2rem(70);
  line-height: px2rem(70);
  text-align: center;
  border: 1px solid rgb(194, 194, 194);
  border-radius: 4px;
  &.picked {
    border: 1px solid $baseColor;
    color: $baseColor;
    &::after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      border: px2rem(11) solid $baseColor;
      border-top-color: transparent;
      border-left-color: transparent;
    }
  }
}
</style>
