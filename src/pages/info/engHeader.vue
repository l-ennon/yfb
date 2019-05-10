<template lang="pug">
  .eng-header
    .list-view.columb.main-center(v-if="Object.keys(item).length !== 0")
      .list-view-title
        strong(v-html="item.title")
      .list-view-info.row
        .list-view-info-text(v-show="item.areaName")
          span(v-text="item.areaName")
        .list-view-info-text(v-show="item.yzlx")
          span(v-text="item.yzlx")
        .list-view-info-text(v-show="item.xmgj")
          span(v-text="`跟进${item.xmgj}`")
        .list-view-info-text(v-show="item.updateTime")
          span(v-text="item.updateTime")
      .list-view-prompt.row
        .list-view-prompt-text.view-type(v-if="item.xmlb")
          span(v-text="item.xmlb")
        .list-view-prompt-text.view-num(v-if="item.xmtz")
          span(v-text="item.xmtz")
        .list-view-prompt-text.view-stage(v-if="item.zxqk")
          span(v-text="item.zxqk")
</template>

<script>
export default {
  props: {
    item: {
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.eng-header {
  .list-view {
    margin-top: px2rem(20);
    margin-bottom: px2rem(20);
    padding: px2rem(40) px2rem(40) 0;
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
      .list-view-info-text {
        padding: 0 10px;
        color: rgb(110, 117, 133);
        border-right: 1px solid rgb(236, 236, 236);
        &:first-child {
          padding-left: 0;
        }
        &:last-child {
          border-right: none
        }
      }
    }
    .list-view-prompt {
      flex-wrap: wrap;
      .list-view-prompt-text {
        margin-bottom: px2rem(20);
        padding: 0 2px;
        margin-right: 5px;
        border-radius: 2px;
      }
      .view-type {
        color: rgb(91, 180, 255);
        border: 1px solid rgb(91, 180, 255);
      }
      .view-stage {
        color: rgb(164, 175, 232);
        border: 1px solid rgb(164, 175, 232);
      }
      .view-num {
        color: rgb(62, 201, 92);
        border: 1px solid rgb(62, 201, 92);
      }
    }
    .list-view-content {
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
}
</style>
