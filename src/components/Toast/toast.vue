<template lang="pug">
  .toast-content.row.main-center(v-show="toast.show")
    .toast
      p {{toast.title}}
</template>

<script>
export default {
  props: {
    toast: {
      type: Object,
      default: '操作成功',
      required: false
    }
  }
}
</script>

<style lang="scss">
.toast-content{
  background: rgba(#000000, 0.8);
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 99;
  min-height: 3rem;
  border-radius: 5px;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
}
.toast{
  padding-left: 2rem;
  padding-right: 2rem;
  white-space: nowrap;
  p{
    color: #fff;
    font-size: 14px;
  }
}
</style>
