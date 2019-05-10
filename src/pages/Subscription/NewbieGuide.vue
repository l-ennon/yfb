<template lang="pug">
.subscription-model-img(
  v-if="search.isNeedNewbieGuider",
  @click="search.isNeedNewbieGuider = false"
)
  img(src="../../common/imgs/newbie-guide-model.png")
  .subscription-model-img-btn
    button.btn.t-blue 我知道了
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'newbie-guide',

  computed: {
    ...mapState(['search'])
  }
}
</script>

<style lang="scss">
.subscription-model-img {
  position: fixed;
  z-index: 95;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  .subscription-model-img-btn {
    width: 100%;
    padding-top: 10px;
    .btn {
      display: block;
      margin: auto;
      height: 2em;
      line-height: 2em;
      font-size: px2rem(32);
      padding-left: 2em;
      padding-right: 2em;
      background: #fff;
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>
