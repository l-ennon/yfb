<template lang="pug">
  .about-us.column
    yfb-appbar(title="关于我们")
    .about-us-content
      .scroll-content
        img(src="../../common/imgs/aboutus.jpg")
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
.about-us {
  height: 100%;
  .about-us-content {
    position: relative;
    flex-grow: 1;
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>
