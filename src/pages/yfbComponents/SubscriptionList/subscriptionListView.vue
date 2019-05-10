<template lang="pug">
  .sub-view.list-view.columb.main-center
    .list-view-badge(v-if="item.pay")
      span 已购买
    .list-view-title
      strong(v-html="item.title")
    .list-view-info.row
      .list-view-info-type
        svg.icon(aria-hidden="true")
          use(xlink:href="#icon-lingdang")
        span(v-text="item.type")
      .list-view-info-area
        svg.icon(aria-hidden="true")
          use(xlink:href="#icon-zuobiao")
        span(v-text="item.area")
      .list-view-info-time
        svg.icon(aria-hidden="true")
          use(xlink:href="#icon-shijian")
        span(v-text="item.uptime")
    .list-view-content(v-if="item.content")
      p(v-html="computedContent")
</template>

<script>
export default {
  props: {
    item: {
      default: 0
    }
  },

  computed: {
    computedContent () {
      if (!this.item.content) return ''
      return `...${this.item.content}...`
    }
  }
}
</script>

<style lang="scss">
@import "../../../common/scss/mixin.scss";
.sub-view {
  position: relative;
  .list-view-badge {
    position: absolute;
    top: 0;
    left: 0;
    font-size: px2rem(24);
    height: px2rem(36);
    line-height: px2rem(36);
    padding: 0 0.5em;
    border-bottom-right-radius: 5px;
    color: #fff;
    font-weight: 600;
    background: rgb(255, 187, 60);
  }
  &.list-view {
    margin-bottom: px2rem(20);
    padding: px2rem(40) px2rem(40);
    background: #fff;
    .list-view-title {
      font-size: 16px;
      strong {
        font-weight: 500;
      }
    }
    .list-view-info {
      padding-top: px2rem(20);
      padding-bottom: px2rem(20);
      color: #acacac;
      .list-view-info-type, .list-view-info-area, .list-view-info-time {
        font-size: 12px;
        span {
          vertical-align: top;
        }
      }
      .list-view-info-type, .list-view-info-area {
        flex: 0 0 30%;
        width: 30%;
        overflow: hidden;
        white-space: nowrap;
      }
      .list-view-info-time {
        flex: 1;
      }
    }
    .list-view-content {
      max-height: 4.5em;
      font-size: 13px;
      line-height: 1.5em;
      overflow: hidden;
    }
    .icon {
      color: #46a5fe;
      font-size: 14px;
    }
  }
}
</style>
