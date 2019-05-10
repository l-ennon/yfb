<template lang="pug">
  .about-explain.absolute.column
    yfb-appbar(title="价格说明")
    .about-explain-content
      .scroll-content
        .explain-img
          img(src="../../common/imgs/explain.png")
</template>

<script>
import {YfbAppbar} from 'yfb'
export default {
  components: {
    YfbAppbar
  }
}
</script>

<style lang="scss">
.about-explain {
  flex-grow: 1;
  z-index: 2;
  font-size: 14px;
  .about-explain-content {
    position: relative;
    flex-grow: 1
  }
  .explain-img {
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
