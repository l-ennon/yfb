<template lang="pug">
  .item.columb.main-center
    .item-title
      strong(v-html="item.title")
    .item-info.row
      .item-info-type
        svg.icon(aria-hidden="true")
          use(xlink:href="#icon-lingdang")
        span(v-text="item.type")
      .item-info-area
        svg.icon(aria-hidden="true")
          use(xlink:href="#icon-zuobiao")
        span(v-text="item.area")
      .item-info-time
        svg.icon(aria-hidden="true")
          use(xlink:href="#icon-shijian")
        span(v-text="item.uptime")
    //- .item-content
      //- p(v-text="item.content")
</template>

<script>
export default {
  props: {
    item: {
      default: 0
    }
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.item {
  padding: px2rem(40) 0 0;
  @include border1px(#d8d8d8);
  .item-title {
    font-size: 16px;
    strong {
      font-weight: 500;
    }
  }
  .item-info {
    padding-top: px2rem(20);
    padding-bottom: px2rem(20);
    color: #acacac;
    .item-info-type, .item-info-area, .item-info-time {
      font-size: 12px;
      span {
        vertical-align: top;
      }
    }
    .item-info-type, .item-info-area {
      flex: 0 0 30%;
      width: 30%;
      overflow: hidden;
      white-space: nowrap;
    }
    .item-info-time {
      flex: 1;
    }
  }
  .item-content {
    height: 4.5em;
    font-size: 13px;
    color: #acacac;
    line-height: 1.5em;
    overflow: hidden;
  }
  .icon {
    color: #46a5fe;
    font-size: 14px;
  }
}
</style>
