<template lang="pug">
  .detail-header(v-show="content.info.area")
    //- title
    .detail-title
      p(v-text="content.info.title")
    //- 信息
    .detail-info.row
      .detail-info-area
        icon(icon="icon-zuobiao")
        span(v-text="content.info.area")
      .detail-info-type
        icon(icon="icon-lingdang")
        span(v-text="content.info.type")
      .detail-info-time
        icon(icon="icon-shijian")
        span(v-text="content.info.uptime")
</template>

<script>
import {Icon} from 'components'
export default {
  props: {
    content: {
      type: Object,
      require: true
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="scss">
@import "../../common/scss/base.scss";
@import "../../common/scss/mixin.scss";
.detail-info {
  padding-top: px2rem(10);
  & > div {
    @extend .row;
    flex: 1;
    font-size: 14px;
    color: #acacac;
    .icon {
      @extend .t-blue;
      padding-right: .2em;
      font-size: 16px;
    }
  }
}
</style>
