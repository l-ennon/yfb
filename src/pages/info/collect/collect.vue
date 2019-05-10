<template lang="pug">
  .collect.bg-white.btn.row.main-center(v-if="isShow")
    button.collect-btn.btn.bg-blue(@click="to") 查看潜在竞标企业
</template>

<script>
export default {
  name: 'collect',

  props: ['isShow', 'path'],

  methods: {
    to () {
      window.location.href = this.path
    }
  }
}
</script>

<style lang="scss">
  .collect {
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    right: 0;
    height: 45px;
    text-align: center;
    padding: 5px;
    .collect-btn {
      color: #fff;
      height: 100%;
      width: 100%;
      font-size: 16px;
      text-align: center;
    }
  }
  .is-collet {
    .detail-content {
      margin-bottom: 45px;
    }
  }
</style>
