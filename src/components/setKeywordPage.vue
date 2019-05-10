<template lang="pug">
  .set-keyword-page.row.main-center(
    v-if="user.setKeywordFirst"
    @click.self="Close",
    v-cloak
  )
    .set-keyword-page-box
      .set-keyword-page-img.row.main-center
        img(src="../common/imgs/setKeyword.png")
      .set-keyword-page-title 每天找信息太麻烦？
      .set-keyword-page-title 还可能漏掉信息！
      .set-keyword-page-title.t-red 把您的产品或行业关键词告诉我
      .set-keyword-page-title 系统精准匹配相关的招投标信息
      .set-keyword-page-title 每天第一时间自动推送给您
      button.btn.bg-blue.t-white(@click="Close") 朕知道了
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'set-keyword-page',

  data () {
    return {
    }
  },

  beforeMount () {
  },

  mounted () {
  },

  beforeDestroy () {
  },

  computed: {
    ...mapState([
      'user'
    ])
  },

  methods: {
    Close () {
      this.user.setKeywordFirst = false
    }
  },

  components: {
  }
}
</script>

<style lang="scss">
.set-keyword-page {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  background: rgba(#000000, 0.5);
  .set-keyword-page-box {
    position: relative;
    width: 80%;
    padding: 60px 1em 1.2em;
    box-sizing: border-box;
    border-radius: 10px;
    background: #fff;
    text-align: center;
    font-size: 16px;
    .set-keyword-page-img {
      position: absolute;
      left: 0;
      right: 0;
      top: -40px;
      img {
        display: block;
        width: 80px;
      }
    }
    .close {
      position: absolute;
      z-index: 9;
      right: 7px;
      top: 7px;
      color: #999;
    }
    .btn {
      width: 100%;
      line-height: 2.5em;
      margin-top: 1em;
    }
  }
  .set-keyword-page-title {
    line-height: 1.8em;
    span.t-red {
      padding: 2px;
      font-size: 1.2em;
    }
  }
}
</style>
