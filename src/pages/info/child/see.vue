<template lang="pug">
  .see.row.main-between(v-show="isShow")
    .see-title 查看项目联系人和项目动态
    .see-btn(@click="see") 查看
</template>

<script>
export default {

  props: ['isShow'],

  methods: {
    see () {
      this.$emit('see', true)
    }
  }
}
</script>

<style lang="scss">
@import "../../../common/scss/mixin.scss";
  .see {
    margin-top: px2rem(20);
    padding: 6px 12px;
    background: #fff;
    font-size: 14px;
    align-items: center;
    .see-btn {
      padding: 3px 1.5em;
      border-radius: 5px;
      background: rgb(245, 84, 74);
      color: #fff;
    }
  }
</style>
